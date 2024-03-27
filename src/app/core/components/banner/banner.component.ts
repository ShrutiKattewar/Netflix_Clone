import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() bannerTitle = ''; // Required Input
  @Input() bannerOverview = ''; // Required Input
  @Input() bannerId = ''; // Required Input
  @Input() key = '';
  videoLoaded = false;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.videoLoaded = true;
    }, 2000);
  }
}
