import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as IA from '../types/audio-segment.types';
import * as IO from '../types/oauth.types';
import * as IT from '../types/twitter.types';
import { getPanguApiDomain } from '../../utils/config.web.utils';

const panguApiDomain = getPanguApiDomain();
const baseQuery = fetchBaseQuery({
  baseUrl: panguApiDomain,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export const requestTwitterOauthTokenPath = 'oauth/twitter/request_token';

export const panGuApi = createApi({
  reducerPath: 'panGuApi',
  baseQuery,
  endpoints: (builder) => ({
    segmentAudio: builder.mutation<
      IA.SegmentAudioResVo,
      IA.SegmentAudioBodyDto
    >({
      query: (body) => {
        return {
          url: 'audio/segment',
          method: 'POST',
          body,
        };
      },
    }),
    uploadAudio: builder.mutation<any, IA.UploadSegmentAudioBodyDto>({
      query: (body) => {
        return {
          url: 'audio/segment/upload',
          method: 'POST',
          body,
        };
      },
    }),
    getTwitterUserProfile: builder.query<IT.TwitterUserProfile, void>({
      query: () => {
        return {
          url: 'oauth/twitter/users/profile',
          method: 'GET',
        };
      },
    }),
    getTwitterFriendships: builder.query<IT.GetTwitterFriendshipsRes, void>({
      query: () => {
        return {
          url: 'oauth/twitter/friendships/lookup',
          method: 'GET',
        };
      },
    }),
    postTwitterTweetInteractionAndGetDiscordRole: builder.mutation<
      IT.PostTwitterTweetInteractionRes,
      IT.PostTwitterTweetInteractionBody
    >({
      query: (body) => {
        return {
          url: 'oauth/twitter/tweet/lookup',
          method: 'POST',
          body,
        };
      },
    }),
    postTwitterOauthRequestToken: builder.mutation<
      IO.OauthRequestTokenRes,
      void
    >({
      query: (body) => {
        return {
          url: requestTwitterOauthTokenPath,
          method: 'POST',
          body,
        };
      },
    }),
    postTwitterClientAccessToken: builder.mutation<
      IO.OauthRequestTokenRes,
      IO.ClientAccessTokenBody
    >({
      query: (body) => {
        return {
          url: 'oauth/twitter/get_client_access_token',
          method: 'POST',
          body,
        };
      },
    }),
    postLogoutTwitter: builder.mutation<IO.LogoutTwitterRes, void>({
      query: (body) => {
        return {
          url: 'oauth/twitter/logout',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useSegmentAudioMutation,
  useUploadAudioMutation,
  useLazyGetTwitterUserProfileQuery,
  useLazyGetTwitterFriendshipsQuery,
  usePostTwitterTweetInteractionAndGetDiscordRoleMutation,
  usePostTwitterOauthRequestTokenMutation,
  usePostTwitterClientAccessTokenMutation,
  usePostLogoutTwitterMutation,
} = panGuApi;
