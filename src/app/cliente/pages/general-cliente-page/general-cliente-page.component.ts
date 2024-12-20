import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Usuario } from '../../../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-general-cliente-page',
  templateUrl: './general-cliente-page.component.html',
  styles: ``
})
export class GeneralClientePageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get user(): Usuario | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate([RoutesConstants.RUTA_AUTENTICACION])
  }

}
