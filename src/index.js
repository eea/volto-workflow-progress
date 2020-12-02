import ProgressWorkflow from './ProgressWorkflow';
import { workflowProgress } from './reducers';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    workflowProgress,
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
