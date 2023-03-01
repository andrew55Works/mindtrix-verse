import React from 'react';

export class AudioBufferUtils {
  public audioBufferSources: Array<AudioBufferSourceNode | null> = [];
  public audioContext: AudioContext;
  public audioData: Array<any> = [];
  public audioRefs: Array<React.MutableRefObject<HTMLCanvasElement | null>> =
    [];

  public GlobalAudioContext: any;

  constructor() {
    // @ts-ignore
    this.GlobalAudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new this.GlobalAudioContext();
    this.audioRefs = [];
  }

  public connectFile = (id: number, arrayBuffer?: AudioBuffer) => {
    const isInit = id in this.audioBufferSources;
    let bufferTmp = arrayBuffer;

    if (isInit) {
      // @ts-ignore
      bufferTmp = this.audioBufferSources[id].buffer;
    }
    this.audioBufferSources[id] = this.audioContext.createBufferSource();
    // @ts-ignore
    this.audioBufferSources[id].buffer = bufferTmp;
    // @ts-ignore
    this.audioBufferSources[id].connect(this.audioContext.destination);
  };

  public decodeFile = async (arrayBuffer: ArrayBuffer, id: number) => {
    const audioBuffer = (await this.audioContext.decodeAudioData(
      arrayBuffer,
    )) as AudioBuffer;
    this.connectFile(id, audioBuffer);
  };

  public playMergedAudio = () => {
    Object.keys(this.audioBufferSources).forEach((id) => {
      const idNum = parseInt(id, 10);
      this.connectFile(idNum);
      this.audioBufferSources[idNum]?.start(0);
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
}
