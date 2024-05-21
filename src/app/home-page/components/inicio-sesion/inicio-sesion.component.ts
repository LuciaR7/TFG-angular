import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
})
export class InicioSesionComponent implements OnInit {

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
