import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import {SharedModule} from "../shared/shared.module"
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
      {
        path: '', component: BookComponent
      },
      {
        path: 'book/:id', component: BookdetailComponent
      }
  
];

@NgModule({
  declarations: [
    BookComponent,
    BookdetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class BookModule { }
