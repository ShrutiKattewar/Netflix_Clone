import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { MovieComponent } from './core/components/movie/movie.component';
import { AuthServiceGuard } from './shared/services/auth.guard.service';
import { SearchComponent } from './core/components/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthServiceGuard],
  },
  {
    path: 'home/search',
    component: SearchComponent,
  },
  {
    path: 'home/search/movie/:id',
    component: MovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
