import { createSelector } from 'reselect';
import { _get } from '../../utils/lodash.utils';
import { RootState } from '../root.reducer';
import { CurrencyVo } from '../../api/types/currency.types';

const selectedState = (state: RootState) =>
  state.encryptedSessionStorage.currencySlice;

export const selectCurrencyObj = createSelector(
  [selectedState],
  (currencySlice) => currencySlice.currencyObj,
);

// re-sync if the last updated time is over one hour.
export const selectIsNeedToUpdate = createSelector(
  [selectedState],
  (currencySlice) => {
    const lastUpdatedTime = currencySlice?.updatedTime ?? 0;
    const currentTime = new Date(Date.now()).getTime();
    const diffTimestamp = lastUpdatedTime ? lastUpdatedTime - currentTime : 0;
    // if the updatedTime is default 0, force update.
    const diffHour = diffTimestamp ? diffTimestamp / 1000 / 60 / 60 : 1;
    return diffHour >= 1;
  },
);

export const selectCurrencyByCode = createSelector(
  [selectedState, (state, code: string) => code],
  (currencySlice, code) => {
    return _get(currencySlice, ['currencyObj', code], null) as CurrencyVo;
  },
);
