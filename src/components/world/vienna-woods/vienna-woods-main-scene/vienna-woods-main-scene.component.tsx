import React, { FC, useContext, useEffect, useState } from 'react';
import { CommonFlexContainer } from '../../../common/flexbox/common-flex.styles';
import * as S from './vienna-woods-main-scene.styles';
import {
  getMintingPackResultModalProps,
  PackMintingResultContent,
} from './vienna-woods-main-scene.styles';
import { CommonCircleSwitch } from '../../../common/input/common-switch';
import WorldLocationModal, {
  WorldLocationModelProps,
} from '../../../common/modal/world-location-modal';
import {
  ILandmarkModal,
  ViennaWorldFiles,
} from '../../../../types/vienna-world.types';
import { Landmark } from '../vienna-woods-landmark/vienna-woods-landmark.component';
import { _get } from '../../../../utils/lodash.utils';
import { useSelector } from 'react-redux';
import { selectCollectorProfile } from '../../../../redux/collector/collector.selector';
import { initialWallet } from '../../../../types/wallet.type';
import { ViennaSceneUtils } from '../../../../hooks/world/use-init-scene';
import { ViennaSoundUtils } from '../../../../hooks/world/use-init-sound';
import FramerModal from '../../../common/modal/framer-modal';
import { useMarketplaceBuyingI18n } from '../../../../hooks/i18n/i18n-marketplace.hooks';
import { ViennaWoodsContext } from '../../../../pages/world/vienna-woods';
import { ChildAccountInfo } from '../../../../types/creator.type';

