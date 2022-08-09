import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'libraryManagement';
  constructor(readonly titleService: Title){
    this.titleService.setTitle('libraryApp - v1')
  }

  
}
