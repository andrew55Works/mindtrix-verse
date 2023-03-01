import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatorProfile } from './creator.interface';
import { imagesDefaultState } from '../../components/navigation/top-navigation.component';
import { PURGE } from 'redux-persist';
import { Show, showDefaultState } from '../show/show.interface';
import { initialWallet, Wallet } from '../../types/wallet.type';
import { Episode } from '../../api/types/episode.types';
import _get from 'lodash.get';

export interface CreatorProfileSliceState {
  creatorProfile: CreatorProfile;
}

export const initialCreatorState: CreatorProfileSliceState = {
  creatorProfile: {
    category: undefined,
    creator_name: '',
    content_type: [],
    description: undefined,
    link: undefined,
    create_date_time: 0,
    _id: null,
    // 2022/10/19
    issue_end_date: 0,
    // 2023/01/19
    issue_start_date: 0,
    images: imagesDefaultState,
    name: undefined,
    email: undefined,
    published_date_time: 0,
    role: undefined,
    rss_generator: undefined,
    rss_link: undefined,
    update_date_time: 0,
    shows: undefined,
    wallet: initialWallet,
    show_guid: '',
    show_guids: [],
    revenue: {
      flow: 0,
    },
  },
};

const updateCreatorProfileReducer: CaseReducer<
  CreatorProfileSliceState,
  PayloadAction<CreatorProfile>
> = (state, action) => {
  const creatorProfile = action?.payload ?? null;
  if (!creatorProfile) return state;
  return {
    ...state,
    creatorProfile: {
      ...state.creatorProfile,
      ...creatorProfile,
      create_date_time: new Date(creatorProfile.create_date_time)
        .getTime()
        .toString(),
      update_date_time: new Date(creatorProfile.update_date_time).getTime(),
      published_date_time: new Date(
        creatorProfile.published_date_time,
      ).getTime(),
    },
  };
};

const updateCreatorWalletReducer: CaseReducer<
  CreatorProfileSliceState,
  PayloadAction<Wallet>
> = (state, action) => {
  const wallet = action?.payload ?? initialCreatorState.creatorProfile;
  if (!wallet) return state;
  return {
    ...state,
    creatorProfile: {
      ...state.creatorProfile,
      wallet,
    },
  };
};

const updateCreatorShowsReducer: CaseReducer<
  CreatorProfileSliceState,
  PayloadAction<Show>
> = (state, action) => {
  const shows = action?.payload ?? showDefaultState;
  const show_guid = shows?.show_guid ?? '';
  if (!shows) return state;
  const orgShow = _get(state, ['creatorProfile', 'shows', show_guid]);
  return {
    ...state,
    creatorProfile: {
      ...state.creatorProfile,
      shows: {
        ...state.creatorProfile.shows,
        [show_guid]: {
          ...orgShow,
          ...shows,
        },
      },
    },
  };
};

const updateCreatorEpisodesReducer: CaseReducer<
  CreatorProfileSliceState,
  PayloadAction<{
    episodes: Array<Episode>;
    show_guid: string;
  }>
> = (state, action) => {
  const show_guid = action?.payload?.show_guid ?? null;
  const episodes = action?.payload?.episodes ?? null;
  if (!episodes || !show_guid) return state;

  const episodeObj = episodes.reduce(
    (prev, episode) => ({
      ...prev,
      [episode.episode_guid]: episode,
    }),
    {},
  );

  const orgShow = _get(state, ['creatorProfile', 'shows', show_guid]);
  return {
    ...state,
    creatorProfile: {
      ...state.creatorProfile,
      shows: {
        ...state.creatorProfile.shows,
        [show_guid]: {
          ...orgShow,
          // override whole episodes obj cuz episodes might be deleted
          episodes: episodeObj,
        },
      },
    },
  };
};

const clearCreatorProfileReducer: CaseReducer<CreatorProfileSliceState> = (
  state,
) => ({
  ...state,
  creatorProfile: initialCreatorState.creatorProfile,
});

export const creatorSlice = createSlice({
  name: 'creator',
  initialState: initialCreatorState,
  reducers: {
    clearCreatorProfileReducer,
    updateCreatorProfileReducer,
    updateCreatorWalletReducer,
    updateCreatorShowsReducer,
    updateCreatorEpisodesReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.creatorProfile = initialCreatorState.creatorProfile;
    });
  },
});

export const {
  clearCreatorProfileReducer: clearCreatorProfileAction,
  updateCreatorProfileReducer: updateCreatorProfileAction,
  updateCreatorWalletReducer: updateCreatorWalletAction,
  updateCreatorShowsReducer: updateCreatorShowsAction,
  updateCreatorEpisodesReducer: updateCreatorEpisodeAction,
} = creatorSlice.actions;

export const { getInitialState: getCreatorSliceInitialState } = creatorSlice;

export default creatorSlice.reducer;
