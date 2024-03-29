import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'onOutsideClick($event)',
  },
})
export class HeaderComponent {
  @Input() userImg: string = '';
  @Output() searchResult = new EventEmitter<any>();
  @ViewChild('dropdownRef', { static: false }) dropdownRef!: ElementRef;

  searchTerm = '';
  navList = ['Home', 'For You', 'Movies', 'TV Shows', 'Apps', 'Library'];
  dropdownPopoverShow = false;

  constructor(private _eref: ElementRef, private movieService: MovieService) {}

  // close menu dropdown on outside click
  onOutsideClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target))
      this.dropdownPopoverShow = false;
  }

  // toggle menu dropdown
  toggleDropdown() {
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  // call service for search movie
  search(term: string): void {
    if (term !== '') {
      this.movieService.setIsSearch(true);
      this.movieService.searchMovie(term).subscribe((res) => {
        this.movieService.setSearchResult(res.results);
      });
    } else {
      this.movieService.setIsSearch(false);
    }
  }
}
