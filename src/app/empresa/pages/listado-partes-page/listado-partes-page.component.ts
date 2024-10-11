import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { Parte } from '../../../shared/interfaces/parte.interface';
import { ParteService } from '../../../shared/service/parte.service';

@Component({
  selector: 'app-listado-partes-page',
  templateUrl: './listado-partes-page.component.html',
  styleUrls: ['./listado-partes-page.component.css']
})
export class ListadoPartesPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cliente', 'estado', 'fechaEstimada', 'acciones'];
  dataSource: MatTableDataSource<Parte> = new MatTableDataSource();
  clienteId?: number; // Variable para almacenar el clienteId

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private parteService: ParteService,
  ) {}

  ngOnInit(): void {
    // Obtener el clienteId de los parámetros de la ruta si está presente
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.clienteId = id ? +id : undefined;
      this.loadPartes(); // Cargar partes (filtrados o todos)
    });
  }

  loadPartes(): void {
    if (this.clienteId) {
      // Si clienteId está definido, cargar los partes de ese cliente
      this.parteService.getPartesByClienteId(this.clienteId)
        .subscribe(partes => {
          this.dataSource.data = partes;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    } else {
      // Si no hay clienteId, cargar todos los partes
      this.parteService.list()
        .subscribe(partes => {
          this.dataSource.data = partes;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
  }

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
        this.loadPartes();
      })
    }
  }

  goNewParte():void  {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_NEW_PARTE_ADMIN]);
  }
  
}
