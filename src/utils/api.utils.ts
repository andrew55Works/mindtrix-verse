import * as fcl from '@onflow/fcl';
import { QueryOptions } from '@onflow/fcl';
import querystring, { ParsedUrlQueryInput } from 'querystring';

export const transformBodyFormRequest = (jsonData = {}) =>
  Object.entries(jsonData)
    // @ts-ignore
    .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');

export const queryStringify = (obj: ParsedUrlQueryInput): string =>
  querystring.stringify(obj);

export const getAllQueriesAsObj = (url: string) => {
  console.info('getAllQueriesAsObj url:', url);
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  const query_string = {};
  const queries = url.split('?');
  if (queries?.length < 2) return {};
  const vars = queries[1].split('&');

  let i = 0;
  for (i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    // If first entry with this name
    // @ts-ignore
    if (typeof query_string[pair[0]] === 'undefined') {
      // @ts-ignore
      query_string[pair[0]] = pair[1];
      // If second entry with this name
      // @ts-ignore
    } else if (typeof query_string[pair[0]] === 'string') {
      // @ts-ignore
      const arr = [query_string[pair[0]], pair[1]];
      // @ts-ignore
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      // @ts-ignore
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
};

export const objectToQueryStr = (obj: any) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

export type SafePromiseType<ResolveType, RejectType> = [
  { data: ResolveType },
  RejectType,
];

export const safeAwait = <ResolveType, RejectType>(
  promise: any,
  finallyFn: any,
): SafePromiseType<ResolveType, RejectType> => {
  return promise
    .then((data: any) => {
      if (data instanceof Error) {
        return [{ data: undefined }, data];
      }
      return [{ data }];
    })
    .catch((error: any) => {
      return [{ data: undefined }, error];
    })
    .finally(() => {
      if (finallyFn && typeof finallyFn === 'function') {
        finallyFn();
      }
    });
};

interface FCLSageAwaitQuery extends QueryOptions {
  finallyFn?: (...param: any) => any;
}

export const fclSafeAwait = {
  query: <ResolveType, RejectType = Error>({
    finallyFn,
    ...fclQueryOptions
  }: FCLSageAwaitQuery): SafePromiseType<ResolveType, RejectType> =>
    safeAwait(fcl.query(fclQueryOptions), finallyFn),
  mutation: <ResolveType, RejectType = Error>({
    finallyFn,
    ...fclQueryOptions
  }: FCLSageAwaitQuery): SafePromiseType<ResolveType, RejectType> =>
    safeAwait(fcl.mutate(fclQueryOptions), finallyFn),
};
