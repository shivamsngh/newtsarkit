import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OnInit, Renderer2 } from '@angular/core';
import { ARController, artoolkit, CameraDeviceConfig } from 'jsartoolkit5';
import { WebGLRenderer, Mesh, SphereGeometry, MeshNormalMaterial, FlatShading, Material } from 'three';
import Stats from 'stats.js';

@Component({
  selector: 'page-jsex',
  templateUrl: 'jsex.html',
})
export class JsexPage implements OnInit {

  @ViewChild('JsexContent', { read: ElementRef }) content: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ngRenderer: Renderer2) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JsexPage');
  }
  ngOnInit() {
    this.startAR()
  }

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

  public async startAR() {
    let devId = await this.getDeviceId();
    const camConfig: CameraDeviceConfig = { video: { deviceId: devId } };
    ARController.getUserMediaThreeScene({
      maxARVideoSize: 320, cameraParam: 'assets/data/camera_para.dat', cameraConfig: camConfig,
      onSuccess: (arScene, arController, arCamera) => {
        this.content.nativeElement.className = arController.orientation;
        arController.setPatternDetectionMode(artoolkit.AR_MATRIX_CODE_DETECTION);
        var renderer = new WebGLRenderer({ antialias: true });
        if (arController.orientation === 'portrait') {
          var w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
          var h = window.innerWidth;
          renderer.setSize(w, h);
          renderer.domElement.style.paddingBottom = (w - h) + 'px';
        } else {
          if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
            renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
          } else {
            renderer.setSize(arController.videoWidth, arController.videoHeight);
            document.body.className += ' desktop';
          }
        }
        // document.body.insertBefore(renderer.domElement, document.body.firstChild);
        this.ngRenderer.appendChild(this.content.nativeElement, renderer.domElement)
        // See /doc/patterns/Matrix code 3x3 (72dpi)/20.png
        var markerRoot = arController.createThreeBarcodeMarker(20);
        var sphere = new Mesh(
          new SphereGeometry(0.5, 8, 8),
          new MeshNormalMaterial()
        );
        let Exsphere = sphere.material as Material
        Exsphere.shading = FlatShading;
        sphere.position.z = 0.5;
        markerRoot.add(sphere);
        arScene.scene.add(markerRoot);
        var rotationV = 0;
        var rotationTarget = 0;
        renderer.domElement.addEventListener('click', function (ev) {
          ev.preventDefault();
          rotationTarget += 1;
        }, false);
        let stats = new Stats();
        this.ngRenderer.insertBefore(this.content.nativeElement, stats.dom, stats);
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
  }

}
