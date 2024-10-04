import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { RoutesConstants } from '../../../shared/constants/routes.constants';

@Component({
  selector: 'app-home-empresa-page',
  templateUrl: './home-empresa-page.component.html',
  styleUrl: './home-empresa-page.component.css'
})
export class HomeEmpresaPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  goNewClient(): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_CLIENT_ADMIN]);
  }

  goNewParte():void  {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_PARTE_ADMIN]);
  }
  
  goListClients():void  {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
  }

  goListPartes():void  {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN]);
  }

  onLogout():void  {
    this.authService.logout();
    this.router.navigate([RoutesConstants.RUTA_AUTENTICACION])
  }
  
}
