import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator function for French phone numbers
 * 
 * Supports the following formats:
 * - +33 X XX XX XX XX
 * - 0X XX XX XX XX
 * - Various formats with spaces, dots, or hyphens
 * 
 * Pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
 * 
 * @returns ValidatorFn that returns null if valid, or an error object if invalid
 */
export function frenchPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values (use required validator)
    }

    // French phone number patterns:
    // +33 X XX XX XX XX
    // 0X XX XX XX XX
    // Various formats with spaces, dots, or hyphens
    const phonePattern = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    
    const isValid = phonePattern.test(control.value);
    
    return isValid ? null : { 
      frenchPhone: { 
        value: control.value,
        message: 'Veuillez entrer un numéro de téléphone français valide'
      } 
    };
  };
}
