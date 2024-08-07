import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator  implements AsyncValidator {

  validate( control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log({ email });

      // si el email existe (en este caso coincide con ese)
      if ( email === 'yaexiste@gmail.com' ) {
        // El correo ya esta ocupado
        subscriber.next({ emailTaken: true });
        // Des-suscribir para acabar
        subscriber.complete();
      }

      // si el email no existe, todo va bien
      subscriber.next(null);
      subscriber.complete();

    });

    return httpCallObservable;

  }

  // validate( control: AbstractControl ): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email });

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay( 2000 )
  //   );

  // }

  // ASÍ LO HARÍAMOS NORMALMENTE

  // return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
  //         .pipe(
  //           // delay(3000),
  //           map( resp => {
  //             return ( resp.length === 0)
  //             ? null
  //             : { emailTaken: true }
  //           })
  //         );

}
