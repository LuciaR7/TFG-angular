import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from '../../shared/constants/routes.constants';

import { UserPagesComponent } from '../pages/user-pages/user-pages.component';


const routes: Routes = [

    {
      path: RoutesConstants.RUTA_PAGINA_CLIENTE,
      component: UserPagesComponent,
    },

    //cualquier ruta que no este definida en este archivo va a redirigir
    //a user por defecto
    {
        path: '**',
        redirectTo: ''
    },


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
