import styled from 'styled-components';
import LeftSvg from '../../../assets/svg/vienna_world/icon_arrow_left.svg';
import RightSvg from '../../../assets/svg/vienna_world/icon_arrow_right.svg';
import CrossCircleSvg from '../../../assets/svg/vienna_world/icon_cross_circle_black.svg';
import React, { FC, useContext } from 'react';
import { Text } from '../../../styles/styled-system/text.theme';
import { TooltipQuestion } from '../../common/tooltip/tooltip-question.component';
import TopSecretSvg from '../../../assets/svg/vienna_world/icon_top_secret.svg';
import { ViennaWoodsContext } from '../../../pages/world/vienna-woods';
import CoverImage from '../../common/cover/cover-image.component';
import { CommonFlexContainer } from '../../common/flexbox/common-flex.styles';
import { PurchaseContext } from '../purchase-nft.container';
import { PaymentStageEnum } from '../../../hooks/payment/payment.hooks';

export const ArrowSvgContainer = styled.button<{ flexGrow?: number }>`
  flex-shrink: 0;
  flex-grow: ${(props) => props?.flexGrow ?? 1};
  padding: 0;
  align-self: center;
  cursor: pointer;
  background: transparent;
  border: none;
  height: 40px;
  width: 40px;
  max-width: 40px;
`;

interface PackAndLandmarkInfoProps {
  isSelected: boolean;
}
export const PackAndLandmarkInfo = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  `,
  Title: {
    Container: styled.div`
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    Tab: styled.div<PackAndLandmarkInfoProps>`
      cursor: pointer;
      display: flex;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      padding: 12px;
      width: 100%;
      flex: 1;
      border-top: 2px solid black;
      border-left: 2px solid black;
      border-right: 2px solid black;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-color: ${(props) =>
        props?.isSelected ?? false ? '#c5cee0' : '#ffffff'};
      &:hover {
        filter: brightness(0.95);
      }
    `,
  },
  Content: {
    Container: styled.div`
      box-sizing: border-box;
      padding: 12px;
      width: 100%;
      border: 2px solid black;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: #c5cee0;
    `,
    Row: {
      Container: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        &:not(:first-child) {
          margin-top: 10px;
        }
      `,
      Title: styled.div`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      `,
      Content: styled.div`
        display: flex;
      `,
    },
  },
};

export const WarningBlock = styled.div`
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 20px;
`;
export const LocationPackGifContainer = styled.div`
  display: flex;
  height: 280px;
  width: 280px;
`;

export const PackGif: FC<{ gifUrl: string }> = ({ gifUrl }) =>
  gifUrl ? (
    <CoverImage
      alt='pack_img'
      src={gifUrl}
      objectFit={'contain'}
      width={'100%'}
      height={'100%'}
      fill={true}
      borderRadius={'0px'}
    />
  ) : null;

interface IconProps {
  isShow: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const LeftIcon: FC<IconProps> = ({ isShow, onClick }) =>
  isShow ? (
    <ArrowSvgContainer onClick={onClick}>
      <LeftSvg />
    </ArrowSvgContainer>
  ) : null;

export const RightIcon: FC<IconProps> = ({ isShow, onClick }) =>
  isShow ? (
    <ArrowSvgContainer onClick={onClick}>
      <RightSvg />
    </ArrowSvgContainer>
  ) : null;

export const CloseIcon: FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClick }) => (
  <ArrowSvgContainer onClick={onClick} flexGrow={0}>
    <CrossCircleSvg />
  </ArrowSvgContainer>
);

export const TopSecret = {
  Container: styled.div`
    width: 100%;
    max-height: 100%;
    position: relative;
  `,
  SvgContainer: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    svg {
      width: 100%;
      height: 100%;
    }
  `,
  ImgContainer: styled.img`
    width: 100%;
    height: auto;
    object-position: center;
    object-fit: contain;
  `,
};

export const PackRowContent: FC<{ selectedTabIndex: number }> = ({
  selectedTabIndex,
}) => {
  const context = useContext(ViennaWoodsContext);
  const texts = context?.texts?.viennaWoodsLandmarkCommonI18nText;
  const remainingAmount = 1666;
  const totalAmount = 1666;
  const text = {
    packName: '',
    purchase_notes: texts?.card_purchase_notes ?? '',
    purchase_notes_hover: texts?.card_purchase_notes_hover ?? '',
    inventory_title: texts?.card_inventory ?? '',
    inventory_amount: `${remainingAmount}/${totalAmount}`,
    inventory_hover: texts?.card_inventory_hover ?? '',
  };

  const isLeftTab = selectedTabIndex === 0;
  const LeftTabContent = (
    <>
      <PackAndLandmarkInfo.Content.Row.Container>
        <PackAndLandmarkInfo.Content.Row.Title>
          <Text.h3
            status={'basic'}
            fontSize={'16px'}
            my={0}
            children={text.packName}
          />
        </PackAndLandmarkInfo.Content.Row.Title>
        <PackAndLandmarkInfo.Content.Row.Title>
          <Text.h3
            status={'basic'}
            fontSize={'16px'}
            my={0}
            children={text.inventory_title}
          />
          <TooltipQuestion text={text.inventory_hover} iconColor={'#000000'} />
        </PackAndLandmarkInfo.Content.Row.Title>
        <PackAndLandmarkInfo.Content.Row.Content>
          <Text.h3
            status={'basic'}
            fontSize={'16px'}
            my={0}
            children={text.inventory_amount}
          />
        </PackAndLandmarkInfo.Content.Row.Content>
      </PackAndLandmarkInfo.Content.Row.Container>
      <PackAndLandmarkInfo.Content.Row.Container>
        <PackAndLandmarkInfo.Content.Row.Title>
          <Text.h3
            status={'basic'}
            fontSize={'16px'}
            my={0}
            children={text.purchase_notes}
          />
          <TooltipQuestion
            text={text.purchase_notes_hover}
            iconColor={'#000000'}
          />
        </PackAndLandmarkInfo.Content.Row.Title>
      </PackAndLandmarkInfo.Content.Row.Container>
    </>
  );
  const RightTabContent = (
    <PackAndLandmarkInfo.Content.Row.Container>
      <TopSecret.Container>
        <TopSecret.ImgContainer
          src={'/img/world/vienna_woods/top_secret_blur.png'}
        />
        <TopSecret.SvgContainer>
          <TopSecretSvg />
        </TopSecret.SvgContainer>
      </TopSecret.Container>
    </PackAndLandmarkInfo.Content.Row.Container>
  );
  return isLeftTab ? LeftTabContent : RightTabContent;
};

export const PaymentPackInfo: FC<{}> = () => {
  const viennaWoodsContext = useContext(ViennaWoodsContext);
  const { switchLandmarkFn, selectedPaymentStage } =
    useContext(PurchaseContext);
  const packGifURL = viennaWoodsContext?.landmarkModalInfo?.pack?.gifUrl ?? '';
  const isShowSwitchIcon = selectedPaymentStage === PaymentStageEnum.WORLD_PACK;
  return (
    <>
      <CommonFlexContainer
        width={'100%'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        height={'280px'}
        marginBottom={'12px'}
      >
        <LeftIcon
          isShow={isShowSwitchIcon}
          onClick={() => switchLandmarkFn(false)}
        />
        <PackGif gifUrl={packGifURL} />
        <RightIcon
          isShow={isShowSwitchIcon}
          onClick={() => switchLandmarkFn(true)}
        />
      </CommonFlexContainer>
    </>
  );
};
