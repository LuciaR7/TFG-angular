import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ConsultaParteIntervencionModule } from './consulta-parte-intervencion/consulta-parte-intervencion.module';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ConsultaParteIntervencionModule,
    HttpClientModule,

    SharedModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
