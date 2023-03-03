import * as THREE from 'three';
import { AnimationMixer } from 'three';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Clock } from 'three/src/core/Clock';
import { Scene } from 'three/src/scenes/Scene';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import React from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { WaterShader2D } from '../lib/water-shader-2d/water-shader-2d';

export default class ViennaWoodsScene {
  public bloomComposer: EffectComposer | undefined;
  public camera: PerspectiveCamera;
  public cameraLastPosition: { x: number; y: number };
  public canvasId: string;
  public clips: Array<THREE.AnimationClip>;
  public clock: Clock;
  public control: MapControls | undefined;
  public currentCameraIndex = -1;

  public currentIntersect: THREE.Intersection | null = null;
  public depthMaterial: THREE.MeshDepthMaterial;

  public fov: number;
  public intersectionPoint = new THREE.Vector3();

  public isMorning: boolean;
  public isShiftDown = false;
  public landmarkHoverEffects: {
    [landmarkName: string]: {
      isHovering: boolean;
      mesh: THREE.Mesh;
      orgMaterial: THREE.Material | Array<THREE.Material>;
    };
  };

  public light1: THREE.DirectionalLight;
  public light2: THREE.PointLight;
  public light3: THREE.PointLight;

  public loadingManager: THREE.LoadingManager;

  public mediaIconObjects: Array<THREE.Object3D> = [];

  public mixer: AnimationMixer | undefined;
  public modelCameras: Array<THREE.Camera> = [];

  public mouse: THREE.Vector2;
  public objects = [];
  public pixelRatio: number;
  public plane = new THREE.Plane();
  public planeNormal = new THREE.Vector3();
  public pointer = new THREE.Vector2();

  public points: Array<{
    element: HTMLElement | null;
    position: THREE.Vector3;
  }>;

  public raycaster = new THREE.Raycaster();

  public raycasterMouse = new THREE.Raycaster();
  public river: THREE.Object3D | undefined;

  // @ts-ignore
  public renderer: THREE.WebGLRenderer;

  // @ts-ignore
  public renderTarget: THREE.WebGLRenderTarget;
  public scene: Scene;
  public sceneId: string;

  public sceneReady = false;

  public selectedObjects: Array<THREE.Object3D> = [];

  public sizes: { height: number; width: number };

  constructor(
    sceneId: string,
    canvasId: string,
    setLoadingProgress: React.Dispatch<React.SetStateAction<number>>,
    setIsLoading: React.Dispatch<boolean> | undefined,
  ) {
    this.fov = 36;
    this.sceneId = sceneId;
    this.canvasId = canvasId;
    this.clock = new THREE.Clock();
    this.depthMaterial = new THREE.MeshDepthMaterial();
    this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
    this.depthMaterial.blending = THREE.NoBlending;
    this.loadingManager = new THREE.LoadingManager(
      () => {
        window.setTimeout(() => {
          this.sceneReady = true;
          if (setIsLoading) {
            setIsLoading(false);
          }
        }, 500);
      },
      (item, loaded, total) => {
        const progress = Math.round((loaded / total) * 100);
        setLoadingProgress((p) => progress);
      },
      (url) => {
        console.error('error on loading animation!');
      },
    );
    this.raycaster = new THREE.Raycaster();
    this.raycasterMouse = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.pixelRatio = 0;
    this.points = [];
    this.landmarkHoverEffects = {};
    this.isMorning = true;
    const sceneEle = document.querySelector(sceneId) as HTMLElement;
    this.sizes = {
      width: sceneEle?.offsetWidth ?? window.innerWidth,
      height: sceneEle?.offsetHeight ?? window.innerHeight,
    };
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      2,
      100,
    );
    this.cameraLastPosition = {
      x: 0,
      y: 0,
    };
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.clips = [];

