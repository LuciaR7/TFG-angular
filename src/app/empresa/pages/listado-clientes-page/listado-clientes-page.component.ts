import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-listado-clientes-page',
  templateUrl: './listado-clientes-page.component.html',
  styleUrls: ['./listado-clientes-page.component.css']
})
export class ListadoClientesPageComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router, 
  ) {}
  
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll():void {
    this.usuarioService.list()
    .subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detalleCliente(id: number): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_DETAIL_CLIENTE_ADMIN, id]);
  }

  verPartes(id: number): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN, id]);
  }

  deleteUser(user: Usuario): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
    this.usuarioService.delete(user.id)
      .subscribe(() => {
        this.loadAll();
      })
    }
  }


  goNewClient(): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_CLIENT_ADMIN]);
  }

}
