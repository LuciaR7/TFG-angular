import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-detalle-cliente-page',
  templateUrl: './detalle-cliente-page.component.html',
  styleUrl: './detalle-cliente-page.component.css'
})
export class DetalleClientePageComponent implements OnInit {
  cliente!: User; // Datos del cliente (editable)
  originalCliente!: User; // Para restaurar en caso de cancelar
  clienteId!: string; // ID del usuario a cargar

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtén el ID del usuario desde la ruta
    this.route.paramMap.subscribe(params => {
      this.clienteId = params.get('id') || ''; // Asigna el ID de la ruta
      this.cargarUsuario(); // Carga el usuario
    });
  }

  cargarUsuario(): void {
    // Inicializar datos del parte
    this.authService.getUserById(this.clienteId).subscribe(
      cliente => {
          if (cliente) {
              this.cliente = { ...cliente };
              this.originalCliente = { ...cliente };
            }
          },
          error => {
            console.error('Error al cargar el parte:', error);
            alert('No se pudo cargar el parte. Intenta de nuevo más tarde.');
          }
    );
  }

  guardarCambios() {
    // Simulación de guardar cambios
    if (confirm('¿Estás seguro de que deseas guardar los cambios?')) {
      this.authService.updateUser(this.clienteId, this.cliente).subscribe(
          () => {
              alert('Cambios guardados correctamente');
              this.goBack();
          },
          error => {
              console.error('Error al guardar cambios:', error);
              alert('No se pudieron guardar los cambios. Intenta de nuevo más tarde.');
          }
      );
    }
  }

  reestablecerCambios() {
    // Restaurar los datos originales
    this.cliente = { ...this.originalCliente };
  }

  // Navegación para volver al listado de clientes
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
  }
}
