import React, { FC, useContext, useState } from 'react';
import { Trans } from 'next-i18next';
import { PurchaseContext } from '../purchase-nft.container';
import * as NFTStyle from '../purchase-nft.styles';
import * as S from './purchase-choose-pack.styles';
import { PackAndLandmarkInfo } from './purchase-choose-pack.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import { Button } from '../../../styles/styled-system/button.theme';
import {
  MindtrixUserEnum,
  useSignInOutBlocto,
} from '../../../hooks/wallet/wallet.hooks';
import { ViennaWoodsContext } from '../../../pages/world/vienna-woods';
import { I18N_NS_ENUM } from '../../../utils/i18n-utils';
import { PaymentStageEnum } from '../../../hooks/payment/payment.hooks';

interface Props {
  dismissModalFn: () => void;
  switchLandmarkFn: (isForward: boolean) => void;
}
export const PurchaseChoosePacks: FC<Props> = ({
  dismissModalFn,
  switchLandmarkFn,
}) => {
  const viennaWoodsContext = useContext(ViennaWoodsContext);
  const texts = viennaWoodsContext?.texts.viennaWoodsLandmarkCommonI18nText;
  const paymentContext = useContext(PurchaseContext);
  const priceUSD = paymentContext?.priceUSDNum ?? 0;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [isConnectDapperWallet, setIsConnectDapperWallet] = useState(false);
  const walletAddress = paymentContext?.walletAddress ?? '';
  const essenceId = paymentContext?.essenceId ?? 0;
  const isFree = paymentContext?.isFree ?? false;
  const { onClick: walletOnClick } = useSignInOutBlocto(
    MindtrixUserEnum.Collector,
  );
  const text = {
    button_buy: (
      <Trans
        i18nKey={`${I18N_NS_ENUM.landmark_common}:button_buy`}
        defaults={''}
        values={{
          pack_price: priceUSD,
        }}
        components={[
          <Text.h2
            key='0'
            status={'basic'}
            my={0}
            mx={'2px'}
            children={priceUSD}
          />,
        ]}
      />
    ),
    tab_pack_info: texts?.card_tab_pack_information ?? '',
    tab_utility: texts?.card_tab_utility ?? '',
  };
  const packTabIdPrefix = 'pack-tab-';
  const onClick = {
    tab: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      const tabId = e?.currentTarget?.id ?? `${packTabIdPrefix}0`;
      const tabIndex = Number(tabId.replace(packTabIdPrefix, ''));
      setSelectedTabIndex(tabIndex);
    },
    leftButton: () => {
      onClick.switchLandmarkFn(false);
    },
    rightButton: () => {
      onClick.switchLandmarkFn(true);
    },
    dismissModal: () => {
      if (dismissModalFn) {
        dismissModalFn();
      }
    },
    switchLandmarkFn: (isForward: boolean) => {
      if (switchLandmarkFn) {
        switchLandmarkFn(isForward);
      }
    },
    buyButton: () => {
      paymentContext.setSelectedPaymentStage(PaymentStageEnum.CREDIT_CARD);
    },
  };

  return (
    <NFTStyle.PaymentContainer>
      <S.PackAndLandmarkInfo.Container>
        <S.PackAndLandmarkInfo.Title.Container>
          <S.PackAndLandmarkInfo.Title.Tab
            id={`${packTabIdPrefix}0`}
            onClick={onClick.tab}
            isSelected={selectedTabIndex === 0}
          >
            <Text.h3
              status={'basic'}
              fontSize={'16px'}
              my={0}
              children={text.tab_pack_info}
            />
          </S.PackAndLandmarkInfo.Title.Tab>
          <S.PackAndLandmarkInfo.Title.Tab
            id={`${packTabIdPrefix}1`}
            onClick={onClick.tab}
            isSelected={selectedTabIndex === 1}
          >
            <Text.h3
              status={'basic'}
              fontSize={'16px'}
              my={0}
              children={text?.tab_utility}
            />
          </S.PackAndLandmarkInfo.Title.Tab>
        </S.PackAndLandmarkInfo.Title.Container>
        <S.PackAndLandmarkInfo.Content.Container>
          <S.PackRowContent selectedTabIndex={selectedTabIndex} />
        </S.PackAndLandmarkInfo.Content.Container>
      </S.PackAndLandmarkInfo.Container>

      <Button.Square
        appearance={'filled'}
        size={'large'}
        status={'basic'}
        fontSize={'20px'}
        marginTop={'20px'}
        marginBottom={'12px'}
        mx={0}
        color={'#000000'}
        backgroundColor={'#ffffff'}
        border={'2px #000000 solid'}
        width={'100%'}
        svgHeight={'28px'}
        svgWidth={'28px'}
        justifyContent={'center'}
        onClick={onClick.buyButton}
        children={text.button_buy}
      />
    </NFTStyle.PaymentContainer>
  );
};
