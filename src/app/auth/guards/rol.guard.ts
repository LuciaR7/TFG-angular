import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RoutesConstants } from '../../shared/constants/routes.constants';
import { Rol } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class RolGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkRolStatus(): boolean | Observable<boolean> {

    return this.authService.checkRolAuth()
    .pipe(
      tap( isUser => console.log('rolUser:', isUser?.rol) ),
      map( isUser =>  {
        // si es ADMIN
        if( (isUser?.rol === Rol.ADMIN) ) {
          return true
        } else {

         this.router.navigate([RoutesConstants.RUTA_USERS])
         return false
        }

      }),

    )

  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log( 'Can Match' );
    // console.log({ route, segments });

    return this.checkRolStatus();

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log( 'Can Activate' );
    // console.log({ route, state });

    return this.checkRolStatus();
  }

}
