import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadBookComponent } from '../upload-book/upload-book.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { IssuedComponent } from '../issued/issued.component';
import { ReturnedComponent } from '../returned/returned.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { AuthGuard } from 'src/app/auth.guard';
import { AdminRegisterComponent } from '../admin-register/admin-register.component';

const routes: Routes = [
 
  {
    path: '', component: UploadBookComponent
  },
  {
    path: 'issue',canActivate: [AuthGuard], component: IssuedComponent
  },
  {
    path: 'updateBook',canActivate: [AuthGuard], component: UpdateBookComponent
  },
  {
    path: 'register', component: AdminRegisterComponent
  }

];

@NgModule({
  declarations: [
    UploadBookComponent,
    IssuedComponent,
    ReturnedComponent,
    UpdateBookComponent,
    AdminRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdminModule { }
