import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this._router.navigate(['admin'])
  }

  goUser(){
    this._router.navigate(['user'])
  }


}
