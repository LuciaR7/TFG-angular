import { Injectable } from '@angular/core';

import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class AuthService {

    // va a ser nulo cuando se cargue la app por primera vez y no hay auth
    private user?: User ;

    constructor() { }

    get currentUser():User | undefined {
        if ( !this.user ) return undefined;
        return structuredClone( this.user );
    }

    // Con structuredClone se hace una Deep Copy que establece una copia
    // de los elementos que forman parte del objeto,
    // pero omitiendo la copia de sus referencias.
    // Es decir, creando un nuevo objeto en memoria, copiando o clonando
    // su original, lo que representa un snapshoot del objeto en sí mismo
    // en un momento dado.

    login( email: string, password: string ):Observable<User> {

        if((email === 'lucia@gmail.com') && (password === 'Lucia.R7')){

            return of({
                id: 1,
                user: "Lucía Rico",
                email: "lucia@gmail.com"
              })
              .pipe(
                tap( user => this.user = user ),
                tap( user => localStorage.setItem('token', 'prueba' )),
              );

        } else {
            return throwError(()=>"Credenciales incorrectas")
        }


    }

    register( name: string, email: string, password: string, password2: string ):Observable<User> {

      if((name === 'Lucía Rico') && (email === 'lucia@gmail.com') &&
         (password === 'Lucia.R7') && (password2 === 'Lucia.R7')){

          return of({
              id: 1,
              user: "Lucía Rico",
              email: "lucia@gmail.com"
            })
            .pipe(
              tap( user => this.user = user ),
              tap( user => localStorage.setItem('token', 'prueba' )),
            );

      } else {
          return throwError(()=>"Credenciales incorrectas")
      }


  }

    checkAuthentication(): Observable<boolean> {

      // si user auth regresa false
      if ( !localStorage.getItem('token') ) return of(false)

      const token = localStorage.getItem('token');

      // si user no auth regresa true
      return of(true);
    }

    logout() {
      this.user = undefined;
      localStorage.clear();
    }
}
