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

  private checkAuthStatus(): boolean {
    const isAuthenticated = this.authService.isUserAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate([RoutesConstants.RUTA_AUTENTICACION]);
    }
    return isAuthenticated;
  }

  canMatch(): boolean {
    return this.checkAuthStatus();
  }

  canActivate(): boolean {
    return this.checkAuthStatus();
  }

}
