import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { RoutesConstants } from '../../../shared/constants/routes.constants';

@Component({
  selector: 'app-general-empresa-page',
  templateUrl: './general-empresa-page.component.html',
  styles:``
})
export class GeneralEmpresaPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
