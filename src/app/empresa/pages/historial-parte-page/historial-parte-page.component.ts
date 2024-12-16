import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { IntervencionService } from '../../../shared/service/intervencion.service';
import { Intervencion } from '../../../shared/interfaces/intervencion.interface';
import { DialogService } from '../../../shared/service/dialog.service';
import { getTablasPaginatorIntl } from '../../../shared/global.functions';
import { ParteService } from '../../../shared/service/parte.service';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';


@Component({
  selector: 'app-historial-parte-page',
  templateUrl: './historial-parte-page.component.html',
  styleUrl: './historial-parte-page.component.css',
  providers: [
    //Necesario para internacionalizacion de texto paginator de mat-table
    { provide: MatPaginatorIntl, useValue: getTablasPaginatorIntl() }
  ]
})
export class HistorialPartePageComponent implements OnInit, AfterViewInit {

  //**Propiedades**//
  form: FormGroup;
  currentUser: string;
  parteId!: string; // ID del parte a cargar
  usuarioId!: number; // ID del usuario a cargar
  dispositivo: string = ''; // Dispositivo de la intervención
  usuarioNombre: string = ''; // Nombre del usuario 
  dataSource: MatTableDataSource<Intervencion> = new MatTableDataSource();
  displayedColumns: string[] = ['fecha', 'tecnico', 'intervencion'];
  today: Date = new Date(); // Obtener la fecha actual
  errors: string[] = [];
  isLoading = true;

  //**Decoradores**//
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //**Constructor**//
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private parteService: ParteService,
    private intervencionService: IntervencionService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {
      // Obtener el usuario de la sesión actual
      this.currentUser = `${this.authService.currentUser?.name} ${this.authService.currentUser?.surname}`;

      // Inicializar el formulario con el nombre del técnico predeterminado
      this.form = this.fb.group({
        parteId: [0, Validators.required],
        fecha: [this.today, Validators.required],
        tecnico: [this.currentUser, Validators.required],
        intervencion: ['', Validators.required],
        descripcion: [null]
      });

    }
  
  //**Métodos**//  
  ngOnInit(): void {
    // Obtener el ID del parte desde la ruta
    this.parteId = this.route.snapshot.paramMap.get('id')!; // Asegúrate de que el ID no sea null
    // Guarda el id del parte seleccionado en el formulario de intervención
    this.form.get('parteId')?.setValue(parseInt(this.parteId));

    // Obtener el ID del usuario desde la ruta
    const usuarioIdString = this.route.snapshot.paramMap.get('usuarioId')!; // Asegúrate de que el ID no sea null
    // Guarda el id del usuario seleccionado
    this.usuarioId = (parseInt(usuarioIdString));

    // Cargar las intervenciones asociadas al parte usando el ID
    if (this.parteId) {
      this.loadHistorial(Number(this.parteId));
      this.loadNombreUsuario(this.usuarioId); //Carga los datos del usuario
      this.loadDispositivo(Number(this.parteId)); // Cargar datos del dispositivo
    } else {
      console.error('No se encontró el ID del parte');
    }

     // Establecer la columna de id como la columna de orden predeterminada
     this.dataSource.sortingDataAccessor = (intervencion: Intervencion, property: string) => {
      switch (property) {
        case 'fecha':
          return new Date(intervencion.fecha).getTime();
        case 'tecnico':
          return intervencion.tecnico;
        case 'intervencion':
          return intervencion.intervencion;
        default:
          return ''; // Retorna string vacío si no encuentra la propiedad
      }
    };

  }

  ngAfterViewInit(): void {
    // Conectar el paginador y el sort con el dataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Marcar el componente para una verificación de cambios
    this.cdr.detectChanges();
  }

  //Indica si la tabla esta vacia de registros `true`, o no `false`.
    get esTablaVacia():boolean{

      if(this.dataSource.data.length === 0){
          return true;
      } 
      return false;
    }

  loadHistorial(parteId: number) {
    this.isLoading = true; // Activa el spinner

    this.intervencionService.getIntervencionesByParteId(parteId).subscribe(
      (historial) => {
          this.dataSource.data = historial;

          // Asegurar que el paginator se asigna correctamente
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          });

          this.isLoading = false; // Desactiva el spinner

          this.cdr.detectChanges();

          // Aplica el orden por defecto en la tabla si el sort está disponible
          if (this.sort) {
            this.dataSource.sort = this.sort; // Conecta el `sort`
            this.sort.sort({ id: 'fecha', start: 'desc', disableClear: true }); // Aplica el orden descendente
          }
      },
      (error) => {
        console.error('Error al cargar el historial:', error);
        this.isLoading = false; // Desactiva el spinner en caso de error
      }
    );
  }

  // Método para obtener el nombre del dispositivo
  loadDispositivo(parteId: number): void {
    this.parteService.get(parteId).subscribe({
      next: (detalle) => {
        this.dispositivo = detalle.dispositivo;
      },
      error: (err) => console.error('Error al cargar el detalle del parte:', err)
    });
  }

  // Método para obtener el nombre del usuario
  loadNombreUsuario(usuarioId: number): void {
    this.usuarioService.get(usuarioId).subscribe(
      usuario => {
        this.usuarioNombre = `${usuario.name} ${usuario.surname}`; // Establece el nombre completo
      },
      error => {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    );
  }
  
  // Aplicar filtros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    // Ajuste del filtro
    this.dataSource.filterPredicate = (data: Intervencion, filter: string): boolean => {
      const filterDate = data.fecha ? new Date(data.fecha).toLocaleDateString().toLowerCase().includes(filter) : false;
      const filterTecnico = data.tecnico ? data.tecnico.toLowerCase().includes(filter) : false;
      const filterIntervencion = data.intervencion ? data.intervencion.toLowerCase().includes(filter) : false;
  
      // Devolver true si alguna de las condiciones es verdadera, de lo contrario false
      return filterDate || filterTecnico || filterIntervencion;
    };
  
    // Aplicar el filtro al dataSource
    this.dataSource.filter = filterValue;
  }
  
    

  // Mostrar dialog al presionar una fila
  openDetailDialog(intervencion: Intervencion): void {
    this.dialogService.openDialogIntervencion(intervencion);
  }

  // Método para agregar intervención
  create(): void {
    // Marcar todos los campos como tocados para mostrar mensajes de error
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

     // Asegura que sea un objeto plano
     const intervencionData: Intervencion = {
      ...this.form.getRawValue(),
    };

      this.intervencionService.create(intervencionData as Intervencion)
        .subscribe({
          next: () => {
            this.errors = [];
            this.loadHistorial(parseInt(this.parteId)); // Recargar el historial
            this.resetForm();
          },
          error: response => {
           this.errors = response.error.errors;
          }
        });
  
  }


  // Método para reiniciar el formulario
  resetForm(): void {
    this.currentUser = `${this.authService.currentUser?.name} ${this.authService.currentUser?.surname}`;

    this.form.reset({
      fecha: this.today,
      tecnico: this.currentUser,
      intervencion: '',
      descripcion: null
    });

    // Eliminar errores del control 'intervencion'
    const intervencionControl = this.form.get('intervencion');
    if (intervencionControl) {
      intervencionControl.setErrors(null); // Elimina errores
    }

  }

  // Navegación para volver al listado de partes
  goBack():void {
    if (this.usuarioId) {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN, this.usuarioId]);
    } else {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN]);
    }
  }
}
