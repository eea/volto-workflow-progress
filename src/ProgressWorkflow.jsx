import React, { useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkflowProgress } from './actions';
import './less/editor.less';

/**
 * @summary The React component that allows the footnotes block view to be
 * edited using a form in a sidebar portal.
 * @param {object} props Contains the props received by any Edit component of a
 * registered Volto block: `selected`, `block`, `data`, `onChangeBlock` etc.
 */
const ProgressWorkflow = (props) => {
  const { content, pathname } = props;
  const currentStateKey = content?.review_state;
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [workflowProgressSteps, setWorkflowProgressSteps] = useState([]);
  const [currentState, setCurrentState] = useState({});
  const workflowProgress = useSelector((state) => state?.workflowProgress);

  const setVisibleSide = () => {
    setVisible(!visible);
  };

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

  useEffect(() => {
    if (workflowProgress.result) {
      findCurrentState(
        workflowProgress.result.steps,
        workflowProgress.result.done,
      );
      setWorkflowProgressSteps(workflowProgress.result.steps);
    }
  }, [workflowProgress]);

  // Similar to componentDidMount and componentDidUpdate:
  // used only once at mount
  useEffect(() => {
    dispatch(getWorkflowProgress(pathname));
  }, [dispatch, pathname, props]); // to be used only once at mount

  const itemTracker = (tracker) => (
    <li
      className={`progress__item ${
        tracker[0].indexOf(currentStateKey) > -1
          ? 'progress__item--active'
          : tracker[1] < currentState.done
          ? 'progress__item--completed'
          : 'progress__item'
      }`}
    >
      {tracker[2].map((title) => (
        <p className="progress__title">{title}</p>
      ))}
    </li>
  );

  const currentStateClass = {
    published: 'published',
    private: 'private',
  };

  return (
    <>
      <Portal
        node={__CLIENT__ && document.querySelector('#toolbar .toolbar-actions')}
      >
        <>
          <div
            className={`review-state-text ${
              currentStateClass[currentStateKey]
                ? currentStateClass[currentStateKey]
                : ''
            }`}
          >
            {currentState.title}
          </div>
          <div>
            <button
              className="circle-right-btn"
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
        </>
      </Portal>
    </>
  );
};
export default ProgressWorkflow;
