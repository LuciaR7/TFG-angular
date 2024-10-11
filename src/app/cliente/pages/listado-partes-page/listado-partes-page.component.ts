import { Component, OnInit } from '@angular/core';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    // Obtener el clienteId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPartes(+id); // Cargar partes del cliente específico
      } else {
        console.error('No se encontró un ID de cliente en la ruta.');
      }
    });
  }

  // Método para cargar los partes del cliente específico
  loadPartes(clienteId: number): void {
    this.partes$ = this.parteService.getPartesByClienteId(clienteId);
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
