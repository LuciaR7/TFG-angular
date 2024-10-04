import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { ParteService } from '../../../shared/service/parte.service';

@Component({
  selector: 'app-listado-partes-page',
  templateUrl: './listado-partes-page.component.html',
  styleUrls: ['./listado-partes-page.component.css']
})
export class ListadoPartesPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'cliente', 'estado', 'fechaEstimada', 'acciones'];
  dataSource: MatTableDataSource<Parte>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private parteService: ParteService,
  ) {
    this.dataSource = new MatTableDataSource;
  }

  ngAfterViewInit() {
    // Obtener partes del servicio
    this.parteService.getPartes().subscribe(partes => {
      this.dataSource.data = partes; // Asignar los datos obtenidos a la dataSource
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

  detalleParte(id: string) {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_DETAIL_PARTE_ADMIN, id]);
  }

  verHistorial(id: string) {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_HISTORIAL_PARTE_ADMIN, id]);
  }

  eliminarParte(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este parte?')) {
      this.parteService.deleteParte(id).subscribe(success => {
        if (success) {
          this.dataSource.data = this.dataSource.data.filter(parte => parte.id !== id);
        } else {
          console.error('Error al eliminar el parte');
        }
      });
    }
  }

  goNewParte():void  {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_PARTE_ADMIN]);
  }
  
}
