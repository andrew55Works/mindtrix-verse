import SceneInit from '../3d/lib/common/SceneInit';
import React from 'react';
import * as THREE from 'three';
import { fragmentShader, vertexShader } from '../3d/lib/audio-essence-shader/Shaders';
import {NFT_ENUM_TYPE} from "../api/types/nft-enum.types";

export class AudioSceneWithElement {
  public analyser: AnalyserNode;

  public audioContext: AudioContext;
  public audioEle: HTMLAudioElement | null;
  public currentPlayingTime: number;
  public dataArray: Uint8Array;
  public isPlaying: boolean;
  public onDragNewTime: number | undefined;
  public pausedAt: number;
  public scene: SceneInit;
  public source: MediaElementAudioSourceNode | null | undefined;
  public startedAt: number;
  public audioKey: number;

  constructor(
    AudioContextGlobal: any,
    audioEle: HTMLAudioElement | null,
    audioKey: number,
    showroomEle?: HTMLCanvasElement,
  ) {
    this.audioContext = new AudioContextGlobal();
    this.audioEle = audioEle;
    this.audioKey = audioKey;
    this.currentPlayingTime = 0;
    this.startedAt = 0;
    this.pausedAt = 0;
    this.isPlaying = false;
  }

  public connectAudioElement = () => {
    this.source = undefined;
    const audioElmRef = document.querySelector(
      `#audio-three-js-${this.audioKey}`,
    ) as HTMLAudioElement;

    this.source = this.audioContext.createMediaElementSource(audioElmRef);
    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.analyser.fftSize = 1024;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  };

  public initScene(
    isInitThreeJS: boolean,
    essenceEnum: NFT_ENUM_TYPE,
    creatorModelName: string,
    audioUrl: string,
    setIsLoading: React.Dispatch<boolean> | undefined,
  ) {
    const isSkip = !isInitThreeJS || !creatorModelName || !audioUrl;
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

  public onPlay = () => {
    if (!this.source) {
      this.connectAudioElement();
    }

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

  public resume = () => {
    this.audioContext.resume();
  };
}
