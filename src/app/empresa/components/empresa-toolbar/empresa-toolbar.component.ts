import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { RoutesConstants } from '../../../shared/constants/routes.constants';

@Component({
  selector: 'app-empresa-toolbar',
  templateUrl: './empresa-toolbar.component.html',
  styles: ``
})
export class EmpresaToolbarComponent {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Coger usuario de sesión
  get user(): User | undefined {
    return this.authService.currentUser;
  }

  // Volver pantalla principal
  volverHome():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_HOME_ADMIN])
  }
  
  // Cerrar sesión
  onLogout():void  {
    this.authService.logout();
    this.router.navigate([RoutesConstants.RUTA_AUTENTICACION])
  }

  // Ir a Usuario
  onUsuario():void {
    this.router.navigate([RoutesConstants.RUTA_USERS])
  }

}
