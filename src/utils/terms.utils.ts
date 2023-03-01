import { getBrowserLocaleCode } from './lang.utils';

export const TERMS = {
  getCreator: () => {
    const lang = getBrowserLocaleCode();
    return `https://www.mindtrix.xyz/${lang}/intent`;
  },
};
