// ✓ ca nu crapa la obiect gol
// daca vine cum trebuie vedem procent, titlu, sidebar progress tracker
// ca nu face nimic daca nu e pe ce ruta trebuie
// ca nu face nimic daca nu e logat userul
// ca nu face nimic daca nu exista toolbar

import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ProgressWorkflow from './ProgressWorkflow';

const mockStore = configureStore();
const props = {
  content: {
    '@id': 'http://localhost:3000/api/',
    review_state: 'pending',
  },
  pathname: '/',
};
const propsEmpty = {};

describe('ProgressWorkflow', () => {
  it('renders the ProgressWorkflow component without breaking if props and workflow are empty', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      workflowProgress: {},
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ProgressWorkflow
            pathname="/test"
            {...propsEmpty}
            hasToolbar={true}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders the ProgressWorkflow component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      workflowProgress: {
        '@id': 'http://localhost:3000/api/my-page/@workflow.progress',
        done: 50,
        steps: [
          [
            ['private'],
            25,
            ['Private'],
            ['Can only be seen and edited by the owner.'],
          ],
          [
            ['pending'],
            50,
            ['Pending review'],
            ['Waiting to be reviewed, not editable by the owner.'],
          ],
          [
            ['review_one', 'review_two', 'review_three', 'review_four'],
            75,
            [
              'Review One: Technical',
              'Review two: Head of Technical',
              'Review three: Head of Department',
              'Review Four: CTO',
            ],
            [
              'Review One: Technical',
              'Review by Head of Tech Depart',
              'Review by Head of Department',
              'Review by CTO',
            ],
          ],
          [
            ['published', 'visible'],
            100,
            ['Published', 'Public draft'],
            [
              'Visible to everyone, not editable by the owner.',
              'Visible to everyone, but not approved by the reviewers.',
            ],
          ],
        ],
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ProgressWorkflow pathname="/test" {...props} hasToolbar={true} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders the ProgressWorkflow component with Percent showing correct value', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      workflowProgress: {
        '@id': 'http://localhost:3000/api/my-page/@workflow.progress',
        done: 50,
        steps: [
          [
            ['private'],
            25,
            ['Private'],
            ['Can only be seen and edited by the owner.'],
          ],
          [
            ['pending'],
            50,
            ['Pending review'],
            ['Waiting to be reviewed, not editable by the owner.'],
          ],
          [
            ['review_one', 'review_two', 'review_three', 'review_four'],
            75,
            [
              'Review One: Technical',
              'Review two: Head of Technical',
              'Review three: Head of Department',
              'Review Four: CTO',
            ],
            [
              'Review One: Technical',
              'Review by Head of Tech Depart',
              'Review by Head of Department',
              'Review by CTO',
            ],
          ],
          [
            ['published', 'visible'],
            100,
            ['Published', 'Public draft'],
            [
              'Visible to everyone, not editable by the owner.',
              'Visible to everyone, but not approved by the reviewers.',
            ],
          ],
        ],
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ProgressWorkflow pathname="/test" {...props} hasToolbar={true} />
        </MemoryRouter>
      </Provider>,
    );

    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
