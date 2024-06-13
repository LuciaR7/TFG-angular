import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';


const routes: Routes = [

      {
          path: 'auth',
          loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
      },

      {
          path: '404',
          component: Error404PageComponent,
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
          path: '',
          redirectTo: 'user',
          pathMatch: 'full' //tiene que ser exactamente un string vacío como dice el path
      },

      {
          path: "**",
          redirectTo: "404"
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
