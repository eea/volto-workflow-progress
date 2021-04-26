import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { useDispatch, useSelector } from 'react-redux';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
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
  const pusherRef = useRef(null);

  // set visible by clicking oustisde
  const setVisibleSide = (isVisible) => {
    setVisible(isVisible);
  };
  // toggle visible by clicking on the button
  const toggleVisibleSide = () => {
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

    const filterOutZeroStatesNotCurrent = (states) => {
      const firstFilter = states.filter(
        (state) => state[1] > 0 || state[0].indexOf(currentStateKey) > -1,
      );
      const result = firstFilter.map((state) => {
        const percent = state[1];
        if (percent === 0) {
          const indexOfCurrentSateKey = state[0].indexOf(currentStateKey);
          const keys = [state[0][indexOfCurrentSateKey]];
          const titles = [state[3][indexOfCurrentSateKey]];
          const nextState = [state[2][indexOfCurrentSateKey]];
          console.log({ indexOfCurrentSateKey });
          console.log([keys, percent, nextState, titles]);
          return [keys, percent, nextState, titles];
        }
        return state;
      });
      return result;
    };

    setIsToolbarOpen(!!hasToolbar);
    // filter out paths that don't have workflow (home, login, dexterity even if the content obj stays the same etc)
    if (
      content['@id'].indexOf(pathname) >= 0 &&
      pathname !== '/' && // wihout this there will be a flicker for going back to home ('/' in included in all api paths)
      workflowProgress?.result &&
      !workflowProgress.workflow?.error &&
      Array.isArray(workflowProgress?.result?.steps)
    ) {
      findCurrentState(
        workflowProgress.result.steps,
        workflowProgress.result.done,
      );
      setWorkflowProgressSteps(
        filterOutZeroStatesNotCurrent(workflowProgress.result.steps),
      );
    } else {
      setCurrentState(null); // reset current state only if a path without workflow is
      // chosen to avoid flicker for those that have workflow
    }
  }, [workflowProgress?.result]); // eslint-disable-line

  useEffect(() => {
    dispatch(getWorkflowProgress(content['@id'])); // the are paths that don't have workflow (home, login etc)
  }, [dispatch, pathname, content]);

  // on mount subscribe to mousedown to be able to close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pusherRef.current && doesNodeContainClick(pusherRef.current, e))
        return;

      setVisibleSide(false);
    };

    document.addEventListener('mousedown', handleClickOutside, false);
  }, []);

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
            <div ref={pusherRef}>
              <button
                className={`circle-right-btn ${
                  currentStateClass[currentStateKey]
                    ? `review-state-${currentStateKey}`
                    : currentState.done === 100
                    ? 'review-state-published'
                    : ''
                }`}
                id="toolbar-cut-blocks"
                onClick={toggleVisibleSide}
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
                  : currentState.done === 100
                  ? 'review-state-published'
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

ProgressWorkflow.propTypes = {
  pathname: PropTypes.string.isRequired,
  content: PropTypes.object,
};

export default ProgressWorkflow;
