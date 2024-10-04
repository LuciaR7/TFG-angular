import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

 // Validator name
 readonly namePattern: string = '^([A-Za-zÀ-ÖØ-öø-ÿ]+[\\s\'-]*)+$';

 
 // Validator surname
 readonly surnamePattern: string = '^([A-Za-zÀ-ÖØ-öø-ÿ]+[\\s\'-]*)+$';

 /* Explicacion patron name y surname

    ^: Inicio de cadena (implícito en el patrón de expresión regular de cadena).
    ([A-Za-zÀ-ÖØ-öø-ÿ]+): Permite uno o más caracteres alfabéticos (incluyendo letras acentuadas).
    ([\\s\'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*: Permite opcionalmente espacios, apóstrofes o guiones. 
    +$: Permite que la secuencia se repita al menos una vez hasta el final de la cadena, 
        lo que permite espacios en blanco al final (implícito en el patrón de expresión regular de cadena).

  */

 // Validator email
 readonly emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

 /* Explicacion patron email

    ^: Inicio de la cadena.
    [a-z0-9._%+-]+: Permite letras minúsculas, números y caracteres especiales (., _, %, +, -) antes del @.
    @: Debe contener el símbolo @.
    [a-z0-9.-]+: Permite letras, números, puntos y guiones en el dominio (después del @).
    \\.: Un punto literal para separar el dominio de la extensión.
    [a-z]{2,4}: Extensión de dominio con 2 a 4 letras minúsculas (como .com, .org).
    $: Fin de la cadena.
    
 */

 // Validator tlf
 readonly tlfPattern: string = '^\\+?[0-9\\s\\-()]{7,15}$';

 /* Explicacion patron tlf

    ^: Inicio de cadena.
    \\+?: Permite opcionalmente el símbolo + al principio (para códigos de país).
    [0-9]: Permite cualquier dígito.
    \\s: Permite espacios.
    \\-: Permite guiones.
    \\(\\): Permite paréntesis.
    {7,15}: La longitud del número de teléfono puede ser entre 7 y 15 caracteres.
    $: Fin de cadena.

 */

 // Validator password
 readonly passwordPattern: string = '^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[.$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$';

 /* Explicacion patron password

    ^: Inicio de cadena.
    (?=\D*\d): Debe haber 1 dígito.
    (?=[^a-z]*[a-z]): Debe haber 1 letra ASCII minúscula.
    (?=.*[.$@$!%*?&]): Debe haber 1 símbolo de los que se incluyen.
    (?=[^A-Z]*[A-Z]): Debe haber 1 letra ASCII mayúscula.
    .{8,30}: cualquier número de 8 a 30 caracteres, excepto los caracteres de salto de línea.
    $: Fin de cadena.

  */

// Validator Campo: Comprueba si en el campo hay errores cuando toca
public isValidField( form: FormGroup, field: string ) {
  return form.controls[field].errors
  && form.controls[field].touched;
}

// Validator Errores Campo: Mensaje de error específico dependiendo del campo
public getFieldError( form: FormGroup, field: string ): string | null {

  // Si el form no tiene ese campo no regreso nada
  if ( !form.controls[field] ) return null;

  // Si el form si tiene el campo pero el valor es incorrecto, devolver mensaje de error específico

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
    return 'El nombre no puede contener dígitos.'
  //Apellidos
  } else if((field === 'surname') &&
  (form.controls[field].hasError('pattern')) ) {
    return 'Los apellidos no pueden contener dígitos.'
  //Teléfono
  } else if((field === 'tlf') &&
  (form.controls[field].hasError('pattern')) ) {
    return 'El teléfono debe tener mínimo 7 dígitos y máximo 15'
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
