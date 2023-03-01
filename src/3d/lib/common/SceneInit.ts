import * as THREE from 'three';
import { AnimationMixer, Raycaster } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Clock } from 'three/src/core/Clock';
import { Scene } from 'three/src/scenes/Scene';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import React from 'react';
import { NFT_ENUM, NFT_ENUM_TYPE } from '../../../api/types/nft-enum.types';

export default class SceneInit {
  public camera: PerspectiveCamera;
  public canvasID: string;
  public clock: Clock;
  public controls: OrbitControls;
  public creatorModelName: string;
  public currentCameraIndex = -1;

  public currentIntersect: THREE.Intersection | null = null;
  public essenceEnum: NFT_ENUM_TYPE;
  public fov: number;
  public intersectionPoint = new THREE.Vector3();
  public ipfsUrl: string;
  public isShiftDown = false;

  public loadingManager: THREE.LoadingManager;

  public mediaIconObjects: Array<THREE.Object3D> = [];

  // @ts-ignore
  public mixer: AnimationMixer;
  public modelCameras: Array<THREE.Camera> = [];

  public mouse: THREE.Vector2;
  public objects = [];
  public plane = new THREE.Plane();
  public planeNormal = new THREE.Vector3();
  public pointer = new THREE.Vector2();

  public points: Array<{ element: Element | null; position: THREE.Vector3 }>;

  public raycaster = new THREE.Raycaster();

  public raycasterMouse = new THREE.Raycaster();
  public renderer: WebGLRenderer;
  public scene: Scene;

  public sceneReady = false;

  public selectedObjects: Array<THREE.Object3D> = [];

  public sizes: { height: number; width: number };
  public stats: Stats;
  public uniforms: any;

  // public gifAnimator: PlainAnimator;

  constructor(
    canvasID: string,
    creatorModelName: string,
    setIsLoading: React.Dispatch<boolean> | undefined,
    essenceEnum: NFT_ENUM_TYPE,
    ipfsUrl: string,
    camera?: PerspectiveCamera,
    scene?: Scene,
    stats?: Stats,
    controls?: OrbitControls,
    renderer?: WebGLRenderer,
    raycaster?: Raycaster,
    fov = 36,
  ) {
    this.fov = fov;
    // @ts-ignore
    this.scene = scene;
    // @ts-ignore
    this.stats = stats;
    // @ts-ignore
    this.camera = camera;
    // @ts-ignore
    this.controls = controls;
    // @ts-ignore
    this.renderer = renderer;
    this.canvasID = canvasID;
    this.creatorModelName = creatorModelName;
    this.essenceEnum = essenceEnum;
    this.clock = new THREE.Clock();
    this.loadingManager = new THREE.LoadingManager(() => {
      window.setTimeout(() => {
        this.sceneReady = true;
        if (setIsLoading) {
          setIsLoading(false);
        }
      }, 500);
    });
    this.raycaster = new THREE.Raycaster();
    this.raycasterMouse = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.points = [];
    const sceneEle = document.querySelector('#scene') as HTMLElement;
    this.sizes = {
      width: sceneEle?.offsetWidth ?? 628,
      height: sceneEle?.offsetHeight ?? 576,
    };
    this.ipfsUrl = ipfsUrl;
  }

