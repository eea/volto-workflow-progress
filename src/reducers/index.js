/**
 * Data Figure reducer.
 * @module reducers/workflowProgress
 */

import { WORKFLOW_PROGRESS } from '@eeacms/volto-workflow-progress/actionTypes';

const initialState = {
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  subrequests: {},
};

/**
 * Get request key
 * @function getRequestKey
 * @param {string} actionType Action type.
 * @returns {string} Request key.
 */
function getRequestKey(actionType) {
  return actionType.split('_')[0].toLowerCase();
}

/**
 * Data figure reducer.
 * @function workflowProgress
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export function workflowProgress(state = initialState, action = {}) {
  let { result } = action;
  switch (action.type) {
    case `${WORKFLOW_PROGRESS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${WORKFLOW_PROGRESS}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        result,
      };
    case `${WORKFLOW_PROGRESS}_FAIL`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
