import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
   
    constructor(
      private http: HttpClient,
    ) {}
    
    list(){
        return this.http.get<Usuario[]>('http://localhost:8080/api/users');
      }
    
      get(id: number){
        return this.http.get<Usuario>(`http://localhost:8080/api/users/${id}`);
      }
    
      create(user: any){
        return this.http.post<Usuario>('http://localhost:8080/api/users', user);
      }
    
      update(id: number, user: any){
        return this.http.put<Usuario>(`http://localhost:8080/api/users/${id}`, user);
      }
    
      delete(id: number){
        return this.http.delete<void>(`http://localhost:8080/api/users/${id}`);
      }
    
}