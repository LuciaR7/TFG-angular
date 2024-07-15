import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { RoutesConstants } from '../../shared/constants/routes.constants';
import { Rol } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkRolAuth()
    .pipe(
      tap( rol => console.log('rolUser:', rol) ),
      map( rol =>  {
        // si es ADMIN
        if( (rol === Rol.ADMIN) ) {
          this.router.navigate([RoutesConstants.RUTA_ADMIN])
          return false;
        } else if (rol === Rol.USER) {
          // si es USER
        this.router.navigate([RoutesConstants.RUTA_USERS])
          return false
        }
        else {
         return true
        }

      }),

    )

  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log( 'Can Match' );
    // console.log({ route, segments });

    return this.checkAuthStatus();

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log( 'Can Activate' );
    // console.log({ route, state });

    return this.checkAuthStatus();
  }

}
