import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { ParteService } from '../../../shared/service/parte.service';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsParteService } from '../../../shared/validators/validatorsParte.service';
import { DialogService } from '../../../shared/service/dialog.service';

@Component({
  selector: 'app-editar-parte-page',
  templateUrl: './editar-parte-page.component.html',
  styleUrl: './editar-parte-page.component.css'
})

export class EditarPartePageComponent implements OnInit {
 
  //**Propiedades**//
  panelOpenState = false; // Estado del panel colapsado
  usuario: Usuario = {} as Usuario;  // Datos del usuario 
  form?: FormGroup;
  parte?: Parte; // Datos del parte (editable)
  initialParteValues?: Partial<Parte>;
  today: Date = new Date(); // Obtener la fecha actual
  errors: string[] = [];
  origenRuta: 'general' | 'usuario' = 'general'; // Capturamos origen ruta listado para poder retornar a él

  // Dispositivos y estados de intervención
  estados = [
    { label: 'Pendiente (PE)', valor: 'PE' },
    { label: 'En pausa (EP)', valor: 'EP' },
    { label: 'En curso (EC)', valor: 'EC' },
    { label: 'Anulada (AN)', valor: 'AN' },
    { label: 'Finalizada (OK)', valor: 'OK' }
  ];

  //**Constructor**//
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private parteService: ParteService,
    private usuarioService: UsuarioService,
    private dialogService: DialogService,
    private validatorsParteService: ValidatorsParteService
  ) {}

  //**Métodos**// 
  ngOnInit(): void {
    // Obtenemos el ID del parte desde la ruta
    const id = this.route.snapshot.paramMap.get('id');
    // Obtenemos si el origen de la ruta es del listado general o del de un usuario para poder retornar a él
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { origen?: string };
    if (state?.origen === 'usuario') {
      this.origenRuta = 'usuario';
    }
    
    if (id) {
      this.parteService.get(parseInt(id))
        .subscribe(parte => {
          this.parte = parte;
          this.initialParteValues = { ...parte }; // Almacena los valores iniciales
          this.cargarDatosUsuario(parte.usuarioId); //Carga los datos del usuario

          this.form = this.fb.group({
            usuarioId: [parte.usuarioId, Validators.required],
            fechaCreacion: [this.today, Validators.required],
            dispositivo: [parte.dispositivo, [ Validators.required,  Validators.pattern( this.validatorsParteService.dispositPattern ) ]],
            otrosMateriales: [parte.otrosMateriales],
            estado: [parte.estado, Validators.required],
            fechaEstimada: [parte.fechaEstimada, Validators.required],
            motivoCliente: [parte.motivoCliente, Validators.required],
            informeEmpresa: [parte.informeEmpresa],
            documentacionTecnica: [parte.documentacionTecnica, Validators.required]
          });
        })
    } else {
      console.log("No existe el parte");
    }

  }

  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsParteService.isValidField( this.form!, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsParteService.getFieldError( this.form!, field );
  }

  cargarDatosUsuario(usuarioId: number): void {
    // Cargar datos del usuario según el usuarioId del parte
    this.usuarioService.get(usuarioId).subscribe(
      usuario => this.usuario = usuario,
      error => {
              console.error('Error al cargar el usuario:', error);
              alert('No se pudo cargar los datos del usuario. Intenta de nuevo más tarde.');
      }
    );
  }

  save() {
    // Marcar todos los campos como tocados para mostrar mensajes de error
    if(this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const parteForm = this.form!.value;

    this.parteService.update(this.parte!.id, parteForm)
      .subscribe({
          next: () => {
            this.errors = [];
            this.dialogService.openDialog('Éxito', 'El parte se ha actualizado correctamente.');
            this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN, this.parte?.usuarioId])
          },
          error: response => {
            this.errors = response.error.errors;
          }
      });
   
  }

  // Método para restablecer los valores del formulario a los originales
  resetForm() {
    if (confirm('¿Estás seguro de que deseas reestablecer los cambios?')) {
      if (this.initialParteValues) {
        this.form?.reset({ ...this.initialParteValues })
      }
    }
  }

  // Navegación para volver al listado de partes específico (el del usuario o el general)
  goBack(id: number):void {
    if (this.origenRuta === 'usuario') {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN, id]);
    } else {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN]);
    }
  }

}
