import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario.interface';
import { environment } from '../../../environments/environments';

 
@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

  url: string = `${environment.baseUrl}/users`
   
    constructor(
      private http: HttpClient,
    ) {}
    
    list(){
      return this.http.get<Usuario[]>(this.url);
    }
    
    get(id: number){
      return this.http.get<Usuario>(`${this.url}/${id}`);
    }
  
    create(user: Usuario){
      return this.http.post<Usuario>(this.url, user);
    }
  
    update(id: number, user: Usuario){
      return this.http.put<Usuario>(`${this.url}/${id}`, user);
    }
  
    delete(id: number){
      return this.http.delete<void>(`${this.url}/${id}`);
    }
    
      
}