import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchResult: any;
  searchFound!: boolean;
  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.sResult$.subscribe((res: any) => {
      if (res.length !== 0) {
        this.searchFound = true;
        let filteredArray = res.filter(
          (item: any) => item.poster_path !== null
        );
        this.searchResult = filteredArray;
      } else {
        this.searchFound = false;
      }
    });
  }
  goBack(): void {
    this.movieService.setIsSearch(false);
    this.router.navigateByUrl('/home');
  }
}
