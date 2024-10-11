import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { Usuario } from '../../../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-detalle-cliente-page',
  templateUrl: './detalle-cliente-page.component.html',
  styleUrl: './detalle-cliente-page.component.css'
})
export class DetalleClientePageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private validatorsService: ValidatorsService,
  ) {}

  form?: FormGroup;
  user?: Usuario;
  initialUserValues?: Partial<Usuario>;

  ngOnInit(): void {
    // Obtén el ID del usuario desde la ruta
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.usuarioService.get(parseInt(id))
        .subscribe(user => {
          this.user = user;
          this.initialUserValues = { ...user }; // Almacena los valores iniciales
         
          this.form = this.fb.group({
            name: [user.name, [ Validators.required,  Validators.pattern( this.validatorsService.namePattern ) ]],
            surname: [user.surname, [ Validators.required,  Validators.pattern( this.validatorsService.surnamePattern ) ]],
            email: [user.email, [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ]],
            tlf: [user.tlf, [ Validators.required,  Validators.pattern( this.validatorsService.tlfPattern ) ]],
            password: [user.password, [ Validators.required, ]],
            password2: [user.password, [ Validators.required, ]],
          },{
            validators: [
              this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
            ]
        
          });
        })
    } else {
      console.log("no existe el usuario");
    }
  }

  save() {

    if(this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const userForm = this.form!.value;

    if (this.user){
      this.usuarioService.update(this.user.id, userForm)
        .subscribe(() => {
          this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN])
        });
    } else {
      this.usuarioService.create(userForm)
        .subscribe(() => {
          this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN])
        });
     }
  }

  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.form!, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
    return this.validatorsService.getFieldError( this.form!, field );
  }

  // Método para restablecer los valores del formulario a los originales
  resetForm() {
    if (this.initialUserValues) {
      this.form?.reset({ ...this.initialUserValues, password2: this.initialUserValues.password });
    }
  }

  // Navegación para volver al listado de clientes
  goBack():void {
    this.router.navigate([RoutesConstants.RUTA_ADMIN, RoutesConstants.RUTA_LIST_CLIENTS_ADMIN]);
  }
  
  
}
