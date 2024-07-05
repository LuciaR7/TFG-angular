import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';



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
        provideHttpClient(withInterceptorsFromDi())
    ]
  })
export class AppModule { }
