import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Intervencion } from '../../../shared/interfaces/intervencion.interface';

@Component({
  selector: 'app-detalle-intervencion-dialog',
  templateUrl: './detalle-intervencion-dialog.component.html',
  styles: ``
})

export class DetalleIntervencionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Intervencion
  ) {}
}
