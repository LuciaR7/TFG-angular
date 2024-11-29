import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestedWithInterceptor } from './auth/interceptors/requested-with-interceptor';
import { AuthorizationHeaderInterceptor } from './auth/interceptors/authorization-header -interceptor';



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
        provideHttpClient(withInterceptorsFromDi()),
        {
            //Añade un encabezado de autorización (token) a las solicitudes HTTP
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationHeaderInterceptor,
            multi: true
        },
        {
            //Añade la cabecera X-Requested-With para evitar mostrar el cuadro de autenticación.
            provide: HTTP_INTERCEPTORS,
            useClass: RequestedWithInterceptor,
            multi: true
        },

        provideAnimationsAsync(),
    ]
  })
export class AppModule { }
