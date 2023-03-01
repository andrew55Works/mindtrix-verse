import Config from 'react-native-config';

export const getGoogleAuthClientIds = () => ({
  webClientId: Config?.GOOGLE_AUTH_WEB_CLIENT_ID ?? '',
  iosClientId: Config?.GOOGLE_AUTH_IOS_CLIENT_ID ?? '',
});
