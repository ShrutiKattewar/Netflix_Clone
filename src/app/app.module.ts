import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { MovieCarouselComponent } from './core/components/movie-carousel/movie-carousel.component';
import { DescriptionPipe } from './shared/pipes/description.pipe';
import { ImagePipePipe } from './shared/pipes/image-pipe.pipe';
import { MovieComponent } from './core/components/movie/movie.component';
import { VotePipe } from './shared/pipes/vote.pipe';
import { YearPipe } from './shared/pipes/year.pipe';
import { RuntimePipe } from './shared/pipes/runtime.pipe';
import { SearchComponent } from './core/components/search/search.component';
import { AuthService } from './shared/services/auth.service';
import { AuthServiceGuard } from './shared/services/auth.guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    BannerComponent,
    MovieCarouselComponent,
    DescriptionPipe,
    ImagePipePipe,
    MovieComponent,
    VotePipe,
    YearPipe,
    RuntimePipe,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthServiceGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
