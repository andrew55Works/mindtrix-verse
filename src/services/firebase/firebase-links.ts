import axios, { AxiosRequestConfig } from 'axios';
import querystring, { ParsedUrlQueryInput } from 'querystring';
import { getFirebaseConfig } from '../../utils/config.web.utils';

export interface IApiErrorResponse<T = {}> {
  apiStatus: number | null;
  config: AxiosRequestConfig | null;
  data: T | null;
  error: object | null | string;
  // status 保留與 AxiosResponse 同樣key名稱，確保前端可一致調用
  status: number | null;
}

export interface IShortLinkWarning {
  warningCode: string;
  warningMessage: string;
}

export interface IShortLink {
  previewLink: string;
  shortLink: string;
  warning: Array<IShortLinkWarning>;
}

export const queryStringify = (obj: ParsedUrlQueryInput): string =>
  querystring.stringify(obj);

export const filterEmptyFromObj = (obj: any) => {
  if (!obj) return {};
  const resObj = {};
  Object.keys(obj).forEach((key) => {
    if (!!obj[key] || typeof obj[key] === 'boolean') {
      // @ts-ignore
      resObj[key] = obj[key];
    }
  });
  return resObj;
};

export const getShortLinkConfig = (longLink: string) => {
  const config = getFirebaseConfig();
  const firebaseConfig = {
    key: config.apiKey,
  };
  const linkURIEncoded = encodeURIComponent(longLink);

  const prefixLink = config.shortLinkPrefix;
  const shortLinksApiPath = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${
    firebaseConfig?.key ?? ''
  }`;
  const shortLinkConfig = {
    longDynamicLink: `${prefixLink}?link=${linkURIEncoded}`,
    suffix: {
      option: 'SHORT',
    },
  };
  return {
    firebaseConfig,
    shortLinkConfig,
    shortLinksApiPath,
  };
};

export const getShortLink = async (
  officialLink: string,
  query: any,
): Promise<IApiErrorResponse<IShortLink>> => {
  const queries = queryStringify(filterEmptyFromObj(query));
  const longLink = `${officialLink}${queries ? `?${queries}` : ''}`;
  const { shortLinkConfig: body, shortLinksApiPath } =
    getShortLinkConfig(longLink);

  return await axios.create().post(shortLinksApiPath, body);
};