interface Props {
  isShow: boolean;
  landmarkModalInfo: ILandmarkModal;
  SceneUtils: ViennaSceneUtils;
  SoundUtils: ViennaSoundUtils;
}
export const ViennaWoodsMainScene: FC<Props> = ({
  isShow,
  SceneUtils: {
    isSceneLoading,
    isMorning,
    viennaWoodsScene,
    playLandingAnimation,
    updateDayNightLight,
    onHoverLocationName,
    onClickLocationName,
    setOnClickLocationName,
    setOnHoverLocationName,
  },
  SoundUtils: { playClickSound, playHoverSound },
  landmarkModalInfo: { pack, landmark },
}) => {
  const viennaWoodsContext = useContext(ViennaWoodsContext);
  const childAccountInfo =
    viennaWoodsContext?.childAccountInfo ?? new ChildAccountInfo();
  const setChildAccountInfo = viennaWoodsContext?.setChildAccountInfo;
  const onChainTxStatusObj = viennaWoodsContext?.onChainTxStatusObj;
  const tx = onChainTxStatusObj?.tx;
  const setIsShowLoadingLogo = viennaWoodsContext?.setIsShowLoadingLogo;
  const purchasedPack = viennaWoodsContext?.purchasedPack ?? null;
  const marketplaceText = useMarketplaceBuyingI18n();
  const [isMintingPackSuccess, setIsMintingPackSuccess] = useState(false);
  const [isShowMintingPackResultModal, setIsShowMintingPackResultModal] =
    useState(false);
  const collectorProfile = useSelector(selectCollectorProfile);
  const collectorWallet = collectorProfile?.wallet ?? initialWallet;
  const collectorWalletAddress = collectorWallet?.blocto?.address ?? '';

  const nftEdition = 1500;

  useEffect(() => {
    const isSealed = tx?.isSealed ?? false;
    const isError = tx?.errorMessage ?? null;
    const isModalDismissed = !(tx?.isShow ?? false);
    if (isSealed || isError) {
      if (setIsShowLoadingLogo) setIsShowLoadingLogo(false);
    }
    if (isSealed && isModalDismissed) {
      const isSuccess = (tx?.transactionStatus ?? -1) === 4;
      if (isSuccess) {
        const isCreatingChildAccount =
          childAccountInfo?.isCreatingChildAccount ?? false;
        if (!isCreatingChildAccount) {
          // buy pack flow
          onClick.dismissLocationModal();
          playLandingAnimation(onClickLocationName, () => {
            setIsMintingPackSuccess(isSuccess);
            setIsShowMintingPackResultModal(true);
          });
        }
      }
    }
  }, [tx, childAccountInfo]);

  const onClick = {
    daytimeSwitch: () => {
      updateDayNightLight();
    },

    dismissLocationModal: () => {
      setOnClickLocationName('');
    },
    switchLandmarkFn: (isForward: boolean) => {
      playClickSound();
      setOnClickLocationName('');

      const landmarkNames = Object.keys(ViennaWorldFiles.landmarks).filter(
        (name) => {
          return !!_get(
            ViennaWorldFiles.landmarks,
            [name, 'isContainsPack'],
            false,
          );
        },
      );
      const index = landmarkNames.indexOf(onClickLocationName);
      const currentIndex = index >= 0 ? index : 0;
      const maxIndex = landmarkNames.length - 1;
      let nextIndex = currentIndex + (isForward ? 1 : -1);
      nextIndex =
        nextIndex < 0 ? maxIndex : nextIndex > maxIndex ? 0 : nextIndex;
      const nextLandmarkName = _get(
        landmarkNames,
        [nextIndex.toString()],
        '',
      ) as string;
      const t = setTimeout(() => {
        setOnClickLocationName(nextLandmarkName);
      }, 280);
    },
    location: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      playClickSound();
      const id = e?.currentTarget?.id ?? '';
      const landmarkName = id?.replace('hover_button_', '');
      const isContainsPack = _get(
        ViennaWorldFiles,
        ['landmarks', landmarkName, 'isContainsPack'],
        false,
      );
      if (isContainsPack) {
        setOnClickLocationName(landmarkName);
      }
    },
  };
  const onHover = {
    location: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const landmarkName = (e?.currentTarget?.id ?? '')?.replace(
        'hover_button_',
        '',
      );
      const eventType = e.type;
      if (onHoverLocationName === landmarkName) return;
      playHoverSound();
      setOnHoverLocationName(landmarkName);
    },
  };
  const onBlur = {
    location: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOnHoverLocationName('');
    },
  };

  const locationModalProps: WorldLocationModelProps = {
    isEnableDismissModalFromClickingBackground: true,
    isShowModal: onClickLocationName !== '' && !!onClickLocationName,
    landmark,
    pack,
    onClick: {
      dismissModalFn: onClick.dismissLocationModal,
      switchLandmarkFn: onClick.switchLandmarkFn,
      leftButton: undefined,
      rightButton: undefined,
    },
    text: {
      cta1Button: 'Buy',
      cta2Button: 'Buy2',
      locationDescription: landmark?.description ?? '',
      locationName: landmark?.name ?? '',
      packName: pack?.name ?? 'Unique Pack',
    },
  };
  const LandmarkButtons = Object.keys(ViennaWorldFiles.landmarks).map(
    (landmarkName, index) => (
      <Landmark
        key={index}
        index={index}
        onHoverLandmarkName={onHoverLocationName}
        landmarkName={landmarkName}
        onClick={onClick.location}
        onHover={onHover.location}
        onBlur={onBlur.location}
      />
    ),
  );

  const MintingPackResultContent = (
    <PackMintingResultContent
      i18n={marketplaceText}
      nft_edition={nftEdition}
      nft_img={purchasedPack?.gifUrl ?? ''}
      nft_name={purchasedPack?.name ?? ''}
      nft_description_title={'Description:'}
      nft_description={purchasedPack?.description ?? ''}
      nft_name_title={'NFT Name:'}
      nft_minting_tx_title={'Transaction:'}
      nft_is_minting_success={isMintingPackSuccess}
      nft_minting_tx={tx?.id ?? ''}
    />
  );
  const mintingPackResultModalProps = getMintingPackResultModalProps({
    ContentLayout: MintingPackResultContent,
    isShowModal: isShowMintingPackResultModal,
    setIsShowModal: setIsShowMintingPackResultModal,
    isMintingSuccess: isMintingPackSuccess,
    walletAddress: collectorWalletAddress,
    marketplaceText,
  });

  return (
    <S.MainSceneBackground isShow={isShow} isMorning={isMorning}>
      <CommonFlexContainer
        position={'relative'}
        flexDirection={'column'}
        overflow={'hidden'}
      >
        <S.DayTimeContainer>
          <S.DayTimeSwitcher>
            <CommonCircleSwitch
              addressFromQuery={collectorWalletAddress}
              onClick={onClick.daytimeSwitch}
              isShowFilter={true}
            />
          </S.DayTimeSwitcher>
        </S.DayTimeContainer>

        <S.Scene>
          <S.Canvas />
        </S.Scene>
        {LandmarkButtons}
      </CommonFlexContainer>

      <WorldLocationModal {...locationModalProps} />
      <FramerModal {...mintingPackResultModalProps} />
    </S.MainSceneBackground>
  );
};
