import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Rol, Usuario } from '../../shared/interfaces/usuario.interface';
import { LoginRequest } from '../interfaces/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({providedIn: 'root'})
export class AuthService {

   //**Propiedades**//
    url: string = `${environment.baseUrl}/auth/login`
    private isAuthenticated: boolean = false;
    private user: Usuario|undefined ;

    //**Constructor**//
    constructor( private http: HttpClient) {
      // Verificar si ya existe un token en sessionStorage al iniciar la app
      const token = sessionStorage.getItem("token");
      const userRole = sessionStorage.getItem("userRole");
      const userId = sessionStorage.getItem("userId");
      
      if (token && userRole && userId) {
        this.isAuthenticated = true;
        this.loadUserData(userId);  // Cargar los datos del usuario
      }
    }

    //**Métodos**//  
    // Método para cargar los datos del usuario
    private loadUserData(userId: string): void {
      // Aquí puedes hacer una llamada al backend para obtener el usuario
      this.http.get<Usuario>(`${environment.baseUrl}/users/${userId}`).subscribe(
          (usuario) => {
              this.user = usuario;  // Guardamos el usuario cargado
          },
          (error) => {
              console.error('Error al cargar el usuario', error);
          }
      );
  }
  
  // Método que devuelve el usuario actual
  get currentUser(): Usuario | undefined {
    // Si el usuario no está guardado, lo cargamos de sessionStorage o de otro lugar
    return this.user;
}

    login(credentials:LoginRequest):Observable<any>{
      return this.http.post<any>(this.url,credentials).pipe(
        tap( (userData) => {
          // Almacenar el token y los datos del usuario
          sessionStorage.setItem("token", userData.token);
          sessionStorage.setItem("userId", userData.id.toString());
          sessionStorage.setItem("userRole", userData.rol); 
    
          // Cambiar el estado de autenticación
          this.isAuthenticated = true;
          
          // También puedes cargar los datos del usuario si es necesario
          this.loadUserData(userData.id.toString());

        }),
        map((userData)=> userData),
        catchError(this.handleError)
      );
    }

    logout():void{
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userRole");
      this.isAuthenticated = false;

    }

    getToken(): string | null {
      return sessionStorage.getItem("token");
    }
  
    getRole(): string | null {
      return sessionStorage.getItem("userRole");
    }
  
    isUserAuthenticated(): boolean {
      return this.isAuthenticated;
    }
  
    checkLogin(): Observable<boolean> {
      return of(this.isAuthenticated);  // Devuelve si el usuario está autenticado
    }
  
    checkRole(): Observable<string | null> {
      return of(this.getRole());  // Devuelve el rol del usuario
    }
  
    private handleError(error: HttpErrorResponse) {
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
      return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
    }
    
    register( name: string, email: string, password1: string, password2: string ):Observable<Usuario> {

      if((name === 'Lucia Rico') && (email === 'lucia@gmail.com') &&
         (password1 === 'Lucia.R7') && (password2 === 'Lucia.R7')){

          return of(this.user as Usuario);

      } else {
          return throwError(()=>"Credenciales incorrectas")
      }

    }


}
