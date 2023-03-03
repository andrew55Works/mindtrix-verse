import styled from 'styled-components';
import React from 'react';
import { useMarketplaceBuyingI18n } from '../../../../hooks/i18n/i18n-marketplace.hooks';
import { CommonFlexContainer } from '../../../common/flexbox/common-flex.styles';
import { Text } from '../../../../styles/styled-system/text.theme';
import CoverImage from '../../../common/cover/cover-image.component';
import { getTxFlowScanLink } from '../../../../utils/flow-blockchain.utils';
import { openNewWindow } from '../../../../utils/window.utils';
import {
  breakpointNumbers,
  breakpoints,
} from '../../../../styles/styled-system/styled-system.config';

interface MainBackgroundProps {
  isMorning: boolean;
  isShow: boolean;
}
export const MainSceneBackground = styled.div<MainBackgroundProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  opacity: ${(props) => (props?.isShow ?? false ? 1 : 0)};

  transition: background 1s ease-out;
  @property --myColor1 {
    syntax: '<color>';
    initial-value: #0f0;
    inherits: false;
  }

  @property --myColor2 {
    syntax: '<color>';
    initial-value: rgb(40, 190, 145);
    inherits: false;
  }
  background: linear-gradient(var(--myColor1), var(--myColor2));
  transition: --myColor1 0.8s ease-in-out, --myColor2 0.8s ease-in-out;

  --myColor1: ${(props) => (props?.isMorning ?? true ? '#a5ece3' : '#000000')};
  --myColor2: ${(props) =>
    props?.isMorning ?? true ? '#7ae27e' : '#181818'}; ;
`;

export const DayTimeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(80px);
`;
export const DayTimeSwitcher = styled.div`
  display: flex;
  width: 100%;
  max-width: 1276px;
  margin: 0 24px;
  flex-direction: row;
  justify-content: flex-start;
`;
export const Scene = styled.div.attrs((props) => ({
  id: 'scene-vienna-woods',
}))`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;
`;
export const Canvas = styled.canvas.attrs((props) => ({
  id: 'canvas-vienna-woods',
}))`
  height: 100vh;
`;

interface MintingResultContentProps {
  i18n: ReturnType<typeof useMarketplaceBuyingI18n>;
  nft_description: string;
  nft_description_title: string;
  nft_edition: number;
  nft_img: string;
  nft_is_minting_success: boolean;
  nft_minting_tx: string;
  nft_minting_tx_title: string;
  nft_name: string;
  nft_name_title: string;
}
export const PackMintingResultContent = ({
  i18n: { text },
  nft_edition,
  nft_img,
  nft_name,
  nft_description_title,
  nft_description,
  nft_name_title,
  nft_minting_tx_title,
  nft_is_minting_success,
  nft_minting_tx,
}: MintingResultContentProps) => {
  return (
    <CommonFlexContainer flexDirection={'column'} width={'100%'}>
      <CommonFlexContainer
        height={'280px'}
        width={'280px'}
        alignSelf={'center'}
      >
        <CoverImage src={nft_img} fill={true} />
      </CommonFlexContainer>
      <Text.h3
        status={'primary'}
        children={
          nft_is_minting_success
            ? text.label_success_title
            : text.label_fail_title
        }
      />
      <CommonFlexContainer flexDirection={'column'} width={'100%'}>
        <Text.h4 status={'basic'} margin={0} children={nft_name_title} />
        <Text.h5
          status={'primary'}
          marginTop={0}
          marginBottom={'6px'}
          children={nft_name}
        />

        <Text.h4 status={'basic'} margin={0} children={nft_description_title} />
        <Text.h5
          status={'primary'}
          marginTop={0}
          marginBottom={'6px'}
          children={nft_description}
        />

        {/*<Text.h4 status={'basic'} margin={0} children={'Edition:'} />*/}
        {/*<Text.h5*/}
        {/*  status={'primary'}*/}
        {/*  marginTop={0}*/}
        {/*  marginBottom={'6px'}*/}
        {/*  children={`#${nft_edition}`}*/}
        {/*/>*/}

        <Text.h4 status={'basic'} margin={0} children={nft_minting_tx_title} />
        <a href={getTxFlowScanLink(nft_minting_tx)} target={'_blank'}>
          <Text.h5
            status={'primary'}
            marginTop={0}
            marginBottom={'6px'}
            isAutoWrap={true}
            children={nft_minting_tx}
          />
        </a>
      </CommonFlexContainer>
    </CommonFlexContainer>
  );
};

export interface MintingPackResultModalProps {
  isEnableDismissModalFromClickingBackground?: boolean;
  isShowModal: boolean;
  maxWidth?: string;
  onClick: {
    dismissModalFn: () => void;
    leftButton?: () => void;
    rightButton?: () => void;
  };
  style?: {
    headerJustifyContent?: string;
    maxHeight?: string;
    padding?: string;
    transitionY?: string;
  };
  text: {
    description?: string | JSX.Element;
    leftButton?: string;
    rightButton?: string;
    title?: string;
  };
  width?: string;
}
export interface MintingPackResultModalParams {
  ContentLayout: JSX.Element;
  isMintingSuccess: boolean;
  isShowModal: boolean;
  marketplaceText: ReturnType<typeof useMarketplaceBuyingI18n>;
  screenSize: { height: number; width: number };
  setIsShowModal: React.Dispatch<boolean>;
  walletAddress: string;
}
export const getMintingPackResultModalProps = ({
  ContentLayout,
  isShowModal,
  screenSize,
  setIsShowModal,
  isMintingSuccess,
  walletAddress,
  marketplaceText: { text },
}: MintingPackResultModalParams): MintingPackResultModalProps => {
  // screenSize
  let maxWidth = '30vw';
  if (screenSize.width < breakpointNumbers.lg) {
    maxWidth = '80vw';
  } else {
    maxWidth = '30vw';
  }

  return {
    isEnableDismissModalFromClickingBackground: false,
    isShowModal,
    onClick: {
      dismissModalFn: () => setIsShowModal(false),
      leftButton: undefined,
      rightButton: () => {
        if (isMintingSuccess) {
          const flowview = `https://testnet.flowview.app/account/${walletAddress}/collection/MindtrixNFTCollection`;
          openNewWindow(flowview);
        } else {
          setIsShowModal(false);
        }
      },
    },
    text: {
      description: ContentLayout,
      leftButton: undefined,
      rightButton: isMintingSuccess
        ? text.dialog_success_button_ok
        : text.dialog_buyanother_button1,
      title: undefined,
    },
    width: 'auto',
    maxWidth,
  };
};
