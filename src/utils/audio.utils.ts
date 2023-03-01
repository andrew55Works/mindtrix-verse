import { _get } from './lodash.utils';
import React from 'react';

export class AudioUtils {
  public audioBufferSources: Array<AudioBufferSourceNode | null> = [];
  public audioContext: AudioContext;
  public audioData: Array<any> = [];
  public audioRefs: Array<React.MutableRefObject<HTMLCanvasElement | null>> =
    [];

  public GlobalAudioContext: any;
  public mergedAudioFile: File | null = null;

  constructor(
    audioRefs: Array<React.MutableRefObject<HTMLCanvasElement | null>>,
  ) {
    // @ts-ignore
    this.GlobalAudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new this.GlobalAudioContext();
    this.audioRefs = audioRefs;
  }

  public decodeFile = async (arrayBuffer: ArrayBuffer, id: string) => {
    const index = parseInt(id.replace(/choose/g, ''), 10);
    const audioBuffer = (await this.audioContext.decodeAudioData(
      arrayBuffer,
    )) as AudioBuffer;

    this.audioBufferSources[index] = this.audioContext.createBufferSource();
    // @ts-ignore
    this.audioBufferSources[index].buffer = audioBuffer;
    // @ts-ignore
    this.audioBufferSources[index].connect(this.audioContext.destination);
    this.audioData[index] = Object.assign(
      { buffer: audioBuffer },
      await this.showBuffer(audioBuffer, index),
    );
  };

  public playMergedAudio = () => {
    if (this.audioData.length < 2) {
      throw new Error('Should include at least two audios');
    }

    this.audioBufferSources.forEach((node) => {
      node?.start(0);
    });

    // const bufferSource2 = this.audioContext.createBufferSource();
    // this.audioBufferSource1.buffer = this.audioData[0];
    // bufferSource2.buffer = this.audioData[1];

    // this.audioBufferSource1.connect(this.audioContext.destination);
    // bufferSource2.connect(dest);

    // const FinalStream = this.audioContext.destination.;

    // const mergedAudio = new MediaRecorder(FinalStream);
    // const fileName = 'merged-audio';
    // mergedAudio.addEventListener('dataavailable', (e) => {
    //   const mergedAudioFile = new File([e.data], fileName, {
    //     type: 'video/webm;codecs=h264',
    //   });
    //   console.info('mergedAudioFile:', mergedAudioFile);
    //   this.mergedAudioFile = mergedAudioFile;
    // });
    // mergedAudio.start();
    // this.audioBufferSource1.start();
  };

  public showBuffer = async (buffer: AudioBuffer, index: number) => {
    const audioRef = _get(
      this.audioRefs,
      [index.toString()],
      null,
    ) as React.MutableRefObject<HTMLCanvasElement>;

    const cs = audioRef.current as HTMLCanvasElement;
    const ctx = audioRef.current.getContext('2d');
    if (!ctx || !cs) return {};
    ctx.clearRect(0, 0, cs.width, cs.height);
    const lth = buffer.getChannelData(1).length;
    const arr = buffer.getChannelData(1);
    const w = Math.floor(lth / cs.width / 2);
    ctx.fillStyle = '#efefef';
    const list = [];
    for (let i = 0; i < cs.width; i++) {
      list.push(arr[i * w] * cs.height);
      ctx.fillRect(
        i,
        (cs.height - arr[i * w] * cs.height) / 2,
        1,
        arr[i * w] * cs.height,
      );
    }
    ctx.save();
    // @ts-ignore
    cs.dataset['index'] = index;

    return {
      cs,
      ctx,
      step: w,
      list,
    };
  };
}
