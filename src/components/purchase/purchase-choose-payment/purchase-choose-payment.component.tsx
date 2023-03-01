import React, { FC, useContext, useState } from 'react';
import { PurchaseContext } from '../purchase-nft.container';
import * as S from '../purchase-nft.styles';
import * as PackS from '../purchase-choose-pack/purchase-choose-pack.styles';
import { PackAndLandmarkInfo } from '../purchase-choose-pack/purchase-choose-pack.styles';
import { Button } from '../../../styles/styled-system/button.theme';
import DapperSvg from '../../../assets/svg/icon_dapper_coin.svg';
import StableCoinSvg from '../../../assets/svg/icon_stable_coin.svg';
import { PaymentStageEnum } from '../../../hooks/payment/payment.hooks';
import {
  MindtrixUserEnum,
  useSignInOutBlocto,
} from '../../../hooks/wallet/wallet.hooks';
import {
  buyNftWithDapperPayment,
  freeMintFromTemplate,
} from '../../../api/fcl/transactions.fcl';
import { fclInitByWalletShowEnum } from '../../../utils/fcl.utils';
import { WalletShowEnum } from '../../../hooks/fcl/fcl.config';
import { ViennaWoodsContext } from '../../../pages/world/vienna-woods';
import { Text } from '../../../styles/styled-system/text.theme';

interface Props {}
export const PurchaseChoosePayment: FC<Props> = () => {
  const viennaWoodsContext = useContext(ViennaWoodsContext);
  const paymentContext = useContext(PurchaseContext);
  const setPurchasedPack = viennaWoodsContext?.setPurchasedPack;
  const [isConnectDapperWallet, setIsConnectDapperWallet] = useState(false);
  const walletAddress = paymentContext?.walletAddress ?? '';
  const essenceId = paymentContext?.essenceId ?? 0;
  const isFree = paymentContext?.isFree ?? false;
  const { onClick: walletOnClick } = useSignInOutBlocto(
    MindtrixUserEnum.Collector,
  );

  const onClick = {
    creditCard: async () => {
      if (paymentContext && paymentContext.setSelectedPaymentStage) {
        await fclInitByWalletShowEnum(WalletShowEnum.ONLY_DAPPER);
        paymentContext.setSelectedPaymentStage(PaymentStageEnum.CREDIT_CARD);
        let walletAddressTmp = walletAddress;
        if (walletAddress) {
          if (!isConnectDapperWallet) {
            // logout first
            await walletOnClick().signOut();
            // then login again
            walletAddressTmp = await walletOnClick().signInOrOutAndGetAddress();
          }
        } else {
          // login
          walletAddressTmp = await walletOnClick().signInOrOutAndGetAddress();
        }
        setIsConnectDapperWallet(true);

        await onClick.checkIsFreeDapperPaymentAndMintFromTemplate(
          walletAddressTmp,
        );
      }
    },
    checkIsFreeDapperPaymentAndMintFromTemplate: async (
      walletAddressTmp: string,
    ) => {
      if (isFree) {
        await onClick.freeMintFromTemplate(walletAddressTmp);
      } else {
        await onClick.buyWithDapperPayment(walletAddressTmp);
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
    buyWithDapperPayment: async (walletAddressTmp: string) => {
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
        const sealedRes = await buyNftWithDapperPayment(essenceIdNum);
        if (setPurchasedPack) {
          setPurchasedPack(viennaWoodsContext?.landmarkModalInfo?.pack);
        }
        paymentContext?.setSealedRes(sealedRes);
      } catch (e) {
        console.error('mintSingleNFTFromEssence error:', e);
      }
    },
    stableCoin: async () => {
      if (paymentContext && paymentContext.setSelectedPaymentStage) {
        await fclInitByWalletShowEnum(WalletShowEnum.EXCLUDE_DAPPER);
        if (walletAddress && isConnectDapperWallet) {
          // logout first
          await walletOnClick().signInOrOutAndGetAddress();
        }
        setIsConnectDapperWallet(false);
        paymentContext?.setSelectedPaymentStage(
          walletAddress
            ? PaymentStageEnum.CRYPTO_COINS
            : PaymentStageEnum.CONNECT_CRYPTO_WALLET,
        );
      }
    },
    burnNFTFromDapperWallet: async () => {
      if (
        !paymentContext ||
        !paymentContext.setIsLoading ||
        !paymentContext.setSealedRes ||
        !paymentContext.showTxStatusModal
      )
        return;
      // try {
      //   const nftIds = [128379376, 127546696, 127541199, 125495633, 125312650];
      //   paymentContext?.showTxStatusModal();
      //   const sealedRes = await burnNFTs(nftIds);
      //   paymentContext?.setSealedRes(sealedRes);
      // } catch (e) {
      //   console.error('burnNFTFromDapperWallet error:', e);
      // }
    },
  };
  const text = {
    method_title: 'Payment Method Notice:',
    method_description:
      '1. Credit Card Payment is supported by Dapper Wallet empowering you to post NFT on Facebook or Instagram as a digital identity. \n 2. Cryptocurrency Payment is supported by multiple wallet providers obtaining an easier withdrawing or depositing ability of your digital assets.',
    // button_buy_with_credit_card:
    //   texts?.button_buy_credit_card ?? 'Buy with Credit Card',
    // button_buy_with_stable_coin:
    //   texts?.button_buy_stable_coin ?? 'Buy with Stable Coin',
    button_buy_with_credit_card: 'Buy with Credit Card',
    button_buy_with_stable_coin: 'Buy with Stable Coin',
  };
  const StableCoinIcon = (
    <S.SvgCustomScale scale={1.4} paddingLeft={'4px'}>
      <StableCoinSvg />
    </S.SvgCustomScale>
  );

  return (
    <S.PaymentContainer>
      <PackS.PackAndLandmarkInfo.Content.Row.Container>
        <PackS.PackAndLandmarkInfo.Content.Row.Title>
          <Text.h3
            status={'basic'}
            fontSize={'16px'}
            fontWeight={700}
            isAutoWrap={true}
            my={0}
            children={text.method_title}
          />
        </PackS.PackAndLandmarkInfo.Content.Row.Title>
        <PackS.PackAndLandmarkInfo.Content.Row.Content>
          <Text.h3
            status={'basic'}
            fontSize={'16px'}
            isAutoWrap={true}
            my={0}
            children={text.method_description}
          />
        </PackS.PackAndLandmarkInfo.Content.Row.Content>
      </PackS.PackAndLandmarkInfo.Content.Row.Container>
      <Button.Square
        appearance={'filled'}
        size={'large'}
        status={'primary'}
        fontSize={'20px'}
        LeftImage={<DapperSvg />}
        paddingTop={'10px'}
        paddingBottom={'10px'}
        marginBottom={'12px'}
        mx={0}
        width={'100%'}
        height={'50px'}
        svgHeight={'40px'}
        svgWidth={'45px'}
        onClick={onClick.creditCard}
        children={text.button_buy_with_credit_card}
      />
      <Button.Square
        appearance={'filled'}
        size={'large'}
        status={'primary'}
        fontSize={'20px'}
        mx={0}
        height={'50px'}
        width={'100%'}
        LeftImage={StableCoinIcon}
        svgWidth={'45px'}
        onClick={onClick.stableCoin}
        children={text.button_buy_with_stable_coin}
      />
    </S.PaymentContainer>
  );
};
