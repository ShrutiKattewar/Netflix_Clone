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
  IMovieContent,
} from 'src/app/shared/models/movie-content.interface';
import { MovieService } from 'src/app/shared/services/movie.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() moviesList: IMovieContent[] = [];
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @Input() title!: string;

  hoveredContent: string | null = null;
  poster_details!: IPosterContent;

  constructor() {}

  ngOnInit(): void {}

  // swiper package initialization
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

  // set hovred movie details
  setHoveredMovie(movie: IMovieContent) {
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
