import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import {SharedModule} from "../shared/shared.module"
import { RouterModule, Routes } from '@angular/router';
import { IssuedComponent } from './issued/issued.component';

const routes: Routes = [
 
      {
        path: '', component: BookComponent
      },
      {
        path: 'issue', component: IssuedComponent
      },
      {
        path: 'bookdetail', component: BookdetailComponent
      },
      
  
];

@NgModule({
  declarations: [
    BookComponent,
    BookdetailComponent,
    IssuedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class BookModule { }
