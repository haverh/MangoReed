import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MangaDexService } from '../../services/manga-dex.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('scrollableReader') scrollReader: ElementRef;

  top10: Array<any> = [];

  constructor(private mangaService: MangaDexService) { }

  ngOnInit(): void {
    // Fetch top 10 manga
    this.mangaService.getTop().then((data) => {
      this.top10 = data;
    });
  }

}
