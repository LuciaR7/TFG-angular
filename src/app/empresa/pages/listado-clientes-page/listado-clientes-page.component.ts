import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { DialogService } from '../../../shared/service/dialog.service';
import { getTablasPaginatorIntl } from '../../../shared/global.functions';

@Component({
  selector: 'app-listado-clientes-page',
  templateUrl: './listado-clientes-page.component.html',
  styleUrls: ['./listado-clientes-page.component.css'],
  providers: [
    //Necesario para internacionalizacion de texto paginator de mat-table
    { provide: MatPaginatorIntl, useValue: getTablasPaginatorIntl() }
  ]
})
export class ListadoClientesPageComponent implements OnInit, AfterViewInit{
  
  //**Propiedades**//
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'email', 'acciones'];
  displayedColumnsS: string[] = ['nombre', 'email', 'acciones'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  isLoading = true;

  //**Decoradores**//
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //**Constructor**//
  constructor(
    private usuarioService: UsuarioService,
    private router: Router, 
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}
  
  //**Métodos**//
  ngOnInit(): void {
    this.loadAll();

     // Establecer la columna de id como la columna de orden predeterminada
     this.dataSource.sortingDataAccessor = (user: Usuario, property: string) => {
      switch (property) {
        case 'id':
          return user.id;
        case 'nombre':
          return user.name;
        case 'apellidos':
          return user.surname; 
        case 'email':
          return user.email;
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

  loadAll():void {
    this.isLoading = true; // Activa el spinner
    this.usuarioService.list().subscribe(
      users => {
          this.dataSource.data = users;
          
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
        console.error('Error al cargar los usuarios:', error);
        this.isLoading = false; // Desactiva el spinner incluso si hay un error
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Mostrar dialog con detalles del usuario al presionar una fila
  openDetailUsuarioDialog(usuario: Usuario): void {
    this.dialogService.openDialogUsuario(usuario);
  }

  editarUsuario(id: number): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_DETAIL_CLIENTE_ADMIN, id]);
  }

  verPartes(id: number): void {
    this.router.navigate(
      [RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN, id],
      { state: { origen: 'usuario' } }
    );
  }

  deleteUser(user: Usuario): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    this.usuarioService.delete(user.id)
      .subscribe(() => {
        this.dialogService.openDialog('Éxito', 'El usuario se ha eliminado correctamente.');
        this.loadAll();
      })
    }
  }


  goNewUser(): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_CLIENT_ADMIN]);
  }

}
