import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  IPosterContent,
  IVideoContent,
} from 'src/app/shared/models/video-content.interface';
import { MovieService } from 'src/app/shared/services/movie.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(400, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() moviesList: IVideoContent[] = [];
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @Input() title!: string;

  hoveredContent: string | null = null;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        },
      },
    });
  }

  poster_details!: IPosterContent;
  setHoveredMovie(movie: IVideoContent) {
    this.hoveredContent = movie.title ?? movie.name;
    this.poster_details = {
      title: movie.title,
      overview: movie.overview,
      id: movie.id,
    };
  }

  clearHoveredMovie() {
    this.hoveredContent = null;
  }
}
