import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

 // Validator name
 readonly firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

 // Validator email
 readonly emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

// Explicacion patron Password

// ^- inicio de cadena (implícito en el patrón de expresión regular de cadena)
// (?=\D*\d)- debe haber 1 dígito
// (?=[^a-z]*[a-z])- debe haber 1 letra ASCII minúscula
// (?=.*[.$@$!%*?&])- debe haber 1 símbolo de los que se incluyen.
// (?=[^A-Z]*[A-Z])- debe haber 1 letra ASCII mayúscula
// .{8,30}- cualquier número de 8 a 30 caracteres, excepto los caracteres de salto de línea
// $- fin de cadena (implícito en el patrón de expresión regular de cadena).

readonly passwordPattern = /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[.$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/;

// Validator Campo: Comprueba si en el campo hay errores cuando toca
public isValidField( form: FormGroup, field: string ) {
  return form.controls[field].errors
  && form.controls[field].touched;
}

// Validator Errores Campo: Mensaje de error específico dependiendo del campo
public getFieldError( form: FormGroup, field: string ): string | null {

  // Si el form no tiene ese campo no regreso nada
  if ( !form.controls[field] ) return null;

  // Si el form si tiene el campo devolver mensaje de error específico

  //Campo Obligatorio
  if (form.controls[field].hasError('required')) {
    return 'Este campo es obligatorio.'
  //Email
  } else if((field === 'email') &&
     (form.controls[field].hasError('pattern')) ) {
    return 'Debe ser un correo con formato válido.'
  //Contraseña Login
  } else if((field === 'password') &&
      (form.controls[field].hasError('pattern')) ) {
    return 'Debe ser una contraseña con formato válido.'
  //Nombre
  } else if((field === 'name') &&
      (form.controls[field].hasError('pattern')) ) {
    return 'Debe de ser en formato de nombre y apellido.'
  //Contraseña 1 Registro
  } else if((field === 'password1') &&
      (form.controls[field].hasError('pattern')) ) {
    return 'La contraseña debe contener al menos un símbolo, un número,' +
           'una letra mayúscula y una minúscula y al menos 8 caracteres.'
  //Contraseña 2 Registro
  } else if(field === 'password2') {
    return 'Las contraseñas deben de ser iguales.'
  }

  return null;

}

// Validator Campo1 igual a Campo2
public isFieldOneEqualFieldTwo( field1: string, field2: string) {

  return ( formGroup: AbstractControl ): ValidationErrors | null => {

    // Saco los valores de las cajas de texto del formulario
    const fieldValue1 = formGroup.get(field1)?.value;
    const fieldValue2 = formGroup.get(field2)?.value;

     // Si los campos están vacíos devuelvo null
    if ((fieldValue1 === '') && (fieldValue2 === '')) {
      return null;
      // Si los campos son diferentes devuelvo un objeto con el mensaje error
    }else if (fieldValue1 !== fieldValue2) {
        // Establezco el error en el input field2
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      // Si los campos son iguales
    } else {
      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

}
}
