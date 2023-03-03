import React, { FC } from 'react';
import { ILandmark, IPack } from '../../../types/vienna-world.types';
import { NFTEssenceV2 } from '../../../api/types/nft.types';
import { WorldLocationModalMobile } from './world-location-modal-childs-mobile';
import { WorldLocationModalDesktop } from './world-location-modal-childs-desktop';
import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';

export interface LeftStoryProps {
  landmark: ILandmark;
  onClickLeftButton: () => void;
  pack: IPack;
}

export interface RightPaymentProps {
  dismissModalFn: () => void;
  landmark: ILandmark;
  pack: IPack;
  packTemplate: NFTEssenceV2 | null;
  switchLandmarkFn: (isForward: boolean) => void;
  walletAddress: string;
}

export const onClick = {
  landmarkSvg: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // @ts-ignore
    const tagName = (e.target?.tagName ?? '').toLowerCase();
    const isSvgPath = tagName === 'path';
    if (isSvgPath) {
      e.stopPropagation();
    }
  },
  stopPropagation: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  },
};
//
// const ModalRwd = (isMobileLayout: boolean) => {
//   return {
//     Container: isMobileLayout
//       ? WorldLocationModalMobile.Container
//       : WorldLocationModalDesktop.Container,
//     LeftStory: isMobileLayout
//       ? WorldLocationModalMobile.LeftStory
//       : WorldLocationModalDesktop.LeftStory,
//     RightPayment: isMobileLayout
//       ? WorldLocationModalMobile.RightPayment
//       : WorldLocationModalDesktop.RightPayment,
//   };
// };

type ModalContentRwdProps = Omit<LeftStoryProps, 'onClickLeftButton'> &
  RightPaymentProps;
export const ContentRwd: FC<ModalContentRwdProps> = ({
  walletAddress,
  packTemplate,
  landmark,
  pack,
  dismissModalFn,
  switchLandmarkFn,
}) => {
  return (
    <>
      <WorldLocationModalDesktop.OutlineContainer
        display={['none', 'none', 'flex']}
      >
        <WorldLocationModalDesktop.LeftStory
          landmark={landmark}
          pack={pack}
          onClickLeftButton={dismissModalFn}
        />
        <WorldLocationModalDesktop.RightPayment
          dismissModalFn={dismissModalFn}
          switchLandmarkFn={switchLandmarkFn}
          packTemplate={packTemplate}
          walletAddress={walletAddress}
          landmark={landmark}
          pack={pack}
        />
      </WorldLocationModalDesktop.OutlineContainer>
      <WorldLocationModalMobile.PaymentAndStory
        dismissModalFn={dismissModalFn}
        switchLandmarkFn={switchLandmarkFn}
        packTemplate={packTemplate}
        walletAddress={walletAddress}
        landmark={landmark}
        pack={pack}
      />
    </>
  );
};
export const Container = styled.div<
  BorderProps & ColorProps & LayoutProps & SpaceProps
>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 3px 10px 4px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  position: relative;
  ${layout};
  ${border};
  ${space};
  ${color};

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
