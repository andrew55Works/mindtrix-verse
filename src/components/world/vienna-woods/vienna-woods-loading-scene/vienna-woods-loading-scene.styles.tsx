import Lottie from 'react-lottie';
import * as S from '../../../common/loading/modal-loading/modal-loading.styles';
import React, { FC } from 'react';
import SceneLoadingProgress from '../../../../assets/lottie/scene_loading_progress.json';
import MindtrixSquareLoadingWhite from '../../../../assets/lottie/mindtrix_logo_loading_white.json';

interface Props {
  progress: number;
}
export const SceneLoadingLottie: FC<Props> = ({ progress }) => {
  const options = {
    animationData: SceneLoadingProgress,
    loop: false,
    autoplay: false,
    isClickToPauseDisabled: true,
  };

  return (
    <S.LottieContainer width={300} height={76}>
      <Lottie segments={[progress, progress]} options={options} />
    </S.LottieContainer>
  );
};

export const MindtrixLogoLottie = () => {
  const options = {
    animationData: MindtrixSquareLoadingWhite,
    loop: true,
    autoplay: true,
    isClickToPauseDisabled: true,
  };

  return (
    <S.LottieContainer>
      <Lottie options={options} height={150} width={150} />
    </S.LottieContainer>
  );
};
