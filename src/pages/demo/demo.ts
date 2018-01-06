import { Component, ViewChild, ElementRef, Renderer2, OnInit, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Demo2Page } from '../demo2/demo2';
import { ArengineServiceProvider } from '../../providers/arengine-service/arengine-service';



@Component({
  selector: 'page-demo',
  templateUrl: 'demo.html'
})
export class DemoPage implements OnInit {

  @ViewChild('mainContent', { read: ElementRef }) content: ElementRef;

  deviceId: string='';

  fpsText: string = "";
  mobilePlatform: boolean = false;


  constructor(private plt: Platform, public navCtrl: NavController, public ngRenderer: Renderer2, private ngZone: NgZone, private elementRef: ElementRef, private arApi: ArengineServiceProvider) {
  }

  ngOnInit() {
    console.log("ngOnInit");
    let platform = this.plt.platforms();
    console.log("plt", platform);

  }

  ngAfterViewInit() {
    console.log("Content", this.content);
    // this.startRendering(this.content);
    // this.renderVideoStream(this.content);
    this.arApi.getDeviceId().then(id => {
      this.deviceId=id;
      console.log("device", this.deviceId)
      this.arApi.createARParameters(id, this.content, this.ngRenderer);
      
      this.arApi.appendStatisticsScreen(this.content, this.ngRenderer);
    });
  }

  public changeCamera() {
    console.log("Changing camera");
    this.arApi.getDeviceId(this.deviceId).then(deviId => {
      this.navCtrl.setRoot(Demo2Page, { id: deviId });
    })
  }

}
