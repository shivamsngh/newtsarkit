import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ArJsPage } from '../pages/ar-js/ar-js';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ArengineServiceProvider } from '../providers/arengine-service/arengine-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArJsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArJsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Diagnostic,
    ArengineServiceProvider
  ]
})
export class AppModule {}
