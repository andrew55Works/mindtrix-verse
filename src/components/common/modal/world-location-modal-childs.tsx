import { ILandmark, IPack } from '../../../types/vienna-world.types';
import { NFTEssenceV2 } from '../../../api/types/nft.types';
import React, { FC } from 'react';
import { SafeFclResponse } from '../../../api/fcl/transactions.fcl';
import { PurchaseNFTContainer } from '../../purchase/purchase-nft.container';
import { PaymentStageEnum } from '../../../hooks/payment/payment.hooks';
import styled from 'styled-components';
import { FlexboxProps } from 'styled-system';
import { Text } from '../../../styles/styled-system/text.theme';
import * as S from './world-location-modal.styles';
import { PaymentContainer } from './world-location-modal.styles';
import dynamic from 'next/dynamic';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

interface LeftStoryProps {
  landmark: ILandmark;
  onClickLeftButton: () => void;
  pack: IPack;
}
const LeftStory: FC<LeftStoryProps & FlexboxProps> = ({
  landmark,
  pack,
  onClickLeftButton,
}) => {
  const landmarkId = landmark?.id ?? '';
  const SVG = dynamic(
    () =>
      import(
        `../../../assets/svg/vienna_world/landmark_${landmarkId}_black.svg`
      ),
  );
  const onClick = {
    landmarkSvg: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // @ts-ignore
      const tagName = (e.target?.tagName ?? '').toLowerCase();
      const isSvgPath = tagName === 'path';
      if (isSvgPath) {
        e.stopPropagation();
      }
    },
  };

  const LandMarkMaskSvg = SVG ? <SVG /> : null;
  const locationImgSrc = landmark?.detailedImgUrl ?? '';
  return (
    <>
      <S.LeftBackgroundColor
        themeColor={landmark?.themeColor ?? '#8C8477'}
        onClick={(e) => e.stopPropagation()}
      />
      <S.LeftImgAndTextContainer>
        <S.LocationDetailImgContainer onClick={onClick.landmarkSvg}>
          <S.LocationDetailImg alt='location_img' src={locationImgSrc} />
          <S.LandmarkMaskSvg>{LandMarkMaskSvg}</S.LandmarkMaskSvg>
        </S.LocationDetailImgContainer>
        <S.LeftContentContainer onClick={(e) => e.stopPropagation()}>
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

interface RightPaymentProps {
  dismissModalFn: () => void;
  landmark: ILandmark;
  pack: IPack;
  packTemplate: NFTEssenceV2 | null;
  switchLandmarkFn: (isForward: boolean) => void;
  walletAddress: string;
}
const RightPayment: FC<RightPaymentProps> = ({
  dismissModalFn,
  switchLandmarkFn,
  packTemplate,
  walletAddress,
  landmark,
  pack,
}) => {
  return (
    <PaymentContainer onClick={(e) => e.stopPropagation()}>
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
    </PaymentContainer>
  );
};

export const Modal = {
  Container,
  LeftStory,
  RightPayment,
};
