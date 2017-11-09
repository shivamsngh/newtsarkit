import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide(); 
      window.URL = window.URL || (<any>window).webkitURL;
      //navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      (<any>window).MediaDevices = (<any>window).MediaDevices || navigator.getUserMedia;
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
}

