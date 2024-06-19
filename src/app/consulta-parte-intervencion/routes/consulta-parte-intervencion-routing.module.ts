import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from '../../shared/constants/routes.constants';

import { ParteIntervencionPageComponent } from '../pages/parte-intervencion-page/parte-intervencion-page.component';

const routes: Routes = [

  {
    path: '',
    component: ParteIntervencionPageComponent,
    children: [
      { path: RoutesConstants.RUTA_PARTE, component: ParteIntervencionPageComponent  },    ]
  }


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

export class ConsultaParteIntervencionRoutingModule { }

