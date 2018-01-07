import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import Stats from 'stats.js';

import { WebGLRenderer, ObjectLoader, Color, Mesh, MeshNormalMaterial, BoxGeometry, IcosahedronGeometry, FlatShading, MeshBasicMaterial, DoubleSide, LoadingManager, Material, JSONLoader, Object3D, Scene, Camera, TorusKnotGeometry, Group, Matrix4 } from 'three';

import { ARController, ARThreeScene, artoolkit, CameraDeviceConfig, ARCameraParam } from 'jsartoolkit5';
import { NgModule } from '@angular/core/src/metadata/ng_module';

@Injectable()
export class ArengineServiceProvider {

  width: number;
  height: number;
  stream: MediaStream;
  deviceId: string;
  stats = new Stats();

  fpsText: string = "";
  mobilePlatform: boolean = false;


  constructor(private plt: Platform) {
    this.width = 640;//platform.width();
    this.height = 480;//platform.height();
    console.log(`WxH: ${this.width}x${this.height}`);

    let platform = this.plt.platforms();
    console.log("plt", platform);
  }

  ngOnInit() {
    console.log("ngOnInit arservice");
  }

  // ngAfterViewInit() {
  // console.log("Content", this.content);
  // this.startRendering(this.content);
  // this.renderVideoStream(this.content);
  // this.getDeviceId().then(id => {
  //   this.createARParameters(id);
  //   this.appendStatisticsScreen(this.content);
  // });
  // }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////                             Basic Required Functions                           ////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Gets the device ID of the camera and 
   * chooses the rear one.
   */
  public getDeviceId(oldId?: string) {
    if (oldId) {
      console.log("oldId");
      return navigator.mediaDevices.enumerateDevices().then(info => {
        console.log("cam info", info);
        let devId: string[] = [];
        info.forEach(x => {
          if (x.kind) {
            let kindRegEx = x.kind.match(/video|videoinput/);
            if ((kindRegEx !== null || kindRegEx !== undefined) && x.deviceId !== oldId) {
              devId.push(x.deviceId);
            }
          }
        });
        this.deviceId = devId[1] ? devId[1] : devId[0];
        return this.deviceId;
      });
    }
    else {
      return navigator.mediaDevices.enumerateDevices().then(info => {
        console.log("cam info", info);
        let devId: string = 'unkwn';
        info.forEach(x => {
          if (x.label) {
            let labelRegEx = x.label.match(/back|rear/);
            if (labelRegEx !== null || labelRegEx !== undefined) {
              devId = x.deviceId;
              this.deviceId = devId;
            }
          }
        });
        console.log(devId);
        if (devId === null || devId === undefined || devId === 'unkwn') {
          console.log("Inside if in getdeviceid");
          info.forEach(x => {
            if (x.kind) {
              let kindRegEx = x.kind.match(/video|videoinput/);
              if (kindRegEx !== null || kindRegEx !== undefined) {
                devId = x.deviceId;
                this.deviceId = devId;
              }
            }
          });
        }
        return devId;
      });
    }

  }



  /**
* Tracks markers in scene
* @param arScene 
* @param arController 
* @param markerId 
* @param object 
*/
  private trackMarker(arScene: any, arController, markerId: number, object: Mesh) {
    var marker = arController.createThreeBarcodeMarker(markerId, 1);
    marker.add(object);
    arScene.scene.add(marker);
    // return marker
  }

  private trackManualMarker(arScene: any, arController, markerId: number, object: Mesh) {
    arController.loadMarker('/assets/data/patt.hiro', function (markerUID) {
      console.log("marker uuid", markerUID)
      var markerRoot = arController.createThreeMarker(markerUID);
      console.log("Marker root", markerRoot);
      markerRoot.add(object);
      arScene.scene.add(markerRoot);
    });
  }

