import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
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

  public formRegister: FormGroup = this.fb.group({
    name: ['', [ Validators.required,  Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [  this.emailValidator ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [  new EmailValidator() ]],
    password: ['', [ Validators.required, Validators.pattern(this.validatorsService.passwordPattern) ]],
    password2: ['', [ Validators.required,]]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
    ]

  });

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private validatorsService: ValidatorsService,
   ) {}

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.formRegister, field );
  }

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

  onRegister(): void {

    const name:string = this.formRegister.controls['name'].value;
    const email:string = this.formRegister.controls['email'].value;
    const password:string = this.formRegister.controls['password'].value;
    const password2:string = this.formRegister.controls['password2'].value;


      this.authService.register(name, email, password, password2)
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




