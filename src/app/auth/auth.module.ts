import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './routes/auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { AuthToolbarComponent } from './components/auth-toolbar/auth-toolbar.component';
import { GeneralPageComponent } from './pages/general-page/general-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';



@NgModule({
  declarations: [
    AuthToolbarComponent,
    GeneralPageComponent,
    LoginPageComponent,

  ],
  imports: [
    AuthRoutingModule,
    MaterialModule,
    SharedModule
  ]
})

export class AuthModule { }
