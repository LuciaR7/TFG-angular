import { NgModule } from '@angular/core';

import { ParteInicialComponent } from './components/parte-inicial/parte-inicial.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ParteInicialComponent,
  ],
  imports: [

    SharedModule
  ],
  exports:[
    ParteInicialComponent,
  ]
})
export class ConsultaParteIntervencionModule { }
