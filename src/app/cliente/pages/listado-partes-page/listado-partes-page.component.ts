import { Component, OnInit } from '@angular/core';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Router } from '@angular/router';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { ParteService } from '../../../shared/service/parte.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-listado-partes-page',
  templateUrl: './listado-partes-page.component.html',
  styleUrl: './listado-partes-page.component.css',
})
export class ListadoPartesPageComponent implements OnInit {
  partes$!: Observable<Parte[]>; // Cambia dataSource a un Observable
  selectedParte: Parte | null = null; // Parte seleccionado

  constructor(
    private parteService: ParteService,
    private router: Router,
  ){}

  ngOnInit(): void {
    // Asigna el Observable a la propiedad partes$
    this.partes$ = this.parteService.getPartes().pipe(
      filter(partes => partes.length > 0) // Filtra listas no vacías
    );
  }

  // Al hacer clic en un parte, se actualiza el parte seleccionado
  onSelectParte(parte: Parte): void {
    this.selectedParte = parte;
  }

  // Al hacer clic en el botón de cerrar, limpia el parte seleccionado
  onCloseParte(): void {
    this.selectedParte = null;
  }
}
