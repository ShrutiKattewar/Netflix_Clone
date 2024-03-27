import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { IVideoContent } from 'src/app/shared/models/video-content.interface';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private location: Location
  ) {}

  selectedMovieId: any;
  details: any;
  trailer: any;
  casts: string[] = [];
  relatedList: IVideoContent[] = [];

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.selectedMovieId = params['id'];
      this.getUpdatedData(this.selectedMovieId);
    });
  }

  getUpdatedData(id: any) {
    forkJoin(
      this.movieService.getMovieDetail(id),
      this.movieService.getBannerVideo(id),
      this.movieService.getCastsDetails(id),
      this.movieService.getRelatedMovies(id)
    )
      .pipe(
        map(([details, trailer, casts, related]) => {
          return {
            details,
            trailer,
            casts,
            related,
          };
        })
      )
      .subscribe((res: any) => {
        this.details = res.details;
        this.getMovieTrailer(res.trailer.results);
        this.getCastsList(res.casts.cast);
        this.relatedList = res.related.results.slice(0, 5);
      });
  }

  getMovieTrailer(trailers: any) {
    trailers.forEach((element: any) => {
      if (element.type === 'Trailer') {
        let key = element.key;
        this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${key}?end=20&autoplay=1&mute=1&playlist=${key}&loop=1&controls=0&rel=0&showinfo=0&disablekb=1`
        );
      }
    });
  }

  getCastsList(casts: any) {
    casts.forEach((cast: any) => {
      if (this.casts.length < 4) {
        this.casts.push(cast.name);
      }
    });
  }
  getRelatedList(list: any) {
    return list.slice(0, 5);
  }
}
