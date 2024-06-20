import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


import { ClienteRoutingModule } from './routes/cliente-routing.module';
import { GeneralClientePageComponent } from './pages/general-cliente-page/general-cliente-page.component';
import { ListadoPartesPageComponent } from './pages/listado-partes-page/listado-partes-page.component';
import { DetallePartePageComponent } from './pages/detalle-parte-page/detalle-parte-page.component';
import { BuscarPartesPageComponent } from './pages/buscar-partes-page/buscar-partes-page.component';




@NgModule({
    declarations: [
    GeneralClientePageComponent,
    ListadoPartesPageComponent,
    DetallePartePageComponent,
    BuscarPartesPageComponent
  ],
    imports: [
      MaterialModule,
      SharedModule,
      ClienteRoutingModule,
    ]
})

export class ClienteModule { }
