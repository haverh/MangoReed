import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  titleString: string = '';

  constructor(private router: Router) { }

  search() {
    this.router.navigate(['/result', encodeURI(this.titleString)])
  }
}
