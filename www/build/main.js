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

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__);
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
//   Scene, Engine, FreeCamera, Vector3, HemisphericLight, Mesh, MeshBuilder,
// } from 'babylonjs';
var HomePage = (function () {
    function HomePage(platform, navCtrl) {
        this.navCtrl = navCtrl;
        // this.width = 640;//platform.width();
        // this.height = 480;//platform.height();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        console.log("WxH: " + this.width + "x" + this.height);
        // this.getCameraConfig();
    }
    // ngAfterViewInit() {
    //   this.canvas = HTMLCanvasElement = this.canvasElem.nativeElement;
    //   this.engine = new Engine(this.canvas, true);
    //   const scene = this.createScene();
    //   this.engine.runRenderLoop(() => {
    //     scene.render();
    //   })
    // }
    // // Create Scene
    // private createScene() {
    //   // create a basic BJS Scene object
    //   const scene = new Scene(this.engine);
    //   // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    //   const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
    //   // target the camera to scene origin
    //   camera.setTarget(Vector3.Zero());
    //   // attach the camera to the canvas
    //   camera.attachControl(this.canvas, false);
    //   // create a basic light, aiming 0,1,0 - meaning, to the sky
    //   const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    //   // create a built-in "sphere" shape; 
    //   const sphere = MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene);
    //   // move the sphere upward 1/2 of its height
    //   sphere.position.y = 1;
    //   // create a built-in "ground" shape; 
    //   // const ground = BABYLON.Mesh.CreateGround('ground1', { height: 6, width: 6, subdivisions: 2 }, scene);
    //   const ground = Mesh.CreateGround('ground1', 6, 6, 2, scene);
    //   // return the created scene
    //   return scene;
    // }
    HomePage.prototype.ngAfterViewInit = function () {
        var _this = this;
        //let videoNative = this.videoElement.nativeElement;
        var vw = this.width;
        var vh = this.height;
        //Initialize a basic camera
        // const scene = new Scene();
        // const camera = new Camera();
        // scene.add(camera);
        if ('MediaDevices' in window || navigator.getUserMedia) {
            var videoCofig = { video: true };
            __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["ARController"].getUserMediaThreeScene({
                // cameraConfig: videoCofig, // added
                maxARVideoSize: 640,
                cameraParam: 'assets/data/camera_para.dat',
                onSuccess: function (arScene, arController, arCamera) {
                    arController.setPatternDetectionMode(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["artoolkit"].AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
                    var renderer = _this.createWebGLRenderer(vw, vh);
                    document.body.appendChild(renderer.domElement);
                    var rotationTarget = 0;
                    renderer.domElement.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        rotationTarget += 1;
                    }, false);
                    var cube = _this.createCube();
                    var icosahedron = _this.createIcosahedron();
                    _this.trackMarker(arScene, arController, 5, cube);
                    _this.trackMarker(arScene, arController, 20, icosahedron);
                    var tick = function () {
                        arScene.process();
                        arScene.renderOn(renderer);
                        requestAnimationFrame(tick);
                    };
                    tick();
                }
            });
        }
    };
    // Get rear camera logic
    HomePage.prototype.getCameraConfig = function () {
        window.navigator.mediaDevices.enumerateDevices().then(function (devices) {
            console.log("devices", devices);
            // this.device = devices.find((device) => {
            //   return device.label.indexOf('back') !== -1;
            // });
            var mediaQuery = {
                audio: false,
                video: {
                    facingMode: 'environment',
                    width: {
                        ideal: window.innerWidth,
                    },
                    height: {
                        ideal: window.innerHeight,
                    }
                }
            };
            window.navigator.mediaDevices.getUserMedia(mediaQuery)
                .then(function (stream) {
                console.log("Stream", stream);
            })
                .catch(function (error) { return console.warn("user medi err", error); });
        });
    };
    HomePage.prototype.trackMarker = function (arScene, arController, markerId, object) {
        var marker = arController.createThreeBarcodeMarker(markerId, 1);
        marker.add(object);
        arScene.scene.add(marker);
    };
    HomePage.prototype.createCube = function () {
        var cube = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_2_three__["BoxGeometry"](1, 1, 1), new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]());
        // cube.material. = FlatShading;
        cube.position.z = 0.5;
        return cube;
    };
    HomePage.prototype.createIcosahedron = function () {
        var icosahedron = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_2_three__["IcosahedronGeometry"](0.7, 1), new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]());
        // icosahedron.material.flatShading = FlatShading;
        icosahedron.position.z = 0.7;
        return icosahedron;
    };
    // private createWebGLRenderer(width: number, height: number): WebGLRenderer {
    //   let ideal = Math.min(
    //     window.innerWidth / arScene.video.videoWidth,
    //     window.innerHeight / arScene.video.videoHeight
    //   );
    //   width = ideal * arScene.video.videoWidth;
    //   height = ideal * arScene.video.videoHeight;
    //   var renderer = new WebGLRenderer({
    //     antialias: true,
    //     alpha: true
    //   });
    //   console.log("AR COntroller", arController);
    // 	if (arController.orientation === 'portrait') {
    // 		renderer.setSize(height,width);
    // 	} else {
    // 		renderer.setSize(width,height);
    //   }
    //   renderer.domElement.style.transformOrigin = '0 0';
    //   renderer.domElement.style.transform = 'rotate(-90deg) translateX(-100%)';
    //   renderer.setClearColor(new Color('lightgrey'), 0)
    //   renderer.domElement.style.position = 'absolute'
    //   renderer.domElement.style.top = '0px';
    //   renderer.domElement.style.left = '0px';
    //   // renderer.domElement.style.transform = 'translate(-50%, -50%)';
    //   // renderer.domElement.className = 'center';
    //   return renderer;
    // }
    HomePage.prototype.createWebGLRenderer = function (width, height) {
        var renderer = new __WEBPACK_IMPORTED_MODULE_2_three__["WebGLRenderer"]({
            antialias: true,
            alpha: true
        });
        renderer.setClearColor(new __WEBPACK_IMPORTED_MODULE_2_three__["Color"]('lightgrey'), 0);
        renderer.setSize(width, height);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '50%';
        renderer.domElement.style.left = '50%';
        renderer.domElement.style.transform = 'translate(-50%, -50%)';
        renderer.domElement.className = 'center';
        return renderer;
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('videoElement'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "videoElement", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/home/home.html"*/'<!-- <ion-content class="no-scroll">\n  <video #videoElement autoplay preload=\'auto\' [width]="width" [height]="height" webkitPlaysinline></video>\n</ion-content> -->\n<!-- <ion-content>\n  <canvas #canvasElem id="renderCanvas"></canvas>\n</ion-content> -->\n<ion-content class="no-scroll">\n  <video #videoElement autoplay preload=\'auto\' [width]="width" [height]="height" webkitPlaysinline controls="false"></video>\n</ion-content>\n<!--\n<ion-content padding>\n\n  <video #videoElement width="320" height="240" loop autoplay webkitPlaysinline controls="false">\n    <!-- MP4 for Safari, IE9, iPhone, iPad, Android, and Windows Phone 7 --\n    <source type="video/mp4" src="assets/video/output_4.mp4" />\n    <!-- WebM/VP8 for Firefox4, Opera, and Chrome --\n    <source type="video/webm" src="assets/video/output_4.webm" />\n    <!-- Ogg/Vorbis for older Firefox and Opera versions --\n    <source type="video/ogg" src="assets/video/output_4.ogg" />\n    <source type="video/x-flv" src="assets/video/output_4.flv" />\n    <source type="video/3gpp" src="assets/video/output_4.3gp" />\n  </video>\n \n </ion-content>\n -->'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(284);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_arengine_service_arengine_service__ = __webpack_require__(419);
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
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
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
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_8__providers_arengine_service_arengine_service__["a" /* ArengineServiceProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__ = __webpack_require__(264);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, diagnose) {
        var _this = this;
        this.diagnose = diagnose;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            window.URL = window.URL || window.webkitURL;
            //navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            window.MediaDevices = window.MediaDevices || navigator.getUserMedia;
            _this.checkPermissions();
        });
    }
    MyApp.prototype.checkPermissions = function () {
        var _this = this;
        this.diagnose.getCameraAuthorizationStatus().then(function (success) {
            console.log("success in camera", success);
            _this.diagnose.getMicrophoneAuthorizationStatus().then(function (done) {
                console.log("mic success", done);
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
                return;
            }, function (fail) {
                _this.diagnose.requestMicrophoneAuthorization().then(function (completed) {
                    _this.checkPermissions();
                });
            });
        }, function (failure) {
            _this.diagnose.requestCameraAuthorization().then(function (completed) {
                _this.checkPermissions();
            });
        });
    };
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_diagnostic__["a" /* Diagnostic */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 372:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 373:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArengineServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(421);
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

},[265]);
//# sourceMappingURL=main.js.map