import React, { useEffect, useRef, useState } from 'react';
import { TIME_FORMAT } from '../../../utils/datetime.utils';
import { useMotionValue, useTransform } from 'framer-motion';
import {
  updateEditingAudioSegmentEndTimeAction,
  updateEditingAudioSegmentStartTimeAction,
} from '../../../redux/essence/essence.slice';
import { Dispatch } from 'redux';
import _get from 'lodash.get';
import { AudioScene } from '../../../audio/audio-scene';
import { NFT_ENUM, NFT_ENUM_TYPE } from '../../../api/types/nft-enum.types';

export const useInitAudioBufferSource = (
  AudioContext: any,
  audioKey: number,
  creatorModelName: string | undefined,
  ipfsUrl: string,
  essenceEnum: NFT_ENUM_TYPE,
  isSkipRender3D: boolean,
  isPreviewing: boolean,
  setIsLoading: React.Dispatch<boolean> | undefined,
  pauseFn: () => Promise<void>,
) => {
  const isInitSceneOnceRef = useRef(false);
  const [audioObjectURL, setAudioObjectURL] = useState('');
  const [audioBuffer, setAudioBuffer] = useState();
  const [duration, setDuration] = useState(0);
  const [audioScene, setAudioScene] = useState<AudioScene | null>(null);
  const isAudioEssence = essenceEnum === NFT_ENUM.TYPE.PODCAST_AUDIO_SEGMENT;

  useEffect(() => {
    const fetchAudio = async () => {
      if (!ipfsUrl || !isAudioEssence) return;
      const res = await fetch(ipfsUrl);
      const arrayBuffer: ArrayBuffer = await res.arrayBuffer();
      const audioBufferTmp = await new AudioContext().decodeAudioData(
        arrayBuffer,
      );
      const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
      const objectURL = window.URL.createObjectURL(blob);
      setAudioBuffer(audioBufferTmp);
      setAudioObjectURL(objectURL);
    };
    fetchAudio();
  }, [ipfsUrl]);
  const creatorModelNameStr = creatorModelName ? creatorModelName : '';

  useEffect(() => {
    if (
      isInitSceneOnceRef.current ||
      !ipfsUrl ||
      (isAudioEssence && !audioBuffer) // should not block the image essence
    )
      return;
    const audioSceneTmp = new AudioScene(
      AudioContext,
      audioBuffer,
      setDuration,
      pauseFn,
    );
    if (!isSkipRender3D) {
      audioSceneTmp.initScene(
        !!creatorModelNameStr,
        essenceEnum,
        creatorModelNameStr,
        ipfsUrl,
        setIsLoading,
      );
    }
    setAudioScene(audioSceneTmp);
    isInitSceneOnceRef.current = true;
  }, [audioBuffer, isAudioEssence, creatorModelNameStr, ipfsUrl, setIsLoading]);

  return {
    audioScene,
    audioObjectURL,
    duration,
  };
};

