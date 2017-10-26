import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import {
  Camera, Scene, WebGLRenderer, Color, Mesh, MeshNormalMaterial,
  BoxGeometry, IcosahedronGeometry, FlatShading
} from 'three';

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

  constructor(platform: Platform, public navCtrl: NavController) {
    // this.width = 640;//platform.width();
    // this.height = 480;//platform.height();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    console.log(`WxH: ${this.width}x${this.height}`);
  }

  ngAfterViewInit() {
    //let videoNative = this.videoElement.nativeElement;
    const vw = this.width;
    const vh = this.height;
    //Initialize a basic camera
    const scene = new Scene();
    const camera = new Camera();
    scene.add(camera);


    if ('MediaDevices' in window || navigator.getUserMedia) {
      const videoCofig: CameraDeviceConfig = { video: { deviceId: '' ? { exact: 'environment' } : undefined } };
      ARController.getUserMediaThreeScene({
        cameraConfig: videoCofig, // added
        maxARVideoSize: 640,
        cameraParam: 'assets/data/camera_para.dat',
        onSuccess: (arScene: ARThreeScene, arController, arCamera) => {
          arController.setPatternDetectionMode(artoolkit.AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);

          var renderer = this.createWebGLRenderer(vw, vh);
          document.body.appendChild(renderer.domElement);

          var rotationTarget = 0;
          renderer.domElement.addEventListener('click', function (ev) {
            ev.preventDefault();
            rotationTarget += 1;
          }, false);


          let cube = this.createCube();
          let icosahedron = this.createIcosahedron();
          this.trackMarker(arScene, arController, 5, cube);
          this.trackMarker(arScene, arController, 20, icosahedron);

          let tick = () => {
            arScene.process();
            arScene.renderOn(renderer);
            requestAnimationFrame(tick);
          };
          tick();
        }
      });
    }
  }

  private trackMarker(arScene: ARThreeScene, arController, markerId: number, object: Mesh) {
    var marker = arController.createThreeBarcodeMarker(markerId, 1);
    marker.add(object);
    arScene.scene.add(marker);
  }

  private createCube(): Mesh {
    const cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshNormalMaterial()
    );
    // cube.material. = FlatShading;
    cube.position.z = 0.5;
    return cube;
  }

  private createIcosahedron(): Mesh {
    const icosahedron = new Mesh(
      new IcosahedronGeometry(0.7, 1),
      new MeshNormalMaterial()
    );
    // icosahedron.material.flatShading = FlatShading;
    icosahedron.position.z = 0.7;
    return icosahedron;
  }

  private createWebGLRenderer(width: number, height: number): WebGLRenderer {
    var renderer = new WebGLRenderer({
      // antialias: true,
      alpha: true
    });
    renderer.setClearColor(new Color('lightgrey'), 0)
    renderer.setSize(width, height);
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';
    // renderer.domElement.style.transform = 'translate(-50%, -50%)';
    // renderer.domElement.className = 'center';
    return renderer;
  }
}
