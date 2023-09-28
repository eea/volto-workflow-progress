import { getWorkflowProgress } from './index';

describe('getWorkflowProgress', () => {
  const item = 'https://demo.plone.org';

  it('returns the correct action object', () => {
    const action = getWorkflowProgress(item);
    expect(action).toEqual({
      type: 'WORKFLOW_PROGRESS',
      request: {
        op: 'get',
        path: `${item}/@workflow.progress`,
        headers: {
          Accept: 'application/json',
        },
      },
    });
  });
});
