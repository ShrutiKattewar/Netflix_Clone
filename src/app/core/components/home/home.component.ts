import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { IVideoContent } from 'src/app/shared/models/video-content.interface';
import { MovieService } from 'src/app/shared/services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { async, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  isSearch!: boolean;
  sResult: any;
  hoveredContent: string | null = null;

  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  picture = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  bannerTitle: any = '';
  bannerVideo: any = '';
  bannerOverview: any = '';
  bannerId: any = '';
  // isDivVisible = false;

  ngOnInit(): void {
    this.getUpdatedData();
    this.movieService.selectedProduct$.subscribe((res) => {
      this.isSearch = res;
    });
  }

  getUpdatedData() {
    forkJoin(
      this.movieService.getPopularMovies(),
      this.movieService.getTvShows(),
      this.movieService.getUpcomingMovies(),
      this.movieService.getTopRated()
    )
      .pipe(
        map(([Movies, TvShows, UpcomingMovies, TopRated]) => {
          return {
            Movies,
            TvShows,
            UpcomingMovies,
            TopRated,
          };
        })
      )
      .subscribe((res: any) => {
        this.movies = res.Movies.results.slice(0, 10) as IVideoContent[];
        this.bannerTitle = this.movies[0].title;
        this.bannerOverview = this.movies[0].overview;
        this.bannerId = this.movies[0].id;
        this.movieService
          .getBannerVideo(this.movies[0].id)
          .subscribe((resp) => {
            resp.results.forEach((element: any) => {
              if (element.type === 'Trailer') {
                let key = element.key;
                this.bannerVideo =
                  this.sanitizer.bypassSecurityTrustResourceUrl(
                    // `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&controls=0`
                    `https://www.youtube.com/embed/${key}?end=10&autoplay=1&mute=1&playlist=${key}&loop=1&controls=0&rel=0&showinfo=0&disablekb=1`
                  );
              }
            });
          });

        this.tvShows = res.TvShows.results.slice(0, 10) as IVideoContent[];

        this.upcomingMovies = res.UpcomingMovies.results.slice(
          0,
          10
        ) as IVideoContent[];
        this.topRatedMovies = res.TopRated.results.slice(
          0,
          10
        ) as IVideoContent[];
      });
  }

  searchResult(res: any) {
    this.sResult = res;
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.authService.signOut();
  }
}
