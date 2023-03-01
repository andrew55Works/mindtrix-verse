import React, { FC } from 'react';
import { CommonFlexContainer } from '../../../common/flexbox/common-flex.styles';
import {
  MindtrixLogoLottie,
  SceneLoadingLottie,
} from './vienna-woods-loading-scene.styles';

interface Props {
  isSceneLoading: boolean;
  sceneLoadingProgress: number;
}
export const ViennaWoodsLoadingScene: FC<Props> = ({
  isSceneLoading,
  sceneLoadingProgress,
}) => {
  if (!isSceneLoading) return null;
  return (
    <CommonFlexContainer
      position={'absolute'}
      left={0}
      top={0}
      flexDirection={'column'}
      width={'100%'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'white'}
      zIndex={5}
    >
      <MindtrixLogoLottie />
      <SceneLoadingLottie progress={sceneLoadingProgress} />
    </CommonFlexContainer>
  );
};
