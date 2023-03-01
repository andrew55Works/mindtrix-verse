export interface SegmentAudioDto {
  end_time: string;
  start_time: string;
}

export interface SegmentAudioBodyDto {
  audioFragments: Array<SegmentAudioDto>;
  url: string;
}

export enum IPFSFileTypeEnum {
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE',
  LITERATURE = 'LITERATURE',
  VIDEO = 'VIDEO',
}

export interface IPFSFileBasePojo {
  creator_name: string;
  description: string;
  guid?: string;
  name: string;
  storage_link: string;
  type: IPFSFileTypeEnum;
}

export interface AudioFragmentPojo {
  cid: string;
  creator_name: string;
  duration?: number;
  end_time: string;
  id: string;
  start_time: string;
}

export interface IPFSAudioFilePojo extends IPFSFileBasePojo {
  audio_detail: AudioFragmentPojo;
}

export interface UploadSegmentAudioBodyDto {
  audioFiles: Array<IPFSAudioFilePojo>;
}

export type SegmentAudioResVo = string;
