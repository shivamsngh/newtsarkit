webpackJsonp([0],{

/***/ 142:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 142;

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 184;

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__);
// import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
// import { Platform, NavController } from 'ionic-angular';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
//template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/home/home.html"*/'<ion-content class="no-scroll">\n  <video #videoElement autoplay preload=\'auto\' [width]="width" [height]="height" webkitPlaysinline></video>\n</ion-content>\n<!-- <ion-content>\n  <canvas #canvasElem id="renderCanvas"></canvas>\n</ion-content> -->\n\n<!--\n<ion-content padding>\n\n  <video #videoElement width="320" height="240" loop autoplay webkitPlaysinline controls="false">\n    <!-- MP4 for Safari, IE9, iPhone, iPad, Android, and Windows Phone 7 --\n    <source type="video/mp4" src="assets/video/output_4.mp4" />\n    <!-- WebM/VP8 for Firefox4, Opera, and Chrome --\n    <source type="video/webm" src="assets/video/output_4.webm" />\n    <!-- Ogg/Vorbis for older Firefox and Opera versions --\n    <source type="video/ogg" src="assets/video/output_4.ogg" />\n    <source type="video/x-flv" src="assets/video/output_4.flv" />\n    <source type="video/3gpp" src="assets/video/output_4.3gp" />\n  </video>\n \n </ion-content>\n -->'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/home/home.html"*/
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




var HomePage = (function () {
    function HomePage(platform, navCtrl) {
        this.navCtrl = navCtrl;
        this.width = 640; //platform.width();
        this.height = 480; //platform.height();
        console.log("WxH: " + this.width + "x" + this.height);
    }
    HomePage.prototype.getDeviceId = function () {
        return navigator.mediaDevices.enumerateDevices().then(function (info) {
            console.log("cam info", info);
            var devId = 'unkwn';
            info.forEach(function (x) {
                if (x.label) {
                    var labelRegEx = x.label.match(/back|rear/);
                    if (labelRegEx !== null || labelRegEx !== undefined)
                        devId = x.deviceId;
                }
            });
            console.log(devId);
            return devId;
        });
    };
    HomePage.prototype.ngAfterViewInit = function () {
        var _this = this;
        //let videoNative = this.videoElement.nativeElement;
        var vw = this.width;
        var vh = this.height;
        if ('MediaDevices' in window || navigator.getUserMedia) {
            console.log("dev id", this.deviceId);
            // let constraints: MediaStreamConstraints = { video: { facingMode: 'environment' } };
            // console.log("Mediascreens");
            // console.log(navigator.mediaDevices.getUserMedia(constraints));
            this.getDeviceId().then(function (id) {
                _this.deviceId = id;
                var camConfig = { video: { deviceId: _this.deviceId } };
                __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["ARController"].getUserMediaThreeScene({
                    maxARVideoSize: 640,
                    cameraConfig: camConfig,
                    cameraParam: 'assets/data/camera_para.dat',
                    onSuccess: function (arScene, arController, arCamera) {
                        arController.setPatternDetectionMode(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["artoolkit"].AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
                        var renderer = _this.createWebGLRenderer(vw, vh, arController, arScene);
                        document.body.appendChild(renderer.domElement);
                        var rotationTarget = 0;
                        renderer.domElement.addEventListener('click', function (ev) {
                            console.log("Inside click");
                            ev.preventDefault();
                            rotationTarget += 1;
                        }, false);
                        // let cube = this.createCube();
                        var icosahedron = _this.createIcosahedron();
                        var avatar = _this.createAvatar(function (object) {
                            console.log("Creating avatar");
                            _this.trackMarker(arScene, arController, 5, object);
                        });
                        // this.trackMarker(arScene, arController, 5, cube);
                        _this.trackMarker(arScene, arController, 20, icosahedron);
                        console.log("WTF Testing");
                        var tick = function () {
                            console.log("Inside tick");
                            arScene.process();
                            arScene.renderOn(renderer);
                            requestAnimationFrame(tick);
                        };
                        tick();
                    }
                });
            });
        }
    };
    /**
     * Tracks markers in scene
     * @param arScene
     * @param arController
     * @param markerId
     * @param object
     */
    HomePage.prototype.trackMarker = function (arScene, arController, markerId, object) {
        var marker = arController.createThreeBarcodeMarker(markerId, 1);
        marker.add(object);
        arScene.scene.add(marker);
    };
    /**
     * Creates Simple Cube
     */
    HomePage.prototype.createCube = function () {
        var cube = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_2_three__["BoxGeometry"](1, 1, 1), new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]());
        cube.material.shading = __WEBPACK_IMPORTED_MODULE_2_three__["FlatShading"];
        cube.position.z = 0.5;
        return cube;
    };
    /**
     * Creates Sphere
     */
    HomePage.prototype.createIcosahedron = function () {
        var icosahedron = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_2_three__["IcosahedronGeometry"](0.7, 1), new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]());
        icosahedron.material.shading = __WEBPACK_IMPORTED_MODULE_2_three__["FlatShading"];
        icosahedron.position.z = 0.7;
        return icosahedron;
    };
    /**
     * Create Avatar
     */
    HomePage.prototype.createAvatar = function (callback) {
        console.log("Calling create avatar");
        var objLoader = new __WEBPACK_IMPORTED_MODULE_2_three__["ObjectLoader"]();
        objLoader.load('assets/avatar/legoobj.obj', function (object) {
            console.log("Creating avatar");
            callback(object);
        });
    };
    /**
     * Creates on device camera
     * @param width
     * @param height
     * @param arController
     * @param arScene
     */
    HomePage.prototype.createWebGLRenderer = function (width, height, arController, arScene) {
        var renderer = new __WEBPACK_IMPORTED_MODULE_2_three__["WebGLRenderer"]({
            antialias: true,
            alpha: true
        });
        renderer.setClearColor(new __WEBPACK_IMPORTED_MODULE_2_three__["Color"]('lightgrey'), 0);
        console.log("orient", arController.orientation);
        var f = Math.min(window.innerWidth / arScene.video.videoWidth, window.innerHeight / arScene.video.videoHeight);
        var w = f * arScene.video.videoWidth;
        var h = f * arScene.video.videoHeight;
        if (arController.orientation === 'portrait') {
            renderer.setSize(h, w);
            renderer.domElement.style.transformOrigin = '0 0';
            renderer.domElement.style.transform = 'rotate(-90deg) translateX(-100%)';
        }
        else {
            renderer.setSize(w, h);
        }
        // renderer.setSize(width, height);
        // renderer.domElement.style.position = 'absolute'
        // renderer.domElement.style.top = '50%';
        // renderer.domElement.style.left = '50%';
        // renderer.domElement.style.transform = 'translate(-50%, -50%)';
        renderer.domElement.className = 'center';
        return renderer;
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('videoElement'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
], HomePage.prototype, "videoElement", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/home/home.html"*/'<ion-content class="no-scroll">\n  <video #videoElement autoplay preload=\'auto\' [width]="width" [height]="height" webkitPlaysinline></video>\n</ion-content>\n<!-- <ion-content>\n  <canvas #canvasElem id="renderCanvas"></canvas>\n</ion-content> -->\n\n<!--\n<ion-content padding>\n\n  <video #videoElement width="320" height="240" loop autoplay webkitPlaysinline controls="false">\n    <!-- MP4 for Safari, IE9, iPhone, iPad, Android, and Windows Phone 7 --\n    <source type="video/mp4" src="assets/video/output_4.mp4" />\n    <!-- WebM/VP8 for Firefox4, Opera, and Chrome --\n    <source type="video/webm" src="assets/video/output_4.webm" />\n    <!-- Ogg/Vorbis for older Firefox and Opera versions --\n    <source type="video/ogg" src="assets/video/output_4.ogg" />\n    <source type="video/x-flv" src="assets/video/output_4.flv" />\n    <source type="video/3gpp" src="assets/video/output_4.3gp" />\n  </video>\n \n </ion-content>\n -->'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]) === "function" && _c || Object])
], HomePage);

