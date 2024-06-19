import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../components/admin/admin.component';
import { RoutesConstants } from '../../shared/constants/routes.constants';

const routes: Routes = [

  {
    path: RoutesConstants.RUTA_ADMINISTRADOR,
    component: AdminComponent
  },

  //cualquier ruta que no este definida en este archivo va a redirigir
  //a admin por defecto
  {
      path: '**',
      redirectTo: 'admin'
  },


];



@NgModule({
  imports: [
    //Este es forChild porque ya tenemos otro Root principal
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],

})

export class EmpresaRoutingModule { }
