import React, { FC, useContext } from 'react';
import { PurchaseContext } from '../purchase-nft.container';
import * as S from '../purchase-nft.styles';
import { Button } from '../../../styles/styled-system/button.theme';
import { Text } from '../../../styles/styled-system/text.theme';
import ChevronWithArrowRightSvg from '../../../assets/svg/chevron-right-solid.svg';
import { CommonFlexContainer } from '../../common/flexbox/common-flex.styles';
import { useCoinListModal } from '../../../hooks/coin/coin.hooks';
import {
  MindtrixUserEnum,
  useSignInOutBlocto,
} from '../../../hooks/wallet/wallet.hooks';
import {
  buyNftWithFiatToken,
  freeMintFromTemplate,
} from '../../../api/fcl/transactions.fcl';
import { useSelector } from 'react-redux';
import { selectCollectorProfile } from '../../../redux/collector/collector.selector';
import { initialWallet } from '../../../types/wallet.type';
import { _get } from '../../../utils/lodash.utils';
import { openNewWindow } from '../../../utils/window.utils';
import CommonMessageError from '../../common/input/common-message-error.component';
import { statusColorSystemStr } from '../../../styles/styled-system/color.theme';
import CbridgeSvg from '../../../assets/svg/icon_cbridge.svg';
import IncrementFi from '../../../assets/svg/icon_incrementfi.svg';
import MoonPaySvg from '../../../assets/svg/icon_moonpay.svg';
import ArrowsRotateSvg from '../../../assets/svg/arrows-rotate-solid.svg';
import { TooltipQuestion } from '../../common/tooltip/tooltip-question.component';
import { PurchaseButtonStatus } from '../../../hooks/purchase/purchase-button-status';
import { fetchTokenBalancesAndUpdateSlice } from '../../../services/flow/script/get-flow-balance.script';
import { useAppDispatch } from '../../../redux/store';
import { ViennaWoodsContext } from '../../../pages/world/vienna-woods';
import { ChildAccountInfo } from '../../../types/creator.type';
import { useFetchChildAccount } from '../../../hooks/world/use-fetch-child-account';

