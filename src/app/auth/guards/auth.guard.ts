import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RoutesConstants } from '../../shared/constants/routes.constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkLogin()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated:', isAuthenticated) ),
      tap( isAuthenticated =>  {
        // si no esta autenticado navego al login
        if ( !isAuthenticated ) {
          this.router.navigate([RoutesConstants.RUTA_AUTENTICACION])
        }
      }),
    )

  }

  canMatch(): boolean | Observable<boolean> {
   
    return this.checkAuthStatus();

  }

  canActivate(): boolean | Observable<boolean> {

    return this.checkAuthStatus();
  }

}