  /**
 * Creates on device camera 
 * @param width 
 * @param height 
 * @param arController 
 * @param arScene 
 */
  private createWebGLRenderer(width: number, height: number, arController, arScene?): WebGLRenderer {
    var renderer = new WebGLRenderer({
      // antialias: true,
      alpha: true
    });
    renderer.setClearColor(new Color('lightgrey'), 0);
    console.log("orientation", arController.orientation);
    const w = width;
    const h = height;
    
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
    // renderer.render(Scene,Camera)
    return renderer;
  }



  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////                              Video Based Rendering                            ////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Create camera, scene and arcontroller manually
   * MAIN
   */
  public createARParameters(id: string, content, ngRenderer) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const camConfig: CameraDeviceConfig = { video: { deviceId: id } };
    let successFn = (arScene: ARThreeScene, arController, arCamera) => {
      // arController.setPatternDetectionMode(artoolkit.AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
      arController.setPatternDetectionMode(artoolkit.AR_TEMPLATE_MATCHING_COLOR);

      // arController.setMarkerInfoDir(1, 'assets/data/pattern-marker.patt');
      const renderer = this.createWebGLRenderer(vw, vh, arController, arScene);
      // click event
      ngRenderer.listen('document', 'click', (ev) => {
        console.log("ng Clicked");
      });
      ngRenderer.appendChild(content.nativeElement, videoOut);
      ngRenderer.appendChild(content.nativeElement, renderer.domElement);
      // console.log("elref", elementRef.nativeElement.querySelector('video'));

      const icosahedron = this.createIcosahedron();
      const torus = this.createTorus();
      this.createAvatar((object) => {
          console.log("Callback returned", object);
          this.trackManualMarker(arScene, arController, 5, object);
      });
      // this.trackMarker(arScene, arController, 5, icosahedron);
      // this.trackMarker(arScene, arController, 20, torus);
      // this.trackManualMarker(arScene, arController, 5, icosahedron);

      let stop = false;
      let frameCount = 0;
      // let $results = $("#results");
      let fps = 120, fpsInterval, startTime, now, then, elapsed, count = 0;

      let updateRendering = () => {
        // console.log("Inside tick");
        // let time = performance.now() / 1000;
        torus.rotation.x += 0.1;
        icosahedron.rotation.y += 0.1;
        this.stats.update();
        // this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(updateRendering);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);
          arScene.process();
          arScene.renderOn(renderer);
          var sinceStart = now - startTime;
          var currentFps = Math.round(1000 / (sinceStart / ++count) * 100) / 100;
          this.fpsText = `Elapsed time= ${Math.round(sinceStart / 1000 * 100) / 100} secs @${currentFps} fps.`;
        }
        // });
      };
      fpsInterval = 1000 / fps;
      then = Date.now();
      startTime = then;
      updateRendering();
    }
    const videoOut = ARController.getUserMediaThreeScene({
      width: window.innerWidth,
      height: window.innerHeight,
      maxARVideoSize: 1080,
      cameraConfig: camConfig,
      cameraParam: 'assets/data/camera_para.dat',
      onSuccess: successFn,
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////                              Performance Statics                                ////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Append Frame stats on screen
   */
  public appendStatisticsScreen(content, ngRenderer) {
    // this.stats.showPanel(1);
    try {
      ngRenderer.appendChild(content.nativeElement, this.stats.dom);
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
    const cube = new Mesh(
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
    const icosahedron = new Mesh(
      new IcosahedronGeometry(0.7, 1),
      new MeshNormalMaterial()
    );
    const m = icosahedron.material as Material;
    m.shading = FlatShading;
    // icosahedron.material.shading = FlatShading;
    icosahedron.position.z = 0.7;
    return icosahedron;
  }

  private createTorus() {
    const geometry = new TorusKnotGeometry(0.3, 0.1, 64, 16);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);
    mesh.scale.x = 2;
    mesh.scale.y = 2;
    mesh.scale.z = 2;
    mesh.position.y = 0.5
    return mesh;
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
