import { usePrevious } from '../utils/previous.hooks';
import React, { useEffect } from 'react';

export const useResetNFTCardState = (
  currentPlayingAudioIndex: number | null,
  index: number,
  setIsHover: React.Dispatch<boolean>,
) => {
  const isShowPreviewControl = currentPlayingAudioIndex === index;
  const preIsShowPreviewControl = usePrevious(isShowPreviewControl);
  useEffect(() => {
    // reset hover when playing another audio
    if (preIsShowPreviewControl && !isShowPreviewControl) {
      setIsHover(false);
    }
  }, [isShowPreviewControl]);
  return {
    isShowPreviewControl,
  };
};
