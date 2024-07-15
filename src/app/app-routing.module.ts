import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

import { RoutesConstants } from './shared/constants/routes.constants';

import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';
import { RolGuard } from './auth/guards/rol.guard';


const routes: Routes = [

      {
          path: RoutesConstants.RUTA_AUTENTICACION,
          loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
          canActivate: [ PublicGuard ],
          canMatch: [ PublicGuard ]
      },

      {
          path: RoutesConstants.RUTA_ERROR,
          component: Error404PageComponent,
      },

      {
          path: RoutesConstants.RUTA_USERS,
          //función de carga que llama el import que recibe un argumento y dice
          // que si todo sale bien (then) llama a un módulo del que obtiene algo
          loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule),
          canActivate: [ AuthGuard ],
          canMatch: [ AuthGuard ]
      },

      {
          path: RoutesConstants.RUTA_ADMIN,
          //función de carga que llama el import que recibe un argumento y dice
          // que si todo sale bien (then) llama a un módulo del que obtiene algo
          loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaModule),
          canActivate: [ AuthGuard, RolGuard ],
          canMatch: [ AuthGuard, RolGuard ]
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
