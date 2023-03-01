import React, { useEffect, useState } from 'react';
import { Interval, RecorderState } from '../../types/recorder';
import { useTimer } from '../timer/timer.hooks';

interface Props {
  maxRecordSecond: number;
}
export const useWASMRecorder = ({ maxRecordSecond }: Props) => {
  const [recorder, setRecorder] = useState<any>(null);
  const timerProps = useTimer(3);

  const defaultMinutes = Number(Math.floor(maxRecordSecond / 60).toFixed(0));
  const defaultSeconds = maxRecordSecond % 60;

  const defaultRecorderState: RecorderState = {
    isLoading: false,
    isRecording: false,
    isUploadSuccess: false,
    audioFiles: [],
    audioURLs: [],
    recordingMinutes: defaultMinutes,
    recordingSeconds: defaultSeconds,
  };
  const [recorderState, setRecorderState] = useState(defaultRecorderState);

  useEffect(() => {
    if (timerProps.isTimesUp) {
      startRecording2();
    }
  }, [timerProps.isTimesUp]);

  useEffect(() => {
    const startRecord = async () => {
      if (recorder && (recorderState?.isRecording ?? false)) {
        // start
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
      }
    };
    startRecord();
  }, [recorder, recorderState.isRecording]);

  useEffect(() => {
    let recordingInterval: Interval = null;

    if (recorderState.isRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: RecorderState) => {
          const currentRemainingSecond =
            prevState.recordingMinutes * 60 + prevState.recordingSeconds;

          const isReachMaxRecordSecond = currentRemainingSecond <= 0;
          if (isReachMaxRecordSecond) {
            typeof recordingInterval === 'number' &&
              clearInterval(recordingInterval);
            stopRecording();
            return prevState;
          }
          // 一分鐘向下減
          const isNegative = currentRemainingSecond < 0;
          const isMatchTheEndOfMinute = prevState.recordingSeconds <= 0;
          const isInAMinute =
            prevState.recordingSeconds > 0 && prevState.recordingSeconds <= 59;
          if (!isNegative && isMatchTheEndOfMinute)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes - 1,
              recordingSeconds: 59,
            };
          else if (isInAMinute)
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds - 1,
            };
          else return prevState;
        });
      }, 1000);
    else
      typeof recordingInterval === 'number' && clearInterval(recordingInterval);

    return () => {
      typeof recordingInterval === 'number' && clearInterval(recordingInterval);
    };
  });

  const onClickRecord = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (recorderState.isRecording) {
      stopRecording();
    } else {
      timerProps.activateTimer();
    }
  };

  const initWasmRecorder = async () => {
    // @ts-ignore
    const vmsg = (await import('vmsg')).default;
    let recorderTmp;
    if (!recorder) {
      recorderTmp = new vmsg.Recorder({
        wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm',
      });
    }
    setRecorder(recorderTmp);
    return recorderTmp ? recorderTmp : recorder;
  };

  const startRecording2 = async () => {
    try {
      console.info('startRecording2:', startRecording2);
      // @ts-ignore
      const vmsg = (await import('vmsg')).default;
      console.info('vmsg:', vmsg);
      await initWasmRecorder();

      setRecorderState({
        ...recorderState,
        isLoading: false,
        isRecording: true,
      });
    } catch (e) {
      console.error('startRecording error:' + e);
      setRecorderState({ ...recorderState, isLoading: false });
    }
  };

  const stopRecording = async () => {
    const recorderTmp = await initWasmRecorder();
    const blob = await recorderTmp.stopRecording();
    const curDateStr = new Date().getTime().toString();
    const file = new File([blob], `1119-con-${curDateStr}.mp3`);
    setRecorderState({
      audioFiles: recorderState.audioFiles.concat(file),
      audioURLs: recorderState.audioURLs.concat(URL.createObjectURL(blob)),
      isLoading: false,
      isUploadSuccess: false,
      isRecording: false,
      recordingMinutes: defaultMinutes,
      recordingSeconds: defaultSeconds,
    });
  };

  const setIsUploadSuccess = (isSuccess: boolean) => {
    setRecorderState({
      ...recorderState,
      isUploadSuccess: isSuccess,
    });
  };

  const removeAllRecords = () => {
    setRecorderState(defaultRecorderState);
  };

  return {
    recorderState,
    removeAllRecords,
    setIsUploadSuccess,
    onClickRecord,
    prepareCountdownSec: timerProps.seconds,
    prepareCountdownEnded: timerProps.isTimesUp,
    isPrepareCountActivated: timerProps.isTimerActive,
  };
};
