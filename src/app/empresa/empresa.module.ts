import { NgModule } from '@angular/core';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { EmpresaRoutingModule } from './empresa.routing.module';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    SharedModule,
    EmpresaRoutingModule
  ],
  exports: [
    AdminComponent,
  ]
})

export class EmpresaModule { }
