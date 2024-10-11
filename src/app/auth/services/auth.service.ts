import { Injectable } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';
import { Rol, Usuario } from '../../shared/interfaces/usuario.interface';



@Injectable({providedIn: 'root'})
export class AuthService {

  private users: Usuario[] = [
    {
      id: 1, // Administrador 1
      name: 'Lucía',
      surname: 'Rico',
      email: 'lucia@gmail.com',
      tlf: '987654321',
      password: 'Lucia.R7',
      rol: Rol.ADMIN,
    },
    {
      id: 2, // Administrador 2
      name: 'Alfredo',
      surname: 'Rico',
      email: 'alfredo@gmail.com',
      tlf: '444987654',
      password: 'Alfre.R8',
      rol: Rol.ADMIN,
    },
    {
      id: 3, // Cliente 1
      name: 'Ana',
      surname: 'Pérez',
      email: 'ana.perez@example.com',
      tlf: '123456789',
      password: 'password123',
      rol: Rol.USER,
    },
    {
      id: 4, // Cliente 2
      name: 'María',
      surname: 'González',
      email: 'maria.gonzalez@example.com',
      tlf: '555123456',
      password: 'password789',
      rol: Rol.USER,
    },
    {
      id: 5, // Cliente 3
      name: 'Carlos',
      surname: 'Fernández',
      email: 'carlos.fernandez@example.com',
      tlf: '333654321',
      password: 'password202',
      rol: Rol.USER,
    },
  ];

    // va a ser nulo cuando se cargue la app por primera vez y no hay auth
    private user: Usuario|undefined ;

    constructor() {}

    //Simulación de un API que devuelve un Observable
    getUsers(): Observable<Usuario[]> {
      // Retornar los datos como un Observable
      return of(this.users);
    }

    // Método para obtener un usuario por su ID
    getUserById(userId: number): Observable<Usuario | undefined> {
      const user = this.users.find(u => u.id === userId);
      return of(user);
    }

    //Método para actualizar un usuario
    updateUser(userId: number, updatedUser: Usuario): Observable<Usuario | undefined> {
      const index = this.users.findIndex(u => u.id === userId);
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
        return of(this.users[index]);
      }
      return of(undefined); // Retorna undefined si no se encontró el parte
    }

      //Método para eliminar un usuario
      deleteUser(userId: number): Observable<boolean> {
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users.splice(index, 1);
          return of(true); // Indica que se eliminó exitosamente
        }
        return of(false); // Indica que no se encontró el usuario
      }

    private usuarioMock: Usuario = {
         id: 1,
         name: "Lucía",
         surname: "Rico",
         email: "lucia@gmail.com",
         tlf: "646765432",
         password: "Lucia.R7",
         rol: Rol.ADMIN
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
