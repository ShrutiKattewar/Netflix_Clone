declare var google: any;

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isLoggedIn: boolean = false;

  signOut() {
    this.isLoggedIn = false;
    google.accounts.id.disableAutoSelect();
    this.router.navigateByUrl('/');
  }
}
