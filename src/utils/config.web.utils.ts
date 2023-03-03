import getConfig from 'next/config';

export const getGoogleAnalyticMeasurementId = () =>
  getConfig()?.publicRuntimeConfig?.GOOGLE_ANALYTICS_MEASUREMENT_ID ?? '';

export const getGoogleTagManagerId = () =>
  getConfig()?.publicRuntimeConfig?.GOOGLE_TAG_MANAGER_ID ?? '';

export const getNftApiKey = () =>
  getConfig()?.publicRuntimeConfig?.NFT_STORAGE_API_KEY ?? '';

export const getPanguApiDomain = () =>
  getConfig()?.publicRuntimeConfig?.PANGU_API_DOMAIN ?? '';

export const getFrontendMindtrixWebDomain = () =>
  getConfig()?.publicRuntimeConfig?.FRONT_END_MINDTRIX_WEB_DOMAIN ?? '';

export const getCookieDomain = () =>
  getConfig()?.publicRuntimeConfig?.FRONT_END_MINDTRIX_COOKIE_DOMAIN ?? '';

export const getSites = () => ({
  mindtrixOfficialHome:
    getConfig()?.publicRuntimeConfig?.SITE_MINDTRIX_HOME ?? '',
});

export const getRootDomain = () => ({
  rootDomain: getConfig()?.publicRuntimeConfig?.ROOT_DOMAIN ?? '',
});

export const getSpotifyConfig = () => {
  return {
    clientId: getConfig()?.serverRuntimeConfig?.SPOTIFY.CLIENT_ID ?? '',
    clientSecret: getConfig()?.serverRuntimeConfig?.SPOTIFY.CLIENT_SECRET ?? '',
    redirectUrl: getConfig()?.serverRuntimeConfig?.SPOTIFY.REDIRECT_URL ?? '',
  };
};

export const getFirebaseConfig = () => {
  return {
    apiKey: getConfig()?.publicRuntimeConfig?.WEB_FIREBASE_API_KEY,
    authDomain: getConfig()?.publicRuntimeConfig?.WEB_FIREBASE_AUTH_DOMAIN,
    projectId: getConfig()?.publicRuntimeConfig?.WEB_FIREBASE_PROJECT_ID,
    storageBucket:
      getConfig()?.publicRuntimeConfig?.WEB_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
      getConfig()?.publicRuntimeConfig?.WEB_FIREBASE_MESSAGING_SENDER_ID,
    appId: getConfig()?.publicRuntimeConfig?.WEB_FIREBASE_APP_ID,
    measurementId:
      getConfig()?.publicRuntimeConfig?.WEB_FIREBASE_MEASUREMENT_ID,
    shortLinkPrefix:
      getConfig()?.publicRuntimeConfig?.WEB_FIREBASE_SHORT_LINK_PREFIX,
  };
};

export const getImageCompressor = () => {
  return {
    IMG_COMPRESSOR_URL: getConfig()?.publicRuntimeConfig?.IMG_COMPRESSOR_URL,
  };
};

export const getFlowEnv = () => {
  const pubConfig = getConfig()?.publicRuntimeConfig ?? null;
  return {
    FLOW_ENV: pubConfig.FLOW_ENV,
    FLOW_ACCESS_API_URL: pubConfig.FLOW_ACCESS_API_URL,
    WALLET_DISCOVERY: pubConfig.WALLET_DISCOVERY,
    DAPPER_WALLET_DISCOVERY: pubConfig.DAPPER_WALLET_DISCOVERY,
    DAPPER_WALLET_DISCOVERY_METHOD: pubConfig.DAPPER_WALLET_DISCOVERY_METHOD,
    DAPPER_WALLET_AUTHN_ADDRESS: pubConfig.DAPPER_WALLET_AUTHN_ADDRESS,
    FLOW_SCAN_DOMAIN: pubConfig.FLOW_SCAN_DOMAIN,
  };
};

export const getFlowCadenceContractAddress = () => {
  const pubConfig = getConfig()?.publicRuntimeConfig ?? null;
  return {
    FUNGIBLE_TOKEN_ADDRESS: pubConfig.FUNGIBLE_TOKEN_ADDRESS,
    NON_FUNGIBLE_TOKEN_ADDRESS: pubConfig.NON_FUNGIBLE_TOKEN_ADDRESS,
    METADATA_VIEWS_ADDRESS: pubConfig.METADATA_VIEWS_ADDRESS,
    CHILD_ACCOUNT_ADDRESS: pubConfig.CHILD_ACCOUNT_ADDRESS,
    FUSD_TOKEN_ADDRESS: pubConfig.FUSD_TOKEN_ADDRESS,
    FIAT_TOKEN_ADDRESS: pubConfig.FIAT_TOKEN_ADDRESS,
    FLOW_TOKEN_ADDRESS: pubConfig.FLOW_TOKEN_ADDRESS,
    TOKEN_FORWARDING_ADDRESS: pubConfig.TOKEN_FORWARDING_ADDRESS,
    DAPPER_WALLET_AUTHN_ADDRESS: pubConfig.DAPPER_WALLET_AUTHN_ADDRESS,
    MINDTRIX_NFT_ADDRESS: pubConfig.MINDTRIX_NFT_ADDRESS,
    MINDTRIX_ESSENCE_ADDRESS: pubConfig.MINDTRIX_ESSENCE_ADDRESS,
    MINDTRIX_NFT_VERIFIER: pubConfig.MINDTRIX_NFT_VERIFIER,
    MINDTRIX_MARKETPLACE_ADDRESS: pubConfig.MINDTRIX_MARKETPLACE_ADDRESS,
  };
};

export const getIPFS = () => {
  const pubConfig = getConfig()?.publicRuntimeConfig ?? null;
  return {
    IPFS_INFURA_PROJECT_ID: pubConfig.IPFS_INFURA_PROJECT_ID,
    IPFS_INFURA_PROJECT_SECRET: pubConfig.IPFS_INFURA_PROJECT_SECRET,
    IPFS_INFURA_DEDICATED_GATEWAY: pubConfig.IPFS_INFURA_DEDICATED_GATEWAY,
  };
};

export const getWeb3Storage = () => {
  const pubConfig = getConfig()?.publicRuntimeConfig ?? null;
  return {
    IPFS_WEB3_STORAGE_API_TOKEN: pubConfig.IPFS_WEB3_STORAGE_API_TOKEN,
  };
};

export const getDapperMerchantAddress = () => {
  const pubConfig = getConfig()?.publicRuntimeConfig ?? null;
  return pubConfig.DAPPER_MERCHANT_ADDRESS;
};
