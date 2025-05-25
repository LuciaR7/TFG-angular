import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { AbstractControl, EmailValidator, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidatorsUserService } from '../../../shared/validators/validatorsUser.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { DialogService } from '../../../shared/service/dialog.service';

@Component({
  selector: 'app-editar-cliente-page',
  templateUrl: './editar-cliente-page.component.html',
  styleUrl: './editar-cliente-page.component.css'
})
export class EditarClientePageComponent implements OnInit {

  //**Propiedades**//
  form?: FormGroup;
  user?: Usuario;
  initialUserValues?: Partial<Usuario>;
  errors: string[] = [];
  showPassword: boolean = false;

  //**Constructor**//
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private dialogService: DialogService,
    private validatorsUserService: ValidatorsUserService,
  ) {}

  //**Métodos**//  
  ngOnInit(): void {
    // Obtén el ID del usuario desde la ruta
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.usuarioService.get(parseInt(id))
        .subscribe(user => {
          this.user = user;
          this.initialUserValues = { ...user }; // Almacena los valores iniciales
         
          this.form = this.fb.group({
            name: [user.name, [ Validators.required,  Validators.pattern( this.validatorsUserService.namePattern ) ]],
            surname: [user.surname, [ Validators.required,  Validators.pattern( this.validatorsUserService.surnamePattern ) ]],
            email: [user.email, [ Validators.required, Validators.pattern(this.validatorsUserService.emailPattern) ]],
            tlf: [user.tlf, [ Validators.required,  Validators.pattern( this.validatorsUserService.tlfPattern ) ]],
            password: ['', [this.passwordRequiredValidator()]], // Password con validación condicional
            password2: ['', [this.passwordRequiredValidator()]],
          },{
            validators: [
              this.validatorsUserService.isFieldOneEqualFieldTwo('password', 'password2'),
            ]
        
          });
        })
    } else {
      console.log("no existe el usuario");
    }
  }

  // Método condicional para la validación del campo password
  passwordRequiredValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
     // Recuperamos el patrón de contraseña desde el servicio
    const passwordPattern = this.validatorsUserService.passwordPattern;

      // Si el control tiene un valor distinto de "" (es decir, si el usuario cambia la contraseña)
      if (control.value && control.value.trim() !== '') {
        // Primero validamos que el campo no esté vacío (required)
      if (!control.value.trim()) {
        return { required: true }; // Campo obligatorio
      }

      // Validamos el patrón de la contraseña
      if (!passwordPattern.test(control.value)) {
        return { pattern: true }; // Contraseña no cumple con el patrón
      }

      return null; // Si pasa ambas validaciones, es válido
    }

    // Si el campo está vacío (es decir, no tocó la contraseña), no hay error de validación
    return null;
  };
  }

  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsUserService.isValidField( this.form!, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsUserService.getFieldError( this.form!, field );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  save() {
    // Marcar todos los campos como tocados para mostrar mensajes de error
    if(this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const userForm = this.form!.value;

    // Si la contraseña no fue modificada, mantener la contraseña original
    if (!userForm.password) {
      userForm.password = this.user!.password;  // Mantener la contraseña original
    }

    this.usuarioService.update(this.user!.id, userForm)
      .subscribe({
        next: () => {
          this.errors = [];
          this.dialogService.openDialog('Éxito', 'El usuario se ha actualizado correctamente.');
          this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN])
        },
        error: response => {
          this.errors = response.error.errors;
        }
      });
  }

  // Método para restablecer los valores del formulario a los originales
  resetForm() {
    if (confirm('¿Estás seguro de que deseas reestablecer los cambios?')) {
      if (this.initialUserValues) {
        // Crear un objeto con los valores iniciales, pero excluyendo password y password2
        const { password, ...resetValues } = { ...this.initialUserValues };
  
        // Restablecer el formulario con los valores ajustados (sin password y password2)
        this.form?.reset(resetValues);
      }
    }

  }

  // Navegación para volver al listado de usuarios
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
  }
  
  
}
