/**
 * Layouts.
 * @module constants/Workflows
 */

import { last, split } from 'lodash';
import config from '@plone/volto/registry';

export default function getWorkflowMapping(url, current) {
  const mapping = {
    ...config?.settings?.workflows?.state_mapping,
  };
  mapping['url'] = url;
  if (url) {
    const key = last(split(url, '/'));
    if (key in mapping) {
      return mapping[key];
    }

    return { value: key, label: current || key, color: '#000', url };
  }

  if (current in mapping) {
    return mapping[current];
  }

  return { value: current, label: current, color: '#000', url };
}
