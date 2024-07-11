import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from '../../shared/constants/routes.constants';
import { GeneralEmpresaPageComponent } from '../pages/general-empresa-page/general-empresa-page.component';
import { ListadoPartesPageComponent } from '../pages/listado-partes-page/listado-partes-page.component';
import { NewPartePageComponent } from '../pages/new-parte-page/new-parte-page.component';
import { ListadoClientesPageComponent } from '../pages/listado-clientes-page/listado-clientes-page.component';
import { NewClientePageComponent } from '../pages/new-cliente-page/new-cliente-page.component';
import { DetallePartePageComponent } from '../../cliente/pages/detalle-parte-page/detalle-parte-page.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralEmpresaPageComponent,
    children: [
      { path: RoutesConstants.RUTA_LIST_PARTES_ADMIN, component: ListadoPartesPageComponent },
      { path: RoutesConstants.RUTA_LIST_CLIENTS_ADMIN, component: ListadoClientesPageComponent },
      { path: RoutesConstants.RUTA_DETAIL_PARTES_ADMIN, component: DetallePartePageComponent },
      { path: RoutesConstants.RUTA_NEW_PARTE, component: NewPartePageComponent },
      { path: RoutesConstants.RUTA_NEW_CLIENT, component: NewClientePageComponent },
      // { path: 'edit/:id', component: NewPageComponent },
      // Esta ruta iría al final porque sino cualquiera de las rutas
      // anteriores podría confundirse y cogerse como id (p.ej. :new-hero o :search)
      // { path: ':id', component: EditarPartePageComponent },
      { path: '**', redirectTo: RoutesConstants.RUTA_LIST_PARTES_ADMIN },
    ]
  }


];



@NgModule({
  imports: [
    //Este es forChild porque ya tenemos otro Root principal
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],

})

export class EmpresaRoutingModule { }
