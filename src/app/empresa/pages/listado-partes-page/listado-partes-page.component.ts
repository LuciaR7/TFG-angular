import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { ParteService } from '../../../shared/service/parte.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { DialogService } from '../../../shared/service/dialog.service';
import { getTablasPaginatorIntl } from '../../../shared/global.functions';

@Component({
  selector: 'app-listado-partes-page',
  templateUrl: './listado-partes-page.component.html',
  styleUrls: ['./listado-partes-page.component.css'],
  providers: [
    //Necesario para internacionalizacion de texto paginator de mat-table
    { provide: MatPaginatorIntl, useValue: getTablasPaginatorIntl() }
  ]
})
export class ListadoPartesPageComponent implements OnInit, AfterViewInit {
  
  //**Propiedades**//
  displayedColumns: string[] = ['id', 'usuario', 'dispositivo' , 'estado', 'fechaCreacion','fechaEstimada', 'acciones'];
  displayedColumnsS: string[] = [ 'usuario', 'dispositivo', 'estado', 'fechaCreacion', 'acciones'];
  dataSource: MatTableDataSource<Parte> = new MatTableDataSource();
  usuarioId?: number; // Variable para almacenar el usuarioId
  usuarios: Usuario [] = []; // Lista para almacenar los usuarios
  isLoading = true;

