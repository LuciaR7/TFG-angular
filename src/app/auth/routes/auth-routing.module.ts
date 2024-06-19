import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralPageComponent } from '../pages/general-page/general-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { RegisterPageComponent } from '../pages/register-page/register-page.component';
import { RoutesConstants } from '../../shared/constants/routes.constants';



// localhost:4200/auth/
const routes: Routes = [
  {
    path: '',
    component: GeneralPageComponent,
    children: [
      { path: RoutesConstants.RUTA_LOGIN, component: LoginPageComponent  },
      { path: RoutesConstants.RUTA_NEW_ACCOUNT, component: RegisterPageComponent },
      { path: '**', redirectTo: RoutesConstants.RUTA_LOGIN },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class AuthRoutingModule { }
