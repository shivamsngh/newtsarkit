webpackJsonp([0],{

/***/ 144:
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
webpackEmptyAsyncContext.id = 144;

/***/ }),

/***/ 186:
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
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stats_js__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stats_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_stats_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DemoPage = (function () {
    function DemoPage(platform, navCtrl, ngRenderer, ngZone, elementRef) {
        this.navCtrl = navCtrl;
        this.ngRenderer = ngRenderer;
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.stats = new __WEBPACK_IMPORTED_MODULE_4_stats_js___default.a();
        this.fpsText = "";
        this.width = 640; //platform.width();
        this.height = 480; //platform.height();
        console.log("WxH: " + this.width + "x" + this.height);
    }
    DemoPage.prototype.ngOnInit = function () {
        console.log("ngOnInit");
    };
    DemoPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log("Content", this.content);
        // this.startRendering(this.content);
        // this.renderVideoStream(this.content);
        this.getDeviceId().then(function (id) {
            _this.createARParameters();
            _this.appendStatisticsScreen(_this.content);
        });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                             Basic Required Functions                           ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Gets the device ID of the camera and
     * chooses the rear one.
     */
    DemoPage.prototype.getDeviceId = function (oldId) {
        var _this = this;
        if (oldId) {
            return navigator.mediaDevices.enumerateDevices().then(function (info) {
                console.log("cam info", info);
                var devId = 'unkwn';
                info.forEach(function (x) {
                    if (x.kind) {
                        var kindRegEx = x.kind.match(/video|videoinput/);
                        if ((kindRegEx !== null || kindRegEx !== undefined) && x.deviceId !== oldId) {
                            devId = x.deviceId;
                            _this.deviceId = devId;
                        }
                    }
                });
                return devId;
            });
        }
        else {
            return navigator.mediaDevices.enumerateDevices().then(function (info) {
                console.log("cam info", info);
                var devId = 'unkwn';
                info.forEach(function (x) {
                    if (x.label) {
                        var labelRegEx = x.label.match(/back|rear/);
                        if (labelRegEx !== null || labelRegEx !== undefined)
                            devId = x.deviceId;
                        _this.deviceId = devId;
                    }
                });
                console.log(devId);
                if (devId === null || devId === undefined || devId === 'unkwn') {
                    console.log("Inside if in getdeviceid");
                    info.forEach(function (x) {
                        if (x.kind) {
                            var kindRegEx = x.kind.match(/video|videoinput/);
                            if (kindRegEx !== null || kindRegEx !== undefined)
                                devId = x.deviceId;
                            _this.deviceId = devId;
                        }
                    });
                }
                return devId;
            });
        }
    };
    DemoPage.prototype.changeCamera = function () {
        var _this = this;
        console.log("Changing camera");
        this.getDeviceId(this.deviceId).then(function (deviId) {
            _this.deviceId = deviId;
            _this.ngRenderer.removeChild(_this.elementRef.nativeElement, _this.elementRef.nativeElement.querySelector('video'));
            _this.ngRenderer.removeChild(_this.elementRef.nativeElement, _this.elementRef.nativeElement.querySelector('canvas'));
            _this.appendStatisticsScreen(_this.content);
        });
    };
    /**
  * Tracks markers in scene
  * @param arScene
  * @param arController
  * @param markerId
  * @param object
  */
    DemoPage.prototype.trackMarker = function (arScene, arController, markerId, object) {
        var marker = arController.createThreeBarcodeMarker(markerId, 1);
        marker.add(object);
        arScene.scene.add(marker);
        // return marker
    };
    /**
   * Creates on device camera
   * @param width
   * @param height
   * @param arController
   * @param arScene
   */
    DemoPage.prototype.createWebGLRenderer = function (width, height, arController, arScene) {
        var renderer = new __WEBPACK_IMPORTED_MODULE_2_three__["WebGLRenderer"]({
            // antialias: true,
            alpha: true
        });
        renderer.setClearColor(new __WEBPACK_IMPORTED_MODULE_2_three__["Color"]('lightgrey'), 0);
        console.log("orientation", arController.orientation);
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
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0px';
        renderer.domElement.style.left = '0px';
        // renderer.render(Scene,Camera)
        return renderer;
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                              Video Based Rendering                            ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Create camera, scene and arcontroller manually
     * MAIN
     */
    DemoPage.prototype.createARParameters = function () {
        var _this = this;
        // const scene = new Scene();
        // const camera = new Camera();
        // const cameraParam = new ARCameraParam();
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var camConfig = { video: { deviceId: this.deviceId } };
        var successFn = function (arScene, arController, arCamera) {
            _this.ngRenderer.appendChild(_this.content.nativeElement, videoOut);
            arController.setPatternDetectionMode(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["artoolkit"].AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
            var renderer = _this.createWebGLRenderer(vw, vh, arController, arScene);
            // click event
            _this.ngRenderer.listen('document', 'click', function (ev) {
                console.log("ng Clicked");
            });
            _this.ngRenderer.appendChild(_this.content.nativeElement, renderer.domElement);
            console.log("elref", _this.elementRef.nativeElement.querySelector('video'));
            var icosahedron = _this.createIcosahedron();
            var torus = _this.createTorus();
            // this.createAvatar((object) => {
            //     console.log("Callback returned", object);
            //     this.trackMarker(arScene, arController, 5, object);
            // });
            _this.trackMarker(arScene, arController, 5, icosahedron);
            _this.trackMarker(arScene, arController, 20, torus);
            var stop = false;
            var frameCount = 0;
            // let $results = $("#results");
            var fps = 120, fpsInterval, startTime, now, then, elapsed, count = 0;
            var updateRendering = function () {
                // console.log("Inside tick");
                // let time = performance.now() / 1000;
                torus.rotation.x += 0.1;
                icosahedron.rotation.y += 0.1;
                _this.stats.update();
                // this.ngZone.runOutsideAngular(() => {
                requestAnimationFrame(updateRendering);
                now = Date.now();
                elapsed = now - then;
                if (elapsed > fpsInterval) {
                    // console.log("count a", ++count);
                    then = now - (elapsed % fpsInterval);
                    // let newScene = this.createScene()
                    arScene.process();
                    arScene.renderOn(renderer);
                    var sinceStart = now - startTime;
                    var currentFps = Math.round(1000 / (sinceStart / ++count) * 100) / 100;
                    _this.fpsText = "Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @" + currentFps + " fps.";
                }
                // });
            };
            fpsInterval = 1000 / fps;
            then = Date.now();
            startTime = then;
            updateRendering();
        };
        var videoOut = __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["ARController"].getUserMediaThreeScene({
            width: window.innerWidth,
            height: window.innerHeight,
            maxARVideoSize: 1080,
            cameraConfig: camConfig,
            cameraParam: 'assets/data/camera_para.dat',
            onSuccess: successFn
        });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                              Performance Statics                                ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Append Frame stats on screen
     */
    DemoPage.prototype.appendStatisticsScreen = function (content) {
        // this.stats.showPanel(1);
        try {
            this.ngRenderer.appendChild(content.nativeElement, this.stats.dom);
        }
        catch (ex) {
            console.log("Error in appendStatisticsScreen", ex);
        }
    };
    /**
     * Increments the angle of x axis of the object.
     * @param object
     */
    DemoPage.prototype.incrementXAngle = function (object) {
        object.rotation.x += 5;
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                                    3D Objects                                  ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
   * Creates Simple Cube
   */
    DemoPage.prototype.createCube = function () {
        var cube = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_2_three__["BoxGeometry"](1, 1, 1), new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]());
        var m = cube.material;
        m.shading = __WEBPACK_IMPORTED_MODULE_2_three__["FlatShading"];
        // cube.material.shading = FlatShading;
        cube.position.z = 0.5;
        return cube;
    };
    /**
     * Creates Sphere
     */
    DemoPage.prototype.createIcosahedron = function () {
        var icosahedron = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_2_three__["IcosahedronGeometry"](0.7, 1), new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]());
        var m = icosahedron.material;
        m.shading = __WEBPACK_IMPORTED_MODULE_2_three__["FlatShading"];
        // icosahedron.material.shading = FlatShading;
        icosahedron.position.z = 0.7;
        return icosahedron;
    };
    DemoPage.prototype.createTorus = function () {
        var geometry = new __WEBPACK_IMPORTED_MODULE_2_three__["TorusKnotGeometry"](0.3, 0.1, 64, 16);
        var material = new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]();
        var mesh = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](geometry, material);
        mesh.scale.x = 2;
        mesh.scale.y = 2;
        mesh.scale.z = 2;
        mesh.position.y = 0.5;
        return mesh;
    };
    /**
     * Creates custom object Avatar
     * NOTE: You need ot have the object in json
     * that will be parsed by teh JSON loader.
     * .OBJ files can be converted to .JSON
     * in three.js editor.
     */
    DemoPage.prototype.createAvatar = function (callback) {
        console.log("Starting avatar 20");
        var manager = new __WEBPACK_IMPORTED_MODULE_2_three__["LoadingManager"]();
        manager.onLoad = function () {
            console.log('Loading started!');
            try {
                var speech = window.speechSynthesis;
                // let speech = new window.speechSynthesis;
                var speak = new SpeechSynthesisUtterance('Hey Ya Boy, Whats up.');
                speech.speak(speak);
            }
            catch (ex) {
                console.log("error in speaking", ex);
            }
        };
        manager.onError = function () {
            console.log("Error in loding res");
        };
        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        var objLoader = new __WEBPACK_IMPORTED_MODULE_2_three__["ObjectLoader"](manager);
        var material = new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]();
        console.log("Object oader", objLoader, "material", material);
        objLoader.load('assets/avatar/legoboy.json', function (obj) {
            console.log("Avatar Loaded", obj);
            // let mesh = new Mesh(object, material); 
            obj.traverse(function (child) {
                if (child instanceof __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"]) {
                    console.log("inside child");
                    child.material = material;
                    child.material.shading = __WEBPACK_IMPORTED_MODULE_2_three__["FlatShading"];
                }
            });
            //Rotation angle is in radians
            // Formula will be pi/2 for 90 deg
            obj.rotation.x = Math.PI / 2;
            obj.position.z = 0.5;
            obj.scale.x = 0.7;
            obj.scale.y = 0.7;
            obj.scale.z = 0.7;
            console.log('positionobj x:', obj.position.x, 'y', obj.position.y, 'z', obj.position.z);
            callback(obj);
        });
    };
    return DemoPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('mainContent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
], DemoPage.prototype, "content", void 0);
DemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-demo',template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/demo/demo.html"*/'<ion-content class="no-scroll" #mainContent>\n  <p style="color:red;z-index:100000">{{fpsText}}</p>\n  \n</ion-content>\n<ion-footer>\n  <button ion-button full (click)="changeCamera()">Change Camera</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/demo/demo.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _f || Object])
], DemoPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(282);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_demo_demo__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_arengine_service_arengine_service__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_jsex_jsex__ = __webpack_require__(422);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';






