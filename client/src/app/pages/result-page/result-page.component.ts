import { Component, OnInit, HostListener, Renderer2, TemplateRef } from '@angular/core';
import { MangaDexService } from 'src/app/services/manga-dex.service';
import { ActivatedRoute } from '@angular/router';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  fewer: TemplateRef<NgIfContext<boolean>> | null;
  more: TemplateRef<NgIfContext<boolean>> | null;

  titleString: string|null;
  status: string = '';
  searchResults: Array<any> = [];

  isSmall: boolean = true;
  viewportWidth: number;

  limitedDescription: string = '';
  descriptionLimit: number = 40;
  descriptionLength: number;

  constructor(private mangaService: MangaDexService, private route: ActivatedRoute, private renderer: Renderer2) {
    this.viewportWidth = window.innerWidth;
    this.isSmall = this.viewportWidth < 780;
  }

  ngOnInit(): void {
    this.handleRouteChange();
  }

  // Handle route change
  handleRouteChange():void {
    this.route.paramMap.subscribe((params) => {
      this.titleString = params.get('title-string');
      this.fetchSearchResults();
    })
  }

  // Fetch and populate search results
  fetchSearchResults(): void {
    this.searchResults = [];
    this.mangaService.searchFor(this.titleString).then((data) => {
      this.status = data.status;
      this.searchResults = data;
    });
  }

  // Listen to changes in DOM for viewport resizing
  @HostListener('window: resize', ['$event'])
  onResize(event: Event) {
    this.viewportWidth = window.innerWidth;
    this.isSmall = this.viewportWidth < 780;
  }
  
}
