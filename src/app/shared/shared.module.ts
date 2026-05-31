import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    Error404PageComponent
  ],
  imports: [
    CommonModule,
  ],

  exports:[
    Error404PageComponent,
    CommonModule,
    MatProgressSpinnerModule
  ]


})
export class SharedModule { }
