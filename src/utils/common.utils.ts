import { Platform } from 'react-native';

export const serializeObjectToQueryString = (obj: { [key: string]: any }) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(p + '=' + obj[p]);
    }
  }
  return str.join('&');
};

export const checkIsiOSPlatform = () => {
  return Platform.OS === 'ios';
};

const getMobileOS = () => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) {
    return 'Android';
  } else if (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) {
    return 'iOS';
  }
  return 'Other';
};

export const isIOS = () => {
  const mobile = getMobileOS();
  return mobile === 'iOS';
};
