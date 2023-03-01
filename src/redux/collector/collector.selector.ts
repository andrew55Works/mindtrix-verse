import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';

const selectedState = (state: RootState) =>
  state.encryptedSessionStorage.collectorSlice;

export const selectCollectorProfile = createSelector(
  [selectedState],
  (collectorSlice) => collectorSlice.collectorProfile,
);

export const selectCollectorAddress = createSelector(
  [selectedState],
  (collectorSlice) =>
    collectorSlice?.collectorProfile?.wallet?.blocto?.address ?? '',
);

export const selectIsWalletConnected = createSelector(
  [selectedState],
  (collectorSlice) => {
    return collectorSlice?.collectorProfile?.wallet?.blocto?.loggedIn ?? false;
  },
);

export const selectIsCollectorSignIn = createSelector(
  [selectedState],
  (collectorSlice) => {
    const creator = collectorSlice?.collectorProfile ?? null;
    const isConnectedWallet = creator?.wallet?.blocto?.loggedIn ?? false;
    const isWalletExist = !!(creator?.wallet?.blocto?.address ?? null);
    // const isSignedInMindtrix = !!(creator?._id ?? null);
    // return isConnectedWallet && isWalletExist && isSignedInMindtrix;
    return isConnectedWallet && isWalletExist;
  },
);
