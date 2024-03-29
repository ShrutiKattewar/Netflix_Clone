import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { IMovieContent } from 'src/app/shared/models/movie-content.interface';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styles: [],
})
export class MovieComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  selectedMovieId: any;
  details: any;
  trailer: any;
  casts: string[] = [];
  relatedList: IMovieContent[] = [];

  // back button
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
        this.getCastsList(res.casts.cast);
        this.relatedList = res.related.results.slice(0, 5);
      });
  }

  // get selected movie casts list
  getCastsList(casts: any) {
    casts.forEach((cast: any) => {
      if (this.casts.length < 4) {
        this.casts.push(cast.name);
      }
    });
  }

  // get related movies list to selected movie
  getRelatedList(list: any) {
    return list.slice(0, 5);
  }
}
