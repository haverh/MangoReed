import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { MangaPageComponent } from './pages/manga-page/manga-page.component';
import { ReadPageComponent } from './pages/read-page/read-page.component';

const routes: Routes = [
    { path: 'read/:manga-id/:index', component: ReadPageComponent},
    { path: 'manga/:manga-id', component: MangaPageComponent},
    { path: 'result/:title-string', component: ResultPageComponent},
    { path: '', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
