import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Esta interceptor añade el encabezado de autorización en las solicitudes HTTP que necesitan un token de autenticación 
 * (generalmente, un token JWT) para acceder a recursos protegidos en el backend.
 * Y gestiona la autenticación del usuario sin necesidad de modificar cada solicitud manualmente.
 */ 

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

         // Obtener el token desde sessionStorage
        const token = sessionStorage.getItem('token');

        if (token) {
            // Clonar la solicitud para agregar el encabezado Authorization
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            
            return next.handle(clonedRequest);
          }
      
          // Si no hay token, simplemente pasa la solicitud sin modificar
          return next.handle(req);
        }
        
    }