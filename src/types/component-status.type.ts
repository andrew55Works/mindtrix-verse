export enum STATUS_ENUM {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface IStatus {
  status: STATUS_ENUM;
}
