import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentacionTecnica, Estado, Parte } from '../interfaces/parte.interface';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ParteService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  list(){
    return this.http.get<Parte[]>('http://localhost:8080/api/partes');
  }

  get(id: number){
    return this.http.get<Parte>(`http://localhost:8080/api/partes/${id}`);
  }

  create(parte: any){
    return this.http.post<Parte>('http://localhost:8080/api/partes', parte);
  }

  update(id: number, parte: any){
    return this.http.put<Parte>(`http://localhost:8080/api/partes/${id}`, parte);
  }

  delete(id: number){
    return this.http.delete<void>(`http://localhost:8080/api/partes/${id}`);
  }

  // Método para obtener partes por ID de cliente
  getPartesByClienteId(clienteId: number): Observable<Parte[]> {
    return this.http.get<Parte[]>(`http://localhost:8080/api/partes/users/${clienteId}`);
  }

  
  private partes: Parte[] = [
    {
      clienteId: 1,
      id: 1,
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
      clienteId: 1,
      id: 2,
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
      clienteId: 1,
      id: 3,
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
      clienteId: 2,
      id: 4,
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
      clienteId: 2,
      id: 5,
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
      clienteId: 2,
      id: 6,
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
      clienteId: 3,
      id: 7,
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
      clienteId: 3,
      id: 8,
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
      clienteId: 3,
      id: 9,
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
      clienteId: 3,
      id: 10,
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

  //Simulación de un API que devuelve un Observable
  getPartes(): Observable<Parte[]> {
    // Retornar los datos como un Observable
    return of(this.partes);
  }

  //Método para obtener un parte por su ID
  getParteById(parteId: number): Observable<Parte | undefined> {
    const parte = this.partes.find(p => p.id === parteId);
    if (!parte) {
      throw new Error(`Parte con ID ${parteId} no encontrado`);
    }
    return of(parte);
  }

  //Método para actualizar un parte
  updateParte(parteId: number, updatedParte: Parte): Observable<Parte | undefined> {
    const index = this.partes.findIndex(p => p.id === parteId);
    if (index !== -1) {
      this.partes[index] = { ...this.partes[index], ...updatedParte };
      return of(this.partes[index]);
    }
    return of(undefined); // Retorna undefined si no se encontró el parte
  }
  



}
