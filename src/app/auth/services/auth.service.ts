import { Injectable } from '@angular/core';

import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { Rol, User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class AuthService {

    // va a ser nulo cuando se cargue la app por primera vez y no hay auth
    private user: User|undefined ;

    private usuarioMock: User = {
         id: 1,
         user: "Lucia Rico",
         email: "lucia@gmail.com",
         rol: Rol.ADMIN
    }

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

      return of(this.usuarioMock)
       .pipe(
         tap( usuarioDevuelto =>{
            this.user = usuarioDevuelto,
            console.log("CHEACK:",usuarioDevuelto)
         } ),
         tap( usuadrioDevuelto => console.log('RolUsuario:',usuadrioDevuelto.rol) ),
         //tap( user => localStorage.setItem('token', 'prueba' )),
         //tap( user => localStorage.setItem('rol', this.usuario.rol)),
       );

      // if((email === 'lucia@gmail.com') && (password === 'Lucia.R7')){

        //     return of({
        //         id: 1,
        //         user: "Lucia Rico",
        //         email: "lucia@gmail.com",
        //         rol: Rol.USER
        //       })
        //       .pipe(
        //         tap( user => this.user = user ),
        //         tap( user => localStorage.setItem('token', 'prueba' )),
        //         tap( user => localStorage.setItem('rol', Rol.USER)),
        //       );


        // } else {
        //     return throwError(()=>"Credenciales incorrectas")
        // }


    }

    register( name: string, email: string, password1: string, password2: string ):Observable<User> {

      if((name === 'Lucia Rico') && (email === 'lucia@gmail.com') &&
         (password1 === 'Lucia.R7') && (password2 === 'Lucia.R7')){

          return of(this.usuarioMock);

      } else {
          return throwError(()=>"Credenciales incorrectas")
      }

  }

  checkLogin(): Observable<boolean> {

    // si no existe token no esta autenticado
    //if ( !localStorage.getItem('token') || !localStorage.getItem('rol') ) return of(false)

    //const token = localStorage.getItem('token');

    if(this.user){
      return of(true);
    } else {
      return of(false);
    }


  }

  checkRolAuth(): Observable<Rol|undefined> {

    console.log("VALOR USUARIO : ",this.user)

    //Devuelvo el usuario
    return of(this.user?.rol)
  }

  logout() {
    this.user = undefined;
    //localStorage.clear();
  }
}
