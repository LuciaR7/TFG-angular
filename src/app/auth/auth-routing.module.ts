import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



// localhost:4200/auth/
const routes: Routes = [
  {
    path: '',
    component: GeneralPageComponent,
    children: [
      { path: 'login', component: LoginPageComponent  },
      { path: 'new-account', component: RegisterPageComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class AuthRoutingModule { }
