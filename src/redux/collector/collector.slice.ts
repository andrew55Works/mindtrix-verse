import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imagesDefaultState } from '../../components/navigation/top-navigation.component';
import { PURGE } from 'redux-persist';
import { initialWallet, Wallet } from '../../types/wallet.type';
import { CollectorProfile } from './collector.interface';

export interface CollectorProfileSliceState {
  collectorProfile: CollectorProfile;
}

export const initialCollectorState: CollectorProfileSliceState = {
  collectorProfile: {
    _id: null,
    email: undefined,
    images: imagesDefaultState,
    name: undefined,
    wallet: initialWallet,
    revenue: {
      flow: 0,
    },
    role: undefined,
  },
};

const updateCollectorProfileReducer: CaseReducer<
  CollectorProfileSliceState,
  PayloadAction<CollectorProfile>
> = (state, action) => {
  const collectorProfile = action?.payload ?? null;
  if (!collectorProfile) return state;
  return {
    ...state,
    collectorProfile: {
      ...state.collectorProfile,
      ...collectorProfile,
    },
  };
};

const updateCollectorWalletReducer: CaseReducer<
  CollectorProfileSliceState,
  PayloadAction<Wallet>
> = (state, action) => {
  const wallet = action?.payload ?? initialCollectorState.collectorProfile;
  if (!wallet) return state;
  return {
    ...state,
    collectorProfile: {
      ...state.collectorProfile,
      wallet,
    },
  };
};

const clearCreatorProfileReducer: CaseReducer<CollectorProfileSliceState> = (
  state,
) => ({
  ...state,
  collectorProfile: initialCollectorState.collectorProfile,
});

export const collecotSlice = createSlice({
  name: 'collector',
  initialState: initialCollectorState,
  reducers: {
    clearCreatorProfileReducer,
    updateCollectorProfileReducer,
    updateCollectorWalletReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.collectorProfile = initialCollectorState.collectorProfile;
    });
  },
});

export const {
  clearCreatorProfileReducer: clearCreatorProfileAction,
  updateCollectorProfileReducer: updateCollectorProfileAction,
  updateCollectorWalletReducer: updateCollectorWalletAction,
} = collecotSlice.actions;

export default collecotSlice.reducer;
