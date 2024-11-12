import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Intervencion } from '../../../shared/interfaces/intervencion.interface';

@Component({
  selector: 'app-intervencion-detail-dialog',
  templateUrl: './intervencion-detail-dialog.component.html',
  styles: ``
})

export class IntervencionDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Intervencion
  ) {}
}
