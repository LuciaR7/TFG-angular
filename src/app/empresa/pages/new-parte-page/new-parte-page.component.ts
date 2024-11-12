import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { ParteService } from '../../../shared/service/parte.service';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { ValidatorsParteService } from '../../../shared/validators/validatorsParte.service';
import { DialogService } from '../../../shared/service/dialog.service';

@Component({
  selector: 'app-new-parte-page',
  templateUrl: './new-parte-page.component.html',
  styleUrl: './new-parte-page.component.css'
})

export class NewPartePageComponent implements OnInit{
  
  //**Propiedades**//
  usuarioForm: FormGroup;
  intervencionForm: FormGroup;
  isEditing: boolean = false; // Controla si se está editando el usuario
  usuarioControl = this.fb.control('');
  usuariosFiltrados!: Observable<Usuario[]>;
  errors: string[] = [];

  today: Date = new Date(); // Obtener la fecha actual

  users: Usuario[] = [];
  
  //Dispositivos y estados de intervención (simulados)
  estados = [
    { label: 'Pendiente (PE)', valor: 'PE' },
    { label: 'En pausa (PE)', valor: 'EP' },
    { label: 'En curso (EC)', valor: 'EC' },
    { label: 'Anulada (AN)', valor: 'AN' },
    { label: 'Finalizada (OK)', valor: 'OK' }
  ];

  //**Constructor**//
  constructor( 
    private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private parteService: ParteService,
    private router: Router,
    private validatorsParteService: ValidatorsParteService,
    private dialogService: DialogService
  ) {
   
      //Formulario usuarios
      this.usuarioForm = this.fb.group({
        usuarioId: [],
        name: [],
        surname: [],
        email: [],
        tlf: [],
        password: []
      });


      //Formulario intervención
      this.intervencionForm = this.fb.group({
        usuarioId: [0, Validators.required],
        fechaCreacion: [this.today, Validators.required],
        dispositivo: ['', [ Validators.required,  Validators.pattern( this.validatorsParteService.dispositPattern ) ]],
        otrosMateriales: [null],
        estado: ['', Validators.required],
        fechaEstimada: ['', Validators.required],
        motivoCliente: ['', Validators.required],
        informeEmpresa: [null],
        documentacionTecnica: ['NO', Validators.required]
      });
    }


  //**Métodos**//  
  ngOnInit(): void {
    // Cargar la lista de usuarios
    this.usuarioService.list().subscribe(users => {
      this.users = users;
      this.usuariosFiltrados = this.usuarioControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filtrarUsuarios(value || ''))
      );
    });

    // Suscribirse a los cambios en los campos 'name' y 'surname'
    this.usuarioForm.valueChanges.subscribe(() => {
      const { name, surname } = this.usuarioForm.value;
      this.usuarioControl.setValue(`${name || ''} ${surname || ''}`);
    });

  }


  filtrarUsuarios(value: any): Usuario[] {
    const filterValue = (value || '').toString().toLowerCase();
    return this.users.filter(user => 
      user.name.toLowerCase().includes(filterValue) || 
      user.surname.toLowerCase().includes(filterValue)
    );
  }

  // Método para seleccionar un usuario y cargar sus datos
  seleccionarUsuario(user: Usuario) {
    // Asigna el nombre completo al campo de búsqueda
    this.usuarioControl.setValue(`${user.name} ${user.surname}`);

    // Autocompleta los campos del usuario en el formulario
    this.usuarioForm.patchValue({
      usuarioId: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      tlf: user.tlf,
      password: user.password
    });

    // Activa el modo de edición al seleccionar un usuario
    this.isEditing = true;

    // Guarda el id del usuario seleccionado en el formulario de intervención
    this.intervencionForm.get('usuarioId')?.setValue(user.id);
  }

  editarDatosUsuario() {
    if (this.usuarioForm.invalid) {
      console.error('Formulario de cliente inválido');
      return;
    }

    const updatedUsuario = this.usuarioForm.getRawValue();
  
    // Llamada al servicio para actualizar los datos
    this.usuarioService.update(updatedUsuario.usuarioId, updatedUsuario).subscribe({
      next: () => {
        this.dialogService.openDialog('Éxito', 'Los datos del cliente se han actualizado correctamente.');
      },
      error: () => {
        this.dialogService.openDialog('Error', 'Ocurrió un error al actualizar los datos.');
      }
    });
  }
  

  create() {
    if (this.intervencionForm.invalid) {
      this.intervencionForm.markAllAsTouched();
      return;
    }

    // Asegura que sea un objeto plano y convierte fechaEstimada a formato adecuado
    const parteData: Parte = {
      ...this.intervencionForm.getRawValue(),
      fechaEstimada: new Date(this.intervencionForm.get('fechaEstimada')?.value),  // Asegura que sea Date
    };

    this.parteService.create(parteData as Parte)
    .subscribe({
      next: () => {
        this.errors = [];
        this.dialogService.openDialog('Éxito', 'El parte se ha creado correctamente.');
        this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN])
      },
      error: response => {
       this.errors = response.error.errors;
      }
    });
  }

  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsParteService.isValidField( this.intervencionForm, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsParteService.getFieldError( this.intervencionForm, field );
  }

  // Navegación para volver al listado de partes
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN]);
  }

  generarQR() {
    console.log('QR generado');
  }

}