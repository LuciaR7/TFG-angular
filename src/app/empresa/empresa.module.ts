import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './components/admin/admin.component';
import { EmpresaRoutingModule } from './routes/empresa.routing.module';




@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    MaterialModule,
    SharedModule,
    EmpresaRoutingModule
  ],
  exports: [
    AdminComponent,
  ]
})

export class EmpresaModule { }
