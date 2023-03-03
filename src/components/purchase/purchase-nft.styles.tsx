import styled from 'styled-components';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';
import { PurchaseChoosePacks } from './purchase-choose-pack/purchase-choose-packs.component';
import { PurchaseChoosePayment } from './purchase-choose-payment/purchase-choose-payment.component';
import { PurchaseChooseStableCoin } from './purchase-choose-stable-coin/purchase-choose-stable-coin.component';
import React, { FC } from 'react';
import { Text } from '../../styles/styled-system/text.theme';
import { CommonFlexContainer } from '../common/flexbox/common-flex.styles';
import { TooltipQuestion } from '../common/tooltip/tooltip-question.component';
import { PaymentStageEnum } from '../../hooks/payment/payment.hooks';
import { PurchaseChooseWallet } from './purchase-choose-wallet/purchase-choose-wallet.component';

export const SelectedCoin = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 8px 12px 8px 12px;
  margin: 0 0 40px 0;
  cursor: pointer;
  &:hover {
    background-color: #e6e8e8;
  }
`;

export const SelectedCoinTextInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 20px;
`;

export const SelectedAnotherCoin = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 12px;
  width: 24px;
  height: 24px;
  margin-left: 12px;
`;

export const CoinSvgContainer = styled.div`
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  margin: 0 12px 0 0;
`;

export const CoinOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 12px 0;
  width: 100%;
  height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 14px;
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    border-radius: 9999px;
    background-clip: padding-box;
    background-color: #aaaaaa80;
  }
`;

export const CoinOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #a2a0a0;
  padding: 8px 12px 8px 12px;
  width: 70%;
  margin: 12px 0;
  cursor: pointer;

  &:hover {
    background: #e6e8e8;
  }
`;

export const SvgCustomScale = styled.div<
  { scale: number } & LayoutProps & SpaceProps
>`
  transform: scale(${(props) => props?.scale ?? 1});
  max-height: 40px;
  max-width: 40px;
  height: 100%;
  width: 100%;
  ${layout};
  ${space};
`;

export const SvgContainer = styled.div<
  LayoutProps & SpaceProps & { isLoading?: boolean }
>`
  flex-shrink: 0;
  display: flex;
  height: 24px;
  width: 24px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props?.onClick ? 'pointer' : 'default')};
  ${(props) =>
    props?.isLoading
      ? `
  animation: rotation 2s infinite linear;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  `
      : ''}

  ${(props) =>
    props?.onClick
      ? `
    padding: 4px;
    &:hover {
      background: #e6e8e8;
    }
    `
      : ''};

  ${layout};
  ${space};
`;

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  width: 100%;
  box-sizing: border-box;
`;

export const CloseButton = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  padding: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  border: none;
`;

export const PriceTitle: FC<{
  isPack: boolean;
  priceText: string;
  qa: string;
}> = ({ isPack, priceText, qa }) => {
  if (isPack) return null;
  return (
    <CommonFlexContainer
      flexDirection={'row'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      width={'100%'}
    >
      <Text.h1
        status={'basic'}
        marginTop={0}
        fontSize={'32px'}
        fontWeight={800}
        marginBottom={0}
        children={priceText}
      />
      <TooltipQuestion text={qa} />
    </CommonFlexContainer>
  );
};

export const SupportLink = styled.a`
  margin-left: 4px;
`;
export const SupportLinkText: FC<SpaceProps> = ({ padding }) => {
  const text = {
    h4_need_help: 'Need helps?',
    h4_contact_support: 'Contact support',
  };
  return (
    <CommonFlexContainer
      flexDirection={'row'}
      alignSelf={'center'}
      padding={padding}
    >
      <Text.h5 status={'basic'} m={0}>
        {text.h4_need_help}
        <SupportLink
          target={'_blank'}
          href={'https://discord.gg/2fWsUZNnyR'}
          children={text.h4_contact_support}
        />
      </Text.h5>
    </CommonFlexContainer>
  );
};

export const PaymentMain: FC<{
  dismissModalFn: () => void;
  selectedPaymentStage: PaymentStageEnum | null;
  switchLandmarkFn: (isForward: boolean) => void;
}> = ({ selectedPaymentStage, dismissModalFn, switchLandmarkFn }) => {
  const isPack = selectedPaymentStage === PaymentStageEnum.WORLD_PACK;
  const isConnectCryptoWallet =
    selectedPaymentStage === PaymentStageEnum.CONNECT_CRYPTO_WALLET;
  const isDefaultPayment =
    selectedPaymentStage === null ||
    selectedPaymentStage === PaymentStageEnum.CREDIT_CARD;
  return isPack ? (
    <PurchaseChoosePacks
      dismissModalFn={dismissModalFn}
      switchLandmarkFn={switchLandmarkFn}
    />
  ) : isConnectCryptoWallet ? (
    <PurchaseChooseWallet />
  ) : isDefaultPayment ? (
    <PurchaseChoosePayment />
  ) : (
    <PurchaseChooseStableCoin />
  );
};
