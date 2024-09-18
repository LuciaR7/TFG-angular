import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { EmpresaRoutingModule } from './routes/empresa.routing.module';
import { GeneralEmpresaPageComponent } from './pages/general-empresa-page/general-empresa-page.component';
import { NewClientePageComponent } from './pages/new-cliente-page/new-cliente-page.component';
import { NewPartePageComponent } from './pages/new-parte-page/new-parte-page.component';
import { ListadoPartesPageComponent } from './pages/listado-partes-page/listado-partes-page.component';
import { ListadoClientesPageComponent } from './pages/listado-clientes-page/listado-clientes-page.component';
import { HomeEmpresaPageComponent } from './pages/home-empresa-page/home-empresa-page.component';
import { EmpresaToolbarComponent } from './components/empresa-toolbar/empresa-toolbar.component';




@NgModule({
  declarations: [
    GeneralEmpresaPageComponent,
    NewClientePageComponent,
    NewPartePageComponent,
    ListadoPartesPageComponent,
    ListadoClientesPageComponent,
    HomeEmpresaPageComponent,
    EmpresaToolbarComponent,
  ],
  imports: [
    MaterialModule,
    SharedModule,
    EmpresaRoutingModule
  ],
  exports: [

  ]
})

export class EmpresaModule { }
