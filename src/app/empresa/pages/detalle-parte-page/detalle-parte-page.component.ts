import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { ParteService } from '../../../shared/service/parte.service';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-detalle-parte-page',
  templateUrl: './detalle-parte-page.component.html',
  styleUrl: './detalle-parte-page.component.css'
})

export class DetallePartePageComponent implements OnInit {
  panelOpenState = false; // Estado del panel colapsado
  parte!: Parte; // Datos del parte
  originalParte!: Parte; // Copia datos parte
  parteId!: string; // ID del parte a cargar

  cliente: any = {}; // Datos del cliente (editable)
  originalCliente: any; // Copia datos cliente


  today: Date = new Date(); // Obtener la fecha actual

  // Dispositivos y estados de intervención (simulados)
  estados = [
    { label: 'Pendiente (PE)', valor: 'Pendiente' },
    { label: 'En pausa (PE)', valor: 'En Pausa' },
    { label: 'En curso (EC)', valor: 'En Curso' },
    { label: 'Anulada (AN)', valor: 'Anulado' },
    { label: 'Finalizada (OK)', valor: 'Finalizado' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private parteService: ParteService,
  ) {}

  ngOnInit(): void {
    // Obtén el ID del parte desde la ruta
    this.route.paramMap.subscribe(params => {
      this.parteId = params.get('id') || ''; // Asigna el ID de la ruta
      this.cargarParte(); // Carga el parte
    });
  }

  cargarParte(): void {
    // Convertir parteId a número
    const parteIdNumber = Number(this.parteId);

    // Inicializar datos del parte
    this.parteService.getParteById(parteIdNumber).subscribe(
      parte => {
          if (parte) {
              this.parte = { ...parte };
              this.originalParte = { ...parte };
              
              // Cargar datos del cliente según el clienteId del parte
              this.authService.getUserById(parte.clienteId).subscribe(
                cliente => {
                  if (cliente) {
                    this.cliente = { ...cliente }; // Cargar datos del cliente
                    this.originalCliente = { ...cliente }; // Guardar una copia de los datos originales
                  }
                },
                error => {
                  console.error('Error al cargar el cliente:', error);
                  alert('No se pudo cargar los datos del cliente. Intenta de nuevo más tarde.');
                }
              );
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
        // Convertir parteId a número antes de pasarlo al servicio
        const parteIdNumber = Number(this.parteId);
        
        this.parteService.updateParte(parteIdNumber, this.parte).subscribe(
            () => {
                this.goBack();
            },
            error => {
                console.error('Error al guardar cambios:', error);
                alert('No se pudieron guardar los cambios. Intenta de nuevo más tarde.');
            }
        );
      } else {
        this.parte = { ...this.originalParte };
        this.cliente = { ...this.originalCliente };
      }
  }


  reestablecerCambios() {
    // Restaurar los datos originales
    if (confirm('¿Estás seguro de que deseas reestablecer los cambios?')) {
      this.parte = { ...this.originalParte };
      this.cliente = { ...this.originalCliente };
    }
  }

  // Navegación para volver al listado de partes
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN]);
  }

}