var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_demo_demo__["a" /* DemoPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_jsex_jsex__["a" /* JsexPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: []
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_demo_demo__["a" /* DemoPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_jsex_jsex__["a" /* JsexPage */]
        ],
        providers: [
            // StatusBar, 
            // SplashScreen,
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_7__providers_arengine_service_arengine_service__["a" /* ArengineServiceProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_demo_demo__ = __webpack_require__(226);
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
    function MyApp(platform) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_demo_demo__["a" /* DemoPage */];
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

/***/ 361:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 362:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stats_js__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stats_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_stats_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var HomePage = (function () {
    function HomePage(platform, navCtrl, ngRenderer, ngZone, elementRef) {
        this.navCtrl = navCtrl;
        this.ngRenderer = ngRenderer;
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.stats = new __WEBPACK_IMPORTED_MODULE_4_stats_js___default.a();
        this.fpsText = "";
        this.width = 640; //platform.width();
        this.height = 480; //platform.height();
        console.log("WxH: " + this.width + "x" + this.height);
    }
    HomePage.prototype.ngOnInit = function () {
        console.log("ngOnInit");
    };
    HomePage.prototype.ngAfterViewInit = function () {
        console.log("Content", this.content);
        // this.startRendering(this.content);
        // this.renderVideoStream(this.content);
        this.createARParameters();
        this.appendStatisticsScreen(this.content);
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                             Basic Required Functions                           ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Gets the device ID of the camera and
     * chooses the rear one.
     */
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
            if (devId === null || devId === undefined || devId === 'unkwn') {
                console.log("Inside if in getdeviceid");
                info.forEach(function (x) {
                    if (x.kind) {
                        var kindRegEx = x.kind.match(/video|videoinput/);
                        if (kindRegEx !== null || kindRegEx !== undefined)
                            devId = x.deviceId;
                    }
                });
            }
            return devId;
        });
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
        // return marker
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
            // antialias: true,
            alpha: true
        });
        renderer.setClearColor(new __WEBPACK_IMPORTED_MODULE_2_three__["Color"]('lightgrey'), 0);
        console.log("orientation", arController.orientation);
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
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0px';
        renderer.domElement.style.left = '0px';
        // renderer.render(Scene,Camera)
        return renderer;
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                              Canvas Based Rendering                            ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * STart renderng the WEB GL Canvas
     */
    HomePage.prototype.startRendering = function (content) {
        var _this = this;
        //let videoNative = this.videoElement.nativeElement;
        var vw = this.width;
        var vh = this.height;
        if ('MediaDevices' in window || navigator.getUserMedia) {
            // let constraints: MediaStreamConstraints = { video: { facingMode: 'environment' } };
            // console.log("Mediascreens");
            // console.log(navigator.mediaDevices.getUserMedia(constraints));
            this.getDeviceId().then(function (id) {
                console.log("dev id", id);
                _this.deviceId = id;
                var camConfig = { video: { deviceId: _this.deviceId } };
                __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["ARController"].getUserMediaThreeScene({
                    maxARVideoSize: 640,
                    cameraConfig: camConfig,
                    cameraParam: 'assets/data/camera_para.dat',
                    onSuccess: function (arScene, arController, arCamera) {
                        arController.setPatternDetectionMode(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["artoolkit"].AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
                        var renderer = _this.createWebGLRenderer(vw, vh, arController, arScene);
                        var rotationTarget = 0;
                        renderer.domElement.addEventListener('click', function (ev) {
                            console.log("Inside click");
                            ev.preventDefault();
                            rotationTarget += 1;
                        }, false);
                        // dont use document,  instead use viewchild/renderer
                        // document.body.appendChild(renderer.domElement);
                        try {
                            _this.ngRenderer.appendChild(content.nativeElement, renderer.domElement);
                            // document.body.appendChild(renderer.domElement);
                        }
                        catch (ex) {
                            console.log("Error in startRendering", ex);
                        }
                        // let cube = this.createCube();
                        var icosahedron = _this.createIcosahedron();
                        _this.createAvatar(function (object) {
                            console.log("Callback returned", object);
                            _this.trackMarker(arScene, arController, 5, object);
                        });
                        // this.trackMarker(arScene, arController, 5, cube);
                        _this.trackMarker(arScene, arController, 20, icosahedron);
                        var updateRendering = function () {
                            // console.log("Inside tick");
                            // let time = performance.now() / 1000;
                            _this.stats.update();
                            _this.ngZone.runOutsideAngular(function () {
                                arScene.process();
                                arScene.renderOn(renderer);
                                requestAnimationFrame(updateRendering);
                            });
                        };
                        updateRendering();
                    }
                });
            });
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                              Video Based Rendering                            ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Deprecated __
     * New function which will render video input in videoElement
     */
    HomePage.prototype.renderVideoStream = function (content) {
        var _this = this;
        this.getDeviceId().then(function (devId) {
            navigator.mediaDevices.getUserMedia({ video: { deviceId: devId } })
                .then(function (stream) {
                var domElement = _this.ngRenderer.createElement('video');
                domElement.setAttribute('autoplay', '');
                domElement.setAttribute('muted', '');
                domElement.setAttribute('playsinline', '');
                domElement.style.width = window.innerWidth + 'px';
                domElement.style.height = window.innerHeight + 'px';
                domElement.srcObject = stream;
                document.body.addEventListener('click', function () {
                    domElement.play();
                });
                _this.ngRenderer.appendChild(content.nativeElement, domElement);
                domElement.onload = function (loaded) {
                    console.log("Video Elem Loaded", loaded);
                    _this.ngRenderer.appendChild(content.nativeElement, domElement);
                };
                _this.createScene();
            });
        });
    };
    /**
     * Create camera, scene and arcontroller manually
     * MAIN
     */
    HomePage.prototype.createARParameters = function () {
        var _this = this;
        // const scene = new Scene();
        // const camera = new Camera();
        // const cameraParam = new ARCameraParam();
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        this.getDeviceId().then(function (id) {
            console.log("dev id", id);
            _this.deviceId = id;
            var camConfig = { video: { deviceId: _this.deviceId } };
            var successFn = function (arScene, arController, arCamera) {
                _this.ngRenderer.appendChild(_this.content.nativeElement, videoOut);
                arController.setPatternDetectionMode(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["artoolkit"].AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
                var renderer = _this.createWebGLRenderer(vw, vh, arController, arScene);
                // click event
                _this.ngRenderer.listen('document', 'click', function (ev) {
                    console.log("ng Clicked");
                });
                _this.ngRenderer.appendChild(_this.content.nativeElement, renderer.domElement);
                console.log("elref", _this.elementRef.nativeElement);
                var icosahedron = _this.createIcosahedron();
                var torus = _this.createTorus();
                // this.createAvatar((object) => {
                //     console.log("Callback returned", object);
                //     this.trackMarker(arScene, arController, 5, object);
                // });
                _this.trackMarker(arScene, arController, 5, icosahedron);
                _this.trackMarker(arScene, arController, 20, torus);
                var stop = false;
                var frameCount = 0;
                // let $results = $("#results");
                var fps = 60, fpsInterval, startTime, now, then, elapsed, count = 0;
                var updateRendering = function () {
                    // console.log("Inside tick");
                    // let time = performance.now() / 1000;
                    torus.rotation.x += 0.1;
                    icosahedron.rotation.y += 0.1;
                    _this.stats.update();
                    // this.ngZone.runOutsideAngular(() => {
                    requestAnimationFrame(updateRendering);
                    now = Date.now();
                    elapsed = now - then;
                    if (elapsed > fpsInterval) {
                        // console.log("count a", ++count);
                        then = now - (elapsed % fpsInterval);
                        // let newScene = this.createScene()
                        arScene.process();
                        arScene.renderOn(renderer);
                        var sinceStart = now - startTime;
                        var currentFps = Math.round(1000 / (sinceStart / ++count) * 100) / 100;
                        _this.fpsText = "Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @" + currentFps + " fps.";
                    }
                    // });
                };
                fpsInterval = 1000 / fps;
                then = Date.now();
                startTime = then;
                updateRendering();
            };
            var videoOut = __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["ARController"].getUserMediaThreeScene({
                width: window.innerWidth,
                height: window.innerHeight,
                maxARVideoSize: 1080,
                cameraConfig: camConfig,
                cameraParam: 'assets/data/camera_para.dat',
                onSuccess: successFn
            });
        });
    };
    HomePage.prototype.createScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var scene, camera, cameraParam;
            return __generator(this, function (_a) {
                scene = new __WEBPACK_IMPORTED_MODULE_2_three__["Scene"]();
                camera = new __WEBPACK_IMPORTED_MODULE_2_three__["Camera"]();
                cameraParam = new __WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["ARCameraParam"]();
                cameraParam.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var arController, projMatrixArr, projMtx, artoolkitProjectionAxisTransformMatrix, obj, marker, smoothedRoot, renderer, fps, fpsInterval, startTime, now, then, elapsed, count, updateRendering, _a, camConfig;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                console.log("Camera loaded");
                                arController.setPatternDetectionMode(__WEBPACK_IMPORTED_MODULE_3_jsartoolkit5__["artoolkit"].AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
                                projMatrixArr = arController.getCameraMatrix();
                                projMtx = new __WEBPACK_IMPORTED_MODULE_2_three__["Matrix4"]().fromArray(projMatrixArr);
                                artoolkitProjectionAxisTransformMatrix = new __WEBPACK_IMPORTED_MODULE_2_three__["Matrix4"]();
                                artoolkitProjectionAxisTransformMatrix.multiply(new __WEBPACK_IMPORTED_MODULE_2_three__["Matrix4"]().makeRotationY(Math.PI));
                                artoolkitProjectionAxisTransformMatrix.multiply(new __WEBPACK_IMPORTED_MODULE_2_three__["Matrix4"]().makeRotationZ(Math.PI));
                                projMtx.multiply(artoolkitProjectionAxisTransformMatrix);
                                scene.add(camera);
                                camera.matrixAutoUpdate = false;
                                camera.projectionMatrix.elements.set(projMtx.toArray());
                                obj = this.createIcosahedron();
                                marker = this.trackMarker({}, arController, 5, obj);
                                smoothedRoot = new __WEBPACK_IMPORTED_MODULE_2_three__["Group"]();
                                renderer = this.createWebGLRenderer(window.innerWidth, window.innerHeight, arController, scene);
                                this.ngRenderer.appendChild(this.content.nativeElement, renderer.domElement);
                                fps = 60, count = 0;
                                updateRendering = function () {
                                    // console.log("Inside tick");
                                    // let time = performance.now() / 1000;
                                    _this.stats.update();
                                    // this.ngZone.runOutsideAngular(() => {
                                    requestAnimationFrame(updateRendering);
                                    now = Date.now();
                                    elapsed = now - then;
                                    if (elapsed > fpsInterval) {
                                        // console.log("count a", ++count);
                                        ++count;
                                        then = now - (elapsed % fpsInterval);
                                        renderer.render(scene, camera);
                                        var sinceStart = now - startTime;
                                        var currentFps = Math.round(1000 / (sinceStart / count) * 100) / 100;
                                        _this.fpsText = "Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @" + currentFps + " fps.";
                                    }
                                    // });
                                };
                                fpsInterval = 1000 / fps;
                                then = Date.now();
                                startTime = then;
                                updateRendering();
                                _a = this;
                                return [4 /*yield*/, this.getDeviceId()];
                            case 1:
                                _a.deviceId = _b.sent();
                                camConfig = { video: { deviceId: this.deviceId } };
                                return [2 /*return*/];
                        }
                    });
                }); };
                cameraParam.load('assets/data/camera_para.dat');
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.process = function () {
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                              Performance Statics                                ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Append Frame stats on screen
     */
    HomePage.prototype.appendStatisticsScreen = function (content) {
        // this.stats.showPanel(1);
        try {
            this.ngRenderer.appendChild(content.nativeElement, this.stats.dom);
        }
        catch (ex) {
            console.log("Error in appendStatisticsScreen", ex);
        }
    };
    /**
     * Increments the angle of x axis of the object.
     * @param object
     */
    HomePage.prototype.incrementXAngle = function (object) {
        object.rotation.x += 5;
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                                    3D Objects                                  ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
   * Creates Simple Cube
   */
    HomePage.prototype.createCube = function () {
        var cube = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_2_three__["BoxGeometry"](1, 1, 1), new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]());
        var m = cube.material;
        m.shading = __WEBPACK_IMPORTED_MODULE_2_three__["FlatShading"];
        // cube.material.shading = FlatShading;
        cube.position.z = 0.5;
        return cube;
    };
    /**
     * Creates Sphere
     */
    HomePage.prototype.createIcosahedron = function () {
        var icosahedron = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_2_three__["IcosahedronGeometry"](0.7, 1), new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]());
        var m = icosahedron.material;
        m.shading = __WEBPACK_IMPORTED_MODULE_2_three__["FlatShading"];
        // icosahedron.material.shading = FlatShading;
        icosahedron.position.z = 0.7;
        return icosahedron;
    };
    HomePage.prototype.createTorus = function () {
        var geometry = new __WEBPACK_IMPORTED_MODULE_2_three__["TorusKnotGeometry"](0.3, 0.1, 64, 16);
        var material = new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]();
        var mesh = new __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"](geometry, material);
        mesh.scale.x = 2;
        mesh.scale.y = 2;
        mesh.scale.z = 2;
        mesh.position.y = 0.5;
        return mesh;
    };
    /**
     * Creates custom object Avatar
     * NOTE: You need ot have the object in json
     * that will be parsed by teh JSON loader.
     * .OBJ files can be converted to .JSON
     * in three.js editor.
     */
    HomePage.prototype.createAvatar = function (callback) {
        console.log("Starting avatar 20");
        var manager = new __WEBPACK_IMPORTED_MODULE_2_three__["LoadingManager"]();
        manager.onLoad = function () {
            console.log('Loading started!');
            try {
                var speech = window.speechSynthesis;
                // let speech = new window.speechSynthesis;
                var speak = new SpeechSynthesisUtterance('Hey Ya Boy, Whats up.');
                speech.speak(speak);
            }
            catch (ex) {
                console.log("error in speaking", ex);
            }
        };
        manager.onError = function () {
            console.log("Error in loding res");
        };
        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        var objLoader = new __WEBPACK_IMPORTED_MODULE_2_three__["ObjectLoader"](manager);
        var material = new __WEBPACK_IMPORTED_MODULE_2_three__["MeshNormalMaterial"]();
        console.log("Object oader", objLoader, "material", material);
        objLoader.load('assets/avatar/legoboy.json', function (obj) {
            console.log("Avatar Loaded", obj);
            // let mesh = new Mesh(object, material); 
            obj.traverse(function (child) {
                if (child instanceof __WEBPACK_IMPORTED_MODULE_2_three__["Mesh"]) {
                    console.log("inside child");
                    child.material = material;
                    child.material.shading = __WEBPACK_IMPORTED_MODULE_2_three__["FlatShading"];
                }
            });
            //Rotation angle is in radians
            // Formula will be pi/2 for 90 deg
            obj.rotation.x = Math.PI / 2;
            obj.position.z = 0.5;
            obj.scale.x = 0.7;
            obj.scale.y = 0.7;
            obj.scale.z = 0.7;
            console.log('positionobj x:', obj.position.x, 'y', obj.position.y, 'z', obj.position.z);
            callback(obj);
        });
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('mainContent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "content", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/home/home.html"*/'<ion-content class="no-scroll" #mainContent>\n  <p style="color:red;z-index:100000">{{fpsText}}</p>\n  <button (click)="incrementAngle()"></button>\n</ion-content>'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
], HomePage);

