import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaDexService } from 'src/app/services/manga-dex.service';

@Component({
  selector: 'app-manga-page',
  templateUrl: './manga-page.component.html',
  styleUrls: ['./manga-page.component.css']
})
export class MangaPageComponent implements OnInit {
  mangaId: string|null;
  mangaObject: any = {};
  status: string;

  limitedDescription: string = '';
  descriptionLimit: number = 40;
  descriptionLength: number;

  altTitles: string[] = [];
  tags: string[] = [];

  constructor(private mangaService: MangaDexService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.handleRouteChange();
  }

  // Handle route change
  handleRouteChange():void {
    this.route.paramMap.subscribe((params) => {
      this.mangaId = params.get('manga-id');
      this.fetchMangaInfo();
    })
  }

  // Fetch manga info
  fetchMangaInfo(): void {
    this.mangaService.getMangaInfo(this.mangaId).then((data) => {
      this.limitedDescription = data.description.split(' ').slice(0,this.descriptionLimit).join(' ');
      this.descriptionLength = data.description.length;
      this.mangaObject = data;
      this.altTitles = data.altTitles;
      this.tags = data.tags;
      this.status = data.status.toUpperCase();
    });
  }
}
