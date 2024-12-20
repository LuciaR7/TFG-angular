import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { ParteService } from '../../../shared/service/parte.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-listado-partes-page',
  templateUrl: './listado-partes-page.component.html',
  styleUrl: './listado-partes-page.component.css'
})
export class ListadoPartesPageComponent implements OnInit {

  //**Propiedades**//
  partes$!: Observable<Parte[]>; // Cambia dataSource a un Observable
  selectedParte: Parte | null = null; // Parte seleccionado

  //**Constructor**//
  constructor(
    private parteService: ParteService,
    private route: ActivatedRoute
  ){}

  //**Métodos**//
  ngOnInit(): void {
    // Obtener el usuarioId de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPartes(+id); // Cargar partes del usuario específico
      } else {
        console.error('No se encontró un ID de usuario en la ruta.');
      }
    });
  }

  // Método para cargar los partes del usuario específico
  loadPartes(usuarioId: number): void {
    this.partes$ = this.parteService.getPartesByUsuarioId(usuarioId);
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
