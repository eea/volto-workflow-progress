import { WORKFLOW_PROGRESS } from '@eeacms/volto-workflow-progress/actionTypes';

/**
 * getGeonames function.
 * @function getGeonames
 * @param {url} url URL.
 * @returns {Object} Object.
 */
export function getWorkflowProgress(item) {
  return {
    type: WORKFLOW_PROGRESS,
    request: {
      op: 'get',
      path: `${item}/@workflow.progress`,
      headers: {
        Accept: 'application/json',
      },
    },
  };
}
