import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsUserService } from '../../../shared/validators/validatorsUser.service';
import { LoginRequest } from '../../interfaces/loginRequest';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})

export class LoginPageComponent {

  //**Propiedades**//
  loginError: string = "";

  public formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern( this.validatorsUserService.emailPattern )]],
    password: ['', [Validators.required, Validators.pattern( this.validatorsUserService.passwordPattern ) ]],
  })

  //**Constructor**//
  constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      private router: Router,
      private validatorsUserService: ValidatorsUserService,
  ){}

  //**Métodos**//
  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ): boolean | null {
    return this.validatorsUserService.isValidField( this.formLogin, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
      return this.validatorsUserService.getFieldError( this.formLogin, field );
  }

  //Guardar datos formulario
  onSave():void {

    if ( this.formLogin.invalid ) {
      //marca todos los campos como si fuesen tocados
        this.formLogin.markAllAsTouched();
        return;
    }

    //Una vez se guarda, reestablecer los campos
    this.formLogin.reset();

    // Eliminar errores del control 'email'
    // const emailControl = this.formLogin.get('email');
    // if (emailControl) {
    //   emailControl.setErrors(null); // Elimina errores
    // }

    // Eliminar errores del control 'password'
    // const passwordControl = this.formLogin.get('password');
    // if (passwordControl) {
    //   passwordControl.setErrors(null); // Elimina errores
    // }
  }

  

  //Comprobar credenciales usuario
  onLogin(): void {

    if(this.formLogin.valid){
      this.loginError="";
      this.authService.login(this.formLogin.value as LoginRequest).subscribe({
        next: (userData) => {
          // Guardamos el token en sessionStorage
          sessionStorage.setItem('token', userData.token);
          sessionStorage.setItem('userRole', userData.rol);
          sessionStorage.setItem('userId', userData.id.toString());

          // Verificación del rol para redirigir
          const userRole = userData.rol;
          const userId = userData.id;

          if (userRole === 'USER' && userId) {
            // Redirigir a la ruta de "user list parts" usando el userId
            this.router.navigate([RoutesConstants.RUTA_USERS, RoutesConstants.RUTA_LIST_PARTES_USERS, userId]);
          } else if (userRole === 'ADMIN') {
            // Redirigir a la ruta de administrador
            this.router.navigate([RoutesConstants.RUTA_ADMIN]);
          }
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData.message || 'Credenciales incorrectas';
        }
      });

    }
    else{
      this.formLogin.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }

    
  }

}
