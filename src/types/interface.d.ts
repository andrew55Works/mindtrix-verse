import { ReactElement } from 'react';

export interface PageLayout {
  getLayout: (page: ReactElement) => ReactElement;
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}
