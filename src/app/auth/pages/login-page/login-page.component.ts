import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent implements OnInit {

  constructor(private _router: Router) {}

  ngOnInit(): void {
  }

  goAdmin(){
    this._router.navigate([RoutesConstants.RUTA_ADMIN])
  }

  goUser(){
    this._router.navigate([RoutesConstants.RUTA_USERS])
  }

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: RoutesConstants.RUTA_LIST_PARTES_ADMIN },
  ]

}