  //**Decoradores**//
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //**Constructor**//
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private parteService: ParteService,
    private usuarioService: UsuarioService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  //**Métodos**//
  ngOnInit(): void {
    // Obtener el usuarioId de los parámetros de la ruta si está presente
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.usuarioId = id ? +id : undefined;
     
      // Ajusta las columnas a mostrar dependiendo del usuarioId
      this.adjustColumns();

      this.loadUsuarios(); // Cargar usuarios
    });
    
    // Establecer la columna de id como la columna de orden predeterminada
    this.dataSource.sortingDataAccessor = (parte: Parte, property: string) => {
      switch (property) {
        case 'id':
          return parte.id;
        case 'usuario':
          return this.getNombreUsuario(parte.usuarioId);
        case 'dispositivo':
          return parte.dispositivo; 
        case 'estado':
          return parte.estado;
        case 'fechaEstimada':
          return new Date(parte.fechaEstimada).getTime();
        case 'fechaCreacion':
          return new Date(parte.fechaCreacion).getTime();
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

  adjustColumns(): void {
    if (this.usuarioId) {
      // Usuario específico: ocultar columna "Cliente"
      this.displayedColumns = ['id', 'dispositivo', 'estado', 'fechaCreacion', 'fechaEstimada', 'acciones'];
      this.displayedColumnsS = ['dispositivo', 'estado', 'fechaCreacion', 'acciones'];
    } else {
      // Listado general: incluir columna "Cliente"
      this.displayedColumns = ['id', 'usuario', 'dispositivo', 'estado', 'fechaCreacion', 'fechaEstimada', 'acciones'];
      this.displayedColumnsS = ['usuario', 'dispositivo', 'estado', 'fechaCreacion', 'acciones'];
    }
  }

  loadUsuarios(): void {
    this.usuarioService.list().subscribe(usuarios => {
      this.usuarios = usuarios; // Almacenar la lista de usuarios
      this.loadPartes(); // Cargar partes (filtrados o todos)
    });
  }

  loadPartes(): void {
    this.isLoading = true; // Activa el spinner

    // Ajusta las columnas en función del usuarioId
    this.adjustColumns();

    if (this.usuarioId) {
      // Si usuarioId está definido, cargar los partes de ese usuario
      this.parteService.getPartesByUsuarioId(this.usuarioId).subscribe(
        partes => {
            this.dataSource.data = partes;
            
            // Asegurar que el paginator se asigna correctamente
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
            });

            this.isLoading = false; // Desactiva el spinner
  
            // Fuerza la detección de cambios
            this.cdr.detectChanges();

            // Aplica el orden por defecto en la tabla si el sort está disponible
            if (this.sort) {
              this.dataSource.sort = this.sort; // Conecta el `sort`
              this.sort.sort({ id: 'id', start: 'desc', disableClear: true }); // Aplica el orden descendente
            }
        },
        error => {
            this.isLoading = false; // Desactiva el spinner si ocurre un error
            if (error.status === 404) {
              // Mostrar mensaje al usuario: "Usuario no encontrado"
              alert('Usuario no encontrado. Por favor, verifica el ID.');
              // Redirigir al listado de clientes
              this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
            } else {
              // Otros errores
              alert('Error al cargar partes');
            }
        });

    }else {
      // Si no hay usuarioId, cargar todos los partes
      this.parteService.list().subscribe(
        partes => {
            this.dataSource.data = partes;
            // Asegurar que el paginator se asigna correctamente
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
            });
            this.isLoading = false; // Desactiva el spinner después de recibir la respuesta
            this.cdr.detectChanges();
            // Aplica el orden por defecto en la tabla si el sort está disponible
            if (this.sort) {
              this.dataSource.sort = this.sort; // Conecta el sort
              this.sort.sort({ id: 'id', start: 'desc', disableClear: true }); // Aplica el orden descendente
            }
      }, 
        error => {
          this.isLoading = false; // Desactiva el spinner si ocurre un error
      });
    } 
  }

  //Obtener datos del usuario
  getDatosUsuario(usuarioId: number): string {
    if (!this.usuarios || this.usuarios.length === 0) {
      return 'Cargando...'; // Mensaje temporal si los usuarios aún no están disponibles
    }
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? `${usuario.name} ${usuario.surname} (${usuario.email} Tlf: ${usuario.tlf})` : ''; // Maneja el caso si no se encuentra el usuario
  }

  //Obtener el nombre del usuario para mostrarlo en la tabla
  getNombreUsuario(usuarioId: number): string {
    if (!this.usuarios || this.usuarios.length === 0) {
      return 'Cargando...'; // Mensaje temporal si los usuarios aún no están disponibles
    }
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? `${usuario.name} ${usuario.surname}` : 'Desconocido'; // Maneja el caso si no se encuentra el usuario
  }

  // Aplicar filtros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Ajuste del filtro
    this.dataSource.filterPredicate = (data: Parte, filter: string) => {
      return (
        data.id.toString().includes(filter) || // Filtrar por ID
        (this.getNombreUsuario(data.usuarioId).toLowerCase().includes(filter)) || // Filtrar por usuario
        (data.dispositivo && data.dispositivo.toLowerCase().includes(filter)) || // Filtrar por dispositivo
        (data.estado && data.estado.toLowerCase().includes(filter)) || // Filtrar por estado
        (data.fechaCreacion && new Date(data.fechaCreacion).toLocaleDateString().includes(filter)) || // Filtrar por fechaCreacion
        (data.fechaEstimada && new Date(data.fechaEstimada).toLocaleDateString().includes(filter)) // Filtrar por fechaEstimada
      );
    };
  
    // Aplicar el filtro al dataSource
    this.dataSource.filter = filterValue;
  }

  // Mostrar dialog con detalles del parte al presionar una fila
  openDetailParteDialog(parte: Parte): void {
    this.dialogService.openDialogParte(parte);
  }
  

  editarParte(id: number): void {
    this.router.navigate(
      [RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_DETAIL_PARTE_ADMIN, id],
      { state: { origen: 'general' } }
    );
  }

  verHistorial(id: number, usuarioId: number): void {
    this.router.navigate(
      [RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_HISTORIAL_PARTE_ADMIN, id, usuarioId]);
  }

  deleteParte(parte: Parte): void {
    if (confirm('¿Estás seguro de que deseas eliminar este parte?')) {
    this.parteService.delete(parte.id)
      .subscribe(() => {
        this.dialogService.openDialog('Éxito', 'El parte se ha eliminado correctamente.');
        this.loadPartes();
      })
    }
  }

  goNewParte():void  {
    if (this.usuarioId) {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_PARTE_ADMIN, this.usuarioId]);
    } else {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_PARTE_ADMIN]);
    }

  }

  // Navegación para volver
  goBack():void {
    if (this.usuarioId) {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
    } else {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_HOME_ADMIN]);
    }
  }

  imprimirParte(parte: Parte): void {
  const ventanaImpresion = window.open('', '_blank');
    if (ventanaImpresion) {
      const fechaCreacionFormateada = new Date(parte.fechaCreacion).toLocaleDateString('es-ES');
      const fechaEstimadaFormateada = new Date(parte.fechaEstimada).toLocaleDateString('es-ES');

      ventanaImpresion.document.write(`
        <html>
          <head>
            <title>Imprimir Parte ${parte.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Parte de Intervención</h1>
            <table>
              <tr><th>ID Parte</th><td>${parte.id}</td></tr>
              <tr><th>ID Cliente</th><td>${parte.usuarioId}</td></tr>
              <tr><th>Cliente</th><td>${this.getNombreUsuario(parte.usuarioId)}</td></tr>
              <tr><th>Dispositivo</th><td>${parte.dispositivo}</td></tr>
              <tr><th>Otros Materiales</th><td>${parte.otrosMateriales}</td></tr>
              <tr><th>Estado</th><td>${parte.estado}</td></tr>
              <tr><th>Fecha de Creación</th><td>${fechaCreacionFormateada}</td></tr>
              <tr><th>Fecha Estimada</th><td>${fechaEstimadaFormateada}</td></tr>
              <tr><th>Motivo Cliente</th><td>${parte.motivoCliente}</td></tr>
              <tr><th>Informe Empresa</th><td>${parte.informeEmpresa}</td></tr>
              <tr><th>Documentación Técnica</th><td>${parte.documentacionTecnica}</td></tr>
            </table>
          </body>
        </html>
      `);
      
      ventanaImpresion.document.close();
      ventanaImpresion.focus(); // Ventana activa en la que el usuario puede interactuar
      setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
      }, 100); // Esperar un momento antes de cerrar la ventana
    }
  }

  
}
