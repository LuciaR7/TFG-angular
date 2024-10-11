import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Usuario } from '../../../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-cliente-toolbar',
  templateUrl: './cliente-toolbar.component.html',
  styles: ``
})
export class ClienteToolbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Coger usuario de sesión
  get user(): Usuario | undefined {
    return this.authService.currentUser;
  }
  
  // Cerrar sesión
  onLogout():void  {
    this.authService.logout();
    this.router.navigate([RoutesConstants.RUTA_AUTENTICACION])
  }

}
