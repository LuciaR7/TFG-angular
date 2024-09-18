import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class EmpresaService {
    private clientes = [
        { nombre: 'Pepa Martín López' },
        { nombre: 'Raúl Márquez Bravo' },
        { nombre: 'Rocío Gómez Pascal' },
      ];
    
      getClientes() {
        return this.clientes;
      }
    
      // Otros métodos para crear, actualizar y eliminar clientes
}
    