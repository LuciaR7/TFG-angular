import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-parte-page',
  templateUrl: './new-parte-page.component.html',
  styleUrl: './new-parte-page.component.css'
})

export class NewPartePageComponent {
  clienteForm: FormGroup;
  intervencionForm: FormGroup;
  clienteControl = this.fb.control('');
  clientesFiltrados!: Observable<any[]>;

  currentDate: Date = new Date();

  // Lista de clientes (simulados)
  clientes = [
    { name: 'Pepa', surname: 'Martín López', email: 'pepa@gmail.com', tlf: '634456789' },
    { name: 'Carlos', surname: 'González García', email: 'carlos@gmail.com', tlf: '612345678' },
    { name: 'Lucía', surname: 'Fernández Ruiz', email: 'lucia@gmail.com', tlf: '698765432' }
  ];

  // Dispositivos y estados de intervención (simulados)
  estados = [
    { label: 'Pendiente (PE)', valor: 'PE' },
    { label: 'En pausa (PE)', valor: 'EP' },
    { label: 'En curso (EC)', valor: 'EC' },
    { label: 'Anulada (AN)', valor: 'AN' },
    { label: 'Finalizada (OK)', valor: 'OK' }
  ];

  constructor( private fb: FormBuilder, private router: Router ) {
   
    //Formulario clientes
    this.clienteForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      tlf: [''],
    });

    //Formulario intervención
    this.intervencionForm = this.fb.group({
      dispositivo: [''],
      otrosMateriales: [''],
      estadoIntervencion: [''],
      fechaEstimada: [''],
      motivoCliente: [''],
      informeEmpresa: [''],
      documentacionTecnica: ['no']
    });

    // Filtrar clientes en función de la búsqueda
    this.clientesFiltrados = this.clienteControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarClientes(value || ''))
    );

  }

    // Método para filtrar clientes
    filtrarClientes(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.clientes.filter(cliente => 
        cliente.name.toLowerCase().includes(filterValue) || 
        cliente.surname.toLowerCase().includes(filterValue)
      );
  }
  
    // Método para seleccionar un cliente y cargar sus datos
    seleccionarCliente(cliente: any) {
      // Asigna el nombre completo al campo de búsqueda
      this.clienteControl.setValue(`${cliente.name} ${cliente.surname}`);

      // Autocompleta los campos del cliente en el formulario
      this.clienteForm.patchValue({
        name: cliente.name,
        surname: cliente.surname,
        email: cliente.email,
        tlf: cliente.tlf
    });
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


}