import { getFlowCadenceContractAddress } from './config.web.utils';
import {
  BLOCKCHAIN,
  CoinMap,
  CryptoCurrency,
} from '../api/types/currency.types';
import UsdcCoinSvg from '../assets/svg/icon_usdc_coin.svg';
import FusdCoinSvg from '../assets/svg/icon_fusd_coin.svg';
import FlowCoinSvg from '../assets/svg/icon_flow_coin.svg';
import DapperCoinSvg from '../assets/svg/icon_dapper_coin.svg';

export const getStableCoinCurrencyInfo = (): CoinMap => {
  const { usdc, fusd } = getStableCoinIdentifiers();
  const usdcCryptoCurrency = new CryptoCurrency(
    BLOCKCHAIN.FLOW,
    usdc,
    'USD Coin',
    'USDC',
    <UsdcCoinSvg />,
    'https://www.circle.com/en/',
  );
  const fusdCryptoCurrency = new CryptoCurrency(
    BLOCKCHAIN.FLOW,
    fusd,
    'Flow USD',
    'FUSD',
    <FusdCoinSvg />,
    'https://docs.onflow.org/fusd/',
  );
  return { usdc: usdcCryptoCurrency, fusd: fusdCryptoCurrency };
};

export const getDapperCoinCurrencyInfo = (): CoinMap => {
  const { duc, fut } = getDapperCoinIdentifiers();
  const ducCryptoCurrency = new CryptoCurrency(
    BLOCKCHAIN.FLOW,
    duc,
    'Dapper Utility Coin',
    'DUC',
    <DapperCoinSvg />,
    'https://flow.com/',
  );

  const futCryptoCurrency = new CryptoCurrency(
    BLOCKCHAIN.FLOW,
    fut,
    'Flow Utility Token',
    'FUT',
    <DapperCoinSvg />,
    'https://flow.com/',
  );

  return { duc: ducCryptoCurrency, fut: futCryptoCurrency };
};

export const getVolatileCoinCurrencyInfo = (): CoinMap => {
  const { flow } = getVolatileCoinIdentifiers();
  const flowCryptoCurrency = new CryptoCurrency(
    BLOCKCHAIN.FLOW,
    flow,
    'Flow',
    'FLOW',
    <FlowCoinSvg />,
    'https://flow.com/',
  );

  return { flow: flowCryptoCurrency };
};

export const getTokenIdentifiers = () => {
  const { duc, fut } = getDapperCoinIdentifiers();
  const { usdc, fusd } = getStableCoinIdentifiers();
  const { flow } = getVolatileCoinIdentifiers();

  return {
    duc,
    fut,
    usdc,
    fusd,
    flow,
  };
};

export const getDapperCoinIdentifiers = () => {
  const contracts = getFlowCadenceContractAddress();
  const dapperAddress = contracts.DAPPER_WALLET_AUTHN_ADDRESS as string;

  const duc = `A.${dapperAddress.replace('0x', '')}.DapperUtilityCoin`;
  const fut = `A.${dapperAddress.replace('0x', '')}.FlowUtilityToken`;
  return {
    duc,
    fut,
  };
};

export const getStableCoinIdentifiers = () => {
  const contracts = getFlowCadenceContractAddress();
  const usdcAddress = contracts.FIAT_TOKEN_ADDRESS as string;
  const fusdAddress = contracts.FUSD_TOKEN_ADDRESS as string;
  const flowAddress = contracts.FLOW_TOKEN_ADDRESS as string;

  const usdc = `A.${usdcAddress.replace('0x', '')}.FiatToken`;
  const fusd = `A.${fusdAddress.replace('0x', '')}.FUSD`;
  const flow = `A.${flowAddress.replace('0x', '')}.FlowToken`;
  return {
    usdc,
    fusd,
    flow,
  };
};

export const getVolatileCoinIdentifiers = () => {
  const contracts = getFlowCadenceContractAddress();
  const flowAddress = contracts.FLOW_TOKEN_ADDRESS as string;

  const flow = `A.${flowAddress.replace('0x', '')}.FlowToken`;
  return {
    flow,
  };
};