  public animate() {
    this.raycasterMouse.setFromCamera(this.mouse, this.camera);
    if (this.sceneReady) {
      // const intersectsMouse = this.raycasterMouse.intersectObjects(
      //   this.mediaIconObjects,
      // );
      // if (intersectsMouse.length) {
      //   const intersectMouse = intersectsMouse[0];
      //   // console.info('this.currentIntersect:', this.currentIntersect);
      //     if (!this.currentIntersect) {
      //       const name = intersectMouse?.object?.name ?? '';
      //       // alert('mouse enter name:' + name);
      //
      //       this.addOutlineObject(intersectMouse.object);
      //       this.outlinePass.selectedObjects = this.selectedObjects;
      //     }
      //     this.currentIntersect = intersectsMouse[0];
      //   } else {
      //     if (this.currentIntersect) {
      //       const name = this.currentIntersect.object.name;
      //       // alert('mouse leave name:' + name);
      //
      //       this.removeOutlineObject();
      //       this.outlinePass.selectedObjects = this.selectedObjects;
      //     }
      //     this.currentIntersect = null;
      //   }
      //   Go through each point
      for (const point of this.points) {
        const intersects = this.raycaster.intersectObjects(
          this.scene.children,
          true,
        );
        const isExist = point && !!(point?.element ?? null);
        if (!isExist) continue;
        // Get 2D screen position
        const screenPosition = point.position.clone();
        screenPosition.project(this.camera);

        // Set the raycaster
        this.raycaster.setFromCamera(screenPosition, this.camera);

        if (intersects.length === 0) {
          // No intersect found
          point?.element?.classList?.add('visible');
        } else {
          // Intersect found
          const intersect = intersects[0];

          const intersectionDistance = intersect.distance;
          const pointDistance = point.position.distanceTo(this.camera.position);

          // if (intersectionDistance < pointDistance || pointDistance > 10) {
          // if (intersectionDistance < pointDistance) {
          // Intersection is close than the point
          //   point?.element?.classList?.remove('visible');
          // } else {
          // Intersection is further than the point
          point?.element?.classList?.add('visible');
          // }
        }
        //
        const translateX = screenPosition.x * this.sizes.width * 0.5;
        const translateY = -screenPosition.y * this.sizes.height * 0.5;

        // @ts-ignore
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
      }
      // }
    }
    window.requestAnimationFrame(this.animate.bind(this));
    const delta = this.clock.getDelta();
    if (this.mixer) this.mixer.update(delta);
    this.render();
    // if (this.gifAnimator) this.gifAnimator.animate();
    // this.stats.update();
    this.controls.update();
  }

  public blenderWattsToLumens(watt: number) {
    return (683 * watt) / (4 * Math.PI);
  }

