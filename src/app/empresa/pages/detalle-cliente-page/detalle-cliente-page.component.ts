import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsUserService } from '../../../shared/validators/validatorsUser.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';
import { DialogService } from '../../../shared/service/dialog.service';

@Component({
  selector: 'app-detalle-cliente-page',
  templateUrl: './detalle-cliente-page.component.html',
  styleUrl: './detalle-cliente-page.component.css'
})
export class DetalleClientePageComponent implements OnInit {

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
          console.log('Usuario recibido:', user);  // Verifica la respuesta aquí
          this.initialUserValues = { ...user }; // Almacena los valores iniciales
         
          this.form = this.fb.group({
            name: [user.name, [ Validators.required,  Validators.pattern( this.validatorsUserService.namePattern ) ]],
            surname: [user.surname, [ Validators.required,  Validators.pattern( this.validatorsUserService.surnamePattern ) ]],
            email: [user.email, [ Validators.required, Validators.pattern(this.validatorsUserService.emailPattern) ]],
            tlf: [user.tlf, [ Validators.required,  Validators.pattern( this.validatorsUserService.tlfPattern ) ]],
            password: [user.password, [ Validators.required, ]],
            password2: [user.password, [ Validators.required, ]],
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
        this.form?.reset({ ...this.initialUserValues, password2: this.initialUserValues.password });
      }
    }
  }

  // Navegación para volver al listado de usuarios
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
  }
  
  
}
