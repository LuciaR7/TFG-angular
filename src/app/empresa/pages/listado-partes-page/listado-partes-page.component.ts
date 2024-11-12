import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { ParteService } from '../../../shared/service/parte.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { DialogService } from '../../../shared/service/dialog.service';

@Component({
  selector: 'app-listado-partes-page',
  templateUrl: './listado-partes-page.component.html',
  styleUrls: ['./listado-partes-page.component.css']
})
export class ListadoPartesPageComponent implements OnInit, AfterViewInit {
  
  //**Propiedades**//
  displayedColumns: string[] = ['id', 'usuario', 'dispositivo' , 'estado', 'fechaCreacion' ,'fechaEstimada', 'acciones'];
  dataSource: MatTableDataSource<Parte> = new MatTableDataSource();
  usuarioId?: number; // Variable para almacenar el usuarioId
  usuarios: Usuario [] = []; // Lista para almacenar los usuarios

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
      this.loadUsuarios(); // Cargar usuarios
    });
    
    // Establecer la columna de id como la columna de orden predeterminada
    this.dataSource.sortingDataAccessor = (parte: Parte, property: string) => {
      switch (property) {
        case 'id':
          return parte.id;
        case 'usuario':
          return this.getUsuarioNombre(parte.usuarioId);
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

    // Establecer el orden predeterminado
    this.sort.active = 'id';
    this.sort.direction = 'desc';

    // Marcar el componente para una verificación de cambios
    this.cdr.detectChanges();
  }

  loadUsuarios(): void {
    this.usuarioService.list().subscribe(usuarios => {
      this.usuarios = usuarios; // Almacenar la lista de usuarios
      this.loadPartes(); // Cargar partes (filtrados o todos)
    });
  }

  loadPartes(): void {
    if (this.usuarioId) {
      // Si usuarioId está definido, cargar los partes de ese usuario
      this.parteService.getPartesByUsuarioId(this.usuarioId)
        .subscribe(partes => {
          this.dataSource.data = partes;
        });
    } else {
      // Si no hay usuarioId, cargar todos los partes
      this.parteService.list()
        .subscribe(partes => {
          this.dataSource.data = partes;
        });
    }
  }

  //Obtener el nombre del usuario para mostrarlo en la tabla
  getUsuarioNombre(usuarioId: number): string {
    if (!this.usuarios || this.usuarios.length === 0) {
      return 'Cargando...'; // Mensaje temporal si los usuarios aún no están disponibles
    }
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? `${usuario.name} ${usuario.surname}` : 'Desconocido'; // Maneja el caso si no se encuentra el usuario
  }

  // Aplicar filtros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detalleParte(id: number): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_DETAIL_PARTE_ADMIN, id]);
  }

  verHistorial(id: number): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_HISTORIAL_PARTE_ADMIN, id]);
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
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_PARTE_ADMIN]);
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
              <tr><th>Cliente</th><td>${this.getUsuarioNombre(parte.usuarioId)}</td></tr>
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
