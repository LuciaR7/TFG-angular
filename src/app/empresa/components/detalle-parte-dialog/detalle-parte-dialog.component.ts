import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parte } from '../../../shared/interfaces/parte.interface';

@Component({
  selector: 'app-detalle-parte-dialog',
  templateUrl: './detalle-parte-dialog.component.html',
  styles: ``
})
export class DetalleParteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Parte
  ) {}

}
