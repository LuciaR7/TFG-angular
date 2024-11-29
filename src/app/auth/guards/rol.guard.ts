import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, UrlSegment, Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RoutesConstants } from '../../shared/constants/routes.constants';
import { Rol } from '../../shared/interfaces/usuario.interface';


@Injectable({ providedIn: 'root' })
export class RolGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkRolStatus(): boolean {
    const role = this.authService.getRole();
    if (!role) {
      this.router.navigate([RoutesConstants.RUTA_ERROR]);
      return false;
    }

    if (role === 'ADMIN') {
      return true;  // Permitir acceso a la ruta si el rol es ADMIN
    } else if (role === 'USER') {
      this.router.navigate([RoutesConstants.RUTA_USERS]);
      return false;  // Redirigir a la ruta de usuario si el rol es USER
    }

    this.router.navigate([RoutesConstants.RUTA_ERROR]);
    return false;  // Redirigir si el rol no es válido
  }

  canMatch(): boolean {
    return this.checkRolStatus();
  }

  canActivate(): boolean {
    return this.checkRolStatus();
  }

}
