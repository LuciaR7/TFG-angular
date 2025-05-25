import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-detalle-cliente-dialog',
  templateUrl: './detalle-cliente-dialog.component.html',
  styles: ``
})
export class DetalleClienteDialogComponent {

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: Usuario
    ) {}
    
}
