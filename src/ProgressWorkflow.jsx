import React, { useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkflowProgress } from './actions';
import './less/editor.less';

/**
 * @summary The React component that shows progress tracking of selected content.
 */
const ProgressWorkflow = (props) => {
  const { content, pathname } = props;
  const currentStateKey = content?.review_state;
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [workflowProgressSteps, setWorkflowProgressSteps] = useState([]);
  const [currentState, setCurrentState] = useState(null);
  const workflowProgress = useSelector((state) => state?.workflowProgress);
  const thestate = useSelector((state) => state);

  // toggle progress component visible by clicking on the button
  const setVisibleSide = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const findCurrentState = (steps, done) => {
      const arrayContainingCurrentState = steps.find(
        (itemElements) => itemElements[1] === done,
      );
      const indexOfCurrentSateKey = arrayContainingCurrentState[0].indexOf(
        currentStateKey,
      );
      const title = arrayContainingCurrentState[2][indexOfCurrentSateKey];
      const description = arrayContainingCurrentState[3][indexOfCurrentSateKey];

      setCurrentState({
        done,
        title,
        description,
      });
    };
    const hasToolbar = document.querySelector('#toolbar .toolbar-actions');

    setIsToolbarOpen(!!hasToolbar);
    // filter out paths that don't have workflow (home, login etc)
    if (
      workflowProgress.result &&
      !workflowProgress.workflow?.error &&
      Array.isArray(workflowProgress.result.steps)
    ) {
      findCurrentState(
        workflowProgress.result.steps,
        workflowProgress.result.done,
      );
      setWorkflowProgressSteps(workflowProgress.result.steps);
    } else {
      setCurrentState(null); // reset current state only if a path without workflow is
      // chosen to avoid flicker for those that have workflow
    }
  }, [currentStateKey, workflowProgress]);

  useEffect(() => {
    dispatch(getWorkflowProgress(pathname)); // the are paths that don't have workflow (home, login etc)
  }, [dispatch, pathname]);

  const itemTracker = (tracker) => (
    <li
      key={`progress__item ${tracker[0]}`}
      className={`progress__item ${
        tracker[0].indexOf(currentStateKey) > -1
          ? 'progress__item--active'
          : tracker[1] < currentState.done
          ? 'progress__item--completed'
          : 'progress__item--next'
      }`}
    >
      {tracker[2].map((title, index) => (
        <p
          key={`progress__title ${tracker[0]}${index}`}
          className={`progress__title ${
            currentState.title !== title ? 'title-incomplete' : ''
          }`}
        >
          {title}
        </p>
      ))}
    </li>
  );

  const currentStateClass = {
    published: 'published',
    private: 'private',
  };

  return (
    isToolbarOpen && (
      <Portal
        node={__CLIENT__ && document.querySelector('#toolbar .toolbar-actions')}
      >
        {currentState ? (
          <>
            <div>
              <button
                className={`circle-right-btn ${
                  currentStateClass[currentStateKey]
                    ? `review-state-${currentStateKey}`
                    : ''
                }`}
                id="toolbar-cut-blocks"
                onClick={setVisibleSide}
              >
                {`${currentState.done}%`}
              </button>
              {visible ? (
                <div className="sidenav-ol">
                  <ul className="progress">
                    {workflowProgressSteps.map((progressItem) =>
                      itemTracker(progressItem),
                    )}
                  </ul>
                </div>
              ) : null}
            </div>
            <div
              className={`review-state-text ${
                currentStateClass[currentStateKey]
                  ? `review-state-${currentStateKey}`
                  : ''
              }`}
            >
              {currentState.title}
            </div>
          </>
        ) : (
          <></>
        )}
      </Portal>
    )
  );
};
export default ProgressWorkflow;
