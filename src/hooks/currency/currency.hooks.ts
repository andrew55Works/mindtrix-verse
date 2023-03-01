import { useSelector } from 'react-redux';
import { selectCurrency } from '../../redux/preference/preference.selector';
import { useGetFlowTwdPriceQuery } from '../../api/restful/coingecko.query';
import { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch } from '../../redux/store';
import {
  updateDisplayCurrencyPreferenceAction,
  updateExchangeAction,
} from '../../redux/preference/preference.slice';
import {
  CurrencyEnum,
  Exchange,
} from '../../redux/preference/preference.interface';
import { useQuery } from '@apollo/client';
import { GQL_GET_ALL_CURRENCIES } from '../../api/graphql/currency.graphql';
import { GetAllCurrenciesRes } from '../../api/types/currency.types';
import { selectIsNeedToUpdate } from '../../redux/currency/currency.selector';
import { updateCurrencyAction } from '../../redux/currency/currency.slice';
import { useCurrentLocale } from '../i18n/i18n.hooks';

export const useExchange = () => {
  const dispatch = useAppDispatch();
  const currency = useSelector(selectCurrency);
  const {
    data: flowTwdInfo,
    error: flowTwdPriceError,
    isLoading: loadingFlowTwdPrice,
  } = useGetFlowTwdPriceQuery(true, { pollingInterval: 15 * 1000 });

  // console.info('flowTwdPriceError:', flowTwdPriceError);
  const currencyPrice = useMemo(
    () => flowTwdInfo?.market_data?.current_price ?? null,
    [flowTwdInfo?.market_data],
  );

  const { iso31661Code: countryCode } = useCurrentLocale();
  const displayCurrencyEnum =
    countryCode === 'tw' ? CurrencyEnum.TWD : CurrencyEnum.USD;

  useEffect(() => {
    if (
      !currencyPrice ||
      !('twd' in currencyPrice) ||
      !('usd' in currencyPrice)
    )
      return;
    const exchange: Exchange = {
      ...currency.exchange,
      flow: {
        ...currency.exchange.flow,
        twd: currencyPrice.twd,
        usd: currencyPrice.usd,
      },
    };
    dispatch(updateDisplayCurrencyPreferenceAction(displayCurrencyEnum));
    dispatch(updateExchangeAction(exchange));
  }, [currencyPrice, flowTwdInfo]);
};

export const useInitCurrencies = () => {
  const dispatch = useAppDispatch();
  const isNeedToUpdateCurrencySessionStorage =
    useSelector(selectIsNeedToUpdate);
  const updateOnceRef = useRef(false);
  const { refetch: getAllCurrencies } = useQuery<GetAllCurrenciesRes>(
    GQL_GET_ALL_CURRENCIES,
    {
      skip: true,
    },
  );

  useEffect(() => {
    if (updateOnceRef.current || !isNeedToUpdateCurrencySessionStorage) return;
    const fetchAllCurrencies = async () => {
      const res = await getAllCurrencies();
      const error = res?.error ?? null;
      const currencies = res?.data?.getAllCurrencies ?? [];
      if (error) return;
      dispatch(updateCurrencyAction(currencies));
      updateOnceRef.current = true;
    };
    fetchAllCurrencies();
  }, [isNeedToUpdateCurrencySessionStorage]);
};
