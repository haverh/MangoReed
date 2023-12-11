import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { HandtrackerComponent } from './handtracker/handtracker.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { MangaPageComponent } from './pages/manga-page/manga-page.component';
import { ReadPageComponent } from './pages/read-page/read-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    HomePageComponent,
    HandtrackerComponent,
    NavbarComponent,
    SearchComponent,
    ResultPageComponent,
    MangaPageComponent,
    ReadPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
