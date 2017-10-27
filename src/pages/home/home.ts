import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

// import {
//   Camera, Scene, WebGLRenderer, Color, Mesh, MeshNormalMaterial,
//   BoxGeometry, IcosahedronGeometry, FlatShading
// } from 'three';

import { ARController, ARThreeScene, artoolkit, CameraDeviceConfig } from 'jsartoolkit5';
import {
  Scene, Engine, FreeCamera, Vector3, HemisphericLight, Mesh, MeshBuilder,
} from 'babylonjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('canvasElem') canvasElem: ElementRef;
  @HostListener('resize') resize() {
    this.engine.resize();
  }

  width: number;
  height: number;
  device: MediaDeviceInfo;
  stream: MediaStream;
  engine: Engine;
  canvas: HTMLCanvasElement;

  constructor(platform: Platform, public navCtrl: NavController) {
    // this.width = 640;//platform.width();
    // this.height = 480;//platform.height();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    console.log(`WxH: ${this.width}x${this.height}`);
    // this.getCameraConfig();
  }


  ngAfterViewInit() {
    this.canvas = HTMLCanvasElement = this.canvasElem.nativeElement;
    this.engine = new Engine(this.canvas, true);
    const scene = this.createScene();
    this.engine.runRenderLoop(() => {
      scene.render();
    })
  }

  // Create Scene
  private createScene() {

    // create a basic BJS Scene object
    const scene = new Scene(this.engine);
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);

    // target the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(this.canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

    // create a built-in "sphere" shape; 
    const sphere = MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene);

    // move the sphere upward 1/2 of its height
    sphere.position.y = 1;

    // create a built-in "ground" shape; 
    // const ground = BABYLON.Mesh.CreateGround('ground1', { height: 6, width: 6, subdivisions: 2 }, scene);
    const ground = Mesh.CreateGround('ground1', 6, 6, 2, scene);

    // return the created scene
    return scene;
  }

}
