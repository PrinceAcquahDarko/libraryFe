import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderComponent } from './folder/folder.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FolderComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
