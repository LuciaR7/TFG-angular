import { Component } from '@angular/core';
import { Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { UsuarioService } from '../../../shared/service/usuario.service';

@Component({
  selector: 'app-new-cliente-page',
  templateUrl: './new-cliente-page.component.html',
  styleUrl: './new-cliente-page.component.css',
})
export class NewClientePageComponent {

  constructor (
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private validatorsService: ValidatorsService,
   ) {}

   form = this.fb.group({
      name: ['', [ Validators.required,  Validators.pattern( this.validatorsService.namePattern ) ]],
      surname: ['', [ Validators.required,  Validators.pattern( this.validatorsService.surnamePattern ) ]],
      // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [  this.emailValidator ]],
      email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ]],
      tlf: ['', [ Validators.required,  Validators.pattern( this.validatorsService.tlfPattern ) ]],
      // password: ['', [ Validators.required, Validators.pattern(this.validatorsService.passwordPattern) ]],
      password: ['', [ Validators.required, ]],
      password2: ['', [ Validators.required, ]],
    }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]

  });

  create() {
    if(this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.form.value;
    this.usuarioService.create(user)
    .subscribe(() => {
      this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN])
    });
  }

  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.form, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsService.getFieldError( this.form, field );
  }

  // Navegación para volver al listado de clientes
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
  }

}
