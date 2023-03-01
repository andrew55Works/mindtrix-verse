import { Dispatch, SetStateAction } from 'react';

export type Recorder = {
  audio: string | null;
  file?: File;
  initRecording: boolean;
  mediaRecorder: MediaRecorder | null;
  mediaStream: MediaStream | null;
  recordingMinutes: number;
  recordingSeconds: number;
};

export type UseRecorder = {
  cancelRecording: () => void;
  recorderState: Recorder;
  saveRecording: () => void;
  startRecording: () => void;
};

export interface RecorderState {
  audioFiles: Array<File>;
  audioURLs: Array<string>;
  isLoading: boolean;
  isRecording: boolean;
  isUploadSuccess: boolean;
  recordingMinutes: number;
  recordingSeconds: number;
}

export type RecorderTimerProps = {
  recorderState: RecorderState;
};

export type RecorderTriggerProps = {
  // handlers: {
  //   cancelRecording: () => void;
  //   saveRecording: () => void;
  //   startRecording: () => void;
  // };
  onClickRecord: () => void;
  recorderState: RecorderState;
};

export type RecordingsListProps = {
  // audio: string | null;
  // file: File;
  // files: Array<File>;
  // setFiles: React.Dispatch<Array<File>>;
  audioURLs: Array<string>;
};

export type Audio = {
  audio: string;
  file: File;
  key: string;
};

export type Interval = null | number | ReturnType<typeof setInterval>;
export type SetRecorder = Dispatch<SetStateAction<Recorder>>;
export type SetRecordings = Dispatch<SetStateAction<Array<Audio>>>;
export type AudioTrack = MediaStreamTrack;
export type MediaRecorderEvent = {
  data: Blob;
};
