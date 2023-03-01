import { default as React } from 'react';
import {
  AudioInfo,
  useAudioPlayer,
} from '../../../components/common/player/player-audio.container';
import { TIME_FORMAT } from '../../../utils/datetime.utils';

export const useInitPlayer = () => {
  const {
    audioRef,
    setAudioInfo,
    endTimeObj: { setEndMin, setEndSec },
    updatePlayStartSecCursorUiAndStateFn,
    rowWidth,
  } = useAudioPlayer();
  const audioFns = {
    init: () => {
      if (!(audioRef?.current ?? null))
        throw new Error('Cannot init null audio.');
      const audioElm = audioRef?.current ?? new HTMLAudioElement();
      audioElm.oncanplay = () => {
        const durationSec = Math.floor(audioElm?.duration ?? 0);
        const durationStrHHMM = TIME_FORMAT.secToMMSS(durationSec);
        const audioInfoTmp = new AudioInfo();
        audioInfoTmp.durationSec = durationSec;
        audioInfoTmp.durationStrHHMM = durationStrHHMM;
        setAudioInfo(audioInfoTmp);
        const endTimeStrArr = durationStrHHMM.split(':');
        if (!!endTimeStrArr && endTimeStrArr.length > 0) {
          setEndMin(endTimeStrArr[0]);
          setEndSec(endTimeStrArr[1]);
        }
      };
      audioElm.ontimeupdate = () => {
        const currentAudioTimeSec = Math.floor(audioElm.currentTime);
        const currentAudioTimeStrHHMM =
          TIME_FORMAT.secToMMSS(currentAudioTimeSec);
        const durationSec = Math.floor(audioElm?.duration ?? 0);
        const durationStrHHMM = TIME_FORMAT.secToMMSS(durationSec);
        const audioInfoTmp = new AudioInfo();
        audioInfoTmp.currentTimeSec = currentAudioTimeSec;
        audioInfoTmp.currentTimeStrHHMM = currentAudioTimeStrHHMM;
        audioInfoTmp.durationSec = durationSec;
        audioInfoTmp.durationStrHHMM = durationStrHHMM;
        setAudioInfo(audioInfoTmp);
        // updatePlayStartSecCursorUiAndStateFn(currentAudioTimeSec, durationSec);
      };
    },
    audioX: () => {},
  };
  React.useEffect(() => {
    audioFns.init();
  }, []);
};

export const useInitDrag = () => {
  const {
    originalDurationSec,
    startWidth,
    endWidth,
    rowWidth,
    startTimeObj: { setStartMin, setStartSec },
    endTimeObj: { setEndMin, setEndSec },
  } = useAudioPlayer();

  const [startWidthValue, setStartWidthValue] = React.useState(0);
  const [endWidthValue, setEndWidthValue] = React.useState(0);
  const constraints = {
    start: { left: 0, right: rowWidth - endWidthValue - 3 },
    end: { left: (rowWidth - startWidthValue - 1) * -1, right: 0 },
  };

  React.useEffect(() => {
    startWidth.onChange((v) => {
      setStartWidthValue(v);
      const progressProportion = v / rowWidth;
      const startTimeSec = Number.parseInt(
        (originalDurationSec * progressProportion).toFixed(2),
        10,
      );
      const startTimeMMSS = TIME_FORMAT.secToMMSS(startTimeSec);
      const startTimeStrArr = startTimeMMSS.split(':');
      if (!!startTimeStrArr && startTimeStrArr.length > 0) {
        setStartMin(startTimeStrArr[0]);
        setStartSec(startTimeStrArr[1]);
      }
    });
    endWidth.onChange((v) => {
      setEndWidthValue(v);
      const progressProportion = v / rowWidth;
      const endTimeSec = Number.parseInt(
        (
          originalDurationSec -
          originalDurationSec * progressProportion
        ).toFixed(2),
        10,
      );
      const endTimeMMSS = TIME_FORMAT.secToMMSS(endTimeSec);
      const endTimeStrArr = endTimeMMSS.split(':');
      if (!!endTimeStrArr && endTimeStrArr.length > 0) {
        setEndMin(endTimeStrArr[0]);
        setEndSec(endTimeStrArr[1]);
      }
    });
  }, [rowWidth, originalDurationSec]);

  return {
    constraints,
  };
};
