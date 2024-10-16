import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { Rol } from '../../../shared/interfaces/usuario.interface';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})

export class LoginPageComponent {

    public formLogin: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern( this.validatorsService.emailPattern )]],
      password: ['', [Validators.required, Validators.pattern( this.validatorsService.passwordPattern ) ]],
    })

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private validatorsService: ValidatorsService,
    ){}


    // Comprueba si en el campo hay errores cuando toca
    isValidField( field: string ): boolean | null {
      return this.validatorsService.isValidField( this.formLogin, field );
    }

    // Muestra mensaje de error específico dependiendo del campo
    getFieldError( field: string ): string | null {
        return this.validatorsService.getFieldError( this.formLogin, field );
    }

    //Guardar datos formulario
    onSave():void {

      if ( this.formLogin.invalid ) {
        //marca todos los campos como si fuesen tocados
          this.formLogin.markAllAsTouched();
          return;
      }

      console.log(this.formLogin.value);

      //Una vez se guarda, reestablecer los campos
      this.formLogin.reset();
    }

    //Comprobar credenciales usuario
    onLogin(): void {

      const email:string = this.formLogin.controls['email'].value;
      const password:string = this.formLogin.controls['password'].value;

        this.authService.login(email, password)
            .subscribe({
                next: user => {
                  if(user.rol === Rol.USER){
                    // Redirigir a la ruta que contiene el ID del usuario
                    this.router.navigate([RoutesConstants.RUTA_USERS, 
                                          RoutesConstants.RUTA_LIST_PARTES_USERS, user.id]);
                    //this.router.navigate([RoutesConstants.RUTA_USERS])
                  }else{
                    this.router.navigate([RoutesConstants.RUTA_ADMIN])
                  }

                },
                error: err=>{
                    alert("Acceso denegado: "+err)
                }
            });
    }

}
