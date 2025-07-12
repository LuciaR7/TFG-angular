import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsUserService } from '../../../shared/validators/validatorsUser.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {

  //**Propiedades**//
  public formRegister: FormGroup = this.fb.group({
    name: ['', [ Validators.required,  Validators.pattern( this.validatorsUserService.namePattern ) ]],
    surname: ['', [ Validators.required,  Validators.pattern( this.validatorsUserService.surnamePattern ) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsUserService.emailPattern) ], [  this.emailValidator ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsUserService.emailPattern) ], [  new EmailValidator() ]],
    tlf: ['', [ Validators.required,  Validators.pattern( this.validatorsUserService.tlfPattern ) ]],
    password1: ['', [ Validators.required, Validators.pattern(this.validatorsUserService.passwordPattern) ]],
    password2: ['', [ Validators.required, ]],

  }, {
    validators: [
      this.validatorsUserService.isFieldOneEqualFieldTwo('password1', 'password2'),
    ]

  });

  //**Constructor**//
  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private validatorsUserService: ValidatorsUserService,
   ) {}

  //**Métodos**//  
  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsUserService.isValidField( this.formRegister, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsUserService.getFieldError( this.formRegister, field );
  }

  //Guardar datos formulario
  onSave() {

    if ( this.formRegister.invalid ) {
      //marca todos los campos como si fuesen tocados
        this.formRegister.markAllAsTouched();
        return;
    }

    console.log(this.formRegister.value);

    //Una vez se guarda, reestablecer los campos
    this.formRegister.reset();
  }

  //Comprobar credenciales usuario
  onRegister(): void {

    const name:string = this.formRegister.controls['name'].value;
    const email:string = this.formRegister.controls['email'].value;
    const password1:string = this.formRegister.controls['password1'].value;
    const password2:string = this.formRegister.controls['password2'].value;

      this.authService.register(name, email, password1, password2)
          .subscribe({
              next: user => {
                  this.router.navigate([RoutesConstants.RUTA_CLIENT])
              },
              error: err=>{
                  alert("Acceso denegado: "+err)
              }
          });
  }

}




