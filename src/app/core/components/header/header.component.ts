import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class HeaderComponent {
  navList = ['Home', 'For You', 'Movies', 'TV Shows', 'Apps', 'Library'];
  @Input() userImg: string = '';
  @Output() searchResult = new EventEmitter<any>();
  navBg: any;

  dropdownPopoverShow = false;
  @ViewChild('dropdownRef', { static: false }) dropdownRef!: ElementRef;

  searchTerm = '';
  constructor(
    private _eref: ElementRef,
    private movieService: MovieService,
    private router: Router
  ) {}

  @HostListener('document:scroll') scrollover() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navBg = {
        'background-color': '#000',
      };
    } else {
      this.navBg = {};
    }
  }

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target))
      this.dropdownPopoverShow = false;
  }

  toggleDropdown(event: any) {
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  search(term: string): void {
    if (term !== '') {
      this.movieService.setProduct(true);
      this.movieService.searchMovie(term).subscribe((res) => {
        this.movieService.setSresult(res.results);
      });
    } else {
      this.movieService.setProduct(false);
    }
  }
}
