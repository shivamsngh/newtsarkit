// import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
// import { Platform, NavController } from 'ionic-angular';

// import {
//   Camera, Scene, WebGLRenderer, Color, Mesh, MeshNormalMaterial,
//   BoxGeometry, IcosahedronGeometry, FlatShading
// } from 'three';

// import { ARController, ARThreeScene, artoolkit, CameraDeviceConfig } from 'jsartoolkit5';
// // import {
// //   Scene, Engine, FreeCamera, Vector3, HemisphericLight, Mesh, MeshBuilder,
// // } from 'babylonjs';

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {

//   @ViewChild('canvasElem') canvasElem: ElementRef;
//   // @HostListener('resize') resize() {
//   //   this.engine.resize();
//   // }

//   width: number;
//   height: number;
//   device: MediaDeviceInfo;
//   stream: MediaStream;
//   // engine: Engine;
//   canvas: HTMLCanvasElement;

//   constructor(platform: Platform, public navCtrl: NavController) {
//     // this.width = 640;//platform.width();
//     // this.height = 480;//platform.height();
//     this.width = window.innerWidth;
//     this.height = window.innerHeight;
//     console.log(`WxH: ${this.width}x${this.height}`);
//     // this.getCameraConfig();
//   }


//   // ngAfterViewInit() {
//   //   this.canvas = HTMLCanvasElement = this.canvasElem.nativeElement;
//   //   this.engine = new Engine(this.canvas, true);
//   //   const scene = this.createScene();
//   //   this.engine.runRenderLoop(() => {
//   //     scene.render();
//   //   })
//   // }

//   // // Create Scene
//   // private createScene() {

//   //   // create a basic BJS Scene object
//   //   const scene = new Scene(this.engine);
//   //   // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
//   //   const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);

//   //   // target the camera to scene origin
//   //   camera.setTarget(Vector3.Zero());

//   //   // attach the camera to the canvas
//   //   camera.attachControl(this.canvas, false);

//   //   // create a basic light, aiming 0,1,0 - meaning, to the sky
//   //   const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

//   //   // create a built-in "sphere" shape; 
//   //   const sphere = MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene);

//   //   // move the sphere upward 1/2 of its height
//   //   sphere.position.y = 1;

//   //   // create a built-in "ground" shape; 
//   //   // const ground = BABYLON.Mesh.CreateGround('ground1', { height: 6, width: 6, subdivisions: 2 }, scene);
//   //   const ground = Mesh.CreateGround('ground1', 6, 6, 2, scene);

//   //   // return the created scene
//   //   return scene;
//   // }

//   ngAfterViewInit() {
//     //let videoNative = this.videoElement.nativeElement;
//     let vw = this.width;
//     let vh = this.height;
//     //Initialize a basic camera
//     const scene = new Scene();
//     const camera = new Camera();
//     scene.add(camera);


//     if ('MediaDevices' in window || navigator.getUserMedia) {
//       const videoCofig: CameraDeviceConfig = { video: true };

//       ARController.getUserMediaThreeScene({
//         cameraConfig: videoCofig, // added
//         maxARVideoSize: 640,
//         cameraParam: 'assets/data/camera_para-ip.dat',

//         onSuccess: (arScene: ARThreeScene, arController, arCamera) => {
//           arController.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);

//           const renderer = this.createWebGLRenderer(vw, vh, arScene, arController);
//           document.body.appendChild(renderer.domElement);

//           let rotationTarget = 0;
//           renderer.domElement.addEventListener('click', ev => {
//             ev.preventDefault();
//             rotationTarget += 1;
//           }, false);


//           let cube = this.createCube();
//           let icosahedron = this.createIcosahedron();
//           this.trackMarker(arScene, arController, 5, cube);
//           this.trackMarker(arScene, arController, 20, icosahedron);

//           let tick = () => {
//             arScene.process();
//             arScene.renderOn(renderer);
//             requestAnimationFrame(tick);
//           };
//           tick();
//         }
//       });
//     }


//   }

//   // Get rear camera logic

//   private getCameraConfig() {
//     window.navigator.mediaDevices.enumerateDevices().then((devices) => {
//       console.log("devices", devices);
//       // this.device = devices.find((device) => {
//       //   return device.label.indexOf('back') !== -1;
//       // });
//       const mediaQuery: MediaStreamConstraints = {
//         audio: false,
//         video: {
//           facingMode: 'environment',
//           width: {
//             ideal: window.innerWidth,
//             // min: 1024,
//             // max: 1920
//           },
//           height: {
//             ideal: window.innerHeight,
//             // min: 776,
//             // max: 1080
//           }
//         }
//       }
//       window.navigator.mediaDevices.getUserMedia(mediaQuery)
//         .then((stream) => {
//           console.log("Stream", stream);
//         })
//         .catch(error => console.warn("user medi err", error));
//     });
//   }

//   private trackMarker(arScene: ARThreeScene, arController, markerId: number, object: Mesh) {
//     var marker = arController.createThreeBarcodeMarker(markerId, 1);
//     marker.add(object);
//     arScene.scene.add(marker);
//   }

//   private createCube(): Mesh {
//     const cube = new Mesh(
//       new BoxGeometry(1, 1, 1),
//       new MeshNormalMaterial()
//     );
//     // cube.material. = FlatShading;
//     cube.position.z = 0.5;
//     return cube;
//   }

//   private createIcosahedron(): Mesh {
//     const icosahedron = new Mesh(
//       new IcosahedronGeometry(0.7, 1),
//       new MeshNormalMaterial()
//     );
//     // icosahedron.material.flatShading = FlatShading;
//     icosahedron.position.z = 0.7;
//     return icosahedron;
//   }

//   private createWebGLRenderer(width: number, height: number, arScene, arController): WebGLRenderer {
//     let ideal = Math.min(
//       window.innerWidth / arScene.video.videoWidth,
//       window.innerHeight / arScene.video.videoHeight
//     );
//     width = ideal * arScene.video.videoWidth;
//     height = ideal * arScene.video.videoHeight;
//     var renderer = new WebGLRenderer({
//       antialias: true,
//       alpha: true
//     });

//     console.log("AR COntroller", arController);
// 		if (arController.orientation === 'portrait') {
// 			renderer.setSize(height,width);
// 		} else {
// 			renderer.setSize(width,height);
//     }

//     renderer.domElement.style.transformOrigin = '0 0';
//     renderer.domElement.style.transform = 'rotate(-90deg) translateX(-100%)';
//     renderer.setClearColor(new Color('lightgrey'), 0)
//     renderer.domElement.style.position = 'absolute'
//     renderer.domElement.style.top = '0px';
//     renderer.domElement.style.left = '0px';

//     // renderer.domElement.style.transform = 'translate(-50%, -50%)';
//     // renderer.domElement.className = 'center';
//     return renderer;
//   }



//   /////////////////
//   //Code Break
//   //////////////// 

// }
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { WebGLRenderer, ObjectLoader, Color, Mesh, MeshNormalMaterial, BoxGeometry, IcosahedronGeometry, FlatShading } from 'three';
import { ARController, ARThreeScene, artoolkit, CameraDeviceConfig } from 'jsartoolkit5';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('videoElement') videoElement: ElementRef;

    width: number;
    height: number;
    stream: MediaStream;
    deviceId: string;

    constructor(platform: Platform, public navCtrl: NavController) {
        this.width = 640;//platform.width();
        this.height = 480;//platform.height();
        console.log(`WxH: ${this.width}x${this.height}`);
    }

    public getDeviceId() {
        return navigator.mediaDevices.enumerateDevices().then(info => {
            console.log("cam info", info);
            let devId: string = 'unkwn';
            info.forEach(x => {
                if (x.label) {
                    let labelRegEx = x.label.match(/back|rear/);
                    if (labelRegEx !== null || labelRegEx !== undefined)
                        devId = x.deviceId;
                }
            });
            console.log(devId);
            return devId;
        });
    }

    ngAfterViewInit() {
        //let videoNative = this.videoElement.nativeElement;
        let vw = this.width;
        let vh = this.height;

        if ('MediaDevices' in window || navigator.getUserMedia) {
            console.log("dev id", this.deviceId);
            // let constraints: MediaStreamConstraints = { video: { facingMode: 'environment' } };
            // console.log("Mediascreens");
            // console.log(navigator.mediaDevices.getUserMedia(constraints));
            this.getDeviceId().then(id => {
                this.deviceId = id;
                let camConfig: CameraDeviceConfig = { video: { deviceId: this.deviceId } };
                ARController.getUserMediaThreeScene({
                    maxARVideoSize: 640,
                    cameraConfig: camConfig,
                    cameraParam: 'assets/data/camera_para.dat',
                    onSuccess: (arScene: ARThreeScene, arController, arCamera) => {
                        arController.setPatternDetectionMode(artoolkit.AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);

                        var renderer = this.createWebGLRenderer(vw, vh, arController, arScene);
                        document.body.appendChild(renderer.domElement);

                        var rotationTarget = 0;
                        renderer.domElement.addEventListener('click', function (ev) {
                            console.log("Inside click")
                            ev.preventDefault();
                            rotationTarget += 1;
                        }, false);


                        let cube = this.createCube();
                        let icosahedron = this.createIcosahedron();
                        let avatar=this.createAvatar(object=>{
                            this.trackMarker(arScene, arController, 5, object);
                        })
                        // this.trackMarker(arScene, arController, 5, cube);
                        this.trackMarker(arScene, arController, 20, icosahedron);

                        let tick = () => {
                            console.log("Inside tick")
                            arScene.process();
                            arScene.renderOn(renderer);
                            requestAnimationFrame(tick);
                        };
                        tick();
                    }
                });
            })

        }
    }

    /**
     * Tracks markers in scene
     * @param arScene 
     * @param arController 
     * @param markerId 
     * @param object 
     */
    private trackMarker(arScene: ARThreeScene, arController, markerId: number, object: Mesh) {
        var marker = arController.createThreeBarcodeMarker(markerId, 1);
        marker.add(object);
        arScene.scene.add(marker);
    }

    /**
     * Creates Simple Cube
     */
    private createCube(): Mesh {
        var cube = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshNormalMaterial()
        );
        cube.material.shading = FlatShading;
        cube.position.z = 0.5;
        return cube;
    }

    /**
     * Creates Sphere
     */
    private createIcosahedron(): Mesh {
        var icosahedron = new Mesh(
            new IcosahedronGeometry(0.7, 1),
            new MeshNormalMaterial()
        );
        icosahedron.material.shading = FlatShading;
        icosahedron.position.z = 0.7;
        return icosahedron;
    }

    /**
     * Create Avatar
     */
    private createAvatar(callback) {
        let objLoader = new ObjectLoader();
        objLoader.load('assets/avatar/legoobj.obj', (object) => {
            callback(object);
        });
    }
    /**
     * Creates on device camera 
     * @param width 
     * @param height 
     * @param arController 
     * @param arScene 
     */
    private createWebGLRenderer(width: number, height: number, arController, arScene): WebGLRenderer {
        var renderer = new WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setClearColor(new Color('lightgrey'), 0);
        console.log("orient", arController.orientation);
        var f = Math.min(
            window.innerWidth / arScene.video.videoWidth,
            window.innerHeight / arScene.video.videoHeight
        );
        var w = f * arScene.video.videoWidth;
        var h = f * arScene.video.videoHeight;
        if (arController.orientation === 'portrait') {
            renderer.setSize(h, w);
            renderer.domElement.style.transformOrigin = '0 0';
            renderer.domElement.style.transform = 'rotate(-90deg) translateX(-100%)';
        } else {
            renderer.setSize(w, h);
        }

        // renderer.setSize(width, height);
        // renderer.domElement.style.position = 'absolute'
        // renderer.domElement.style.top = '50%';
        // renderer.domElement.style.left = '50%';
        // renderer.domElement.style.transform = 'translate(-50%, -50%)';
        renderer.domElement.className = 'center';
        return renderer;
    }
}
