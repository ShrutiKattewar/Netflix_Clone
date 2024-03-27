import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService implements OnInit {
  options = {
    params: {
      include_adult: 'false',
      include_video: 'true',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
    },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjdmYzMyNDYyNTc4YjhhYTY4NmRmYzRmNjJjZTc4NCIsInN1YiI6IjY1ZWI0ZTNkNzJjMTNlMDE4NWM3ZjNiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y5yK6rzSvhIIXWZ15fAxyi_h7cJALOKJfF3mZnu6ldI',
    },
  };

  private product$ = new BehaviorSubject<boolean>(false);
  selectedProduct$ = this.product$.asObservable();

  setProduct(product: any) {
    this.product$.next(product);
  }

  private result$ = new BehaviorSubject<boolean>(false);
  sResult$ = this.result$.asObservable();

  setSresult(product: any) {
    this.result$.next(product);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  searchMovie(data: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/search/movie?query=${data}`,
      this.options
    );
  }

  getCastsDetails(data: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${data}/casts`,
      this.options
    );
  }

  getTvShows() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/discover/tv',
      this.options
    );
  }

  getBannerVideo(id: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      this.options
    );
  }

  getMovieDetail(id: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}`,
      this.options
    );
  }

  getPopularMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/popular',
      this.options
    );
  }

  getRelatedMovies(id: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      this.options
    );
  }

  getTopRated() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/top_rated',
      this.options
    );
  }

  getUpcomingMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/movie/upcoming',
      this.options
    );
  }
}
