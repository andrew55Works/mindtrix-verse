import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';

const selectedState = (state: RootState) =>
  state.encryptedSessionStorage.preferenceSlice;

export const selectCurrency = createSelector(
  [selectedState],
  (preferenceSlice) => preferenceSlice.currency,
);

export const selectDisplayCurrency = createSelector(
  [selectedState],
  (preferenceSlice) => preferenceSlice.currency.displayCurrency,
);

export const selectExchange = createSelector(
  [selectedState],
  (preferenceSlice) => preferenceSlice.currency.exchange,
);
