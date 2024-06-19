import { NgModule } from '@angular/core';

import { ParteInicialComponent } from './components/parte-inicial/parte-inicial.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ConsultaParteIntervencionRoutingModule } from './routes/consulta-parte-intervencion-routing.module';
import { ParteIntervencionPageComponent } from './pages/parte-intervencion-page/parte-intervencion-page.component';


@NgModule({
  declarations: [
    ParteInicialComponent,
    ParteIntervencionPageComponent,
  ],
  imports: [
    MaterialModule,
    SharedModule,
    ConsultaParteIntervencionRoutingModule
  ],
  exports:[
    ParteInicialComponent,
  ]
})
export class ConsultaParteIntervencionModule { }
