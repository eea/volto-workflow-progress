import ProgressWorkflow from './ProgressWorkflow';
import { workflowProgress } from './reducers';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    workflowProgress,
  };

  config.settings.workflows = {
    ...config.settings.workflows,
    state_mapping: {
      publish: { value: 'public', label: 'Public', color: '#007bc1' },
      private: { value: 'private', label: 'Private', color: '#ed4033' },
      pending: { value: 'pending', label: 'Pending', color: '#f6a808' },
      send_back: { value: 'private', label: 'Private', color: '#ed4033' },
      retract: { value: 'retract', label: 'Retract', color: '#ed4033' },
      submit: { value: 'review', label: 'Review', color: '#f4e037' },
      retracted: {
        value: 'retracted',
        label: 'Retracted',
        color: '#ed4033',
      },
      published: {
        value: 'published',
        label: 'Published',
        color: '#007bc1',
      },
    },
  };

  const appExtras = config.settings.appExtras || [];

  config.settings.appExtras = [
    ...appExtras,
    {
      match: '',
      component: ProgressWorkflow,
    },
  ];

  return config;
};

export default applyConfig;