    this.light1 = new THREE.DirectionalLight(0xffffff, 2.3);
    this.light2 = new THREE.PointLight(0xffffff, 0.5, 200);
    this.light3 = new THREE.PointLight(0xffffff, 0.5, 200);
  }

  public animate() {
    this.raycasterMouse.setFromCamera(this.mouse, this.camera);
    if (this.sceneReady) {
      if (this.river) {
        // set river animate
        this.river.visible = false; // we don't want the depth of the water
        this.scene.overrideMaterial = this.depthMaterial;

        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(null);

        this.scene.overrideMaterial = null;
        this.river.visible = true;
      }

      // set landmark position
      for (const point of this.points) {
        const isExist = point && !!(point?.element ?? null);
        if (!isExist) continue;
        const screenPosition = point.position.clone();
        screenPosition.project(this.camera);
        const translateX = screenPosition.x * this.sizes.width * 0.5;
        const translateY = -screenPosition.y * this.sizes.height * 0.5;
        if (point.element) {
          point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
        }
      }

      // set landmark hover
      Object.keys(this.landmarkHoverEffects).forEach((landmarkName) => {
        const isHovering =
          this.landmarkHoverEffects[landmarkName]?.isHovering ?? false;

        if (this.landmarkHoverEffects[landmarkName].mesh) {
          if (isHovering) {
            const shineMaterial = new THREE.MeshPhongMaterial({
              emissive: new THREE.Color('rgb(255, 243, 4)'),
              emissiveIntensity: isHovering ? (this.isMorning ? 13 : 3) : 0,
            });
            this.landmarkHoverEffects[landmarkName].mesh.material =
              shineMaterial;
          } else {
            this.landmarkHoverEffects[landmarkName].mesh.material =
              this.landmarkHoverEffects[landmarkName].orgMaterial;
          }
        }
      });
    }
    window.requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();
    if (this.river) {
      const riverParams = {
        foamColor: 0xffffff,
        waterColor: 0x1d43f5,
        threshold: 0.1,
      };
      // @ts-ignore
      this.river.material.uniforms.threshold.value = riverParams.threshold;
      // @ts-ignore
      this.river.material.uniforms.time.value = time;
      // @ts-ignore
      this.river.material.uniforms.foamColor.value.set(riverParams.foamColor);
      // @ts-ignore
      this.river.material.uniforms.waterColor.value.set(riverParams.waterColor);
    }
    if (this.mixer) this.mixer.update(delta);
    this.render();
    if (this.control) this.control.update();
  }

  public blenderWattsToLumens(watt: number) {
    return (683 * watt) / (4 * Math.PI);
  }

  public async initScene() {
    this.camera.position.x = 11;
    this.camera.position.y = 6;
    this.camera.position.z = 10;

    // this.scene.add(new THREE.AxesHelper(500));

    const scene = document.getElementById(this.sceneId) as HTMLCanvasElement;
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    // set renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 0.8;
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1,
    );
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // set renderTarget
    const supportsDepthTextureExtension = !!this.renderer.extensions.get(
      'WEBGL_depth_texture',
    );
    this.pixelRatio = this.renderer.getPixelRatio();

    this.renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * this.pixelRatio,
      window.innerHeight * this.pixelRatio,
    );

    if (supportsDepthTextureExtension === true) {
      this.renderTarget.depthTexture = new THREE.DepthTexture(
        window.innerWidth * this.pixelRatio,
        window.innerHeight * this.pixelRatio,
      );
      this.renderTarget.depthTexture.type = THREE.UnsignedShortType;
      this.renderTarget.depthTexture.minFilter = THREE.NearestFilter;
      this.renderTarget.depthTexture.magFilter = THREE.NearestFilter;
    }

    // set water material
    const dudvMap = new THREE.TextureLoader().load(
      'https://i.imgur.com/hOIsXiZ.png',
    );
    dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

    const uniforms = {
      time: {
        value: 0,
      },
      threshold: {
        value: 0.1,
      },
      tDudv: {
        value: null,
      },
      tDepth: {
        value: null,
      },
      cameraNear: {
        value: 0,
      },
      cameraFar: {
        value: 0,
      },
      resolution: {
        value: new THREE.Vector2(),
      },
      foamColor: {
        value: new THREE.Color(),
      },
      waterColor: {
        value: new THREE.Color(),
      },
    };

    const waterMaterial = new THREE.ShaderMaterial({
      defines: {
        DEPTH_PACKING: supportsDepthTextureExtension === true ? 0 : 1,
        ORTHOGRAPHIC_CAMERA: 0,
      },
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib['fog'], uniforms]),
      vertexShader: WaterShader2D.vertexShader,
      fragmentShader: WaterShader2D.fragmentShader,
      fog: true,
    });

    waterMaterial.uniforms.cameraNear.value = this.camera.near;
    waterMaterial.uniforms.cameraFar.value = this.camera.far;
    waterMaterial.uniforms.resolution.value.set(
      window.innerWidth * this.pixelRatio,
      window.innerHeight * this.pixelRatio,
    );
    waterMaterial.uniforms.tDudv.value = dudvMap;
    waterMaterial.uniforms.tDepth.value =
      supportsDepthTextureExtension === true
        ? this.renderTarget.depthTexture
        : this.renderTarget.texture;

    // set bloom renderer
    const renderScene = new RenderPass(this.scene, this.camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.1,
      0.85,
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 1.2; // intensity of glow
    bloomPass.radius = 0;
    this.bloomComposer = new EffectComposer(this.renderer);
    this.bloomComposer.setSize(window.innerWidth, window.innerHeight);
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.addPass(renderScene);
    this.bloomComposer.addPass(bloomPass);

    scene.appendChild(this.renderer.domElement);

    this.control = new MapControls(this.camera, this.renderer.domElement);
    this.control.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
    };
    this.control.touches = {
      ONE: THREE.TOUCH.PAN,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    this.control.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.control.dampingFactor = 0.05;

    this.control.screenSpacePanning = false;

    this.control.minDistance = 10;
    this.control.maxDistance = 24;
    this.control.maxZoom = 10;
    this.control.maxAzimuthAngle = Math.PI / 2;

    this.control.maxPolarAngle = Math.PI / 2;

    // add lights
    this.light1.castShadow = true;
    this.light1.position.set(-6, 5, 1);
    this.scene.add(this.light1);

    this.light2.castShadow = true;
    this.light2.position.set(-6, 5, 10);
    this.scene.add(this.light2);

    this.light3.castShadow = true;
    this.light3.position.set(10, 3, 6);
    this.scene.add(this.light3);

    const gltfLoader = new GLTFLoader(this.loadingManager);

    const worldGltf = '/three-js/world/world_vienna_woods_v13_3.gltf';
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(worldGltf, (gltfScene) => {
      gltfScene.scene.traverse((c) => {
        const name = c?.name ?? '';
        // add river material
        if (name === 'river') {
          // @ts-ignore
          c.material = waterMaterial;
          this.river = c;
        }

        const landmarkButtonNamePrefix = 'hover_button_';
        const isLandmarkButton = name.indexOf(landmarkButtonNamePrefix) >= 0;
        if (isLandmarkButton) {
          const position = c?.position ?? null;
          const landmarkName = name.split(landmarkButtonNamePrefix)[1];
          const id = `#hover_button_${landmarkName}`;
          const element = document.querySelector(id) as HTMLElement;
          this.points.push({
            element,
            position,
          });
        }

        if (name.indexOf('light_hover_') >= 0) {
          const landmarkName = name?.replace('light_hover_', '');
          this.landmarkHoverEffects[landmarkName] = {
            mesh: c as THREE.Mesh,
            isHovering: false,
            // @ts-ignore
            orgMaterial: c.material,
          };
        }
      });
      this.scene.add(gltfScene.scene);

      // add animation
      this.mixer = new THREE.AnimationMixer(gltfScene.scene);
      this.clips = gltfScene.animations;
    });

    // set the pan boundaries
    const minPan = new THREE.Vector3(-2, -2, -5);
    const maxPan = new THREE.Vector3(2, 2, 5);
    const _v = new THREE.Vector3();

    this.control.addEventListener('change', () => {
      if (this.control) {
        _v.copy(this.control.target);
        this.control.target.clamp(minPan, maxPan);
        _v.sub(this.control.target);
        this.camera.position.sub(_v);
      }
    });

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  public onWindowResize() {
    const sceneEle = document.querySelector('#scene') as HTMLElement;
    this.sizes = {
      width: sceneEle?.offsetWidth ?? window.innerWidth,
      height: sceneEle?.offsetHeight ?? window.innerHeight,
    };
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.sizes.width, this.sizes.height);

    this.renderTarget.setSize(this.sizes.width, this.sizes.height);
    if (this.river) {
      // @ts-ignore
      this.river.material.uniforms.resolution.value.set(
        this.sizes.width,
        this.sizes.height,
      );
    }
  }

  public playLandingAnimation = (
    landmarkName: string,
    onAnimationEnded: () => void,
  ) => {
    const landingName = `landing_${landmarkName}`;
    const podment_temple_clip = THREE.AnimationClip.findByName(
      this.clips,
      landingName,
    );
    const podment_temple_action = this.mixer?.clipAction(podment_temple_clip);
    if (podment_temple_action && this.mixer) {
      podment_temple_action.reset();
      podment_temple_action.setLoop(THREE.LoopOnce, 1);
      podment_temple_action.play();

      setTimeout(() => {
        podment_temple_action.fadeOut(0.3);
        if (onAnimationEnded) onAnimationEnded();
      }, 6000);
    }

  };

  public render() {
    if (this.isMorning) {
      this.renderer.toneMappingExposure = 2.2;
      this.renderer.render(this.scene, this.camera);
    } else {
      this.renderer.toneMappingExposure = 1;
      this.bloomComposer?.render();
    }
  }

  public updateDayNightLight = (isMorning: boolean) => {
    this.isMorning = isMorning;
    if (this.bloomComposer) {
      this.bloomComposer.renderToScreen = !isMorning;
    }
    if (isMorning) {
      this.light1.intensity = 2.3;
      this.light1.color = new THREE.Color(0xffffff);
      this.light2.intensity = 0.5;
      this.light2.color = new THREE.Color(0xffffff);
      this.light3.intensity = 0.5;
    } else {
      this.light1.intensity = 1.3;
      this.light1.color = new THREE.Color(0x3259c5);
      this.light2.intensity = 0.2;
      this.light2.color = new THREE.Color(0x3259c5);
      this.light3.intensity = 0.0;
    }
  };

  public updateIsHoveringOfLandmark = (
    isHovering: boolean,
    landmarkName: string,
  ) => {
    if (!this.sceneReady) return;
    const isLandmarkNameExist = landmarkName in this.landmarkHoverEffects;
    if (!isLandmarkNameExist) {
      throw new Error(
        `Cannot update the landmark: ${landmarkName} \n due to the absence of landmark name/`,
      );
    }
    this.landmarkHoverEffects[landmarkName].isHovering = isHovering;
  };
}
