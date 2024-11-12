import { Injectable } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';
import { Rol, Usuario } from '../../shared/interfaces/usuario.interface';


@Injectable({providedIn: 'root'})
export class AuthService {

    // va a ser nulo cuando se cargue la app por primera vez y no hay auth
    private user: Usuario|undefined ;

    constructor() {}

    private usuarioMock: Usuario = {
         id: 1,
         name: "Lucía",
         surname: "Rico",
         email: "lucia@gmail.com",
         tlf: "646765432",
         password: "Lucia.R7",
         rol: Rol.ADMIN,
         partes: []
    }


    get currentUser():Usuario | undefined {
        if ( !this.user ) return undefined;
        return structuredClone( this.user );
    }

    // Con structuredClone se hace una Deep Copy que establece una copia
    // de los elementos que forman parte del objeto,
    // pero omitiendo la copia de sus referencias.
    // Es decir, creando un nuevo objeto en memoria, copiando o clonando
    // su original, lo que representa un snapshoot del objeto en sí mismo
    // en un momento dado.

    login( email: string, password: string ):Observable<Usuario> {

      return of(this.usuarioMock)
       .pipe(
         tap( usuarioDevuelto =>{
            this.user = usuarioDevuelto,
            console.log("CHEACK:",usuarioDevuelto)
         } ),
         tap( usuarioDevuelto => console.log('-RolUsuario: ', usuarioDevuelto.rol) ),
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

    register( name: string, email: string, password1: string, password2: string ):Observable<Usuario> {

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

    //Devuelvo el usuario
    return of(this.user?.rol)
  }

  logout() {
    this.user = undefined;
    //localStorage.clear();
  }
}
