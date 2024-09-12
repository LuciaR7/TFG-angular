import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from '../../shared/constants/routes.constants';
import { GeneralEmpresaPageComponent } from '../pages/general-empresa-page/general-empresa-page.component';
import { ListadoPartesPageComponent } from '../pages/listado-partes-page/listado-partes-page.component';
import { NewPartePageComponent } from '../pages/new-parte-page/new-parte-page.component';
import { ListadoClientesPageComponent } from '../pages/listado-clientes-page/listado-clientes-page.component';
import { NewClientePageComponent } from '../pages/new-cliente-page/new-cliente-page.component';
import { HomeEmpresaPageComponent } from '../pages/home-empresa-page/home-empresa-page.component';
const routes: Routes = [
  {
    path: '', // Ruta base para el módulo de empresa,
    component: GeneralEmpresaPageComponent,
    children: [
      { path: RoutesConstants.RUTA_HOME_ADMIN, component: HomeEmpresaPageComponent },
      { path: RoutesConstants.RUTA_NEW_CLIENT, component: NewClientePageComponent },
      { path: RoutesConstants.RUTA_NEW_PARTE, component: NewPartePageComponent },
      { path: RoutesConstants.RUTA_LIST_CLIENTS_ADMIN, component: ListadoClientesPageComponent },
      { path: RoutesConstants.RUTA_LIST_PARTES_ADMIN, component: ListadoPartesPageComponent },
      { path: '', redirectTo: RoutesConstants.RUTA_HOME_ADMIN, pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: RoutesConstants.RUTA_HOME_ADMIN } // Ruta comodín 
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
