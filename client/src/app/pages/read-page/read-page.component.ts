import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { MangaDexService } from 'src/app/services/manga-dex.service';
import { PredictionEvent } from '../../prediction-event';

@Component({
  selector: 'app-read-page',
  templateUrl: './read-page.component.html',
  styleUrls: ['./read-page.component.css']
})
export class ReadPageComponent implements OnInit{
  @ViewChild('scrollableReader') scrollReader: ElementRef;

  mangaObject: any = {};
  mangaId: string|null;
  index: number;
  baseUrl: string;
  hash: string;
  imgFileNames: string[];
  titleString: string = '';
  maxChapters: number;


  baseDimension: number = 100;
  imgWidth: string = '100%'
  isTheatreMode = false;

  gesture: String = "";

  constructor(private mangaService: MangaDexService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.handleRouteChange();
  }

  // Handle route change
  handleRouteChange():void {
    this.route.paramMap.subscribe((params) => {
      this.mangaId = params.get('manga-id');
      const indexParam = params.get('index');
      this.index = indexParam ? Number(indexParam) : -1;
      this.fetchChapter();
    })
  }

  // Fetch chapter data from backend
  fetchChapter(): void {
    this.mangaService.getChapter(this.mangaId, this.index).then((data) => {
      this.baseUrl = data.imgBaseURL;
      this.hash = data.hash;
      this.imgFileNames = data.fileNames;
      this.titleString = `Vol ${data.volume}. Chapter ${data.chapter} - ${data.chapterTitle}`
      this.maxChapters = data.maxChapters;
      this.mangaObject = data;

    });
  }

  // Scroll reader downwards
  scrollDown() {
    this.scrollReader.nativeElement.scrollBy({
      top: 200,
      left: 0,
      behavior: "smooth",
    });
  }

  // Scroll reader upwards
  scrollUp() {
    this.scrollReader.nativeElement.scrollBy({
      top: -200,
      left: 0,
      behavior: "smooth",
    });
  }

  // Format string in percentage
  percentageString() {
    this.imgWidth = `${this.baseDimension}%`;
  }

  // Increase dimension 
  enlarge() {
    this.baseDimension += 10;
    this.percentageString();
  }

  // Decrease dimension 
  reduce() {
    this.baseDimension -= 10;
    this.percentageString();
  }

  // Go to next chapter
  nextChapter() {
    if (this.index < this.maxChapters && this.index !== -1) {
      const nextIndex = this.index + 1;
      this.router.navigate(['/read', this.mangaId, nextIndex]);
    }
  }

  // Go to previous chapter
  prevChapter() {
    if (this.index > 0 && this.index !== -1) {
      const prevIndex = this.index - 1;
      this.router.navigate(['/read', this.mangaId, prevIndex]);
    }
  }

  // Toggle theatre mode
  toggleTheaterMode() {
    this.isTheatreMode = !this.isTheatreMode;
  }

  // Predict gestures
  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();

    if ( this.gesture === "Open Hand" ) {
      this.scrollUp();
    } else if ( this.gesture === "Closed Hand" ) {
      this.scrollDown();
    } else if ( this.gesture === "Two Open Hands" ) {
      this.enlarge();
    } else if ( this.gesture === "Two Closed Hands" ) {
      this.reduce();
    } else if ( this.gesture === "1 Hand Pointing, 1 Open Hand") {
      this.nextChapter();
    } else if ( this.gesture === "1 Hand Pointing, 1 Closed Hand") {
      this.prevChapter();
    } else if ( this.gesture === "Two Hands Pinching") {
      this.toggleTheaterMode();
    }
  }
}
