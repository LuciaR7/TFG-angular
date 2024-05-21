import { NgModule } from '@angular/core';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InicioSesionComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    InicioSesionComponent,
  ]
})

export class HomePageModule { }
