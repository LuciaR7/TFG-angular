import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})

// Explicacion patron Password

// ^- inicio de cadena (implícito en el patrón de expresión regular de cadena)
// (?=\D*\d)- debe haber 1 dígito
// (?=[^a-z]*[a-z])- debe haber 1 letra ASCII minúscula
// (?=.*[.$@$!%*?&])- debe haber 1 símbolo de los que se incluyen.
// (?=[^A-Z]*[A-Z])- debe haber 1 letra ASCII mayúscula
// .{8,30}- cualquier número de 8 a 30 caracteres, excepto los caracteres de salto de línea
// $- fin de cadena (implícito en el patrón de expresión regular de cadena).

export class LoginPageComponent{

    passwordRegex = /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[.$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/;

    public myForm: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex) ] ],
    })

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ){}

    // Comprueba si en el campo hay errores cuando toca
    isNotValidField( field: string ): boolean | null {
      return this.myForm.controls[field].errors
          && this.myForm.controls[field].touched;
    }

    getFieldError( field: string ): string | null {

      // Si el form no tiene ese campo no regreso nada
      if ( !this.myForm.controls[field] ) return null;

      // Si el form si tiene el campo
      // || {} => Si errors es nulo regresa un objeto vacío
      const errors = this.myForm.controls[field].errors || {};

      for ( const key of Object.keys(errors) ) {
          switch( key ) {
              case 'required':
               return 'Este campo es obligatorio.';

              case 'email':
                return `Introduzca un email válido.`;

              case 'pattern':
                return `La contraseña debe contener al menos un símbolo,
                        un número, una letra mayúscula y una minúscula y
                        al menos 8 caracteres.`
          }

      }

      return null;

  }

    onSave():void {

      if ( this.myForm.invalid ) {
        //marca todos los campos como si fuesen tocados
          this.myForm.markAllAsTouched();
          return;
      }

      console.log(this.myForm.value);

      //Una vez se guarda, reestablecer los campos
      this.myForm.reset();
    }

    // TODO: REVISAR
    onLogin(): void {

      const email:string = this.myForm.controls['email'].value;
      const password:string = this.myForm.controls['password'].value;


        this.authService.login(email, password)
            .subscribe({
                next: user => {
                    this.router.navigate([RoutesConstants.RUTA_USERS])
                },
                error: err=>{
                    alert("Acceso denegado: "+err)
                }
            });
    }

}
