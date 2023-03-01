import React, { FC } from 'react';
import { useInitCurrencies } from '../../hooks/currency/currency.hooks';

export const CurrencyInit: FC<{}> = (props) => {
  useInitCurrencies();
  return <React.Fragment>{props.children}</React.Fragment>;
};
