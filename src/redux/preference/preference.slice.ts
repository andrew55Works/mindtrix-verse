import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import {
  CurrencyEnum,
  CurrencyPreference,
  Exchange,
} from './preference.interface';

export interface PreferenceSliceState {
  currency: CurrencyPreference;
}

const initialState: PreferenceSliceState = {
  currency: {
    displayCurrency: CurrencyEnum.USD,
    exchange: {
      flow: {
        twd: 0,
        usd: 0,
      },
    },
  },
};

const updateDisplayCurrencyPreferenceReducer: CaseReducer<
  PreferenceSliceState,
  PayloadAction<CurrencyEnum>
> = (state, action) => {
  const displayCurrency = action?.payload ?? null;
  if (!displayCurrency) return state;
  return {
    ...state,
    currency: {
      ...state.currency,
      displayCurrency,
    },
  };
};

const updateExchangeReducer: CaseReducer<
  PreferenceSliceState,
  PayloadAction<Exchange>
> = (state, action) => {
  const exchange = action?.payload ?? null;
  if (!exchange) return state;
  return {
    ...state,
    currency: {
      ...state.currency,
      exchange,
    },
  };
};

export const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    updateDisplayCurrencyPreferenceReducer,
    updateExchangeReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.currency = initialState.currency;
    });
  },
});

export const {
  updateDisplayCurrencyPreferenceReducer: updateDisplayCurrencyPreferenceAction,
  updateExchangeReducer: updateExchangeAction,
} = preferenceSlice.actions;

export default preferenceSlice.reducer;
