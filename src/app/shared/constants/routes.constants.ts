
export class RoutesConstants{

    //RUTAS PRIMER NIVEL
    static readonly RUTA_AUTENTICACION:string = 'auth';
    static readonly RUTA_USERS:string = 'user';
    static readonly RUTA_ADMIN:string = 'admin';
    static readonly RUTA_ERROR:string = '404';


    //RUTAS SEGUNDO NIVEL
    static readonly RUTA_LOGIN:string = 'login';
    static readonly RUTA_NEW_ACCOUNT:string = 'new-account';

      // RUTAS CLIENTE
      static readonly RUTA_LIST_PARTES_USERS:string = 'list';

      // RUTAS EMPRESA 
      static readonly RUTA_HOME_ADMIN:string = 'home';
      static readonly RUTA_LIST_PARTES_ADMIN:string = 'listPartes';
      static readonly RUTA_LIST_CLIENTS_ADMIN:string = 'listClients';
      static readonly RUTA_NEW_PARTE_ADMIN:string = 'newParte';
      static readonly RUTA_NEW_CLIENT_ADMIN:string = 'newClient';
      static readonly RUTA_DETAIL_PARTE_ADMIN:string = 'detailParte';
      static readonly RUTA_DETAIL_CLIENTE_ADMIN:string = 'detailClient';
      static readonly RUTA_HISTORIAL_PARTE_ADMIN:string = 'historial';


}
