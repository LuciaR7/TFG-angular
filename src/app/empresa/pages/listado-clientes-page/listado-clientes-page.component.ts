import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-listado-clientes-page',
  templateUrl: './listado-clientes-page.component.html',
  styleUrls: ['./listado-clientes-page.component.css']
})
export class ListadoClientesPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router, 
    private authService: AuthService 
  ) {
    this.dataSource = new MatTableDataSource;
  }

  ngAfterViewInit() {
    // Obtener usuarios del servicio
    this.authService.getUsers().subscribe(users => {
      this.dataSource.data = users; // Asignar los datos obtenidos a la dataSource
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

  detalleCliente(id: string) {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_DETAIL_CLIENTE_ADMIN, id]);
  }

  verPartes(id: string) {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN, id]);
  }

  eliminarCliente(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.authService.deleteUser(id).subscribe(success => {
        if (success) {
          this.dataSource.data = this.dataSource.data.filter(cliente => cliente.id !== id);
        } else {
          console.error('Error al eliminar el cliente');
        }
      });
    }
  }

  goNewClient(): void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_CLIENT_ADMIN]);
  }

}
