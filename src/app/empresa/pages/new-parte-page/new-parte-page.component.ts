import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { ParteService } from '../../../shared/service/parte.service';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { UsuarioService } from '../../../shared/service/usuario.service';

@Component({
  selector: 'app-new-parte-page',
  templateUrl: './new-parte-page.component.html',
  styleUrl: './new-parte-page.component.css'
})

export class NewPartePageComponent implements OnInit{
  clienteForm: FormGroup;
  intervencionForm: FormGroup;
  clienteControl = this.fb.control('');
  clientesFiltrados!: Observable<Usuario[]>;

  currentDate: Date = new Date();
  today: Date = new Date(); // Obtener la fecha actual

  users: Usuario[] = [];
  
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
    private usuarioService: UsuarioService,
    private parteService: ParteService,
    private router: Router,
    private validatorsService: ValidatorsService,
  ) {
   
    //Formulario clientes
    this.clienteForm = this.fb.group({
      clienteId: [],
      name: [],
      surname: [],
      email: [],
      tlf: []
    });


    //Formulario intervención
    this.intervencionForm = this.fb.group({
      clienteId: ['', Validators.required],
      fechaCreacion: [this.currentDate, Validators.required],
      dispositivo: ['', Validators.required],
      otrosMateriales: [''],
      estado: ['', Validators.required],
      fechaEstimada: ['', Validators.required],
      motivoCliente: ['', Validators.required],
      informeEmpresa: ['', Validators.required],
      documentacionTecnica: ['no']
    });
  }

    ngOnInit(): void {
      this.usuarioService.list().subscribe(users => {
        this.users = users;
        this.clientesFiltrados = this.clienteControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filtrarClientes(value || ''))
        );
      });
    }

    filtrarClientes(value: any): Usuario[] {
      const filterValue = (value || '').toString().toLowerCase();
      return this.users.filter(user => 
        user.name.toLowerCase().includes(filterValue) || 
        user.surname.toLowerCase().includes(filterValue)
      );
    }
  
    // Método para seleccionar un cliente y cargar sus datos
    seleccionarCliente(user: Usuario) {
      // Asigna el nombre completo al campo de búsqueda
      this.clienteControl.setValue(`${user.name} ${user.surname}`);

      // Autocompleta los campos del cliente en el formulario
      this.clienteForm.patchValue({
        clienteId: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        tlf: user.tlf
    });

    // Guarda el id del cliente seleccionado en el formulario de intervención
    this.intervencionForm.get('clienteId')?.setValue(user.id);
  }

  create() {
    if (this.intervencionForm.invalid) {
      this.intervencionForm.markAllAsTouched();
      return;
    }

    const parteData = this.intervencionForm.value;
    console.log('Parte data:', parteData);

    this.parteService.create(parteData).subscribe({
      next: () => this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN]),
      error: (err) => console.error('Error al crear el parte:', err)  // Muestra detalles del error
    });
  }

  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.intervencionForm, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsService.getFieldError( this.intervencionForm, field );
  }

  // Navegación para volver al listado de partes
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN]);
  }

  generarQR() {
    console.log('QR generado');
  }

}