//# sourceMappingURL=home.js.map

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

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JsexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsartoolkit5__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsartoolkit5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsartoolkit5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_three__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stats_js__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stats_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_stats_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var JsexPage = (function () {
    function JsexPage(navCtrl, navParams, ngRenderer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ngRenderer = ngRenderer;
    }
    JsexPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JsexPage');
    };
    JsexPage.prototype.ngOnInit = function () {
        this.startAR();
    };
    /**
      * Gets the device ID of the camera and
      * chooses the rear one.
      */
    JsexPage.prototype.getDeviceId = function () {
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
            if (devId === null || devId === undefined || devId === 'unkwn') {
                console.log("Inside if in getdeviceid");
                info.forEach(function (x) {
                    if (x.kind) {
                        var kindRegEx = x.kind.match(/video|videoinput/);
                        if (kindRegEx !== null || kindRegEx !== undefined)
                            devId = x.deviceId;
                    }
                });
            }
            return devId;
        });
    };
    JsexPage.prototype.startAR = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var devId, camConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDeviceId()];
                    case 1:
                        devId = _a.sent();
                        camConfig = { video: { deviceId: devId } };
                        __WEBPACK_IMPORTED_MODULE_2_jsartoolkit5__["ARController"].getUserMediaThreeScene({
                            maxARVideoSize: 320, cameraParam: 'assets/data/camera_para.dat', cameraConfig: camConfig,
                            onSuccess: function (arScene, arController, arCamera) {
                                _this.content.nativeElement.className = arController.orientation;
                                arController.setPatternDetectionMode(__WEBPACK_IMPORTED_MODULE_2_jsartoolkit5__["artoolkit"].AR_MATRIX_CODE_DETECTION);
                                var renderer = new __WEBPACK_IMPORTED_MODULE_3_three__["WebGLRenderer"]({ antialias: true });
                                if (arController.orientation === 'portrait') {
                                    var w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
                                    var h = window.innerWidth;
                                    renderer.setSize(w, h);
                                    renderer.domElement.style.paddingBottom = (w - h) + 'px';
                                }
                                else {
                                    if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
                                        renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
                                    }
                                    else {
                                        renderer.setSize(arController.videoWidth, arController.videoHeight);
                                        document.body.className += ' desktop';
                                    }
                                }
                                // document.body.insertBefore(renderer.domElement, document.body.firstChild);
                                _this.ngRenderer.appendChild(_this.content.nativeElement, renderer.domElement);
                                // See /doc/patterns/Matrix code 3x3 (72dpi)/20.png
                                var markerRoot = arController.createThreeBarcodeMarker(20);
                                var sphere = new __WEBPACK_IMPORTED_MODULE_3_three__["Mesh"](new __WEBPACK_IMPORTED_MODULE_3_three__["SphereGeometry"](0.5, 8, 8), new __WEBPACK_IMPORTED_MODULE_3_three__["MeshNormalMaterial"]());
                                var Exsphere = sphere.material;
                                Exsphere.shading = __WEBPACK_IMPORTED_MODULE_3_three__["FlatShading"];
                                sphere.position.z = 0.5;
                                markerRoot.add(sphere);
                                arScene.scene.add(markerRoot);
                                var rotationV = 0;
                                var rotationTarget = 0;
                                renderer.domElement.addEventListener('click', function (ev) {
                                    ev.preventDefault();
                                    rotationTarget += 1;
                                }, false);
                                var stats = new __WEBPACK_IMPORTED_MODULE_4_stats_js___default.a();
                                _this.ngRenderer.insertBefore(_this.content.nativeElement, stats.dom, stats);
                                var tick = function () {
                                    stats.update();
                                    arScene.process();
                                    arScene.renderOn(renderer);
                                    rotationV += (rotationTarget - sphere.rotation.z) * 0.05;
                                    sphere.rotation.z += rotationV;
                                    rotationV *= 0.8;
                                    requestAnimationFrame(tick);
                                };
                                tick();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return JsexPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('JsexContent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], JsexPage.prototype, "content", void 0);
JsexPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-jsex',template:/*ion-inline-start:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/jsex/jsex.html"*/'<ion-content #JsexContent>\n  <!-- <div #fpsmonitor id="fpscanvas"></div> -->\n  <!-- <video #videoElement autoplay preload=\'auto\' [width]="width" [height]="height" webkitPlaysinline></video> -->\n<p style="color:red;z-index:100000">{{fpsText}}</p>\n  <!-- <button (click)="incrementAngle()"></button> -->\n</ion-content>\n'/*ion-inline-end:"/Users/shivamsingh/Documents/Projects/new-ts-arkit/src/pages/jsex/jsex.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */]])
], JsexPage);

//# sourceMappingURL=jsex.js.map

/***/ })

},[263]);
//# sourceMappingURL=main.js.map