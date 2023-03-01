import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatorProfile } from '../creator/creator.interface';
import { PURGE } from 'redux-persist';
import { initialWallet, Wallet } from '../../types/wallet.type';
import { imagesDefaultState } from '../../components/navigation/top-navigation.component';

export interface EmailVerificationInfo {
  email: string;
  is_verified_email: boolean;
  rss_link: string;
  verification_hash: string;
}
export const initialEmailVerificationInfo: EmailVerificationInfo = {
  verification_hash: '',
  is_verified_email: false,
  rss_link: '',
  email: '',
};
interface CreatorSignupProfile extends CreatorProfile {
  emailVerificationInfo: EmailVerificationInfo;
}
export interface CreatorSignupProfileSliceState {
  creatorSignupProfile: CreatorSignupProfile;
}

export const initialCreatorSignupState: CreatorSignupProfileSliceState = {
  creatorSignupProfile: {
    category: undefined,
    content_type: [],
    emailVerificationInfo: initialEmailVerificationInfo,
    description: undefined,
    link: undefined,
    create_date_time: 0,
    _id: null,
    images: imagesDefaultState,
    name: undefined,
    email: undefined,
    published_date_time: 0,
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

const updateCreatorSignupProfileReducer: CaseReducer<
  CreatorSignupProfileSliceState,
  PayloadAction<CreatorProfile>
> = (state, action) => {
  const creatorSignupProfile = action?.payload ?? null;
  if (!creatorSignupProfile) return state;
  return {
    ...state,
    creatorSignupProfile: {
      ...state.creatorSignupProfile,
      ...creatorSignupProfile,
      create_date_time: new Date(
        creatorSignupProfile.create_date_time,
      ).getTime(),
      update_date_time: new Date(
        creatorSignupProfile.update_date_time,
      ).getTime(),
      published_date_time: new Date(
        creatorSignupProfile.published_date_time,
      ).getTime(),
    },
  };
};

const updateCreatorSignupWalletReducer: CaseReducer<
  CreatorSignupProfileSliceState,
  PayloadAction<Wallet>
> = (state, action) => {
  const wallet =
    action?.payload ?? initialCreatorSignupState?.creatorSignupProfile?.wallet;
  if (!wallet) return state;
  return {
    ...state,
    creatorSignupProfile: {
      ...state.creatorSignupProfile,
      wallet,
    },
  };
};

const updateCreatorSignupEmailVerificationReducer: CaseReducer<
  CreatorSignupProfileSliceState,
  PayloadAction<EmailVerificationInfo>
> = (state, action) => {
  const emailVerificationInfo = action?.payload ?? initialEmailVerificationInfo;
  if (!emailVerificationInfo) return state;
  return {
    ...state,
    creatorSignupProfile: {
      ...state.creatorSignupProfile,
      emailVerificationInfo,
    },
  };
};

const clearCreatorSignupEmailVerificationReducer: CaseReducer<
  CreatorSignupProfileSliceState,
  PayloadAction<string>
> = (state, action) => {
  return {
    ...state,
    creatorSignupProfile: {
      ...state.creatorSignupProfile,
      emailVerificationInfo: initialEmailVerificationInfo,
    },
  };
};

const clearCreatorSignupProfileReducer: CaseReducer<CreatorSignupProfileSliceState> =
  (state) => ({
    ...state,
    creatorSignupProfile: initialCreatorSignupState.creatorSignupProfile,
  });

export const creatorSignupSlice = createSlice({
  name: 'creator-signup',
  initialState: initialCreatorSignupState,
  reducers: {
    clearCreatorSignupProfileReducer,
    updateCreatorSignupProfileReducer,
    updateCreatorSignupWalletReducer,
    updateCreatorSignupEmailVerificationReducer,
    clearCreatorSignupEmailVerificationReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.creatorSignupProfile =
        initialCreatorSignupState.creatorSignupProfile;
    });
  },
});

export const {
  clearCreatorSignupProfileReducer: clearCreatorSignupProfileAction,
  updateCreatorSignupProfileReducer: updateCreatorSignupProfileAction,
  updateCreatorSignupWalletReducer: updateCreatorSignupWalletAction,
  updateCreatorSignupEmailVerificationReducer:
    updateCreatorSignupEmailVerificationAction,
  clearCreatorSignupEmailVerificationReducer:
    clearCreatorSignupEmailVerificationAction,
} = creatorSignupSlice.actions;

export default creatorSignupSlice.reducer;
