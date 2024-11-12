import { Usuario } from './usuario.interface';
export interface Parte {
    id                   : number;
    usuarioId            : number;
    usuario              : Usuario;
    fechaCreacion        : Date;
    dispositivo          : string;
    otrosMateriales?     : string;
    estado               : Estado;
    fechaEstimada        : Date;
    motivoCliente        : string;
    informeEmpresa?      : string;
    documentacionTecnica : DocumentacionTecnica;

}

export enum Estado {
    PE = 'Pendiente',
    EP = 'En Pausa',
    EC = 'En Curso',
    AN = 'Anulado',
    OK = 'Finalizado',
}

export enum DocumentacionTecnica {
    SI = 'Si',
    NO = 'No',
}