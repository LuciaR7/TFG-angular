import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from '../../shared/constants/routes.constants';
import { GeneralClientePageComponent } from '../pages/general-cliente-page/general-cliente-page.component';
import { ListadoPartesPageComponent } from '../pages/listado-partes-page/listado-partes-page.component';


const routes: Routes = [

  {
    path: '',
    component: GeneralClientePageComponent,
    children: [
      { path:  `${RoutesConstants.RUTA_LIST_PARTES_CLIENTS}/:id`, component: ListadoPartesPageComponent },
      { path: '**', redirectTo: `${RoutesConstants.RUTA_LIST_PARTES_CLIENTS}/:id` },
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
