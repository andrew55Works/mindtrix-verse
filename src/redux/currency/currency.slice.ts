import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { CurrencyVo } from '../../api/types/currency.types';

type CurrencyObj = { [code: string]: CurrencyVo };
export interface CurrencySliceState {
  currencyObj: CurrencyObj;
  updatedTime: number;
}

export const initialCurrencyState = {
  currencyObj: {},
  updatedTime: 0,
};

const updateCurrencyReducer: CaseReducer<
  CurrencySliceState,
  PayloadAction<Array<CurrencyVo>>
> = (state, action) => {
  const currencies = action?.payload ?? [];
  if (!currencies || (currencies?.length ?? 0) < 1) return state;
  const currencyObj: CurrencyObj = {};
  currencies.forEach((c) => {
    const code = c?.code ?? '';
    currencyObj[code] = c;
  });

  return {
    ...state,
    currency: {
      ...state.currencyObj,
      ...currencyObj,
    },
    updatedTime: new Date(Date.now()).getTime(),
  };
};

const clearCurrencyReducer: CaseReducer<CurrencySliceState> = (state) =>
  initialCurrencyState;

export const currencySlice = createSlice({
  name: 'currency',
  initialState: initialCurrencyState,
  reducers: {
    clearCurrencyReducer,
    updateCurrencyReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.currencyObj = initialCurrencyState.currencyObj;
    });
  },
});

export const {
  clearCurrencyReducer: clearCurrencyAction,
  updateCurrencyReducer: updateCurrencyAction,
} = currencySlice.actions;

export const { getInitialState: getCreatorSliceInitialState } = currencySlice;

export default currencySlice.reducer;
