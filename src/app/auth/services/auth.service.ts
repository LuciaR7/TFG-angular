import { Injectable } from '@angular/core';

import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { Rol, User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class AuthService {

  private users: User[] = [
    {
      id: 'C1', // Cliente 1
      name: 'Ana',
      surname: 'Pérez',
      email: 'ana.perez@example.com',
      tlf: '123456789',
      password: 'password123',
      rol: Rol.USER,
    },
    {
      id: 'A1', // Administrador 1
      name: 'Lucía',
      surname: 'Rico',
      email: 'lucia@gmail.com',
      tlf: '987654321',
      password: 'Lucia.R7',
      rol: Rol.ADMIN,
    },
    {
      id: 'C2', // Cliente 2
      name: 'María',
      surname: 'González',
      email: 'maria.gonzalez@example.com',
      tlf: '555123456',
      password: 'password789',
      rol: Rol.USER,
    },
    {
      id: 'A2', // Administrador 2
      name: 'José',
      surname: 'Martínez',
      email: 'jose.martinez@example.com',
      tlf: '444987654',
      password: 'password101',
      rol: Rol.ADMIN,
    },
    {
      id: 'C3', // Cliente 3
      name: 'Lucía',
      surname: 'Fernández',
      email: 'lucia.fernandez@example.com',
      tlf: '333654321',
      password: 'password202',
      rol: Rol.USER,
    },
  ];

    // va a ser nulo cuando se cargue la app por primera vez y no hay auth
    private user: User|undefined ;

    constructor() {}

    //Simulación de un API que devuelve un Observable
    getUsers(): Observable<User[]> {
      // Retornar los datos como un Observable
      return of(this.users);
    }

    // Método para obtener un usuario por su ID
    getUserById(userId: string): Observable<User | undefined> {
      const user = this.users.find(u => u.id === userId);
      return of(user);
    }

    //Método para actualizar un usuario
    updateUser(userId: string, updatedUser: User): Observable<User | undefined> {
      const index = this.users.findIndex(u => u.id === userId);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
        return of(this.users[index]);
      }
      return of(undefined); // Retorna undefined si no se encontró el parte
    }

      //Método para eliminar un usuario
      deleteUser(userId: string): Observable<boolean> {
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users.splice(index, 1);
          return of(true); // Indica que se eliminó exitosamente
        }
        return of(false); // Indica que no se encontró el usuario
      }

    private usuarioMock: User = {
         id: "1",
         name: "Lucía",
         surname: "Rico",
         email: "lucia@gmail.com",
         tlf: "646765432",
         password: "Lucia.R7",
         rol: Rol.ADMIN
    }


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
