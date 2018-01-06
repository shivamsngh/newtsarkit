import { Component, ViewChild, ElementRef, Renderer2, OnInit, NgZone } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ArengineServiceProvider } from '../../providers/arengine-service/arengine-service';

@Component({
  selector: 'page-demo2',
  templateUrl: 'demo2.html',
})
export class Demo2Page {
  @ViewChild('mainContent', { read: ElementRef }) content: ElementRef;

  deviceId: string;

  fpsText: string = "";
  mobilePlatform: boolean = false;

  constructor(private plt: Platform, public navCtrl: NavController, public ngRenderer: Renderer2, private ngZone: NgZone, private elementRef: ElementRef, private arApi: ArengineServiceProvider, private navParams: NavParams) {

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
    this.deviceId = this.navParams.get('id');
    console.log("dev id on demo 2", this.deviceId);
    this.arApi.createARParameters(this.deviceId, this.content, this.ngRenderer);
    this.arApi.appendStatisticsScreen(this.content, this.ngRenderer);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Demo2Page');
  }

}
