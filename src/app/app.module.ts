import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DemoPage } from '../pages/demo/demo';

import { Diagnostic } from '@ionic-native/diagnostic';
import { ArengineServiceProvider } from '../providers/arengine-service/arengine-service';
import { JsexPage } from '../pages/jsex/jsex';
import { Demo2Page } from '../pages/demo2/demo2';
import { Renderer2 } from '@angular/core/src/render/api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DemoPage,
    Demo2Page,
    JsexPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DemoPage,
    Demo2Page,
    JsexPage
  ],
  providers: [
    // StatusBar, 
    // SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Diagnostic,
    ArengineServiceProvider,
  ]
})
export class AppModule { }
