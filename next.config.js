const { i18n } = require('./next-i18next.config');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@ui-kitten/components',
  'react-native-svg',
  'react-native-svg-transformer',
  'react-native',
  'styled-components',
  'styled-components/native',
]);

const runtimeConfig = {
  serverRuntimeConfig: {
    SPOTIFY: {
      CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
      REDIRECT_URL: process.env.SPOTIFY_REDIRECT_URL,
    },
  },
  publicRuntimeConfig: {
    VERSION: process.env.VERSION,
    ENV: process.env.ENV,
    GOOGLE_ANALYTICS_MEASUREMENT_ID:
      process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    NFT_STORAGE_API_KEY: process.env.NFT_STORAGE_API_KEY,
    PANGU_API_DOMAIN: process.env.PANGU_API_DOMAIN,
    ROOT_DOMAIN: process.env.ROOT_DOMAIN,
    SITE_MINDTRIX_HOME: process.env.SITE_MINDTRIX_HOME,
    FRONT_END_MINDTRIX_COOKIE_DOMAIN:
      process.env.FRONT_END_MINDTRIX_COOKIE_DOMAIN,
    FRONT_END_MINDTRIX_WEB_DOMAIN: process.env.FRONT_END_MINDTRIX_WEB_DOMAIN,
    WEB_FIREBASE_API_KEY: process.env.WEB_FIREBASE_API_KEY,
    WEB_FIREBASE_AUTH_DOMAIN: process.env.WEB_FIREBASE_AUTH_DOMAIN,
    WEB_FIREBASE_PROJECT_ID: process.env.WEB_FIREBASE_PROJECT_ID,
    WEB_FIREBASE_STORAGE_BUCKET: process.env.WEB_FIREBASE_STORAGE_BUCKET,
    WEB_FIREBASE_MESSAGING_SENDER_ID:
      process.env.WEB_FIREBASE_MESSAGING_SENDER_ID,
    WEB_FIREBASE_APP_ID: process.env.WEB_FIREBASE_APP_ID,
    WEB_FIREBASE_MEASUREMENT_ID: process.env.WEB_FIREBASE_MEASUREMENT_ID,
    WEB_FIREBASE_SHORT_LINK_PREFIX: process.env.WEB_FIREBASE_SHORT_LINK_PREFIX,
    IMG_COMPRESSOR_URL: process.env.IMG_COMPRESSOR_URL,
    FLOW_ENV: process.env.FLOW_ENV,
    FLOW_ACCESS_API_URL: process.env.FLOW_ACCESS_API_URL,
    WALLET_DISCOVERY: process.env.WALLET_DISCOVERY,
    FUNGIBLE_TOKEN_ADDRESS: process.env.FUNGIBLE_TOKEN_ADDRESS,
    NON_FUNGIBLE_TOKEN_ADDRESS: process.env.NON_FUNGIBLE_TOKEN_ADDRESS,
    METADATA_VIEWS_ADDRESS: process.env.METADATA_VIEWS_ADDRESS,
    CHILD_ACCOUNT_ADDRESS: process.env.CHILD_ACCOUNT_ADDRESS,
    FUSD_TOKEN_ADDRESS: process.env.FUSD_TOKEN_ADDRESS,
    FIAT_TOKEN_ADDRESS: process.env.FIAT_TOKEN_ADDRESS,
    FLOW_TOKEN_ADDRESS: process.env.FLOW_TOKEN_ADDRESS,
    TOKEN_FORWARDING_ADDRESS: process.env.TOKEN_FORWARDING_ADDRESS,
    MINDTRIX_NFT_ADDRESS: process.env.MINDTRIX_NFT_ADDRESS,
    MINDTRIX_ESSENCE_ADDRESS: process.env.MINDTRIX_ESSENCE_ADDRESS,
    MINDTRIX_NFT_VERIFIER: process.env.MINDTRIX_NFT_VERIFIER,
    MINDTRIX_MARKETPLACE_ADDRESS: process.env.MINDTRIX_MARKETPLACE_ADDRESS,
    DAPPER_MERCHANT_ADDRESS: process.env.DAPPER_MERCHANT_ADDRESS,
    IPFS_INFURA_PROJECT_ID: process.env.IPFS_INFURA_PROJECT_ID,
    IPFS_INFURA_PROJECT_SECRET: process.env.IPFS_INFURA_PROJECT_SECRET,
    IPFS_INFURA_DEDICATED_GATEWAY: process.env.IPFS_INFURA_DEDICATED_GATEWAY,
    IPFS_WEB3_STORAGE_API_TOKEN: process.env.IPFS_WEB3_STORAGE_API_TOKEN,
    DAPPER_WALLET_DISCOVERY: process.env.DAPPER_WALLET_DISCOVERY,
    DAPPER_WALLET_DISCOVERY_METHOD: process.env.DAPPER_WALLET_DISCOVERY_METHOD,
    DAPPER_WALLET_AUTHN_ADDRESS: process.env.DAPPER_WALLET_AUTHN_ADDRESS,
    FLOW_SCAN_DOMAIN: process.env.FLOW_SCAN_DOMAIN,
    V2R_POAP_ESSENCE_ID: process.env.V2R_POAP_ESSENCE_ID,
  },
};

module.exports = withPlugins([withTM], {
  i18n,
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      '.ts',
      '.tsx',
      '.web.js',
      '.web.jsx',
      '.js',
      '.jsx',
      ...config.resolve.extensions,
    ];
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.cdc/,
      type: 'asset/source',
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'alpha-app.mindtrix.xyz',
      'app.mindtrix.xyz',
      'd3mww1g1pfq2pt.cloudfront.net',
      'firebasestorage.googleapis.com',
      'infura-ipfs.io',
      'storage.buzzsprout.com',
      'd3t3ozftmdmh3i.cloudfront.net',
      'megaphone.imgix.net',
      'files.soundon.fm',
      'ipfs.infura.io',
    ],
  },
  ...runtimeConfig,
});
