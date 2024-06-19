import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { RoutesConstants } from './shared/constants/routes.constants';


const routes: Routes = [

      {
          path: RoutesConstants.RUTA_AUTENTICACION,
          loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
      },

      {
          path: RoutesConstants.RUTA_ERROR,
          component: Error404PageComponent,
      },

      {
          path: RoutesConstants.RUTA_USUARIOS,
          //función de carga que llama el import que recibe un argumento y dice
          // que si todo sale bien (then) llama a un módulo del que obtiene algo
          loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule)
      },

      {
          path: RoutesConstants.RUTA_ADMINISTRADOR,
          //función de carga que llama el import que recibe un argumento y dice
          // que si todo sale bien (then) llama a un módulo del que obtiene algo
          loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaModule)
      },

      {
        path: RoutesConstants.RUTA_PARTE,
        //función de carga que llama el import que recibe un argumento y dice
        // que si todo sale bien (then) llama a un módulo del que obtiene algo
        loadChildren: () => import('./consulta-parte-intervencion/consulta-parte-intervencion.module').then( m => m.ConsultaParteIntervencionModule)
      },

      {
          path: '',
          redirectTo: RoutesConstants.RUTA_AUTENTICACION,
          pathMatch: 'full' //tiene que ser exactamente un string vacío como dice el path
      },

      {
          path: "**",
          redirectTo: RoutesConstants.RUTA_ERROR
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
