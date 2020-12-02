import ProgressWorkflow from './ProgressWorkflow';
import { workflowProgress } from './reducers';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    workflowProgress,
  };

  config.settings = {
    ...config.settings,
    appExtras: [
      ...config.appExtras,
      {
        match: '',
        component: ProgressWorkflow,
      },
    ],
  };

  return config;
};

export default applyConfig;
