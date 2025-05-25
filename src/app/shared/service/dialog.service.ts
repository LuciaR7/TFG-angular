import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../empresa/components/dialog-message/dialog-message.component';
import { Intervencion } from '../interfaces/intervencion.interface';
import { DetalleIntervencionDialogComponent } from '../../empresa/components/detalle-intervencion-dialog/detalle-intervencion-dialog.component';
import { Router } from '@angular/router';
import { DetalleParteDialogComponent } from '../../empresa/components/detalle-parte-dialog/detalle-parte-dialog.component';
import { Parte } from '../interfaces/parte.interface';
import { DetalleClienteDialogComponent } from '../../empresa/components/detalle-cliente-dialog/detalle-cliente-dialog.component';
import { Usuario } from '../interfaces/usuario.interface';

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
    this.dialog.open(DetalleIntervencionDialogComponent, {
        width: '400px',
        data: intervencion
    });
  }

  openDialogParte(parte: Parte) {
    this.dialog.open(DetalleParteDialogComponent, {
        width: '400px',
        data: parte
    });
  }

  openDialogUsuario(usuario: Usuario) {
    this.dialog.open(DetalleClienteDialogComponent, {
        width: '400px',
        data: usuario
    });
  }


}
