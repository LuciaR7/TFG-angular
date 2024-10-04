import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../../auth/interfaces/user.interface';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-new-parte-page',
  templateUrl: './new-parte-page.component.html',
  styleUrl: './new-parte-page.component.css'
})

export class NewPartePageComponent implements OnInit{
  clienteForm: FormGroup;
  intervencionForm: FormGroup;
  clienteControl = this.fb.control('');
  clientesFiltrados!: Observable<User[]>;

  currentDate: Date = new Date();
  today: Date = new Date(); // Obtener la fecha actual

  clientes: User[] = []; // Lista de clientes obtenida del servicio
  partes: Parte[] = []; // Lista de partes obtenida del servicio
  
  // Dispositivos y estados de intervención (simulados)
  estados = [
    { label: 'Pendiente (PE)', valor: 'PE' },
    { label: 'En pausa (PE)', valor: 'EP' },
    { label: 'En curso (EC)', valor: 'EC' },
    { label: 'Anulada (AN)', valor: 'AN' },
    { label: 'Finalizada (OK)', valor: 'OK' }
  ];

  constructor( 
    private fb: FormBuilder, 
    private authService: AuthService,
  ) {
   
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
  }

    ngOnInit(): void {
      // Obtener los clientes desde AuthService
      this.authService.getUsers().subscribe(clientes => {
        this.clientes = clientes;
        this.clientesFiltrados = this.clienteControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filtrarClientes(value || ''))
        );
      });
    }

    // Método para filtrar clientes
    filtrarClientes(value: string): User[] {
      const filterValue = value.toLowerCase();
      return this.clientes.filter(cliente => 
        cliente.name.toLowerCase().includes(filterValue) || 
        cliente.surname.toLowerCase().includes(filterValue)
      );
  }
  
    // Método para seleccionar un cliente y cargar sus datos
    seleccionarCliente(cliente: User) {
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