var _a, _b, _c;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(281);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_ar_js_ar_js__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_arengine_service_arengine_service__ = __webpack_require__(420);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_ar_js_ar_js__["a" /* ArJsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: []
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_ar_js_ar_js__["a" /* ArJsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_9__providers_arengine_service_arengine_service__["a" /* ArengineServiceProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

var MyApp = (function () {
    function MyApp(platform) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // statusBar.styleDefault();
            // splashScreen.hide(); 
            window.URL = window.URL || window.webkitURL;
            //navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            window.MediaDevices = window.MediaDevices || navigator.getUserMedia;
            // this.checkPermissions();
        });
        // }
        // private checkPermissions() {
        //   this.diagnose.getCameraAuthorizationStatus().then(
        //     success => {
        //       console.log("success in camera", success);
        //       this.diagnose.getMicrophoneAuthorizationStatus().then(done => {
        //         console.log("mic success", done);
        //         this.rootPage = HomePage;
        //         return;
        //       }, fail => {
        //         this.diagnose.requestMicrophoneAuthorization().then(completed => {
        //           this.checkPermissions();
        //         });
        //       });
        //     }, failure => {
        //       this.diagnose.requestCameraAuthorization().then(completed => {
        //         this.checkPermissions();
        //       })
        //     });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 371:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 372:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArJsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import THREEx from 'ar.js';
var ArJsPage = (function () {
    function ArJsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ArJsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ArJsPage');
    };
    return ArJsPage;
}());
ArJsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-ar-js',template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/ar-js/ar-js.html"*/'<!--\n  Generated template for the ArJsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>ar-js</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/ar-js/ar-js.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavParams */]])
], ArJsPage);

//# sourceMappingURL=ar-js.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArengineServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ArengineServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ArengineServiceProvider = (function () {
    function ArengineServiceProvider(http) {
        this.http = http;
        console.log('Hello ArengineServiceProvider Provider');
        // start AR Engine
    }
    ArengineServiceProvider.prototype.startAREngine = function () {
    };
    return ArengineServiceProvider;
}());
ArengineServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ArengineServiceProvider);

//# sourceMappingURL=arengine-service.js.map

/***/ })

},[262]);
//# sourceMappingURL=main.js.map