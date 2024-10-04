import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


import { ClienteRoutingModule } from './routes/cliente-routing.module';
import { GeneralClientePageComponent } from './pages/general-cliente-page/general-cliente-page.component';
import { ListadoPartesPageComponent } from './pages/listado-partes-page/listado-partes-page.component';
import { ClienteToolbarComponent } from './components/cliente-toolbar/cliente-toolbar.component';



@NgModule({
    declarations: [
    GeneralClientePageComponent,
    ListadoPartesPageComponent,
    ClienteToolbarComponent
  ],
    imports: [
      MaterialModule,
      SharedModule,
      ClienteRoutingModule,
    ]
})

export class ClienteModule { }
