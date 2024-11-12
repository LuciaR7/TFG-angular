import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsParteService {

    // Validator dispositivo
    readonly dispositPattern: string = '^([A-Za-z0-9À-ÖØ-öø-ÿ]+[\\s\'-]*)+$';


    /* Explicacion patron dispositivo

        ^: Inicio de cadena (implícito en el patrón de expresión regular de cadena).
        ([A-Za-z0-9À-ÖØ-öø-ÿ]+): Permite uno o más caracteres alfabéticos y números (incluyendo letras acentuadas).
        ([\\s\'-]*: Permite opcionalmente espacios, apóstrofes o guiones. 
        +$: Permite que la secuencia se repita al menos una vez hasta el final de la cadena, 
            lo que permite espacios en blanco al final (implícito en el patrón de expresión regular de cadena).

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
        //Dispositivo
        } else if((field === 'dispositivo') &&
            (form.controls[field].hasError('pattern')) ) {
            return 'Debe ser un dispositivo con formato válido.'
        //FechaEstimada
        } else if (field === 'fechaEstimada' && this.isDateInPast(form.controls[field].value)) {
            return 'La fecha debe ser futura.';
        } 

        return null;

    }

    // Método para verificar si una fecha está en el pasado
    private isDateInPast(dateString: string): boolean {
        const inputDate = new Date(dateString);
        const currentDate = new Date();
        return inputDate < currentDate;
    }
    
}