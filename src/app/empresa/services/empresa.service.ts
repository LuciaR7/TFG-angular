import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Intervencion } from '../interfaces/historial.interface';

@Injectable({ providedIn: 'root' })

export class EmpresaService {

    private historial: Intervencion[]  = [
      { 
        parteId: 'P001',
        id: 'H001', 
        fecha: new Date('2024-09-05'), 
        tecnico: 'Alfredo', 
        intervencion: 'Primera revisión pantalla', 
        descripcion: 'Revisión pantalla tablet, descarto cambio de pantalla. Problema de la batería' 
      },
      { 
        parteId: 'P001',
        id: 'H002', 
        fecha: new Date('2024-09-06'), 
        tecnico: 'Alvaro', 
        intervencion: 'Problema cambio batería', 
        descripcion: 'Revisión pantalla tablet, descarto cambio de pantalla. Problema de la batería' 
      },
      { 
        parteId: 'P002',
        id: 'H003', 
        fecha: new Date('2024-09-09'), 
        tecnico: 'Alvaro', 
        intervencion: 'Cambio de la batería', 
        descripcion: 'Se realizó el cambio de batería para solucionar los problemas de encendido.' 
      },
      { 
        parteId: 'P003',
        id: 'H004', 
        fecha: new Date('2024-09-10'), 
        tecnico: 'Carmen', 
        intervencion: 'Limpieza interna', 
        descripcion: 'Limpieza interna de polvo y cambio de pasta térmica en el procesador.' 
      },
      { 
        parteId: 'P003',
        id: 'H005', 
        fecha: new Date('2024-09-12'), 
        tecnico: 'Alfredo', 
        intervencion: 'Actualización de software', 
        descripcion: 'Actualización de software y firmware para mejorar el rendimiento general del dispositivo.' 
      },
      { 
        parteId: 'P004',
        id: 'H006', 
        fecha: new Date('2024-09-14'), 
        tecnico: 'Carmen', 
        intervencion: 'Reparación del puerto USB', 
        descripcion: 'Se reemplazó el puerto USB dañado y se comprobó su funcionamiento adecuado.' 
      },
      { 
        parteId: 'P004',
        id: 'H007', 
        fecha: new Date('2024-09-15'), 
        tecnico: 'Alfredo', 
        intervencion: 'Reemplazo de teclado', 
        descripcion: 'El teclado del portátil fue reemplazado debido a teclas defectuosas.' 
      },
      {
        parteId: 'P005',
        id: 'H008', 
        fecha: new Date('2024-09-16'), 
        tecnico: 'Alvaro', 
        intervencion: 'Cambio de disco duro', 
        descripcion: 'El disco duro fue reemplazado por un SSD para mejorar el rendimiento.' 
      },
      { 
        parteId: 'P005',
        id: 'H009', 
        fecha: new Date('2024-09-17'), 
        tecnico: 'Carmen', 
        intervencion: 'Revisión de pantalla táctil', 
        descripcion: 'Se revisó la pantalla táctil y se ajustó la calibración para mejorar la respuesta.' 
      },
      { 
        parteId: 'P006',
        id: 'H010', 
        fecha: new Date('2024-09-18'), 
        tecnico: 'Alvaro', 
        intervencion: 'Optimización del sistema', 
        descripcion: 'Se realizaron ajustes en el sistema operativo para mejorar el rendimiento y la estabilidad del dispositivo.' 
      }
    ];

    constructor() {}

    // Método para obtener el historial por ID de parte
    getHistorialByParteId(parteId: string): Observable<Intervencion[]> {
      const resultado = this.historial.filter(intervencion => intervencion.parteId === parteId);
      return of(resultado); // Retorna un Observable
    }
    // Método para agregar una nueva intervención
    addIntervencion(nuevaIntervencion: Intervencion): Observable<Intervencion> {
      this.historial.push(nuevaIntervencion);
      return of(nuevaIntervencion); // Simulación con datos locales
    }
    
}
    