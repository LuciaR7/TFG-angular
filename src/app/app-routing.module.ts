import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './home-page/components/inicio-sesion/inicio-sesion.component';


const routes: Routes = [

    {
        path: '',
        component: InicioSesionComponent
    },
    {
        path: 'user',
        //función de carga que llama el import que recibe un argumento y dice
        // que si todo sale bien (then) llama a un módulo del que obtiene algo
        loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule)
    },
    {
        path: 'admin',
        //función de carga que llama el import que recibe un argumento y dice
        // que si todo sale bien (then) llama a un módulo del que obtiene algo
        loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaModule)
    },
    {
        path: "**",
        redirectTo: ""
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
