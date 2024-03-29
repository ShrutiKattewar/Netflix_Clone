declare var google: any;

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isDivVisible = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // google suthentication initizalizations
    google.accounts.id.initialize({
      client_id:
        '123002801606-prv5u3rm4e2kuro9pvc7u83fvpfanbbn.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handleLogin(resp);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
      this.authService.isLoggedIn = true;
      this.isDivVisible = true;

      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 4000);
    }
  }
}
