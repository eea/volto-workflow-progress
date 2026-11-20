import { workflowProgress } from './index';

describe('workflowProgress reducer', () => {
  const initialState = {
    get: {
      loaded: false,
      loading: false,
      error: null,
    },
  };

  it('handles WORKFLOW_PROGRESS_PENDING action', () => {
    const action = { type: 'WORKFLOW_PROGRESS_PENDING' };
    const newState = workflowProgress(initialState, action);
    expect(newState).toMatchObject({
      get: {
        loading: true,
        loaded: false,
        error: null,
      },
    });
  });

  it('handles WORKFLOW_PROGRESS_SUCCESS action', () => {
    const action = {
      type: 'WORKFLOW_PROGRESS_SUCCESS',
      result: { someData: 'data' },
    };
    const newState = workflowProgress(initialState, action);
    expect(newState).toMatchObject({
      get: {
        loading: false,
        loaded: true,
        error: null,
      },
      result: { someData: 'data' },
    });
  });

  it('handles WORKFLOW_PROGRESS_FAIL action', () => {
    const action = {
      type: 'WORKFLOW_PROGRESS_FAIL',
      error: 'Some error message',
    };
    const newState = workflowProgress(initialState, action);
    expect(newState).toMatchObject({
      get: {
        loading: false,
        loaded: false,
        error: 'Some error message',
      },
    });
  });

  it('returns the initial state when given an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = workflowProgress(initialState, action);
    expect(newState).toMatchObject(initialState);
  });
});