  public createCursor() {
    const cursor = document.querySelector('.cursor');
    const canvasEle = document.querySelector(
      `#${this.canvasID}`,
    ) as HTMLElement;
    // if (Detection.isDesktop()) {
    // const aTags = document.querySelectorAll('a')
    canvasEle.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      // @ts-ignore
      cursor.style.display = 'block';
      // @ts-ignore
      cursor.style.left = x - 20 + 'px';
      // @ts-ignore
      cursor.style.top = y - 20 + 'px';

      this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
    });
  }

  public async initScene() {
    // this.camera = new THREE.PerspectiveCamera(
    //   45,
    //   this.sizes.width / this.sizes.height,
    //   0.3,
    //   100,
    // );
    // this.camera.position.x = 3.7;
    // this.camera.position.y = 3;
    // this.camera.position.z = 0;
    const isPOAPEssence = this.essenceEnum === NFT_ENUM.TYPE.PODCAST_POAP;
    if (isPOAPEssence) {
      this.camera = new THREE.PerspectiveCamera(
        36,
        this.sizes.width / this.sizes.height,
        0.1,
        100,
      );
      this.camera.position.x = 0.5;
      this.camera.position.y = 3.5;
      this.camera.position.z = 1.5;
    } else {
      this.camera = new THREE.PerspectiveCamera(
        8,
        this.sizes.width / this.sizes.height,
        0.1,
        100,
      );
      this.camera.position.x = 20;
      this.camera.position.y = 20;
      this.camera.position.z = 12;
    }

    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    // this.scene.add(new THREE.AxesHelper(500));

    this.uniforms = {
      u_time: { type: 'f', value: 1.0 },
      colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
      colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    };

    const scene = document.getElementById('scene') as HTMLCanvasElement;
    const canvas = document.getElementById(this.canvasID) as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.physicallyCorrectLights = true;
    scene.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.keys = {
      LEFT: 'ArrowLeft',
      UP: 'ArrowUp',
      RIGHT: 'KeyD',
      BOTTOM: 'KeyS',
    };
    this.controls.listenToKeyEvents(window);
    this.controls.keyPanSpeed = 20;

    // this.stats = Stats();
    // document.body.appendChild(this.stats.dom);

    // const environment = new RoomEnvironment();
    // const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    // this.scene.environment = pmremGenerator.fromScene(environment).texture;

    // ambient light which is for the whole scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    ambientLight.castShadow = true;
    this.scene.add(ambientLight);

    // spot light which is illuminating the chart directly
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 40, 20);
    this.scene.add(spotLight);
    // this.scene.add(new THREE.SpotLightHelper(spotLight));

    const area1Light = new THREE.DirectionalLight(
      0xad8ea2,
      this.blenderWattsToLumens(0.09),
    );
    area1Light.castShadow = true;
    area1Light.position.set(0, 5.5, 0);
    area1Light.scale.set(1, 1, 1);
    // area1Light.rotation.set(1, 1, 1);
    this.scene.add(area1Light);
    // this.scene.add(new THREE.DirectionalLightHelper(area1Light));

    const area2Light = new THREE.PointLight(
      0xe0ffea,
      this.blenderWattsToLumens(0.09),
    );
    area2Light.castShadow = true;
    area2Light.position.set(0, 0.3000000238418579, 0);
    area2Light.scale.set(1, 1, 1);
    this.scene.add(area2Light);
    // this.scene.add(new THREE.PointLightHelper(area2Light));

    const point1Light = new THREE.PointLight(
      0xffead9,
      this.blenderWattsToLumens(0.4),
    );
    point1Light.castShadow = true;
    point1Light.position.set(0.2, 2, 1.4);
    point1Light.scale.set(1, 1, 1);
    this.scene.add(point1Light);
    // this.scene.add(new THREE.PointLightHelper(point1Light));

    const point2Light = new THREE.PointLight(
      0xfff93f,
      this.blenderWattsToLumens(0.4),
    );
    point2Light.castShadow = true;
    point2Light.position.set(0.58, 0.77, -1.3);
    point2Light.scale.set(1, 1, 1);
    this.scene.add(point2Light);
    this.scene.background = new THREE.Color(0xe6e6fa);
    // this.scene.add(new THREE.PointLightHelper(point2Light));

    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 2.3;

    // this.renderer.shadowMap.enabled = true;

    // const geometry = new THREE.PlaneGeometry(300, 300);
    // const texture = new THREE.TextureLoader().load(
    //   'https://shop.cyuncai.com/image/cache/Catalog_1000x1000/Audio%20Technica/lp60xbt-1-1500x1500.png',
    // );
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.rotation.set(100, 0, 0);

    // this.scene.add(mesh);
    // @ts-ignore
    const that = this;
    // click event
    // window.addEventListener('mousemove', function (e) {
    //   that.pointer.set(
    //     (e.clientX / window.innerWidth) * 2 - 1,
    //     -(e.clientY / window.innerHeight) * 2 + 1,
    //   );
    //   that.planeNormal.copy(that.camera.position).normalize();
    //   that.plane.setFromNormalAndCoplanarPoint(
    //     that.planeNormal,
    //     that.scene.position,
    //   );
    //   that.raycaster.setFromCamera(that.pointer, that.camera);
    //   that.raycaster.ray.intersectPlane(that.plane, that.intersectionPoint);
    // });
    const mouseDownFn = (e) => {
      if (e.which !== 1) return;
      // console.info('currentCameraIndex before:', that.currentCameraIndex);
      const camerasLen = that.modelCameras?.length ?? 0;
      // console.info('camerasLen:', camerasLen);
      const nextCameraIndex = that.currentCameraIndex + 1;
      const isExceedCameraLen = nextCameraIndex > camerasLen - 1;
      that.currentCameraIndex = isExceedCameraLen ? 0 : nextCameraIndex;

      // console.info('currentCameraIndex after:', that.currentCameraIndex);
      // console.info(that.modelCameras[that.currentCameraIndex]);
      const nextCamera = that.modelCameras[
        that.currentCameraIndex
      ] as PerspectiveCamera;

      // gsap.to(that.controls.reset, {
      //   x: 0,
      //   y: 0,
      //   z: 0,
      //   duration: 2,
      //   ease: 'power3.inOut',
      //   onComplete: () => {
      //     console.info('complete controls target');
      //   },
      // });
      //

      const newX = nextCamera.parent?.position?.x ?? 0;
      const newY = nextCamera.parent?.position?.y ?? 0;
      const newZ = nextCamera.parent?.position?.z ?? 0;

      // console.info('newX:', newX);
      // console.info('newY:', newY);
      // console.info('newZ:', newZ);

      // gsap.to(that.camera.rotation, {
      //   x: nextCamera.parent?.rotation?.x,
      //   y: nextCamera.parent?.rotation?.y,
      //   z: nextCamera.parent?.rotation?.z,
      //   duration: 2,
      //   ease: 'power3.inOut',
      //   onComplete: () => {
      //     console.info('complete camera position');
      //   },
      // });

      gsap.to(that.camera.position, {
        x: newX,
        y: newY,
        z: newZ,
        duration: 2,
        ease: 'power3.inOut',
        onComplete: () => {
          console.info('complete camera position');
        },
      });

      //

      // const newFov = nextCamera.fov ?? 0;
      //
      // let progress = { fov: newFov };
      // gsap.to(progress, 2, {
      //   fov: 45,
      //   onUpdate: function () {
      //     console.info('onUpdate:');
      //     let init_depht_s = Math.tan(((4.0 / 2.0) * Math.PI) / 180.0) * 2.0;
      //     let current_depht_s =
      //       Math.tan(((progress.fov / 2.0) * Math.PI) / 180.0) * 2.0;
      //
      //     const progressX = (newX * init_depht_s) / current_depht_s;
      //     const progressY = (newY * init_depht_s) / current_depht_s;
      //     const progressZ = (newZ * init_depht_s) / current_depht_s;
      //
      //     that.camera.position.set(progressX, progressY, progressZ);
      //     // that.camera.lookAt(0, 0, 0);
      //     // that.camera.updateProjectionMatrix();
      //     // that.camera.fov = progress.fov;
      //     that.renderer.render(that.scene, that.camera);
      //   },
      //   ease: 'Power3.easeInOut',
      // });

      // const mousePosition = `x: ${that.pointer.x}, y: ${that.pointer.y}`;
      // console.info(mousePosition);
      // // window.open("https://google.com")
      // const sphereGeo = new THREE.SphereGeometry(10, 30, 30);
      // const sphereMat = new THREE.MeshStandardMaterial({
      //   color: 0xffea00,
      //   metalness: 0,
      //   roughness: 0,
      // });
      // const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      // that.scene.add(sphereMesh);
      // sphereMesh.position.copy(that.intersectionPoint);
    };
    //
    // window.removeEventListener('click', mouseDownFn);
    // window.addEventListener('click', mouseDownFn);
    let wallTextureUrl = '/3d/bake/bake_image_essence_wall_and_cabinet.jpg';
    let essenceBaseGltfUrl =
      '/3d/basic/model_image_essence_wall_and_cabinet.gltf';
    let customGltfUrl = `/3d/custom/model_custom_image_essence_${this.creatorModelName}.gltf`;

    switch (this.essenceEnum) {
      case NFT_ENUM.TYPE.PODCAST_AUDIO_SEGMENT: {
        wallTextureUrl = '/3d/bake/bake_audio_essence_wall_and_player.jpg';
        essenceBaseGltfUrl =
          '/3d/basic/model_audio_essence_wall_and_player.gltf';
        customGltfUrl = `/3d/custom/model_custom_audio_essence_${this.creatorModelName}.gltf`;
        break;
      }
      case NFT_ENUM.TYPE.PODCAST_POAP: {
        wallTextureUrl = '';
        essenceBaseGltfUrl = '/3d/basic/model_poap_essence.gltf';
        customGltfUrl = '';
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = -10;
        this.controls.screenSpacePanning = true;
        break;
      }
      default:
      case NFT_ENUM.TYPE.PODCAST_IMAGE_COVER: {
        wallTextureUrl = '/3d/bake/bake_image_essence_wall_and_cabinet.jpg';
        essenceBaseGltfUrl =
          '/3d/basic/model_image_essence_wall_and_cabinet.gltf';
        customGltfUrl = `/3d/custom/model_custom_image_essence_${this.creatorModelName}.gltf`;
        break;
      }
    }

    const wallTexture = new THREE.TextureLoader().load(wallTextureUrl);
    wallTexture.encoding = THREE.sRGBEncoding;
    wallTexture.flipY = false;
    const wallMaterial = new THREE.MeshPhongMaterial({
      shininess: 1,
      specular: 2,
      map: wallTexture,
    });

    const glftLoader = new GLTFLoader(this.loadingManager);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    glftLoader.setDRACOLoader(dracoLoader);
    if (!isPOAPEssence) {
      glftLoader.load(customGltfUrl, (gltfScene) => {
        this.mixer = new THREE.AnimationMixer(gltfScene.scene);
        gltfScene.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play();
        });

        gltfScene.scene.traverse((c) => {
          const name = c?.name ?? '';
          const isMatchPodcastPlatform = name.indexOf('podcast_platform') >= 0;
          if (isMatchPodcastPlatform) {
            // Three.js 新增物件順序
            // console.info('customAsset isMatchMediaIcon:', name);
            this.mediaIconObjects.push(c);
            const pointLen = this.points?.length ?? 0;
            const position = c?.position;
            // name 要與 classname 對應 podcast_platform_{platform_id}
            // const eleId =
            //   pointLen === 2 ? 'podcast_platform_apple_podcast' : name;
            const ele = document.querySelector(`#${name}`);
            // console.info(`element[${name}]:`, ele);
            this.points.push({
              element: ele,
              position,
            });
          }

          switch (name) {
            case 'image_essence': {
              // if (document) {
              //   loadGIF('/img/icon_mindtrix_bg_white.gif');
              // }
              console.info('texture this.ipfsUrl:', this.ipfsUrl);
              const texture = new THREE.TextureLoader().load(this.ipfsUrl);
              texture.flipY = false;
              // texture.rotation = 180;
              const material = new THREE.MeshBasicMaterial({ map: texture });
              // @ts-ignore
              c.material = material;
              break;
            }
            // 烏托邦指定客製元件
            case 'cup_glass': {
              const transparentMaterial = new THREE.MeshPhysicalMaterial({
                roughness: 0,
                transmission: 0.6,
              });
              // @ts-ignore
              c.material = transparentMaterial;
              break;
            }
          }
        });
        this.scene.add(gltfScene.scene);
      });
    }

    glftLoader.load(essenceBaseGltfUrl, (gltfScene) => {
      gltfScene.scene.traverse((c) => {
        const name = c?.name ?? '';

        switch (name) {
          // audio & image essence
          case 'poap_essence': {
            const texture = new THREE.TextureLoader().load(this.ipfsUrl);
            texture.flipY = false;
            // texture.rotation = 180;
            const material = new THREE.MeshBasicMaterial({ map: texture });
            // @ts-ignore
            c.material = material;
            break;
          }
          case 'wall': {
            // case 'main_merge_audio': {
            // case 'model_audio': {
            // @ts-ignore
            c.material = wallMaterial;
            break;
          }
          // image cabinet essence
          // case 'main_merge': {
          case 'cabinet': {
            const transparentMaterial = new THREE.MeshPhysicalMaterial({
              roughness: 0,
              transmission: 0.5,
            });
            // @ts-ignore
            c.material = transparentMaterial;
            break;
          }
        }

        this.scene.add(gltfScene.scene);
      });
    });

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  public onWindowResize() {
    // this.camera.aspect = window.innerWidth / window.innerHeight;
    const sceneEle = document.querySelector('#scene') as HTMLElement;
    this.sizes = {
      width: sceneEle?.offsetWidth ?? 628,
      height: sceneEle?.offsetHeight ?? 576,
    };
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
  }

  public render() {
    this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }
}
