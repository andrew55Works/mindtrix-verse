import React, { FC, useContext } from 'react';
import { PaymentMain } from './purchase-nft.styles';
import { CoinMap } from '../../api/types/currency.types';
import { getStableCoinCurrencyInfo } from '../../utils/token.utils';
import {
  PaymentStageEnum,
  useSelectedPaymentMethod,
} from '../../hooks/payment/payment.hooks';
import { NFTEssenceV2 } from '../../api/types/nft.types';
import { toDecimalWith2ndPlace } from '../../utils/num.utils';
import {
  PurchaseButtonStatus,
  usePurchaseButtonStatus,
} from '../../hooks/purchase/purchase-button-status';
import { ILandmark, IPack } from '../../types/vienna-world.types';
import * as PackS from './purchase-choose-pack/purchase-choose-pack.styles';
import { ViennaWoodsContext } from '../../pages/world/vienna-woods';
import { SafeFclResponse } from '../../api/fcl/transactions.fcl';

interface Props {
  defaultPaymentMethod?: PaymentStageEnum;
  dismissModalFn?: () => void;
  essence: NFTEssenceV2 | null;
  essenceId: number;
  landmark: ILandmark;
  pack: IPack;
  switchLandmarkFn?: (isForward: boolean) => void;
  walletAddress: string;
}

export class PurchaseNFTState {
  public essenceId = 0;
  public isFree = false;
  public isLoading = true;
  public priceUSDNum = 0;
  public priceUSDStr = '0';
  public purchaseButtonStatus: PurchaseButtonStatus | {} = {};
  public selectedPaymentStage: PaymentStageEnum | null = null;
  public setIsLoading: React.Dispatch<boolean> | null | undefined = null;
  public setSealedRes: React.Dispatch<SafeFclResponse> | null | undefined =
    null;
  // @ts-ignore
  public setSelectedPaymentStage: React.Dispatch<PaymentStageEnum | null> =
    null;
  public supportedCryptoCurrencies: CoinMap = getStableCoinCurrencyInfo();
  public walletAddress = '';
  public dismissModalFn: () => void = () => '';
  public showTxStatusModal: (() => void) | undefined = () => '';
  public switchLandmarkFn: (isForward: boolean) => void = (
    isForward: boolean,
  ) => '';
}
export const PurchaseContext = React.createContext(new PurchaseNFTState());
export const PurchaseNFTContainer: FC<Props> = ({
  dismissModalFn = () => '',
  switchLandmarkFn = (isForward: boolean) => '',
  defaultPaymentMethod,
  essence,
  essenceId,
  landmark,
  walletAddress,
}) => {
  const viennaWoodsContext = useContext(ViennaWoodsContext);
  const priceFloat = parseFloat(essence?.nft_list_price?.toString() ?? '0');
  const fakePrice = 30;
  // const priceUSDStr = toDecimalWith2ndPlace(
  //   essence?.nft_list_price?.toString() ?? '0',
  // );
  const priceUSDStr = toDecimalWith2ndPlace(fakePrice.toString());
  const purchaseButtonStatus = usePurchaseButtonStatus(
    fakePrice,
    essence,
    walletAddress,
  );
  // const priceUSDNum = essence?.nft_list_price ?? 0;
  const priceUSDNum = fakePrice;
  const { selectedPaymentStage, setSelectedPaymentStage } =
    useSelectedPaymentMethod(defaultPaymentMethod);

  const isFree = priceFloat <= 0;
  const isLoading = viennaWoodsContext?.isShowLoadingLogo ?? false;
  const setIsLoading = viennaWoodsContext?.setIsShowLoadingLogo;
  const showTxStatusModal =
    viennaWoodsContext?.onChainTxStatusObj?.showTxStatusModal;

  const context: PurchaseNFTState = {
    essenceId,
    dismissModalFn,
    isFree,
    priceUSDStr,
    priceUSDNum,
    purchaseButtonStatus,
    selectedPaymentStage,
    setSelectedPaymentStage,
    setSealedRes: viennaWoodsContext?.onChainTxStatusObj?.setSealedRes,
    supportedCryptoCurrencies: getStableCoinCurrencyInfo(),
    isLoading,
    setIsLoading,
    showTxStatusModal,
    switchLandmarkFn,
    walletAddress,
  };
  return (
    <PurchaseContext.Provider value={context}>
      <PackS.PaymentPackInfo />
      <PaymentMain
        dismissModalFn={dismissModalFn}
        selectedPaymentStage={selectedPaymentStage}
        switchLandmarkFn={switchLandmarkFn}
      />
    </PurchaseContext.Provider>
  );
};
