import { Component } from '@angular/core';
import { FormGroup, Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  selector: 'app-new-cliente-page',
  templateUrl: './new-cliente-page.component.html',
  styleUrl: './new-cliente-page.component.css',
})
export class NewClientePageComponent {
  public formRegister: FormGroup = this.fb.group({
    name: ['', [ Validators.required,  Validators.pattern( this.validatorsService.namePattern ) ]],
    surname: ['', [ Validators.required,  Validators.pattern( this.validatorsService.surnamePattern ) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [  this.emailValidator ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [  new EmailValidator() ]],
    tlf: ['', [ Validators.required,  Validators.pattern( this.validatorsService.tlfPattern ) ]],
    password1: ['', [ Validators.required, Validators.pattern(this.validatorsService.passwordPattern) ]],
    password2: ['', [ Validators.required, ]],

  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password1', 'password2'),
    ]

  });

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private validatorsService: ValidatorsService,
   ) {}

  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.formRegister, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsService.getFieldError( this.formRegister, field );
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
                  this.router.navigate([RoutesConstants.RUTA_USERS])
              },
              error: err=>{
                  alert("Acceso denegado: "+err)
              }
          });
  }

  //Botón volver pantalla principal
  volverHome():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_HOME_ADMIN])
  }

}
