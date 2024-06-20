import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from '../../shared/constants/routes.constants';
import { GeneralClientePageComponent } from '../pages/general-cliente-page/general-cliente-page.component';
import { ListadoPartesPageComponent } from '../pages/listado-partes-page/listado-partes-page.component';
import { DetallePartePageComponent } from '../pages/detalle-parte-page/detalle-parte-page.component';
import { BuscarPartesPageComponent } from '../pages/buscar-partes-page/buscar-partes-page.component';



const routes: Routes = [

  {
    path: '',
    component: GeneralClientePageComponent,
    children: [
      { path: RoutesConstants.RUTA_LIST_PARTES_USERS, component: ListadoPartesPageComponent },
      { path: RoutesConstants.RUTA_DETAIL_PARTES_USERS, component: DetallePartePageComponent },
      { path: RoutesConstants.RUTA_BUSCAR_PARTES_USERS, component: BuscarPartesPageComponent },
      // { path: 'edit/:id', component: NewPageComponent },
      // Esta ruta iría al final porque sino cualquiera de las rutas
      // anteriores podría confundirse y cogerse como id (p.ej. :new-hero o :search)
      // { path: ':id', component: HeroPageComponent },
      { path: '**', redirectTo: RoutesConstants.RUTA_LIST_PARTES_USERS },
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

export class ClienteRoutingModule { }
