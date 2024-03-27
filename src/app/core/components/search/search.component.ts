import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchResult: any;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.sResult$.subscribe((res) => {
      this.searchResult = res;
    });
  }
}
