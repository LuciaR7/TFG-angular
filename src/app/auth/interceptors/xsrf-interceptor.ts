import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpXsrfHeaderExtractorService } from '../services/http-xsrf-header-extractor.service';



/**
 * Esta clase intercepta las llamadas al servidor, cogiendo el token CSRF de
 * las cabeceras en las respuestas y injectandolo en las cabeceras de las
 * peticiones.
 */
@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

    /**
     * Constructor del XsrfInterceptor.
     * 
     * @param tokenExtractor Inyecccion del servicio que
     */
    constructor(private tokenGhcServiceApiExtractor: HttpXsrfHeaderExtractorService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            // Declaramos la variable requestToForward y la inicializamos con el valor original de la petición
            let requestToForward = req;

            //Obtenemos el header y token X-srf
            const token = this.tokenGhcServiceApiExtractor.getToken();
            const tokenHeader = this.tokenGhcServiceApiExtractor.getHeader();

            //Si tenemos token y header
            if (token  && tokenHeader) {
                //Clonamos la peticion añadiendo el header con el X-CSRF token
                requestToForward = req.clone({ setHeaders: { [tokenHeader]: token} });
            }
        

            //Lanzamos la peticion y pasamos por el servicio extractor la respuesta
            return next.handle(requestToForward).pipe(
                tap((response: HttpEvent<any>) => {
                    if (response instanceof HttpResponse) {
                        this.tokenGhcServiceApiExtractor.extractFromResponse(response);
                    }
                }
            ),
            catchError((err: HttpErrorResponse) => {
                this.tokenGhcServiceApiExtractor.extractFromResponse(err);
                return throwError(()=>err);
            })
            );


    }

}
