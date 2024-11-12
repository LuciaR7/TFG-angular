import { Component } from '@angular/core';
import { Validators, EmailValidator, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { ValidatorsUserService } from '../../../shared/validators/validatorsUser.service';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { DialogService } from '../../../shared/service/dialog.service';

@Component({
  selector: 'app-new-cliente-page',
  templateUrl: './new-cliente-page.component.html',
  styleUrl: './new-cliente-page.component.css',
})
export class NewClientePageComponent {

  //**Propiedades**//
  form = this.fb.group({
     name: ['', [ Validators.required ]],
     surname: ['', [ Validators.required,  Validators.pattern( this.validatorsUserService.surnamePattern ) ]],
     // email: ['', [ Validators.required, Validators.pattern(this.validatorsUserService.emailPattern) ], [  this.emailValidator ]],
     email: ['', [ Validators.required, Validators.pattern(this.validatorsUserService.emailPattern) ]],
     tlf: ['', [ Validators.required,  Validators.pattern( this.validatorsUserService.tlfPattern ) ]],
     password: ['', [ Validators.required ]],
     //password: ['', [Validators.required, Validators.pattern( this.validatorsUserService.passwordPattern ) ]],
     password2: ['', [ Validators.required ]],
   }, {
      validators: [
        this.validatorsUserService.isFieldOneEqualFieldTwo('password', 'password2'),
      ]

    });
  
    errors: string[] = [];
    showPassword: boolean = false;
   
  //**Constructor**//  
  constructor (
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private validatorsUserService: ValidatorsUserService,
    private dialogService: DialogService
   ) {}

  //**Métodos**//
  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsUserService.isValidField( this.form, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsUserService.getFieldError( this.form, field );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Método para agregar un usuario
  create() {
      if(this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: Usuario = this.form.value as Usuario;
      
    this.usuarioService.create(user as Usuario)
    .subscribe({
      next: () => {
        this.errors = [];
        this.dialogService.openDialog('Éxito', 'El cliente se ha creado correctamente.');
        this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN])
      },
      error: response => {
       this.errors = response.error.errors;
      }
    });
  }

  // Navegación para volver al listado de clientes
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
  }

}
