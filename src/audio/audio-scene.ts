import SceneInit from '../3d/lib/common/SceneInit';
import React from 'react';
import * as THREE from 'three';
import { fragmentShader, vertexShader } from '../3d/lib/audio-essence-shader/Shaders';
import { NFT_ENUM_TYPE } from '../api/types/nft-enum.types';

export class AudioScene {
  public analyser: AnalyserNode;

  public audioBuffer: AudioBuffer | undefined;
  public audioContext: AudioContext;
  public audioFullDuration: number;
  public currentPlayingTime: number;
  public dataArray: Uint8Array;
  public isPlaying: boolean;
  public onDragNewTime: number | undefined;
  public pausedAt: number;
  public pauseUIPlayer: () => void;
  // @ts-ignore
  public scene: SceneInit;
  public setDuration: React.Dispatch<number>;
  public source: AudioBufferSourceNode | null | undefined;
  public startedAt: number;

  constructor(
    AudioContextGlobal: any,
    audioBuffer: AudioBuffer | undefined,
    setDuration: React.Dispatch<number>,
    pauseUIPlayer: () => void,
  ) {
    this.audioContext = new AudioContextGlobal();
    this.audioBuffer = audioBuffer;
    this.setDuration = setDuration;
    this.pauseUIPlayer = pauseUIPlayer;
    this.currentPlayingTime = 0;
    this.startedAt = 0;
    this.pausedAt = 0;
    this.isPlaying = false;
    const durationFixedSec = Math.floor(audioBuffer?.duration ?? 0);
    console.info('AudioScene durationFixedSec:', durationFixedSec);
    setDuration(durationFixedSec);
  }

  public connectAudioBuffer = () => {
    this.source = undefined;
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.audioBuffer as AudioBuffer;
    this.audioFullDuration = this.audioBuffer?.duration ?? 0;
    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.analyser.fftSize = 1024;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  };

  // public getCurrentPlayingTime = (): number => {
  //   if (!this.audioContext) return 0;
  //   if (this.isStoped) return this.currentPlayingTime ?? 0;
  //   const playingTime = this.audioContext.currentTime ?? 0;
  //   // console.info('playingTime:', playingTime);
  //   return playingTime;
  // };

  public getCurrentPlayingTime = () => {
    if (!!this.pausedAt) {
      return this.pausedAt;
    }
    if (this.startedAt !== undefined && this.startedAt !== null) {
      return this.audioContext.currentTime - this.startedAt;
    }
    return 0;
  };

  public getDuration = () => {
    return this.audioBuffer?.duration ?? 0;
  };

  public getIsPlaying = () => {
    return this.isPlaying;
  };

  public initScene(
    isStart: boolean,
    essenceEnum: NFT_ENUM_TYPE,
    creatorModelName: string,
    audioUrl: string,
    setIsLoading: React.Dispatch<boolean> | undefined,
  ) {
    const isSkip = !isStart || !creatorModelName || !audioUrl;
    if (isSkip) return;
    this.scene = new SceneInit(
      'three-js-canvas',
      creatorModelName,
      setIsLoading,
      essenceEnum,
      audioUrl,
    );
    if (!this.scene) return;
    this.scene.initScene();
    // this.scene.createCursor();
    this.scene.animate();
  }
  //
  // public pauseFromTouchEnd = async (newTime: number) => {
  //   console.info('pauseFromTouchEnd newTime:', newTime);
  //   this.isPlaying = false;
  //   await this.audioContext.suspend();
  //   this.source?.disconnect();
  //   this.source?.stop(newTime);
  // };

  public pause = async () => {
    const currentTime = this.audioContext?.currentTime ?? 0;
    // console.info('currentTime:', currentTime);
    // console.info('this.startedAt:', this.startedAt);
    const elapsed = (this.audioContext?.currentTime ?? 0) - this.startedAt;
    // console.info('elapsed:', elapsed);
    this.stop();
    this.pausedAt = elapsed;
    // const currentPlayingTime = this.audioContext?.currentTime ?? 0;
    // console.info('pause currentPlayingTime:', currentPlayingTime);
    // this.isPlaying = false;
    // this.updateCurrentPlayingTime(currentPlayingTime);
    // await this.audioContext.suspend();
    // this.source?.disconnect();
    // this.source?.stop(0);
  };

