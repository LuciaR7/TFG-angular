import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-parte-page',
  templateUrl: './new-parte-page.component.html',
  styleUrl: './new-parte-page.component.css'
})
export class NewPartePageComponent {
  clienteForm: FormGroup;
  intervencionForm: FormGroup;
  clienteControl = this.fb.control('');

  // Dispositivos y estados de intervención (simulados)
  estados = [
    { label: 'Pendiente (PE)', valor: 'PE' },
    { label: 'En pausa (PE)', valor: 'EP' },
    { label: 'En curso (EC)', valor: 'EC' },
    { label: 'Anulada (AN)', valor: 'AN' },
    { label: 'Finalizada (OK)', valor: 'OK' }
  ];
  
  progreso = 0;

  constructor( private fb: FormBuilder, private router: Router ) {
   
    this.clienteForm = this.fb.group({
      nombre: [''],
      apellidos: [''],
      email: [''],
      telefono: [''],
    });
    this.intervencionForm = this.fb.group({
      dispositivo: [''],
      otrosMateriales: [''],
      estadoIntervencion: [''],
      fechaEstimada: [''],
      motivoCliente: [''],
      informeEmpresa: [''],
      documentacionTecnica: ['no']
    });

    // Simular cargar datos al seleccionar cliente
    this.clienteControl.valueChanges.subscribe(cliente => {
      if (cliente) {
        this.cargarDatosCliente(cliente);
      }
    });

  }

  cargarDatosCliente(cliente: string) {
    // Aquí se pueden cargar los datos reales del cliente seleccionado
    this.intervencionForm.patchValue({
      nombre: 'Pepa',
      apellidos: 'Martín López',
      email: 'pepa@gmail.com',
      telefono: '634456789'
    });
  }

  actualizarProgreso() {
    const estado = this.intervencionForm.get('estadoIntervencion')?.value;
    switch (estado.valor) {
      case 'PE':
        this.progreso = 25;
        break;
      case 'EP':
        this.progreso = 50;
        break;
      case 'EC':
        this.progreso = 75;
        break;
      case 'OK':
        this.progreso = 100;
        break;
      case 'AN':
        this.progreso = 0;
        break;
      default:
        this.progreso = 0;
    }
  }

  crearParte() {
    console.log('Parte creado', this.intervencionForm.value);
  }

  cancelar() {
    this.intervencionForm.reset();
  }

  generarQR() {
    console.log('QR generado');
  }

  volverHome():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_HOME_ADMIN])
  }
}