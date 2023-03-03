import React, { FC, useContext } from 'react';
import { AnimatePresence, motion, MotionStyle } from 'framer-motion';
import * as Modal from './world-location-modal-childs';
import { useSelector } from 'react-redux';
import { selectCollectorProfile } from '../../../redux/collector/collector.selector';
import { initialWallet } from '../../../types/wallet.type';
import { useGetShowFromRemote } from '../../../hooks/show/get-show.hooks';
import { useEssenceOnChainData } from '../../../hooks/essence/get-essence-on-chain-data.hooks';
import { ILandmark, IPack } from '../../../types/vienna-world.types';
import { ViennaWoodsContext } from '../../../pages/world/vienna-woods';

export const _style = {
  backgroundCover: (): MotionStyle => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,.5)',
    zIndex: 1,
  }),
  modal: (): MotionStyle => ({
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
  }),
};

const framerVariants = {
  backgroundCover: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  modal: {
    hidden: {
      y: '-60%',
      x: '-50%',
      top: '50%',
      left: '50%',
      opacity: 0,
    },
    visible: {
      y: '-50%',
      x: '-50%',
      opacity: 1,
      top: '50%',
      left: '50%',
      transition: {
        delay: 0.2,
      },
    },
  },
};

export interface WorldLocationModelProps {
  isEnableDismissModalFromClickingBackground?: boolean;
  isShowModal: boolean;
  landmark: ILandmark;
  maxWidth?: string;
  onClick: {
    dismissModalFn: () => void;
    leftButton?: () => void;
    rightButton?: () => void;
    switchLandmarkFn: (isForward: boolean) => void;
  };
  pack: IPack;
  style?: {
    headerJustifyContent?: string;
    maxHeight?: string;
    padding?: string;
    transitionY?: string;
  };
  text: {
    cta1Button?: string;
    cta2Button?: string;
    locationDescription?: string | JSX.Element;
    locationName?: string | JSX.Element;
    packName?: string;
  };
  width?: string;
}

export const WorldLocationModal: FC<WorldLocationModelProps> = ({
  children,
  landmark,
  pack,
  isEnableDismissModalFromClickingBackground = true,
  isShowModal,
  onClick,
  text,
  maxWidth = '100vw',
  width = '40vw',
  style,
}) => {
  const collectorProfile = useSelector(selectCollectorProfile);
  const collectorWallet = collectorProfile?.wallet ?? initialWallet;
  const collectorWalletAddress = collectorWallet?.blocto?.address ?? '';
  const viennaWoodsContext = useContext(ViennaWoodsContext);
  const showGuid = 'ckyuerl3uwr3l0868dzvkb9bl';
  const essenceId = 28;
  const { show } = useGetShowFromRemote(showGuid);
  const { essence, refetch } = useEssenceOnChainData(
    show,
    essenceId,
    collectorWalletAddress,
    viennaWoodsContext?.setIsShowLoadingLogo,
  );

  const modalPadding = style?.padding ?? '30px 20px 20px 20px';
  const transitionY = style?.transitionY ?? '300px';
  const maxHeight = style?.maxHeight ?? '66%';
  const _onClick = {
    backgroundCover: () => {
      if (!isEnableDismissModalFromClickingBackground) return;
      onClick.dismissModalFn();
    },
  };

  return (
    <AnimatePresence exitBeforeEnter={true}>
      {isShowModal && (
        <motion.div
          style={_style.backgroundCover()}
          variants={framerVariants.backgroundCover}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
          onClick={_onClick.backgroundCover}
        >
          <motion.div style={_style.modal()} variants={framerVariants.modal}>
            <Modal.ContentRwd
              walletAddress={collectorWalletAddress}
              packTemplate={essence}
              pack={pack}
              landmark={landmark}
              dismissModalFn={onClick.dismissModalFn}
              switchLandmarkFn={onClick.switchLandmarkFn}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WorldLocationModal;
