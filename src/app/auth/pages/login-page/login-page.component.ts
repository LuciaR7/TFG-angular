import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login.component.css',
})
export class LoginPageComponent implements OnInit {

  constructor(private _router: Router) {}

  ngOnInit(): void {
  }

  goAdmin(){
    this._router.navigate([RoutesConstants.RUTA_LOGIN])
  }

  goUser(){
    this._router.navigate([RoutesConstants.RUTA_LOGIN])
  }


}
