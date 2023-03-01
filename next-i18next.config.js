const path = require('path');

module.exports = {
  i18n: {
    defaultNS: 'creator_common',
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localePath: path.resolve('./public/locales'),
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  serverLanguageDetection: true,
};
