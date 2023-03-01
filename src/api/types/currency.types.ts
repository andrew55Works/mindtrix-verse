export class CurrencyVo {
  public _id: string | null = null;
  public address: string | null = null;
  public code: string | null = null;
  public country_code_alpha_2: string | null = null;
  public country_code_alpha_3: string | null = null;
  public country_name?: string | null = null;
  public create_date_time: Date | null = null;
  public currency_index: number | null = null;
  public price?: number | null = null;
  public update_date_time: Date | null = null;
  public usd_exchange_rate: number | null = null;
}

export interface GetAllCurrenciesRes {
  getAllCurrencies: Array<CurrencyVo>;
}

export enum BLOCKCHAIN {
  FLOW = 'FLOW',
  ETHEREUM = 'ETHEREUM',
}

export class CryptoCurrency {
  public blockchain = BLOCKCHAIN.FLOW;
  public contractIdentifier = 'A.';
  public fullName = '';
  public symbol = '';
  public thumbnailSvg: JSX.Element | null = null;
  public website = '';

  constructor(
    blockchain: BLOCKCHAIN,
    contractIdentifier: string,
    fullName: string,
    symbol: string,
    thumbnailURL: JSX.Element,
    website: string,
  ) {
    this.blockchain = blockchain;
    this.contractIdentifier = contractIdentifier;
    this.fullName = fullName;
    this.symbol = symbol;
    this.thumbnailSvg = thumbnailURL;
    this.website = website;
  }
}

export type CoinMap = {
  [coinName: string]: CryptoCurrency;
};
