import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intervencion } from '../interfaces/intervencion.interface';
import { environment } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class IntervencionService {
    
    url: string = `${environment.baseUrl}/historial`

    constructor(
        private http: HttpClient
    ) {}

    list(){
        return this.http.get<Intervencion[]>(this.url);
    }
    
    get(id: number){
        return this.http.get<Intervencion>(`${this.url}/${id}`);
    }

    create(intervencion: Intervencion){
        return this.http.post<Intervencion>(this.url, intervencion);
    }

    update(id: number, intervencion: Intervencion){
        return this.http.put<Intervencion>(`${this.url}/${id}`, intervencion);
    }

    delete(id: number){
     return this.http.delete<void>(`${this.url}/${id}`);
    }

    // Método para obtener PARTES por ID de cliente
    getIntervencionesByParteId(parteId: number): Observable<Intervencion[]> {
        return this.http.get<Intervencion[]>(`${this.url}/partes/${parteId}`);
    }

    
}