interface Props {}
export const PurchaseChooseStableCoin: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const viennaWoodsContext = useContext(ViennaWoodsContext);
  const paymentContext = useContext(PurchaseContext);
  const setSelectedPaymentStage = paymentContext?.setSelectedPaymentStage;
  const childAccountInfo =
    viennaWoodsContext?.childAccountInfo ?? new ChildAccountInfo();
  const setIsShowLoadingLogo = viennaWoodsContext?.setIsShowLoadingLogo;
  const setChildAccountInfo = viennaWoodsContext?.setChildAccountInfo;
  const setPurchasedPack = viennaWoodsContext?.setPurchasedPack;
  const isLoading = paymentContext?.isLoading ?? true;
  const { CoinListModal, onModalClick, selectedCoin } = useCoinListModal();
  const walletProfile = useSelector(selectCollectorProfile);
  const walletAddress = paymentContext?.walletAddress ?? '';
  const purchaseButtonStatus = (paymentContext?.purchaseButtonStatus ??
    {}) as PurchaseButtonStatus;
  const walletBalanceObj =
    walletProfile?.wallet?.blocto?.balance ?? initialWallet.blocto.balance;
  const essenceId = paymentContext?.essenceId ?? 0;
  const isFree = paymentContext?.isFree ?? false;
  const { onClick: walletOnClick } = useSignInOutBlocto(
    MindtrixUserEnum.Collector,
  );
  const isCreatingChildAccount =
    childAccountInfo?.isCreatingChildAccount ?? false;
  useFetchChildAccount(
    childAccountInfo,
    dispatch,
    setChildAccountInfo,
    setIsShowLoadingLogo,
  );
  const selectedSymbol = selectedCoin?.symbol ?? 'USDC';
  const isNeedRefetchingChildAccount =
    childAccountInfo?.isCreatingChildAccount ?? false;

  const text = {
    h4_selected_coin: 'Selected coin',
    h4_user_balance: 'Your balance',
    h4_user_balance_insufficient: `Insufficient ${selectedSymbol}. Please swap or bridge to deposit ${selectedSymbol}.`,
    h4_not_login: 'Not connected',
    h4_user_payment_price: 'You will pay',
    tooltip_bridge_coins:
      'Bridging coins from other blockchain to get USDC on FLOW. e.g.,\n1. ETH(USDC) -> FLOW(USDC)\n2. BSC(BUSD) -> FLOW(USDC)',
    tooltip_swap_coins:
      'Swap coins on FLOW blockchain to get USDC or FUSD. e.g.,\n1. FLOW(FLOW) -> FLOW(FUSD)\n2. FLOW(BLT) -> FLOW(USDC)',
    tooltip_buy_coins:
      'Buy $FLOW coins and deposit them in your wallet. Then, you can click the following buttons to exchange stable coins.',
    button_connect_wallet_to_buy: 'Connect Wallet to Buy',
    button_buy_with_credit_card: 'Buy Now',
    button_bridge_coins: 'Bridge Coins',
    button_swap_coins: 'Swap Coins',
    button_buy_coins: 'Buy Coins',
    button_back_to_use_credit_card: 'Back to use Credit Card',
    cancel: 'Cancel',
  };
  const onClick = {
    checkIsConnectedWallet: async () => {
      let walletAddressTmp = walletAddress;
      if (!walletAddressTmp) {
        walletAddressTmp = await walletOnClick().signInOrOutAndGetAddress();
        if (!isBalanceSufficient) return;
      }
      await onClick.checkIsFreeStableCoinPaymentAndMintFromTemplate(
        walletAddressTmp,
      );
    },
    checkIsFreeStableCoinPaymentAndMintFromTemplate: async (
      walletAddressTmp: string,
    ) => {
      if (isFree) {
        await onClick.freeMintFromTemplate(walletAddressTmp);
      } else {
        await onClick.buyWithStableCoin(walletAddressTmp);
      }
    },
    freeMintFromTemplate: async (walletAddressTmp: string) => {
      if (
        !paymentContext ||
        !paymentContext.setIsLoading ||
        !paymentContext.setSealedRes ||
        !paymentContext.showTxStatusModal
      )
        return;
      if (!walletAddressTmp) {
        alert('Please connect your wallet first!');
        paymentContext?.setIsLoading(false);
        return;
      }
      const essenceIdNum = Number(essenceId);
      if (isNaN(essenceIdNum)) {
        alert('Cannot find this essence anymore, please mint another one!');
        return;
      }
      try {
        paymentContext?.showTxStatusModal();
        const sealedRes = await freeMintFromTemplate(essenceIdNum);
        paymentContext?.setSealedRes(sealedRes);
      } catch (e) {
        console.error('mintSingleNFTFromEssence error:', e);
      }
    },
    bridgeCoins: () => {
      const bridgeUsdcURL = 'https://cbridge.celer.network/12340001/1/cfUSDC';
      openNewWindow(bridgeUsdcURL);
    },
    swapCoins: () => {
      const swapFusdURL = 'https://app.increment.fi/swap';
      openNewWindow(swapFusdURL);
    },
    buyCoins: () => {
      const moonPayURL = 'https://buy.moonpay.com/?defaultCurrencyCode=FLOW';
      openNewWindow(moonPayURL);
    },
    buyWithStableCoin: async (walletAddressTmp: string) => {
      if (
        !paymentContext ||
        !paymentContext.setIsLoading ||
        !paymentContext.setSealedRes ||
        !paymentContext.showTxStatusModal
      )
        return;
      if (!walletAddressTmp) {
        alert('Please connect your wallet first!');
        paymentContext?.setIsLoading(false);
        return;
      }
      const essenceIdNum = Number(essenceId);
      if (isNaN(essenceIdNum)) {
        alert('Cannot find this essence anymore, please mint another one!');
        return;
      }
      try {
        paymentContext?.setIsLoading(true);
        paymentContext?.showTxStatusModal();
        const coinIdentifier = selectedCoin.contractIdentifier;
        const sealedRes = await buyNftWithFiatToken(
          essenceIdNum,
          coinIdentifier,
        );
        if (setPurchasedPack) {
          setPurchasedPack(viennaWoodsContext?.landmarkModalInfo?.pack);
        }
        paymentContext?.setSealedRes(sealedRes);
      } catch (e) {
        console.error('mintSingleNFTFromEssence error:', e);
      } finally {
        // refetch();
        // paymentContext?.setIsLoading(false);
      }
    },
    refreshWalletBalance: async () => {
      if (paymentContext && paymentContext.setIsLoading) {
        paymentContext?.setIsLoading(true);
        await fetchTokenBalancesAndUpdateSlice(
          walletAddress,
          dispatch,
          MindtrixUserEnum.Collector,
          walletProfile?.wallet ?? null,
          walletProfile,
        );
        paymentContext?.setIsLoading(false);
      }
    },
    cancel: async () => {
      if (paymentContext && paymentContext.setSelectedPaymentStage) {
        await walletOnClick().signOut();
        paymentContext?.setSelectedPaymentStage(null);
      }
    },
  };

  const priceNum = paymentContext?.priceUSDNum ?? 0;
  const priceFloat = parseFloat(priceNum.toString());
  const priceStr = paymentContext?.priceUSDStr ?? '0';
  const selectedCoinBalanceNum = _get(
    walletBalanceObj,
    [selectedSymbol.toLowerCase(), 'num'],
    0,
  ) as number;
  const isBalanceSufficient =
    priceFloat === 0 || (priceNum !== 0 && selectedCoinBalanceNum > priceNum);
  const isShowInsufficientUI = walletAddress && !isBalanceSufficient;

  const selectedCoinBalanceStr = `${_get(
    walletBalanceObj,
    [selectedSymbol.toLowerCase(), 'str'],
    '0',
  )} ${selectedSymbol}`;
  const priceCryptoText = `${priceStr} ${selectedSymbol}`;

  const PurchaseNFTButtons = () => (
    <>
      <Button.Square
        appearance={'filled'}
        disabled={purchaseButtonStatus?.disability ?? true}
        size={'large'}
        status={'primary'}
        fontSize={'20px'}
        marginBottom={'12px'}
        mx={0}
        height={'50px'}
        width={'100%'}
        justifyContent={'center'}
        onClick={onClick.checkIsConnectedWallet}
        children={
          walletAddress
            ? purchaseButtonStatus?.ctaText ?? 'Buy Now'
            : text.button_connect_wallet_to_buy
        }
      />
      <Button.Square
        appearance={'outline'}
        size={'medium'}
        status={'primary'}
        fontSize={'5'}
        fontWeight={'bold'}
        mx={0}
        height={'50px'}
        width={'100%'}
        justifyContent={'center'}
        onClick={onClick.cancel}
        children={text.cancel}
      />
    </>
  );

  const CreatingChildAccountButton = () => {
    return (
      <Button.Square
        appearance={'filled'}
        disabled={true}
        size={'large'}
        status={'disabled'}
        fontSize={'16px'}
        marginBottom={'12px'}
        mx={0}
        width={'100%'}
        flexDirection={'row'}
        paddingLeft={0}
        paddingRight={'24px'}
        justifyContent={'center'}
        children={'Awaiting On Chain Data...'}
      />
    );
  };

  const DepositCoinButtons = () => (
    <>
      <Button.Square
        appearance={'filled'}
        size={'large'}
        status={'primary'}
        fontSize={'20px'}
        marginBottom={'12px'}
        mx={0}
        width={'100%'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        svgHeight={'30px'}
        svgWidth={'30px'}
        svgMarginLeft={'-35px'}
        LeftImage={<MoonPaySvg />}
        paddingLeft={0}
        paddingRight={'24px'}
        onClick={onClick.buyCoins}
        children={
          <>
            {text.button_buy_coins}
            <TooltipQuestion
              iconColor={'#ffffff'}
              text={text.tooltip_buy_coins}
            />
          </>
        }
      />
      <Button.Square
        appearance={'filled'}
        size={'large'}
        status={'primary'}
        fontSize={'20px'}
        marginBottom={'12px'}
        mx={0}
        width={'100%'}
        justifyContent={'center'}
        svgHeight={'30px'}
        svgWidth={'30px'}
        svgMarginLeft={'-26px'}
        LeftImage={<IncrementFi />}
        paddingLeft={0}
        paddingRight={'24px'}
        onClick={onClick.swapCoins}
        children={
          <CommonFlexContainer
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {text.button_swap_coins}
            <TooltipQuestion
              iconColor={'#ffffff'}
              text={text.tooltip_swap_coins}
            />
          </CommonFlexContainer>
        }
      />
      <Button.Square
        appearance={'filled'}
        size={'large'}
        status={'primary'}
        fontSize={'20px'}
        marginBottom={'12px'}
        mx={0}
        width={'100%'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        svgHeight={'30px'}
        svgWidth={'30px'}
        svgMarginLeft={'-20px'}
        LeftImage={<CbridgeSvg />}
        paddingLeft={0}
        paddingRight={'24px'}
        onClick={onClick.bridgeCoins}
        children={
          <>
            {text.button_bridge_coins}
            <TooltipQuestion
              iconColor={'#ffffff'}
              text={text.tooltip_bridge_coins}
            />
          </>
        }
      />
      <Button.Square
        appearance={'outline'}
        size={'medium'}
        status={'primary'}
        fontSize={'5'}
        fontWeight={'bold'}
        mx={0}
        width={'100%'}
        justifyContent={'center'}
        onClick={onClick.cancel}
        children={text.button_back_to_use_credit_card}
      />
    </>
  );

  return (
    <S.PaymentContainer>
      <Text.h4
        status={'basic'}
        marginBottom={'6px'}
        children={text.h4_selected_coin}
      />
      <S.SelectedCoin onClick={onModalClick.showCoinListModal}>
        <S.CoinSvgContainer>{selectedCoin.thumbnailSvg}</S.CoinSvgContainer>
        <S.SelectedCoinTextInfo>
          <Text.h4
            status={'basic'}
            fontWeight={800}
            m={0}
            children={selectedCoin.symbol}
          />
        </S.SelectedCoinTextInfo>
        <S.SelectedAnotherCoin>
          <ChevronWithArrowRightSvg />
        </S.SelectedAnotherCoin>
      </S.SelectedCoin>

      <CommonFlexContainer
        flexDirection={'row'}
        width={'100%'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Text.h4
          status={'basic'}
          my={0}
          marginLeft={0}
          marginRight={'8px'}
          children={text.h4_user_balance}
        />
        {walletAddress ? (
          <S.SvgContainer
            width={'14px'}
            height={'14px'}
            isLoading={isLoading || isCreatingChildAccount}
            onClick={onClick.refreshWalletBalance}
          >
            <ArrowsRotateSvg />
          </S.SvgContainer>
        ) : null}
      </CommonFlexContainer>

      <Text.h4
        status={'basic'}
        m={0}
        color={isBalanceSufficient ? 'basic.6' : statusColorSystemStr.danger}
        children={walletAddress ? selectedCoinBalanceStr : text.h4_not_login}
      />
      {isShowInsufficientUI ? (
        <CommonMessageError
          errorMessage={text.h4_user_balance_insufficient}
          isShowErrorMessage={!isBalanceSufficient}
          isPaddingLeft={false}
        />
      ) : null}
      <Text.h4
        status={'basic'}
        mx={0}
        marginBottom={0}
        marginTop={'12px'}
        children={text.h4_user_payment_price}
      />
      <Text.h4
        status={'basic'}
        marginTop={0}
        marginBottom={'12px'}
        color={'basic.6'}
        children={priceCryptoText}
      />
      <CommonFlexContainer
        style={{
          boxSizing: 'border-box',
        }}
        flexDirection={'column'}
        alignSelf={'center'}
        marginBottom={'12px'}
        width={'100%'}
      >
        {isCreatingChildAccount ? (
          <CreatingChildAccountButton />
        ) : isShowInsufficientUI ? (
          <DepositCoinButtons />
        ) : (
          <PurchaseNFTButtons />
        )}
      </CommonFlexContainer>
      {CoinListModal}
    </S.PaymentContainer>
  );
};
