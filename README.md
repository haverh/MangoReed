# MangoReed
MangoReed is a manga/manhwa reader web app.

## Description
The web app utilizes MangaDex API to provide data. Users browse and search for specific manga/manhwas to read. An alternative way of navigating the reader is through a selection of hand gestures such as "1 open hand", "2 closed hands", "1 pointing hand", etc.

## Demo
https://www.youtube.com/watch?v=d9sg_CgOvTw

## Getting Started
```
npm install -g @angular/cli 
npm install -g express

cd client
npm install

cd ../server
npm install
```

### Built With

<a href="https://angular.io"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Angular" height="36"/></a>
<a href="https://getbootstrap.com"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" alt="Bootstrap" height="36"/></a>
<a href="https://nodejs.org/en"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" height="36"/></a>
<a href="https://expressjs.com"><img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express.js" height="36"/></a>

## Resources Used
1 - Creating "more" button when element is overlflowing with text  
   * https://stackoverflow.com/questions/44016882/typescript-detect-if-the-div-is-overflow-with-text  
2 - MangaDex API  
   * https://api.mangadex.org/docs/  
3 - CSS Flexbox  
   * https://css-tricks.com/snippets/css/a-guide-to-flexbox/  
4 - CSS Grid  
   * https://css-tricks.com/snippets/css/complete-guide-grid/  
5 - Bootstrap navbar  
   * https://getbootstrap.com/docs/4.0/components/navbar/  
6 - *ngIf to dynamically load data  
   * https://chat.openai.com/share/7f12f2a7-5862-4ba5-a9a7-9d697e3e53f7  
7 - Reactively getting view port width in ts file  
   * https://chat.openai.com/share/5ba7a1b4-2820-4e53-95a8-ff211cf8d54d

## Things To Keep In Mind
Is there anything special we need to know in order to run your code?Since the API I am using is a free public API, there are limits to the usage. When testing for prev/next chapter banned when trying to access the API too many times too quickly.