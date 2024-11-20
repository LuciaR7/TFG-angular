import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio que se encarga de extraer el XSRF-HEADER de una respuesta HTTP.
 * `
 */
@Injectable({
    providedIn: 'root'
})
export class HttpXsrfHeaderExtractorService {
    
    /**
     * Nombre por defecto de la cabecera que contiene el nombre
     * de la cabecera que contiene el token X-CSRF.
     */
    readonly HEADER_FOR_TOKEN_VALUE = 'X-Csrf-Token';

    /**
     * Nombre de la cabecera que contiene la información del nombre del
     * header que contiene el token.
     */
    readonly HEADER_FOR_TOKEN_HEADER = 'X-Csrf-Header';

    /**
     * Valor del ultimo token detectado en las cabeceras.
     */
    private lastToken: string|null = null;

    /**
     * Nombre del Header en la peticion para la cabecera que contiene
     * el Token.
     */
    private headerToken:string|null= this.HEADER_FOR_TOKEN_VALUE;

    constructor() { }

    /**
     * Ultimo TOKEN registrado en las peticiones.
     * 
     * @returns `string | null`
     */
    getToken(): string | null {
        return this.lastToken;
    }
    
    /**
     * Obtiene el nombre del Header en la peticion para la cabecera que
     * contiene el Token.
     * 
     * @returns `string | null`
     */
    getHeader(): string | null {
        return this.headerToken;
    }

    /**
     * Metodo que extrae el X-CSRF token y actualiza si es necesario, el header
     * que contendra el token para futuras peticiones.
     * 
     * @param response Respues http interceptada.
     */
    extractFromResponse(response: HttpResponse<any> | HttpErrorResponse):void{


        if (response.headers.has(this.HEADER_FOR_TOKEN_VALUE)) {
    
            this.lastToken = response.headers.get(this.HEADER_FOR_TOKEN_VALUE);
        
            // Also update the header we must use if it is in the response.
            if (response.headers.has(this.HEADER_FOR_TOKEN_HEADER)) {
                this.headerToken = response.headers.get(this.HEADER_FOR_TOKEN_HEADER);
            }
    
        }
    
    }
}
