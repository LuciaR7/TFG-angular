import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from '../../../shared/constants/routes.constants';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsUserService } from '../../../shared/validators/validatorsUser.service';
import { LoginRequest } from '../../interfaces/loginRequest';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})

export class LoginPageComponent implements OnInit, OnDestroy{

  //**Propiedades**//
  private valueChangesSub?: Subscription;
  
  loginError: string = "";
  isLoading: boolean = false;

  public formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern( this.validatorsUserService.emailPattern )]],
    password: ['', [Validators.required, Validators.pattern( this.validatorsUserService.passwordPattern ) ]],
  })

  //**Constructor**//
  constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      private router: Router,
      private validatorsUserService: ValidatorsUserService,
  ){}

  //**Métodos**//
  ngOnInit(): void {
    this.valueChangesSub = this.formLogin.valueChanges.subscribe(() => {
      this.loginError = '';
    });
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  // Comprueba si en el campo hay errores cuando toca
  isValidField( field: string ): boolean | null {
    return this.validatorsUserService.isValidField( this.formLogin, field );
  }

  // Muestra mensaje de error específico dependiendo del campo
  getFieldError( field: string ): string | null {
      return this.validatorsUserService.getFieldError( this.formLogin, field );
  }

  //Guardar datos formulario
  onSave():void {

    if ( this.formLogin.invalid ) {
      //marca todos los campos como si fuesen tocados
        this.formLogin.markAllAsTouched();
        return;
    }
  }

  //Comprobar credenciales usuario
  onLogin(): void {

    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.loginError = '';
    this.isLoading = true;

    this.authService.login(this.formLogin.value as LoginRequest).subscribe({
      next: (userData) => {

        sessionStorage.setItem('token', userData.token);
        sessionStorage.setItem('userRole', userData.rol);
        sessionStorage.setItem('userId', userData.id.toString());

        const userRole = userData.rol;
        const userId = userData.id;

        if (userRole === 'CLIENT' && userId) {
          this.router.navigate([
            RoutesConstants.RUTA_CLIENT,
            RoutesConstants.RUTA_LIST_PARTES_CLIENTS,
            userId
          ]);
        } else if (userRole === 'ADMIN') {
          this.router.navigate([RoutesConstants.RUTA_ADMIN]);
        }
      },

      error: () => {
        this.isLoading = false;
        this.loginError = 'Credenciales incorrectas';
      }
    });
  }

}
