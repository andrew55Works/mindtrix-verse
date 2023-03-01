export const getBrowserLocaleCode = (defaultLocale = 'en') => {
  try {
    // @ts-ignore
    const browserLang = navigator.language || navigator.userLanguage;
    const arr = browserLang.split('-');
    return arr && (arr?.length ?? 0) > 0
      ? arr[0]?.toLowerCase() ?? defaultLocale
      : defaultLocale;
  } catch (e) {
    console.error('getBrowserLocaleCode error:', e);
    return 'en';
  }
};

export const getISO31661Code = () => {
  try {
    // @ts-ignore
    const browserLang = navigator.language || navigator.userLanguage;
    const arr = browserLang.split('-');
    const isCountryCodeExist = arr.length > 1;
    return isCountryCodeExist ? arr[1].toLowerCase() : '';
  } catch (e) {
    return '';
  }
};
