import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MangaDexService {
  expressBaseUrl:string = 'http://localhost:8888';
  vercelBaseUrl:string = 'https://mango-reed-server.vercel.app'

  constructor(private http:HttpClient) { }

  // Return Promise from express given endpoint
  private sendRequestToExpress(endpoint:string):Promise<any> {
    const mangaDexPromise = async (endpoint:string) => {
      const response = await fetch(`${this.expressBaseUrl}${endpoint}`);
      const result = await response.json();
      return result;
    }
    return mangaDexPromise(endpoint);
  }
  
  // Return array of results from search express endpoint
  searchFor(title: string|null):Promise<any> {
    return this.sendRequestToExpress(`/search/title/${title}`).then((data) => {
      return data;
    })
  }

  // Return array of top manga from top10 express endpoint
  getTop():Promise<any> {
    return this.sendRequestToExpress('/top10').then((data) => {
      return data;
    })
  }

  // Return object of manga info from manga express endpoint
  getMangaInfo(id: string|null): Promise<any> {
    return this.sendRequestToExpress(`/manga/${id}`).then((data) => {
      return data;
    })
  }

  // Return object of chapter info from read express endpoint
  getChapter(manga_id: string|null, index: number|null):Promise<any> {
    return this.sendRequestToExpress(`/read/${manga_id}/${index}`).then((data) => {
      console.log("GOT BACK SOMETHING")
      return data;
    })
  }
}
