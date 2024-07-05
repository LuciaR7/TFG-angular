import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';



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
  ]


})
export class SharedModule { }
