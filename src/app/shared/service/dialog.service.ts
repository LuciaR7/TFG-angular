import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../empresa/components/dialog-message/dialog-message.component';
import { Intervencion } from '../interfaces/intervencion.interface';
import { IntervencionDetailDialogComponent } from '../../empresa/components/intervencion-detail-dialog/intervencion-detail-dialog.component';
import { Router } from '@angular/router';
import { RoutesConstants } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private router: Router,
) {}

  openDialog(title: string, message: string) {
    this.dialog.open(DialogMessageComponent, {
        data: { title, message },
    });

   }

  openDialogIntervencion(intervencion: Intervencion) {
    this.dialog.open(IntervencionDetailDialogComponent, {
        width: '400px',
        data: intervencion
    });
  }


}
