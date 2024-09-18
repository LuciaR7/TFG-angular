import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-listado-clientes-page',
  templateUrl: './listado-clientes-page.component.html',
  styleUrl: './listado-clientes-page.component.css'
})
export class ListadoClientesPageComponent implements OnInit {
  clientes: Cliente[] = []; // Array para almacenar todos los clientes.
  clientesFiltrados: Cliente[] = []; // Array para almacenar los clientes que cumplen con el filtro aplicado.
  filtroNombre = ''; //Variable para almacenar el nombre a buscar.
  orden = 'asc'; //Variable para almacenar el criterio de ordenamiento (ascendente o descendente).

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.clientes = this.empresaService.getClientes();
    this.filtrarClientes();
  }


  //Filtrar Clientes
  filtrarClientes() {
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
    this.ordenarClientes();
  }

  //Ordenar Clientes
  //Un valor negativo si el primer elemento debe estar antes que el segundo.
  //Un valor positivo si el primer elemento debe estar después que el segundo.
  ordenarClientes() {
    this.clientesFiltrados.sort((a, b) => {
      const nombreA = a.nombre.toLowerCase();
      const nombreB = b.nombre.toLowerCase();
      if (this.orden === 'asc') {
        return nombreA < nombreB ? -1 : 1;
      } else {
        return nombreA > nombreB ? -1 : 1;
      }
    });
  }

  //Navegar o mostrar partes del cliente seleccionado
  verPartes(cliente: any) {
   
  }

  //Abrir un dialog con los detalles del cliente
  detalleCliente(cliente: any) {
    
  }

  //Eliminar cliente
  eliminarCliente(cliente: any) {
    this.clientes = this.clientes.filter(c => c !== cliente);
    this.filtrarClientes();
  }

  //Crear cliente
  crearCliente() {
   
  }
}
