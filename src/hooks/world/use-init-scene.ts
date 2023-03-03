import React, { useEffect, useState } from 'react';
import ViennaWoodsScene from '../../three-js/scene/vienna-woods-scene';
import { usePrevious } from '../utils/previous.hooks';
import { ViennaWorldFiles } from '../../types/vienna-world.types';

export interface ViennaSceneUtils {
  isMorning: boolean;
  isSceneLoading: boolean;
  onClickLocationName: string;
  onHoverLocationName: string;
  playLandingAnimation: (
    animationName: string,
    onAnimationEnded: () => void,
  ) => void;
  setIsMorning: React.Dispatch<boolean>;
  setIsSceneLoading: React.Dispatch<boolean>;
  setOnClickLocationName: React.Dispatch<string>;
  setOnHoverLocationName: React.Dispatch<string>;
  updateDayNightLight: () => void;
  viennaWoodsScene: ViennaWoodsScene | null;
}

export const useInitViennaScene = () => {
  const sceneId = 'scene-vienna-woods';
  const canvasId = 'canvas-vienna-woods';
  const [sceneLoadingProgress, setSceneLoadingProgress] = useState(0);
  const [isSceneLoading, setIsSceneLoading] = useState(true);
  const [onHoverLocationName, setOnHoverLocationName] = useState('');
  const previousHoverLocationName = usePrevious(onHoverLocationName);
  const [onClickLocationName, setOnClickLocationName] = useState('');

  const [viennaWoodsScene, setViennaWoodsScene] =
    useState<ViennaWoodsScene | null>(null);
  const [isMorning, setIsMorning] = useState(true);
  useEffect(() => {
    const initScene = async () => {
      const viennaWoodSceneTmp = new ViennaWoodsScene(
        sceneId,
        canvasId,
        setSceneLoadingProgress,
        setIsSceneLoading,
      );
      await viennaWoodSceneTmp.initScene();
      viennaWoodSceneTmp.animate();
      setViennaWoodsScene(viennaWoodSceneTmp);
    };
    initScene();
  }, []);

  useEffect(() => {
    const updateIsHoveringOfLandmark = () => {
      try {
        if (!viennaWoodsScene || !viennaWoodsScene.sceneReady) return;
        if (previousHoverLocationName === onHoverLocationName) return;

        const landmarkNames = Object.keys(ViennaWorldFiles.landmarks).filter(
          (n) => n !== onHoverLocationName,
        );
        const isCancelHovering =
          !!previousHoverLocationName && !onHoverLocationName;
        const isHovering = isCancelHovering ? false : true;
        const targetedLandmarkName = previousHoverLocationName
          ? previousHoverLocationName
          : onHoverLocationName;
        viennaWoodsScene.updateIsHoveringOfLandmark(
          isHovering,
          targetedLandmarkName,
        );

        landmarkNames.forEach((n) => {
          viennaWoodsScene.updateIsHoveringOfLandmark(false, n);
        });
      } catch (e) {
        console.error(e);
      }
    };
    updateIsHoveringOfLandmark();
  }, [onHoverLocationName]);

  const updateDayNightLight = () => {
    setIsMorning((v) => {
      const isMorningTmp = !v;
      viennaWoodsScene?.updateDayNightLight(isMorningTmp);
      return isMorningTmp;
    });
  };

  const playLandingAnimation = (
    animationName: string,
    onAnimationEnded: () => void,
  ) => {
    if (!animationName) return;
    viennaWoodsScene?.playLandingAnimation(animationName, onAnimationEnded);
  };

  return {
    sceneLoadingProgress,
    isSceneLoading,
    viennaWoodsScene,
    isMorning,
    onHoverLocationName,
    onClickLocationName,
    setIsSceneLoading,
    setIsMorning,
    setOnClickLocationName,
    setOnHoverLocationName,
    updateDayNightLight,
    playLandingAnimation,
  };
};