  public play = async (isSkipRender3D: boolean) => {
    const offset =
      this.onDragNewTime !== undefined ? this.onDragNewTime : this.pausedAt;
    this.connectAudioBuffer();
    await this.audioContext.resume();
    this.source?.start(0, offset);
    this.startedAt = this.audioContext.currentTime - offset;
    this.pausedAt = 0;
    this.onDragNewTime = undefined;
    this.isPlaying = true;

    this.source?.addEventListener('ended', (ev) => {
      // console.info('audio ended!');
      if (this.isPlaying) {
        this.stop();
        this.pauseUIPlayer();
      }
    });

    if (isSkipRender3D) return;

    const uniforms = {
      u_time: {
        type: 'f',
        value: 1.0,
      },
      u_amplitude: {
        type: 'f',
        value: 3.0,
      },
      u_data_arr: {
        type: 'float[64]',
        value: this.dataArray,
      },
      // u_black: { type: "vec3", value: new THREE.Color(0x000000) },
      // u_white: { type: "vec3", value: new THREE.Color(0xffffff) },
    };

    // note: uncomment these geometries to see different visualizations
    // const planeGeometry = new THREE.BoxGeometry(64, 64, 8, 64, 64, 8);
    // const planeGeometry = new THREE.SphereGeometry(16, 64, 64);

    // note: set up plane mesh and add it to the scene
    // const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
    const planeGeometry = new THREE.RingGeometry(30, 0, 30, 50, 0, 6.283);
    // const planeGeometry = new THREE.SphereGeometry(16, 32, 32);
    // const planeGeometry = new THREE.CircleGeometry(64, 64);
    // const planeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    const planeCustomMaterial = new THREE.ShaderMaterial({
      // note: update the vertex's height, gutter, color
      uniforms, // dataArray, time
      vertexShader: vertexShader(), // define how the vertex position changed
      fragmentShader: fragmentShader(), // define the color
      wireframe: true,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeCustomMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.position.set(0.018, 0.95, 0.012);
    planeMesh.scale.set(0.019, 0.019, 0.019);
    // console.info('scene.current:', this.scene);
    this.scene?.scene?.add(planeMesh);

    const render = (time?: number) => {
      // note: update audio data 512
      // console.info('dataArray.length:', dataArray.length);
      this.analyser.getByteFrequencyData(this.dataArray);
      // this.getCurrentPlayingTime();

      // note: update uniforms
      uniforms.u_time.value = time ? time : 1.0;
      uniforms.u_data_arr.value = this.dataArray;

      // note: call render function on every animation frame
      requestAnimationFrame(render);
    };
    render();
  };

  public stop(stopTime = 0) {
    if (this.source) {
      this.source.disconnect();
      this.source.stop(stopTime);
      this.source = null;
    }
    this.pausedAt = 0;
    this.startedAt = 0;
    this.isPlaying = false;
  }

  public updateCurrentPlayingTime = (playingTime: number | undefined) => {
    if (playingTime === undefined || playingTime === null) return;
    this.currentPlayingTime = playingTime;
    // console.info(
    //   'updateCurrentPlayingTime, this.currentPlayingTime:',
    //   this.currentPlayingTime,
    // );
  };

  public updateCurrentPlayingTimeWhenOnDragEnd = async () => {
    // console.info('this.onDragNewTime:', this.onDragNewTime);
    // console.info('this.isPlaying:', this.isPlaying);
    if (this.isPlaying) {
      await this.pause();
      this.updateCurrentPlayingTime(this.onDragNewTime);
      await this.play(false);
    } else {
      this.updateCurrentPlayingTime(this.onDragNewTime);
    }
  };

  public updateDraggingNewTime = (isStart: boolean, newTime: number) => {
    // console.info('updateDraggingNewTime newTime:', newTime);
    // console.info('this.isPlaying:', this.isPlaying);
    this.onDragNewTime = newTime;
    if (this.isPlaying) {
      this.stop(newTime);
      this.play(false);
      // await this.pauseFromDraging(newTime);
      // await this.audioContext.close();
    } else {
      this.stop();
    }

    // this.updateCurrentPlayingTime(newTime);
    // await this.play(isStart);
  };
}
