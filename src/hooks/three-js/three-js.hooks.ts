import * as THREE from 'three';
import { fragmentShader, vertexShader } from '../../3d/lib/audio-essence-shader/Shaders';
import React, { useEffect, useRef } from 'react';
import SceneInit from '../../3d/lib/common/SceneInit';
import { NFT_ENUM, NFT_ENUM_TYPE } from '../../api/types/nft-enum.types';

export const useAudioPlayer = (
  AudioContextGlobal: any,
  audioBuffer: AudioBuffer | undefined,
  audioKey: number,
  creatorModelName: string,
  setIsLoading: React.Dispatch<boolean>,
  isStart: boolean,
  essenceEnum: NFT_ENUM_TYPE,
  audioUrl: string,
) => {
  const scene = useRef<SceneInit | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const isInitOnce = useRef(false);
  let audioContext: AudioContext;
  let audioElement: HTMLMediaElement;
  let dataArray: Uint8Array;
  let analyser: AnalyserNode;
  const isAudioEssence = essenceEnum === NFT_ENUM.TYPE.PODCAST_AUDIO_SEGMENT;

  const setupAudioContext = async () => {
    // try {
    // @ts-ignore
    audioContext = new AudioContextGlobal();
    audioElement = document.getElementById(
      `myAudio-${audioKey}`,
    ) as HTMLMediaElement;
    try {
      if (audioBuffer && source?.current !== null) {
        console.info('has setupAudioContext!!');
        source.current = audioContext.createBufferSource();
        source.current.buffer = audioBuffer as AudioBuffer;
        analyser = audioContext.createAnalyser();
        source.current.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 1024;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      }
    } catch (e) {
      console.error('setupAudioContext error:', e);
    }
  };

  const pause = () => {
    console.info('pause:', source?.current);
    source?.current?.stop(0);
  };

  const play = async () => {
    if (audioContext === undefined) {
      await setupAudioContext();
    }
    console.info('===audio isStart:', isStart);
    if (!isStart) {
      return;
    }

    source?.current?.start();

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
        value: dataArray,
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
    console.info('scene.current:', scene.current);
    scene?.current?.scene?.add(planeMesh);

    const render = (time?: number) => {
      // note: update audio data 512
      // console.info('dataArray.length:', dataArray.length);
      analyser.getByteFrequencyData(dataArray);

      // note: update uniforms
      uniforms.u_time.value = !!time ? time : 1.0;
      uniforms.u_data_arr.value = dataArray;

      // note: call render function on every animation frame
      requestAnimationFrame(render);
    };

    render();
  };

  useEffect(() => {
    if (!isStart || !creatorModelName || !audioUrl || isInitOnce.current)
      return;
    scene.current = new SceneInit(
      'three-js-canvas',
      creatorModelName,
      setIsLoading,
      essenceEnum,
      audioUrl,
    );
    if (!scene) return;
    scene.current.initScene();
    // scene.current.createCursor();
    scene.current.animate();
    isInitOnce.current = true;
  }, [isStart, isAudioEssence, creatorModelName, audioUrl]);

  return {
    play,
    pause,
  };
};
