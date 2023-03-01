import React, { useState } from 'react';
import { getStableCoinCurrencyInfo } from '../../utils/token.utils';
import FramerModal, {
  FramerModalProps,
} from '../../components/common/modal/framer-modal';
import { _get } from '../../utils/lodash.utils';
import { CryptoCurrency } from '../../api/types/currency.types';
import * as S from '../../components/purchase/purchase-nft.styles';
import { SelectedCoinTextInfo } from '../../components/purchase/purchase-nft.styles';
import { Text } from '../../styles/styled-system/text.theme';
import CircleCheckedSvg from '../../assets/svg/circle-check-solid.svg';

export const useCoinListModal = () => {
  const coinMap = getStableCoinCurrencyInfo();
  const defaultCoin = _get(coinMap, ['usdc'], null) as CryptoCurrency;
  const [selectedCoin, setSelectedCoin] = useState<CryptoCurrency>(defaultCoin);
  useState<CryptoCurrency>(defaultCoin);
  const [isShowCoinListModal, setIsShowCoinListModal] = useState(false);
  const onModalClick = {
    selectCoinDraft: (symbol: string) => {
      const coin = _get(coinMap, [symbol], null) as CryptoCurrency;
      setSelectedCoin(coin);
      onModalClick.dismissCoinListModal();
    },
    showCoinListModal: () => setIsShowCoinListModal(true),
    dismissCoinListModal: () => setIsShowCoinListModal(false),
  };

  const text = {
    modal_select_coin_list_description: 'Please select a coin to pay.',
  };

  const CoinListModalDescription = () => (
    <S.CoinOptionContainer>
      {Object.keys(coinMap).map((key, index) => {
        const coin = coinMap[key];
        const symbol = (coin?.symbol ?? '').toLowerCase();
        const isSelected = selectedCoin?.symbol?.toLowerCase() === symbol;
        return (
          <S.CoinOption
            key={index}
            onClick={() => onModalClick.selectCoinDraft(symbol)}
          >
            <S.CoinSvgContainer>{coin.thumbnailSvg}</S.CoinSvgContainer>
            <SelectedCoinTextInfo>
              <Text.h4
                status={'basic'}
                fontWeight={800}
                m={0}
                children={coin.symbol}
              />
            </SelectedCoinTextInfo>
            <S.SvgContainer>
              {isSelected ? <CircleCheckedSvg /> : null}
            </S.SvgContainer>
          </S.CoinOption>
        );
      })}
    </S.CoinOptionContainer>
  );
  const coinListModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: true,
    isShowModal: isShowCoinListModal,
    onClick: {
      dismissModalFn: () => onModalClick.dismissCoinListModal(),
      leftButton: undefined,
      rightButton: undefined,
    },
    text: {
      description: <CoinListModalDescription />,
      leftButton: undefined,
      rightButton: undefined,
      title: text.modal_select_coin_list_description,
    },
    maxWidth: '280px',
    width: '280px',
    style: {
      padding: '15px 10px 10px 10px',
    },
  };

  const CoinListModal = <FramerModal {...coinListModalProps} />;

  return {
    CoinListModal,
    onModalClick,
    selectedCoin,
  };
};
