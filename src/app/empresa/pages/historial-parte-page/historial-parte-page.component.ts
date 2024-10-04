import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Intervencion } from '../../interfaces/historial.interface';
import { EmpresaService } from '../../services/empresa.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-historial-parte-page',
  templateUrl: './historial-parte-page.component.html',
  styleUrl: './historial-parte-page.component.css'
})
export class HistorialPartePageComponent implements AfterViewInit, OnInit {
  intervencionForm: FormGroup;
  parteId!: string; // ID del parte a cargar
  dataSource: MatTableDataSource<Intervencion>;
  displayedColumns: string[] = ['id', 'fecha', 'tecnico', 'intervencion', 'select'];
  today: Date = new Date(); // Obtener la fecha actual
  isRowSelected: boolean = false; // Variable para controlar si una fila está seleccionada

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private empresaService: EmpresaService,
  ) {
   
    // Obtener el usuario de la sesión actual
    const currentUser = this.authService.currentUser?.name || 'Técnico desconocido';

    // Inicializar el formulario con el nombre del técnico predeterminado
    this.intervencionForm = this.fb.group({
      fecha: [this.today, Validators.required],
      tecnico: [ currentUser, Validators.required],
      intervencion: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    // Obtener el ID del parte desde la ruta
    this.parteId = this.route.snapshot.paramMap.get('id')!; // Asegúrate de que el ID no sea null

    // Cargar las intervenciones asociadas al parte usando el ID
    if (this.parteId) {
      this.empresaService.getHistorialByParteId(this.parteId).subscribe(historial => {
        this.dataSource.data = historial; // Cargar las intervenciones en el dataSource
      });
    } else {
      console.error('No se encontró el ID del parte');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Aplicar filtros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Copia de la fila seleccionada para autocompletar el formulario
  selectRow(row: Intervencion): void {
     // Establecer la variable a true cuando se seleccione una fila
      this.isRowSelected = true;

      this.intervencionForm.patchValue({
        id: row.id,
        fecha: row.fecha,
        tecnico: row.tecnico,
        intervencion: row.intervencion,
        descripcion: row.descripcion
      });
  }

  // Función para generar el siguiente ID
  private generateNextId(historial: Intervencion[]): string { 
    if (historial.length === 0) {
      return 'H001'; // ID inicial si no hay registros
    }
  
    const lastId = historial[historial.length - 1].id;
    const nextIdNumber = parseInt(lastId.slice(1)) + 1; // Eliminar 'H' y sumar 1
    return `H${nextIdNumber.toString().padStart(3, '0')}`; // Formatear con ceros
  }


  // Función para agregar intervención
  onSubmit() {
    // Marcar todos los campos como tocados para mostrar mensajes de error
    this.intervencionForm.markAllAsTouched();
  
    // Verificar si el formulario es válido
    if (this.intervencionForm.valid) {
      // Obtener todos los valores del formulario, incluso los deshabilitados
      const formValue = this.intervencionForm.getRawValue();
  
      // Usar switchMap para encadenar las llamadas a los servicios
      this.empresaService.getHistorialByParteId(this.parteId).pipe(
        switchMap((historial) => {
          // Generar un nuevo ID usando los datos del historial
          const newId = this.generateNextId(historial);
          const nuevaIntervencion: Intervencion = { ...formValue, id: newId };
  
          // Llamar al servicio para agregar la nueva intervención
          return this.empresaService.addIntervencion(nuevaIntervencion);
        })
      ).subscribe({
        next: (response) => {
          // Solo actualizar el dataSource si la intervención fue añadida exitosamente
          if (response) {
            console.log('Nueva intervención añadida:', response);
  
            // Actualizar el dataSource con la nueva intervención
             this.dataSource.data = [...this.dataSource.data, response];
  
            // Reiniciar el formulario
            this.onReset();
          }
        },
        error: (err) => {
          console.error('Error al añadir la intervención o cargar el historial', err);
        }
      });
    } else {
      console.log('Formulario inválido, no se puede añadir una nueva fila');
    }
  }

  // Método para reiniciar el formulario
  onReset() {
    const currentUser = this.authService.currentUser?.email || 'Técnico desconocido';

    this.intervencionForm.reset({
      fecha: this.today,
      tecnico: currentUser,
      intervencion: '',
      descripcion: ''
    });

    // Permitir la edición al crear una nueva entrada
    this.isRowSelected = false;

  }

  // Navegación para volver al listado de partes
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_PARTES_ADMIN]);
  }
}
