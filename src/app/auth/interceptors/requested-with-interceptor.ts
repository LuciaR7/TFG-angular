import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Esta clase intercepta las llamadas al servidor y agrega la cabecera
 * `X-Requested-With=XMLHttpRequest` para que las peticiones no autorizadas
 * no muestren el dialogo de autenticación del servidor.
 */
@Injectable()
export class RequestedWithInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /* Añade cabecera X-Requested-With, para que el servidor no muestre
        un dialog para requerir credenciales si no se esta logueado */        
        const requestToForward = req.clone({ setHeaders: { 'X-Requested-With': 'XMLHttpRequest' } });

        return next.handle(requestToForward);

    }

}