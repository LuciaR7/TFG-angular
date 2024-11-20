import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { WithCredentialsInterceptor } from './auth/interceptors/with-credential-interceptors';
import { RequestedWithInterceptor } from './auth/interceptors/requested-with-interceptor';
import { XsrfInterceptor } from './auth/interceptors/xsrf-interceptor';



@NgModule({
    declarations: [
        AppComponent,
    ],

    bootstrap: [
        AppComponent
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ],

    providers: [
        provideAnimationsAsync(),
        // provideHttpClient(withInterceptorsFromDi()),
        provideHttpClient(),
        {
            //Asegura que las cookies de sesión se envíen con todas las solicitudes.
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true
        },
        {
            //Añade la cabecera X-Requested-With para evitar mostrar el cuadro de autenticación.
            provide: HTTP_INTERCEPTORS,
            useClass: RequestedWithInterceptor,
            multi: true
        },
        {
            //Protege contra ataques CSRF al incluir el token CSRF en las cabeceras de las solicitudes.
            provide: HTTP_INTERCEPTORS,
            useClass: XsrfInterceptor,
            multi: true
        }
    ]
  })
export class AppModule { }
