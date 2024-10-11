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

  private checkRolStatus(): Observable<boolean> {
    return this.authService.checkRolAuth().pipe(
      tap(rol => console.log('rolUser:', rol)),
      map(rol => {
        if (rol === Rol.ADMIN) {
          return true;
        } else {
          this.router.navigate([RoutesConstants.RUTA_USERS]);
          return false;
        }
      })
    );
  }

  canMatch(): Observable<boolean> {
    return this.checkRolStatus();
  }

  canActivate(): Observable<boolean> {
    return this.checkRolStatus();
  }

}
