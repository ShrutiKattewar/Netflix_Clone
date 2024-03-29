import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [],
})
export class BannerComponent implements OnInit {
  // get banner details input from home
  @Input() bannerDetails: any;
  @Input() bannerVideo = '';

  videoLoaded = false;
  constructor() {}

  ngOnInit(): void {
    // show banner image for first 5 sec then banner video
    setTimeout(() => {
      this.videoLoaded = true;
    }, 5000);
  }
}
