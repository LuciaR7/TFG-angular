import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

/**
 * Interceptor que configura las peticiones para que angular pase automaticamente
 * en la peticion las cookies capturadas en solicitudes anteriores al servidor.
 * (Para no perder la sesión del usuario).
 */
@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
    
        //Clonamos la peticion añadiendo conf de 'withCredentials: true'
        req = req.clone({
            withCredentials: true
        });
        
        return next.handle(req);
    }
}