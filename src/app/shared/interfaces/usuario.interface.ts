export interface Usuario {
    id        : number;
    name      : string;
    surname   : string;
    email     : string;
    tlf       : string;
    password  : string;
    rol       : Rol;
  }
  
  
  export enum Rol{
    USER  = 'Usuario',
    ADMIN = 'Administrador',
  }
  