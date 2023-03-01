export enum CurrencyEnum {
  TWD = 'twd',
  USD = 'usd',
}

export interface FiatCurrencyExchange {
  twd: number;
  usd: number;
}

export interface Exchange {
  flow: FiatCurrencyExchange;
}

export interface CurrencyPreference {
  displayCurrency: CurrencyEnum;
  exchange: Exchange;
}
