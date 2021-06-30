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
  if (url) {
    const key = last(split(url, '/'));
    if (key in mapping) {
      return { ...mapping[key], url };
    }

    return { value: key, label: current || key, color: '#000', url };
  }

  if (current in mapping) {
    return { ...mapping[current], url };
  }

  return { value: current, label: current, color: '#000', url };
}
