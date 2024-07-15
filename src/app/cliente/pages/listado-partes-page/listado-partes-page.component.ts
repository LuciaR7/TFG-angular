import { Component } from '@angular/core';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-partes-page',
  templateUrl: './listado-partes-page.component.html',
  styles: ``
})
export class ListadoPartesPageComponent {

  constructor(

    private router: Router,

){}

  onAdmin(): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN])
  }
}
