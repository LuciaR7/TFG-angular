import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [

    {
        path: '',
        component: UserComponent
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
