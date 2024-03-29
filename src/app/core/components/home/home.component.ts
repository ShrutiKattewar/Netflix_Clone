import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { IMovieContent } from 'src/app/shared/models/movie-content.interface';
import { MovieService } from 'src/app/shared/services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { async, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  isSearch!: boolean;

  // get logged in user details
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  picture = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;

  movies: IMovieContent[] = [];
  tvShows: IMovieContent[] = [];
  topRatedMovies: IMovieContent[] = [];
  upcomingMovies: IMovieContent[] = [];

  bannerDetails: any = '';
  bannerVideo: any = '';

  ngOnInit(): void {
    this.getUpdatedData(); //get all movies data

    // if search navigate from home to search page
    this.movieService.ifSearch$.subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('/home/search');
      }
    });
  }

  // call services to get all data and subscribe
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
        this.movies = res.Movies.results.slice(0, 10) as IMovieContent[];
        this.bannerDetails = this.movies[1]; // get first movie data from movie list

        this.movieService
          .getBannerVideo(this.movies[1].id)
          .subscribe((resp) => {
            resp.results.forEach((element: any) => {
              if (element.type === 'Trailer') {
                let key = element.key;
                this.bannerVideo =
                  this.sanitizer.bypassSecurityTrustResourceUrl(
                    `https://www.youtube.com/embed/${key}?start=10&end=40&autoplay=1&mute=1&playlist=${key}&loop=1&controls=0&rel=0&showinfo=0&disablekb=1`
                  ); // used DOM sanitizer to prevent cross site scripting security bugs
              }
            });
          });

        // filtering first 10 values to show
        this.tvShows = res.TvShows.results.slice(0, 10) as IMovieContent[];

        this.upcomingMovies = res.UpcomingMovies.results.slice(
          0,
          10
        ) as IMovieContent[];
        this.topRatedMovies = res.TopRated.results.slice(
          0,
          10
        ) as IMovieContent[];
      });
  }

  // sign out user
  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.authService.signOut();
  }
}
