import { Component } from '@angular/core';

@Component({
  selector: 'app-listado-partes-page',
  templateUrl: './listado-partes-page.component.html',
  styleUrl: './listado-partes-page.component.css'
})
export class ListadoPartesPageComponent {
  partes = [
    { id: '20240001', estado: 'PE', fecha: '09/09/2024' },
    { id: '20240002', estado: 'PE', fecha: '14/09/2024' },
    { id: '20240003', estado: 'EC', fecha: '16/09/2024' }
  ];

  selectedEstados: string[] = []; // Para almacenar los estados seleccionados

  detalleParte(id: string) {
    console.log('Ver detalles del parte con ID:', id);
  }

  verHistorial(id: string) {
    console.log('Ver historial del parte con ID:', id);
  }

  eliminarParte(id: string) {
    console.log('Eliminar parte con ID:', id);
    this.partes = this.partes.filter(parte => parte.id !== id);
  }
}
