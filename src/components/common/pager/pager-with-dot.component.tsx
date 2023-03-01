import React, { createContext, Dispatch, useContext, useState } from 'react';
import * as S from './pager.styles';
import { Button } from '../../../styles/styled-system/button.theme';
import { Trans } from 'next-i18next';
import { useSelector } from 'react-redux';
import { selectIsCreatorSignIn } from '../../../redux/creator/creator.selector';
import { selectIsCollectorSignIn } from '../../../redux/collector/collector.selector';
import { Dots } from './pager-dots.component';
import { Pagers } from './pager.component';
import { CommonFlexContainer } from '../flexbox/common-flex.styles';
import { PAGE_URL } from '../../../utils/page-router.utils';
import { useRouter } from 'next/router';
import {
  useCampaignRecordAnswersI18n,
  useCurrentLocale,
} from '../../../hooks/i18n/i18n.hooks';
import { I18N_NS_ENUM } from '../../../utils/i18n-utils';
import CoverImage from '../cover/cover-image.component';
import { useScreenHeight } from '../../../hooks/window/resize.hooks';
import { ImageContainer } from '../../record/records-uploaded/records-uploaded.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import RecordingCampaignNameSvg from '../../../assets/svg/icon_recording_campaign_name.svg';
import { CampaignContext } from '../../../pages/voice-to-run/[campaign_sub_page]';

export interface Pager {
  customLayout: JSX.Element | null;
  description: JSX.Element | null;
  img: JSX.Element | null;
  index: number;
  title: string;
}
export interface PagerContextProps {
  currentPageIndex: number;
  height: string | number;
  pagers: Array<Pager>;
  setPageIndex: Dispatch<number> | null;
  width: string | number;
}
export const PagerContext = createContext<PagerContextProps>({
  currentPageIndex: 0,
  pagers: [],
  setPageIndex: null,
  height: 0,
  width: 0,
});
export const PagerWithDot = () => {
  const isCreatorSignedIn = useSelector(selectIsCreatorSignIn);
  const isCollectorSignedIn = useSelector(selectIsCollectorSignIn);
  const isSignedIn = isCollectorSignedIn || isCreatorSignedIn;
  const [pageIndex, setPageIndex] = useState(0);
  const { screenSize, isMobileLayout } = useScreenHeight();
  const router = useRouter();
  const { isEventAvailable } = useContext(CampaignContext);
  const { text } = useCampaignRecordAnswersI18n();

  const onClick = {
    startRecording: async () => {
      router.push(PAGE_URL.collectors_campaign_voice_to_run_record.path, undefined, {
        shallow: true,
      });
    },
  };

  const { nextLang } = useCurrentLocale();

  const Step2Button = () => {
    return (
      <CommonFlexContainer
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'flex-start'}
        marginLeft={4}
        marginRight={4}
      >
        <Button.Square
          appearance={'filled'}
          size={'medium'}
          status={isEventAvailable ? 'primary' : 'disabled'}
          disabled={!isEventAvailable}
          color={'#000000'}
          background={
            isEventAvailable
              ? 'linear-gradient(-45deg, #E6DA44 0%, #FEF392 50%, #E6DA44 100%)'
              : ''
          }
          width={'100%'}
          fontSize={'20px'}
          marginTop={4}
          marginBottom={4}
          mx={0}
          minHeight={'60px'}
          justifyContent={'center'}
          children={
            isEventAvailable
              ? text.step3_button_start_recording
              : text.step3_button_coming_soon
          }
          onClick={onClick.startRecording}
        />
      </CommonFlexContainer>
    );
  };

  const Step0CustomLayout = () => {
    return (
      <CommonFlexContainer
        flexDirection={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <ImageContainer
          width={[250, 350, 400]}
          height={[250, 350, 400]}
          marginBottom={0}
        >
          <CoverImage
            alt={'banner'}
            src={'/img/running_shoes_poap_cover.gif'}
            width={'100%'}
            height={'100%'}
            fill={true}
          />
        </ImageContainer>
        <ImageContainer height={'auto'} marginBottom={0}>
          <RecordingCampaignNameSvg />
        </ImageContainer>
        <Text.h1
          status={'secondary'}
          fontSize={'20px'}
          my={'8px'}
          isAutoWrap={true}
          color={'#ffffff'}
          textAlign={'center'}
          children={text.seo_description}
        />
        <S.CampaignDate>
          <Text.h2
            status={'basic'}
            fontSize={'20px'}
            textAlign={'center'}
            my={0}
            isAutoWrap={true}
            children={text.step1_h0_description}
          />
        </S.CampaignDate>
        <Text.h2
          status={'primary'}
          fontSize={'20px'}
          fontWeight={800}
          marginTop={0}
          marginBottom={4}
          color={'#ffffff'}
          isAutoWrap={true}
          children={'01/01-01/15'}
        />
      </CommonFlexContainer>
    );
  };

  const Step1Description = () => (
    <Trans
      i18nKey={`${I18N_NS_ENUM.campaign_record_answers}:step1_h3_description`}
      defaults={''}
      values={{
        terms: text.step1_h3_terms,
        privacyPolicy: text.step1_h3_privacy_policy,
      }}
      components={[
        <a
          key='0'
          style={{ marginLeft: '4px', color: '#ffffff' }}
          target={'_blank'}
          href={`https://www.mindtrix.xyz/${nextLang}/terms`}
        />,
        <a
          key='1'
          style={{ marginLeft: '4px', color: '#ffffff' }}
          target={'_blank'}
          href={`https://www.mindtrix.xyz/${nextLang}/privacy-policy`}
        />,
      ]}
    />
  );

  const Step2Description = () => (
    <>
      <Trans
        i18nKey={`${I18N_NS_ENUM.campaign_record_answers}:step2_h3_description`}
        defaults={''}
        components={[
          <a
            key='0'
            style={{ marginLeft: '4px', color: '#ffffff' }}
            target={'_blank'}
            href={'https://youtu.be/HE7EDfSkf9s'}
          />,
        ]}
      />
    </>
  );

  const pagers: Array<Pager> = [
    {
      index: 0,
      title: '',
      description: null,
      img: null,
      customLayout: <Step0CustomLayout />,
    },
    {
      index: 1,
      title: text.step1_h1_title,
      description: <Step1Description />,
      img: (
        <CoverImage
          alt={'banner'}
          src={'/img/img_disclaimer.png'}
          width={'100%'}
          height={'100%'}
          fill={true}
          objectFit={'cover'}
        />
      ),
      customLayout: null,
    },
    {
      index: 2,
      title: text.step2_h1_title,
      description: <Step2Description />,
      img: (
        <CoverImage
          alt={'banner'}
          src={'/img/img_howtoplay.png'}
          width={'100%'}
          height={'100%'}
          fill={true}
          objectFit={'cover'}
        />
      ),
      customLayout: <Step2Button />,
    },
  ];

  const footerHeight = isMobileLayout ? 50 : 100;

  // 80px is the header height
  const height = (screenSize?.height ?? 580) - 80 - footerHeight;
  const width = screenSize?.width ?? '100%';

  const contextValue: PagerContextProps = {
    currentPageIndex: pageIndex,
    pagers,
    setPageIndex,
    height,
    width,
  };

  return (
    <S.PagerWithDotContainer>
      <PagerContext.Provider value={contextValue}>
        <Pagers />
        <Dots />
      </PagerContext.Provider>
    </S.PagerWithDotContainer>
  );
};