export const useAudioPlayerControls = (
  audio_default_start_time_num: number,
  audio_default_end_time_num: number,
  audioInputRef: React.MutableRefObject<HTMLAudioElement | null>,
  durationSec: number,
  setDuration: React.Dispatch<number>,
  dispatch?: Dispatch,
) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const currentTimeRangeInputRef = React.useRef<HTMLInputElement | null>(null);
  const startTimeRangeInputRef = React.useRef<HTMLInputElement | null>(null);
  const endTimeRangeInputRef = React.useRef<HTMLInputElement | null>(null);
  const animationRef = React.useRef<any | null>(null);
  const draggingAnimationRef = React.useRef<any | null>(null);
  const sliderTrackRef = React.useRef<HTMLDivElement | null>(null);

  const minX = useMotionValue(0);
  const maxX = useMotionValue(0);
  const offsetMinWidthStatic = useTransform(minX, (v) => v);
  const offsetMaxWidthStatic = useTransform(maxX, (v) => v * -1);
  const [offsetMinWidth, setOffsetMinWidth] = React.useState(0);
  const [offsetMaxWidth, setOffsetMaxWidth] = React.useState(0);

  const [sliderWidth, setSliderWidth] = React.useState(0);

  const minValueBetween = 2;
  const [constraints, setConstraints] = React.useState({
    min: { left: 0, right: sliderWidth - minValueBetween },
    max: { left: sliderWidth * -1, right: 0 },
  });

  const [inputMinMins, setInputMinMins] = React.useState('00');
  const [inputMinSecs, setInputMinSecs] = React.useState('00');
  const [inputMaxMins, setInputMaxMins] = React.useState('00');
  const [inputMaxSecs, setInputMaxSecs] = React.useState('00');

  const getTimeArr = (MMSS: string) => MMSS.split(':');

  const updateTimeState = {
    startTime: (newTimeSec: number, minStr: string, secStr: string) => {
      if (dispatch)
        dispatch(updateEditingAudioSegmentStartTimeAction(newTimeSec));
      if (minStr) setInputMinMins(minStr);
      if (secStr) setInputMinSecs(secStr);
    },
    endTime: (newTimeSec: number, minStr: string, secStr: string) => {
      if (dispatch)
        dispatch(updateEditingAudioSegmentEndTimeAction(newTimeSec));
      if (minStr) setInputMaxMins(minStr);
      if (secStr) setInputMaxSecs(secStr);
    },
  };

  const getTimeMinAndSec = (timeSec: number) => {
    const timeArr = getTimeArr(TIME_FORMAT.secToMMSS(timeSec));
    if (!timeArr)
      return {
        min: '00',
        sec: '00',
      };
    const min = _get(timeArr, ['0'], undefined);
    const sec = _get(timeArr, ['1'], undefined);
    return { min, sec };
  };

  // init default time
  React.useEffect(() => {
    const maxTimeArr = getTimeArr(
      TIME_FORMAT.secToMMSS(
        audio_default_end_time_num ? audio_default_end_time_num : durationSec,
      ),
    );
    if (maxTimeArr) {
      setInputMaxMins(maxTimeArr[0]);
      if (maxTimeArr.length > 1) {
        setInputMaxSecs(maxTimeArr[1]);
      }
    }

    const minTimeArr = getTimeArr(
      TIME_FORMAT.secToMMSS(
        audio_default_start_time_num ? audio_default_start_time_num : 0,
      ),
    );

    if (minTimeArr) {
      setInputMinMins(minTimeArr[0]);
      if (minTimeArr.length > 1) {
        setInputMinSecs(minTimeArr[1]);
      }
    }
    const sliderWidthTmp = sliderTrackRef.current?.offsetWidth ?? 100;
    if (audio_default_start_time_num === 0 && audio_default_end_time_num === 0)
      return;
    const defaultStartWidth =
      (audio_default_start_time_num / durationSec) * sliderWidthTmp;
    const defaultEndWidth =
      sliderWidthTmp -
      sliderWidthTmp * (audio_default_end_time_num / durationSec);
    if (currentTimeRangeInputRef.current && audioInputRef.current) {
      console.info(
        'set default startTime:',
        audio_default_start_time_num.toString(),
      );
      currentTimeRangeInputRef.current.value =
        audio_default_start_time_num.toString();
      audioInputRef.current.currentTime = audio_default_start_time_num;
    }

    minX.set(defaultStartWidth);
    maxX.set(defaultEndWidth * -1);
  }, [audio_default_start_time_num]);

  React.useEffect(() => {
    const updateTimeByOffsetX = (offsetX: number, isMinMode: boolean) => {
      if (isNaN(offsetX) || !sliderWidth) return;
      const offsetXPercentage = offsetX / sliderWidth;
      const newTimeSec = Math.floor(durationSec * offsetXPercentage);
      const { min, sec } = getTimeMinAndSec(newTimeSec);
      if (isMinMode) {
        updateTimeState.startTime(newTimeSec, min, sec);
      } else {
        updateTimeState.endTime(newTimeSec, min, sec);
      }
    };

    // offsetMinWidthStatic.onChange((v) => {
    //   setOffsetMinWidth(v);
    //   console.info('offsetMinWidthStatic.onChange v:', v);
    //   updateTimeByOffsetX(v, true);
    // });
    //
    // offsetMaxWidthStatic.onChange((v) => {
    //   setOffsetMaxWidth(v);
    //   updateTimeByOffsetX(sliderWidth - v, false);
    // });

    // return () => {
    //   offsetMinWidthStatic.clearListeners();
    //   offsetMaxWidthStatic.clearListeners();
    // };
  }, [durationSec, sliderWidth]);
  // init Slider Width
  React.useEffect(() => {
    const sliderWidthTmp = sliderTrackRef.current?.offsetWidth ?? 100;
    setSliderWidth(sliderWidthTmp);
    setConstraints({
      min: {
        left: 0,
        right: sliderWidthTmp - offsetMaxWidth - minValueBetween,
      },
      max: {
        left: (sliderWidthTmp - offsetMinWidth) * -1,
        right: 0,
      },
    });
  }, [sliderTrackRef.current?.offsetHeight, offsetMinWidth, offsetMaxWidth]);

  React.useEffect(() => {
    if (!audioInputRef.current || !audioInputRef.current) return;
    const durationFixedSec = Math.floor(audioInputRef.current?.duration ?? 0);
    setDuration(durationFixedSec);
    const endTime = audio_default_end_time_num
      ? audio_default_end_time_num
      : durationFixedSec;
    const { min, sec } = getTimeMinAndSec(endTime);
    updateTimeState.endTime(endTime, min, sec);
    // updateTimeState.startTime(0, '00', '00');
    if (!currentTimeRangeInputRef.current) return;
    currentTimeRangeInputRef.current.max = durationFixedSec.toString();
  }, [
    audioInputRef.current?.onloadedmetadata,
    audioInputRef.current?.readyState,
    audioInputRef.current,
    currentTimeRangeInputRef.current,
  ]);

  return {
    isPlaying,
    slider: {
      constraints,
      width: sliderWidth,
      minValueBetween,
      minX,
      maxX,
      offsetMinWidthStatic,
      offsetMaxWidthStatic,
      offsetMinWidth,
      offsetMaxWidth,
    },
    ref: {
      animation: animationRef,
      draggingAnimationRef,
      rangeInput: {
        currentTime: currentTimeRangeInputRef,
        currentMaxTime: endTimeRangeInputRef,
        currentMinTime: startTimeRangeInputRef,
      },
      sliderTrack: sliderTrackRef,
    },
    timer: {
      inputMinSecs,
      inputMinMins,
      inputMaxSecs,
      inputMaxMins,
    },
    setState: {
      isPlaying: setIsPlaying,
      sliderWidth: setSliderWidth,
      inputMinSecs: setInputMinSecs,
      inputMinMins: setInputMinMins,
      inputMaxSecs: setInputMaxSecs,
      inputMaxMins: setInputMaxMins,
      offsetMinWidth: setOffsetMinWidth,
      offsetMaxWidth: setOffsetMaxWidth,
    },
  };
};
