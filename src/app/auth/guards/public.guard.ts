import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';
import { RoutesConstants } from '../../shared/constants/routes.constants';
import { Rol } from '../../shared/interfaces/usuario.interface';


@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkRolAuth().pipe(
      map(rol => {
        if (rol === Rol.ADMIN) {
          this.router.navigate([RoutesConstants.RUTA_ADMIN]);
          return false;
        } else if (rol === Rol.USER) {
          this.router.navigate([RoutesConstants.RUTA_USERS]);
          return false;
        }
        return true;
      })
    );
  }

  canMatch(): Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(): Observable<boolean> {
    return this.checkAuthStatus();
  }

}

