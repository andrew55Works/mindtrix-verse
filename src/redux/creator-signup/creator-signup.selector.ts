import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';
import {
  initialCreatorSignupState,
  initialEmailVerificationInfo,
} from './creator-signup.slice';

const selectedState = (state: RootState) =>
  state.encryptedLocalStorage.creatorSignupSlice;

export const selectCreatorSignupProfile = createSelector(
  [selectedState],
  (creatorSignupSlice) =>
    creatorSignupSlice?.creatorSignupProfile ?? initialCreatorSignupState,
);

export const selectCreatorSignupAddress = createSelector(
  [selectedState],
  (creatorSignupSlice) =>
    creatorSignupSlice?.creatorSignupProfile?.wallet?.blocto?.address ?? '',
);

export const selectCreatorEmailVerificationInfo = createSelector(
  [selectedState],
  (creatorSignupSlice) =>
    creatorSignupSlice?.creatorSignupProfile?.emailVerificationInfo ??
    initialEmailVerificationInfo,
);
