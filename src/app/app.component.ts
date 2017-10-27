import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private androidPermissions: AndroidPermissions) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide(); window.URL = window.URL || (<any>window).webkitURL;
      //navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      (<any>window).MediaDevices = (<any>window).MediaDevices || navigator.getUserMedia;

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        success => {
          console.log("perm success");
          this.rootPage = HomePage;
        },
        err => {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
            .then((success) => {
              this.rootPage = HomePage;
            }, err => console.log("Error in permission"));
        }
      );
    });
  }
}

