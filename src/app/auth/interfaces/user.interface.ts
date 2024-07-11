export enum Rol{
  USER   = 'Usuario',
  ADMIN = 'Administrador',
}


export interface User {
  id   :  number;
  user :  string;
  email:  string;
  rol  :  Rol;
}
