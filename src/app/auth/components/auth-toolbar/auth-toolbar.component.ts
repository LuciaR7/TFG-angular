import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-toolbar',
  templateUrl: './auth-toolbar.component.html',
  styles: ``
})
export class AuthToolbarComponent {
    
  // Método para abrir el sitio web
  openWebsite() {
  window.open('https://www.ricosoftsg.es/', '_blank');
  }

  // Método para abrir la página de Facebook
  openFacebook() {
    window.open('https://www.facebook.com/p/Ricosoft-Inform%C3%A1tica-Profesional-100063573064102/?locale=es_ES&_rdr', '_blank');
  }
}

