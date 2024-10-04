import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentacionTecnica, Estado, Parte } from '../interfaces/parte.interface';
import { User } from '../../auth/interfaces/user.interface';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class ParteService {
  
  private partes: Parte[] = [
    {
      clienteId: 'C1',
      id: 'P001',
      fechaCreacion: new Date('2024-09-01'),
      dispositivo: 'Ordenador de escritorio',
      otrosMateriales: 'Teclado y ratón',
      estado: Estado.PE,
      fechaEstimada: new Date('2024-09-10'),
      motivoCliente: 'Problemas de encendido',
      informeEmpresa: 'Se realizó una revisión completa del hardware. Se cambió la fuente de alimentación y se limpiaron los componentes internos. El equipo ahora arranca sin problemas.',
      documentacionTecnica: DocumentacionTecnica.SI,
    },
    {
      clienteId: 'C1',
      id: 'P002',
      fechaCreacion: new Date('2024-09-02'),
      dispositivo: 'Portátil HP',
      otrosMateriales: 'Cargador',
      estado: Estado.EP,
      fechaEstimada: new Date('2024-09-12'),
      motivoCliente: 'Pantalla parpadeante',
      informeEmpresa: 'Se diagnosticó un fallo en el cable flex de la pantalla. Se reemplazó el cable y se verificó el correcto funcionamiento del equipo.',
      documentacionTecnica: DocumentacionTecnica.NO,
    },
    {
      clienteId: 'C1',
      id: 'P003',
      fechaCreacion: new Date('2024-09-03'),
      dispositivo: 'Tablet Samsung Galaxy',
      otrosMateriales: 'Funda protectora',
      estado: Estado.EC,
      fechaEstimada: new Date('2024-09-15'),
      motivoCliente: 'Batería no carga',
      informeEmpresa: 'Se reemplazó la batería y se revisó el puerto de carga. La tablet ahora carga correctamente y la batería tiene el rendimiento esperado.',
      documentacionTecnica: DocumentacionTecnica.SI,
    },
    {
      clienteId: 'C2',
      id: 'P004',
      fechaCreacion: new Date('2024-09-04'),
      dispositivo: 'Portátil Dell',
      otrosMateriales: 'Cargador y ratón',
      estado: Estado.PE,
      fechaEstimada: new Date('2024-09-18'),
      motivoCliente: 'Lentitud general',
      informeEmpresa: 'Se realizó una limpieza de software y se aumentó la memoria RAM. El equipo ahora tiene un rendimiento significativamente mejor.',
      documentacionTecnica: DocumentacionTecnica.NO,
    },
    {
      clienteId: 'C2',
      id: 'P005',
      fechaCreacion: new Date('2024-09-05'),
      dispositivo: 'Ordenador de escritorio',
      otrosMateriales: 'Teclado mecánico',
      estado: Estado.EP,
      fechaEstimada: new Date('2024-09-20'),
      motivoCliente: 'Problemas con el sistema operativo',
      informeEmpresa: 'Se reinstaló el sistema operativo y se configuraron las aplicaciones necesarias. El equipo ahora funciona sin problemas de software.',
      documentacionTecnica: DocumentacionTecnica.SI,
    },
    {
      clienteId: 'C2',
      id: 'P006',
      fechaCreacion: new Date('2024-09-06'),
      dispositivo: 'Tablet iPad',
      otrosMateriales: 'Apple Pencil',
      estado: Estado.EC,
      fechaEstimada: new Date('2024-09-22'),
      motivoCliente: 'Pantalla rota',
      informeEmpresa: 'Se reemplazó la pantalla y se verificó que no hubiera daños adicionales. La funcionalidad táctil y visual quedó completamente restaurada.',
      documentacionTecnica: DocumentacionTecnica.NO,
    },
    {
      clienteId: 'C3',
      id: 'P007',
      fechaCreacion: new Date('2024-09-07'),
      dispositivo: 'Portátil Lenovo',
      otrosMateriales: 'Cargador y funda',
      estado: Estado.PE,
      fechaEstimada: new Date('2024-09-25'),
      motivoCliente: 'Teclado no responde',
      informeEmpresa: 'Se identificó un daño en el teclado debido a líquidos derramados. Se reemplazó el teclado completo, y se verificó el correcto funcionamiento del equipo.',
      documentacionTecnica: DocumentacionTecnica.SI,
    },
    {
      clienteId: 'C3',
      id: 'P008',
      fechaCreacion: new Date('2024-09-08'),
      dispositivo: 'Ordenador de escritorio',
      otrosMateriales: 'Monitor y teclado',
      estado: Estado.EC,
      fechaEstimada: new Date('2024-09-28'),
      motivoCliente: 'Fallo en la tarjeta gráfica',
      informeEmpresa: 'Se reemplazó la tarjeta gráfica y se actualizó el software de drivers. Ahora el equipo puede manejar aplicaciones gráficas de alto rendimiento sin problemas.',
      documentacionTecnica: DocumentacionTecnica.NO,
    },
    {
      clienteId: 'C3',
      id: 'P009',
      fechaCreacion: new Date('2024-09-09'),
      dispositivo: 'Tablet Huawei',
      otrosMateriales: 'Cargador',
      estado: Estado.EP,
      fechaEstimada: new Date('2024-10-02'),
      motivoCliente: 'Problemas de conectividad Wi-Fi',
      informeEmpresa: 'Se realizó un análisis de la conectividad, y se reemplazó el módulo Wi-Fi. El dispositivo ahora se conecta de forma estable a las redes inalámbricas.',
      documentacionTecnica: DocumentacionTecnica.SI,
    },
    {
      clienteId: 'C3',
      id: 'P010',
      fechaCreacion: new Date('2024-09-10'),
      dispositivo: 'Portátil ASUS',
      otrosMateriales: 'Ratón inalámbrico',
      estado: Estado.EC,
      fechaEstimada: new Date('2024-10-05'),
      motivoCliente: 'Sobrecalentamiento',
      informeEmpresa: 'Se limpió el sistema de refrigeración y se aplicó pasta térmica nueva en el procesador. El portátil ahora mantiene temperaturas estables durante el uso prolongado.',
      documentacionTecnica: DocumentacionTecnica.NO,
    }
  ];

  constructor(private authService: AuthService) {} // Inyectar AuthService

  //Simulación de un API que devuelve un Observable
  getPartes(): Observable<Parte[]> {
    // Retornar los datos como un Observable
    return of(this.partes);
  }

  //Método para obtener un parte por su ID
  getParteById(parteId: string): Observable<Parte | undefined> {
    const parte = this.partes.find(p => p.id === parteId);
    if (!parte) {
      throw new Error(`Parte con ID ${parteId} no encontrado`);
    }
    return of(parte);
  }

  //Método para crear un parte
  addParte(nuevoParte: Parte): Observable<Parte> {
    this.partes.push(nuevoParte);
    return of(nuevoParte); // Retorna el nuevo parte agregado
  }

  //Método para actualizar un parte
  updateParte(parteId: string, updatedParte: Parte): Observable<Parte | undefined> {
    const index = this.partes.findIndex(p => p.id === parteId);
    if (index !== -1) {
      this.partes[index] = { ...this.partes[index], ...updatedParte };
      return of(this.partes[index]);
    }
    return of(undefined); // Retorna undefined si no se encontró el parte
  }
  
  //Método para eliminar un parte
  deleteParte(parteId: string): Observable<boolean> {
    const index = this.partes.findIndex(p => p.id === parteId);
    if (index !== -1) {
      this.partes.splice(index, 1);
      return of(true); // Indica que se eliminó exitosamente
    }
    return of(false); // Indica que no se encontró el parte
  }

  // Método para obtener partes por clienteId
  getPartesByClienteId(clienteId: string): Observable<Parte[]> {
    const partesCliente = this.partes.filter(parte => parte.clienteId === clienteId);
    return of(partesCliente); // Retorna los partes filtrados como un Observable
  }


}
