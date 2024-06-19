import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './routes/auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



@NgModule({
  declarations: [
    GeneralPageComponent,
    LoginPageComponent,
    RegisterPageComponent,

  ],
  imports: [
    AuthRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [

  ]
})

export class AuthModule { }
