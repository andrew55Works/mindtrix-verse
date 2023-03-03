import React, { FC, useState } from 'react';
import {
  Container,
  LeftStoryProps,
  onClick as LayoutOnClick,
  RightPaymentProps,
} from './world-location-modal-childs';
import { FlexboxProps } from 'styled-system';
import dynamic from 'next/dynamic';
import { PurchaseNFTContainer } from '../../purchase/purchase-nft.container';
import { PaymentStageEnum } from '../../../hooks/payment/payment.hooks';
import { CommonFlexContainer } from '../flexbox/common-flex.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import { Button } from '../../../styles/styled-system/button.theme';
import { getViennaWoodsLandmarkCommonI18n } from '../../../hooks/i18n/i18n-vienna-woods.hooks';
import { useTranslation } from 'next-i18next';
import * as S from './world-location-modal.styles';
import { CloseIcon } from '../../purchase/purchase-choose-pack/purchase-choose-pack.styles';
import * as PurchaseS from '../../purchase/purchase-nft.styles';

const Story: FC<Omit<LeftStoryProps, 'onClickLeftButton'> & FlexboxProps> = ({
  landmark,
  pack,
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
  const description = landmark?.description ?? '';

  return (
    <CommonFlexContainer
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
    >
      <S.LocationDetailImgMobileContainer>
        <S.LocationDetailImg alt='location_img' src={locationImgSrc} />
      </S.LocationDetailImgMobileContainer>

      <Text.h5
        status={'basic'}
        margin={'12px'}
        my={0}
        color={'#ffffff'}
        isAutoWrap={true}
        children={description}
      />
    </CommonFlexContainer>
  );
};

const PaymentAndStory: FC<RightPaymentProps> = ({
  dismissModalFn,
  switchLandmarkFn,
  packTemplate,
  walletAddress,
  landmark,
  pack,
}) => {
  const { t } = useTranslation();
  const tabIds = {
    pack: 'landmark-modal-tab-pack',
    story: 'landmark-modal-tab-story',
  };
  const [clickedTabId, setClickedTabId] = useState(tabIds.pack);
  const themeColor = landmark?.themeColor ?? '#e4e9f2';
  const landmarkName = landmark?.name ?? 'Landmark';
  const text = getViennaWoodsLandmarkCommonI18n(t);

  const onClick = {
    switchTab: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const tabId = e.currentTarget?.id ?? '';
      setClickedTabId(tabId);
    },
  };
  const isClickedPackTab = clickedTabId === tabIds.pack;

  return (
    <Container
      height={['100vh', '100vh', '70vh']}
      marginTop={['0', '0', '12px']}
      width={['100vw', '100vw', '100%']}
      marginBottom={['0', '0', '70px']}
      border={['', '', '3px solid #0c0c0c']}
      borderRadius={['0', '0', '20px']}
      backgroundColor={[themeColor, 'themeColor', '#e4e9f2']}
      margin={['0', '0', '12px 0 70px 0']}
      onClick={LayoutOnClick.stopPropagation}
      display={['flex', 'flex', 'none']}
    >
      <CommonFlexContainer flexDirection={'column'} width={'100%'} zIndex={3}>
        <CommonFlexContainer
          flexDirection={'row'}
          justifyContent={'flex-start'}
          alignItems={'center'}
        >
          <Text.h2
            status={'basic'}
            margin={'12px'}
            width={'100%'}
            color={'#ffffff'}
            isAutoWrap={true}
            children={landmarkName}
          />
          <CommonFlexContainer
            flexDirection={'row'}
            justifyContent={'flex-end'}
          >
            <CloseIcon onClick={dismissModalFn} />
          </CommonFlexContainer>
        </CommonFlexContainer>

        <CommonFlexContainer
          flexDirection={'row'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Button.Oval
            id={tabIds.pack}
            status={'primary'}
            minWidth={'70px'}
            size={'medium'}
            borderRadius={'22px'}
            appearance={'filled'}
            border={'2px solid #000000'}
            color={isClickedPackTab ? '#ffffff' : '#000000'}
            backgroundColor={isClickedPackTab ? '#000000' : '#ffffff'}
            onClick={onClick.switchTab}
            children={text.modal_tab_pack}
          />
          <Button.Oval
            id={tabIds.story}
            status={'primary'}
            minWidth={'70px'}
            size={'medium'}
            borderRadius={'22px'}
            appearance={'filled'}
            border={'2px solid #000000'}
            color={!isClickedPackTab ? '#ffffff' : '#000000'}
            backgroundColor={!isClickedPackTab ? '#000000' : '#ffffff'}
            onClick={onClick.switchTab}
            children={text.modal_tab_story}
          />
        </CommonFlexContainer>

        {isClickedPackTab ? (
          <CommonFlexContainer
            flexDirection={'column'}
            justifyContent={'flex-start'}
            alignSelf={'center'}
            width={'100%'}
            padding={'12px 0 0 12px'}
          >
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
        ) : (
          <Story landmark={landmark} pack={pack} />
        )}
      </CommonFlexContainer>

      <PurchaseS.SupportLinkText padding={'0 0 12px 12px'} />
    </Container>
  );
};

export const WorldLocationModalMobile = {
  PaymentAndStory,
};
