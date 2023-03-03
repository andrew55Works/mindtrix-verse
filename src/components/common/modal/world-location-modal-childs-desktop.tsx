import React, { FC } from 'react';
import { PurchaseNFTContainer } from '../../purchase/purchase-nft.container';
import { PaymentStageEnum } from '../../../hooks/payment/payment.hooks';
import styled from 'styled-components';
import { FlexboxProps, layout, LayoutProps } from 'styled-system';
import { Text } from '../../../styles/styled-system/text.theme';
import * as S from './world-location-modal.styles';
import { PaymentContainer } from './world-location-modal.styles';
import {
  Container,
  LeftStoryProps,
  onClick,
  RightPaymentProps,
} from './world-location-modal-childs';
import dynamic from 'next/dynamic';
import * as PurchaseS from '../../purchase/purchase-nft.styles';
import { CloseIcon } from '../../purchase/purchase-choose-pack/purchase-choose-pack.styles';
import { CommonFlexContainer } from '../flexbox/common-flex.styles';

const OutlineContainer = styled.div<LayoutProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  ${layout};
`;

const LeftStory: FC<LeftStoryProps & FlexboxProps> = ({
  landmark,
  pack,
  onClickLeftButton,
}) => {
  const landmarkId = landmark?.id ?? '';
  // cannot separate dynamic url to other files
  const SVG = dynamic(
    () =>
      import(
        `../../../assets/svg/vienna_world/landmark_${landmarkId}_black.svg`
      ),
  );

  const LandMarkMaskSvg = SVG ? <SVG /> : null;
  const locationImgSrc = landmark?.detailedImgUrl ?? '';
  return (
    <>
      <S.LeftBackgroundColor
        themeColor={landmark?.themeColor ?? '#8C8477'}
        onClick={onClick.stopPropagation}
      />
      <S.LeftImgAndTextContainer>
        <S.LocationDetailImgDesktopContainer onClick={onClick.landmarkSvg}>
          <S.LocationDetailImg alt='location_img' src={locationImgSrc} />
          <S.LandmarkMaskSvg>{LandMarkMaskSvg}</S.LandmarkMaskSvg>
        </S.LocationDetailImgDesktopContainer>
        <S.LeftContentContainer onClick={onClick.stopPropagation}>
          <Text.h2
            status={'basic'}
            fontSize={'40px'}
            color={'#ffffff'}
            maxWidth={'200px'}
            lineHeight={'47px'}
            isAutoWrap={true}
            marginTop={0}
            marginBottom={0}
            height={'100%'}
            flexShrink={0}
            py={2}
          >
            {landmark?.name ?? ''}
          </Text.h2>
          <S.LeftTextScrollContainer>
            <Text.h4
              flex={8}
              status={'basic'}
              color={'#ffffff'}
              isAutoWrap={true}
              marginTop={0}
              py={2}
              paddingRight={'20px'}
              marginBottom={0}
            >
              {landmark?.description ?? ''}
            </Text.h4>
          </S.LeftTextScrollContainer>
        </S.LeftContentContainer>
      </S.LeftImgAndTextContainer>
    </>
  );
};

const RightPayment: FC<RightPaymentProps> = ({
  dismissModalFn,
  switchLandmarkFn,
  packTemplate,
  walletAddress,
  landmark,
  pack,
}) => {
  return (
    <PaymentContainer
      maxWidth={'450px'}
      marginLeft={'70px'}
      marginRight={'60px'}
      onClick={onClick.stopPropagation}
    >
      <Container
        height={'70vh'}
        marginTop={'12px'}
        marginBottom={'70px'}
        width={'100%'}
        border={'3px solid #0c0c0c'}
        borderRadius={'20px'}
        backgroundColor={'#e4e9f2'}
        margin={'12px 0 70px 0'}
      >
        <CommonFlexContainer
          flexDirection={'column'}
          justifyContent={'flex-start'}
          alignSelf={'center'}
          width={'100%'}
          padding={'12px 12px 0 24px'}
        >
          <CommonFlexContainer
            width={'100%'}
            flexDirection={'row'}
            justifyContent={'flex-end'}
          >
            <CloseIcon onClick={dismissModalFn} />
          </CommonFlexContainer>

          <PurchaseNFTContainer
            dismissModalFn={dismissModalFn}
            switchLandmarkFn={switchLandmarkFn}
            defaultPaymentMethod={PaymentStageEnum.WORLD_PACK}
            essenceId={packTemplate?.essence_uuid ?? 0}
            essence={packTemplate}
            walletAddress={walletAddress}
            pack={pack}
            landmark={landmark}
          />
        </CommonFlexContainer>

        <PurchaseS.SupportLinkText padding={'0 12px 12px 24px'} />
      </Container>
    </PaymentContainer>
  );
};

export const WorldLocationModalDesktop = {
  OutlineContainer,
  LeftStory,
  RightPayment,
};
