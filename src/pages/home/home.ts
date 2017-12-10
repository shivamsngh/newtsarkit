import { Component, ViewChild, ElementRef, Renderer2, OnInit, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { WebGLRenderer, ObjectLoader, Color, Mesh, MeshNormalMaterial, BoxGeometry, IcosahedronGeometry, FlatShading, MeshBasicMaterial, DoubleSide, LoadingManager, Material, JSONLoader, Object3D, Scene, Camera } from 'three';

import { ARController, ARThreeScene, artoolkit, CameraDeviceConfig, ARCameraParam } from 'jsartoolkit5';
import Stats from 'stats.js';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    @ViewChild('mainContent', { read: ElementRef }) content: ElementRef;

    width: number;
    height: number;
    stream: MediaStream;
    deviceId: string;
    stats = new Stats();


    constructor(platform: Platform, public navCtrl: NavController, public ngRenderer: Renderer2, private ngZone: NgZone) {
        this.width = 640;//platform.width();
        this.height = 480;//platform.height();
        console.log(`WxH: ${this.width}x${this.height}`);
    }

    ngOnInit() {
        console.log("ngOnInit")
    }

    ngAfterViewInit() {
        console.log("Content", this.content);
        // this.startRendering(this.content);
        // this.renderVideoStream(this.content);
        this.createARParameters();
        this.appendStatisticsScreen(this.content)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                             Basic Required Functions                           ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Gets the device ID of the camera and 
     * chooses the rear one.
     */
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
            if (devId === null || devId === undefined || devId === 'unkwn') {
                console.log("Inside if in getdeviceid");
                info.forEach(x => {
                    if (x.kind) {
                        let kindRegEx = x.kind.match(/video|videoinput/);
                        if (kindRegEx !== null || kindRegEx !== undefined)
                            devId = x.deviceId;
                    }
                });
            }
            return devId;
        });
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
   * Creates on device camera 
   * @param width 
   * @param height 
   * @param arController 
   * @param arScene 
   */
    private createWebGLRenderer(width: number, height: number, arController, arScene): WebGLRenderer {
        var renderer = new WebGLRenderer({
            // antialias: true,
            alpha: true
        });
        renderer.setClearColor(new Color('lightgrey'), 0);
        console.log("orientation", arController.orientation);
        // let f = Math.min(
        //     window.innerWidth / arScene.video.videoWidth,
        //     window.innerHeight / arScene.video.videoHeight
        // );
        // const w = f * arScene.video.videoWidth;
        // const h = f * arScene.video.videoHeight;
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (arController.orientation === 'portrait') {
            renderer.setSize(h, w);
            renderer.domElement.style.transformOrigin = '0 0';
            renderer.domElement.style.transform = 'rotate(-90deg) translateX(-100%)';
        } else {
            renderer.setSize(w, h);
        }
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0px';
        renderer.domElement.style.left = '0px';
        return renderer;
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                              Canvas Based Rendering                            ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * STart renderng the WEB GL Canvas
     */
    private startRendering(content: ElementRef) {
        //let videoNative = this.videoElement.nativeElement;
        let vw = this.width;
        let vh = this.height;

        if ('MediaDevices' in window || navigator.getUserMedia) {
            // let constraints: MediaStreamConstraints = { video: { facingMode: 'environment' } };
            // console.log("Mediascreens");
            // console.log(navigator.mediaDevices.getUserMedia(constraints));
            this.getDeviceId().then(id => {
                console.log("dev id", id);
                this.deviceId = id;
                const camConfig: CameraDeviceConfig = { video: { deviceId: this.deviceId } };
                ARController.getUserMediaThreeScene({
                    maxARVideoSize: 640,
                    cameraConfig: camConfig,
                    cameraParam: 'assets/data/camera_para.dat',
                    onSuccess: (arScene: ARThreeScene, arController, arCamera) => {
                        arController.setPatternDetectionMode(artoolkit.AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);

                        var renderer = this.createWebGLRenderer(vw, vh, arController, arScene);

                        var rotationTarget = 0;
                        renderer.domElement.addEventListener('click', function (ev) {
                            console.log("Inside click")
                            ev.preventDefault();
                            rotationTarget += 1;
                        }, false);

                        // dont use document,  instead use viewchild/renderer
                        // document.body.appendChild(renderer.domElement);
                        try {
                            this.ngRenderer.appendChild(content.nativeElement, renderer.domElement);
                            // document.body.appendChild(renderer.domElement);
                        }
                        catch (ex) {
                            console.log("Error in startRendering", ex);
                        }

                        // let cube = this.createCube();
                        let icosahedron = this.createIcosahedron();
                        this.createAvatar((object) => {
                            console.log("Callback returned", object);
                            this.trackMarker(arScene, arController, 5, object);
                        });
                        // this.trackMarker(arScene, arController, 5, cube);
                        this.trackMarker(arScene, arController, 20, icosahedron);
                        let updateRendering = () => {
                            // console.log("Inside tick");
                            // let time = performance.now() / 1000;
                            this.stats.update();
                            this.ngZone.runOutsideAngular(() => {
                                arScene.process();
                                arScene.renderOn(renderer);
                                requestAnimationFrame(updateRendering);
                            });
                        };
                        updateRendering();
                    }
                });
            })

        }
    }

 

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                              Video Based Rendering                            ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * New function which will render video input in videoElement
     */
    private renderVideoStream(content: ElementRef) {
        this.getDeviceId().then(devId => {
            navigator.mediaDevices.getUserMedia({ video: { deviceId: devId } })
                .then(stream => {
                    const domElement: HTMLVideoElement = this.ngRenderer.createElement('video');
                    domElement.setAttribute('autoplay', '');
                    domElement.setAttribute('muted', '');
                    domElement.setAttribute('playsinline', '');
                    domElement.style.width = window.innerWidth + 'px';
                    domElement.style.height = window.innerHeight + 'px';
                    domElement.srcObject = stream;
                    document.body.addEventListener('click', () => {
                        domElement.play();
                    });
                    this.ngRenderer.appendChild(content.nativeElement, domElement);
                    domElement.onload = (loaded) => {
                        console.log("Video Elem Loaded", loaded);
                        this.ngRenderer.appendChild(content.nativeElement, domElement);
                    }

                });
        });
    }

    /**
     * Create camera, scene and arcontroller manually
     */
    private createARParameters() {
        // const scene = new Scene();
        // const camera = new Camera();
        // const cameraParam = new ARCameraParam();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const camConfig: CameraDeviceConfig = { video: { deviceId: this.deviceId } };
        
        try{
            let successFn = (arScene: ARThreeScene, arController, arCamera) => {
                this.ngRenderer.appendChild(this.content.nativeElement, videoOut);
            }
            const videoOut = ARController.getUserMediaThreeScene({
                maxARVideoSize: 640,
                cameraConfig: camConfig,
                cameraParam: 'assets/data/camera_para.dat',
                onSuccess: successFn
            })
        }
        catch(ex){
            console.log("Error in projection",ex);
        }
        


    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                              Performance Statics                                ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Append Frame stats on screen
     */
    private appendStatisticsScreen(content: ElementRef) {
        // this.stats.showPanel(1);
        try {
            this.ngRenderer.appendChild(content.nativeElement, this.stats.dom);
        }
        catch (ex) {
            console.log("Error in appendStatisticsScreen", ex);
        }
    }



    /**
     * Increments the angle of x axis of the object.
     * @param object 
     */
    public incrementXAngle(object: Object3D): void {
        object.rotation.x += 5;
    }





    ////////////////////////////////////////////////////////////////////////////////////////////////
    ////////                                    3D Objects                                  ////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
   * Creates Simple Cube
   */
    private createCube(): Mesh {
        var cube = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshNormalMaterial()
        );
        const m = cube.material as Material;
        m.shading = FlatShading;
        // cube.material.shading = FlatShading;
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
        const m = icosahedron.material as Material;
        m.shading = FlatShading;
        // icosahedron.material.shading = FlatShading;
        icosahedron.position.z = 0.7;
        return icosahedron;
    }

    /**
     * Creates custom object Avatar
     * NOTE: You need ot have the object in json
     * that will be parsed by teh JSON loader.
     * .OBJ files can be converted to .JSON
     * in three.js editor.
     */
    private createAvatar(callback: Function): void {
        console.log("Starting avatar 20");
        let manager = new LoadingManager();
        manager.onLoad = () => {
            console.log('Loading started!');
            try {
                let speech = window.speechSynthesis;
                // let speech = new window.speechSynthesis;
                let speak = new SpeechSynthesisUtterance('Hey Ya Boy, Whats up.');
                speech.speak(speak);
            }
            catch (ex) {
                console.log("error in speaking", ex);
            }
        };
        manager.onError = () => {
            console.log("Error in loding res");
        }
        manager.onProgress = (url, itemsLoaded, itemsTotal) => {
            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        let objLoader = new ObjectLoader(manager);
        let material = new MeshNormalMaterial();
        console.log("Object oader", objLoader, "material", material);
        objLoader.load('assets/avatar/legoboy.json', (obj) => {
            console.log("Avatar Loaded", obj);
            // let mesh = new Mesh(object, material); 
            obj.traverse((child) => {
                if (child instanceof Mesh) {
                    console.log("inside child");
                    child.material = material;
                    child.material.shading = FlatShading;
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
    }
}
