import cloneDeep from 'lodash.clonedeep';
import get from 'lodash.get';

export const _cloneDeep = (obj: any) => cloneDeep(obj);
export const _get = <T>(
  obj: any,
  selectors: string | Array<string>,
  defaultState: any,
): T => get(obj, selectors, defaultState);
