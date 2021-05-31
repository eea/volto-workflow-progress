import { Pluggable } from '@plone/volto/components/manage/Pluggable';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { useDispatch, useSelector } from 'react-redux';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { getWorkflowProgress } from './actions';
import './less/editor.less';

import { getBaseUrl } from '@plone/volto/helpers';

/**
 * @summary The React component that shows progress tracking of selected content.
 */
const ProgressWorkflow = (props) => {
  const { content, pathname } = props;
  const currentStateKey = content?.review_state;
  const dispatch = useDispatch();
  const basePathname = getBaseUrl(pathname);
  const [visible, setVisible] = useState(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [workflowProgressSteps, setWorkflowProgressSteps] = useState([]);
  const [currentState, setCurrentState] = useState(null);
  const token = useSelector((state) => state?.userSession?.token);
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

  // apply all computing when the workflowProgress results come from the api
  useEffect(() => {
    const findCurrentState = (steps, done) => {
      const arrayContainingCurrentState = steps.find(
        (itemElements) => itemElements[1] === done,
      );
      const indexOfCurrentStateKey = arrayContainingCurrentState[0].indexOf(
        currentStateKey,
      );
      const title = arrayContainingCurrentState[2][indexOfCurrentStateKey];
      const description =
        arrayContainingCurrentState[3][indexOfCurrentStateKey];

      setCurrentState({
        done,
        title,
        description,
      });
    };
    const hasToolbar = document.querySelector('#toolbar .toolbar-actions');

    /**
     * remove states that are 0% unless if it is current state
     * @param {Object[]} states - array of arrays
     * @param {Object[]} states[0][0] - array of state keys (ex: [private, published])
     * @param {number} states[0][1] - percent
     * @param {Object[]} states[0][2] - array of state titles (ex: [Private, Published])
     * @param {Object[]} states[0][3] - array of state descriptions
     * @returns {Object[]} result - array of arrays, same structure but filtered
     */
    const filterOutZeroStatesNotCurrent = (states) => {
      const [firstState, ...rest] = states;

      const result =
        firstState[1] > 0 // there aren't any 0% states
          ? states // return all states
          : (() => {
              // there are 0% states
              const indexOfCurrentStateKey = firstState[0].indexOf(
                currentStateKey,
              );
              if (indexOfCurrentStateKey > -1) {
                const keys = [firstState[0][indexOfCurrentStateKey]];
                const titles = [firstState[2][indexOfCurrentStateKey]];
                const description = [firstState[3][indexOfCurrentStateKey]];

                return [[keys, 0, titles, description], ...rest]; // return only the current 0% state and test
              }
              return rest; // if current state in not a 0% return all rest
            })();

      return result;
    };

    setIsToolbarOpen(!!hasToolbar);
    const contentId = content?.['@id'];

    // filter out paths that don't have workflow (home, login, dexterity even if the content obj stays the same etc)
    if (
      contentId &&
      contentId.indexOf(basePathname) >= 0 &&
      basePathname !== '/' && // wihout this there will be a flicker for going back to home ('/' in included in all api paths)
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
  }, [workflowProgress?.result, currentStateKey]); // eslint-disable-line

  // get progress again if path or content changes
  useEffect(() => {
    if (token) {
      dispatch(getWorkflowProgress(basePathname));
    } // the are paths that don't have workflow (home, login etc) only if logged in
  }, [dispatch, pathname, basePathname, token, currentStateKey]);

  // on mount subscribe to mousedown to be able to close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pusherRef.current && doesNodeContainClick(pusherRef.current, e))
        return;

      setVisibleSide(false);
    };

    document.addEventListener('mousedown', handleClickOutside, false);
  }, []);

  const itemTracker = (tracker) => {
    const tracker_key_array = tracker[0];
    const is_active = tracker_key_array.indexOf(currentStateKey) > -1;
    const pluggable_params = { id: tracker_key_array[0] };

    return (
      <li
        key={`progress__item ${tracker_key_array}`}
        className={`progress__item ${
          is_active
            ? 'progress__item--active'
            : tracker[1] < currentState.done
            ? 'progress__item--completed'
            : 'progress__item--next'
        }`}
      >
        {tracker[2].map((title, index) => (
          <p
            key={`progress__title ${tracker_key_array}${index}`}
            className={`progress__title ${
              currentState.title !== title ? 'title-incomplete' : ''
            }`}
          >
            {title}
            {is_active && (
              <Pluggable
                name="active-workflow-progress"
                params={pluggable_params}
              />
            )}
          </p>
        ))}
      </li>
    );
  };

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
              <div className={`sidenav-ol ${!visible ? `is-hidden` : ''}`}>
                <ul className="progress">
                  {workflowProgressSteps.map((progressItem) =>
                    itemTracker(progressItem),
                  )}
                </ul>
              </div>
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
