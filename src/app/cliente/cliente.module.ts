import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


import { ClienteRoutingModule } from './routes/cliente-routing.module';
import { UserPagesComponent } from './pages/user-pages/user-pages.component';




@NgModule({
    declarations: [
    UserPagesComponent
  ],
    imports: [
      MaterialModule,
      SharedModule,
      ClienteRoutingModule
    ]
})

export class ClienteModule { }
