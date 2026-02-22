import { FormControl } from '@angular/forms';
import { frenchPhoneValidator } from './french-phone.validator';
import { describe, it, expect } from 'vitest';

describe('frenchPhoneValidator', () => {
  const validator = frenchPhoneValidator();

  describe('Valid French phone formats', () => {
    it('should accept +33 7 53 80 14 14 format', () => {
      const control = new FormControl('+33 7 53 80 14 14');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept 0753801414 format (no spaces)', () => {
      const control = new FormControl('0753801414');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept 07 53 80 14 14 format (spaces)', () => {
      const control = new FormControl('07 53 80 14 14');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept 07.53.80.14.14 format (dots)', () => {
      const control = new FormControl('07.53.80.14.14');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept 07-53-80-14-14 format (hyphens)', () => {
      const control = new FormControl('07-53-80-14-14');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept +33753801414 format (no spaces after +33)', () => {
      const control = new FormControl('+33753801414');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept 0033753801414 format (00 prefix)', () => {
      const control = new FormControl('0033753801414');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept mixed separators like 07 53.80-14 14', () => {
      const control = new FormControl('07 53.80-14 14');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept all valid first digits (1-9) after 0', () => {
      const validFirstDigits = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
      validFirstDigits.forEach((prefix) => {
        const control = new FormControl(`${prefix}53801414`);
        const result = validator(control);
        expect(result).toBeNull();
      });
    });
  });

  describe('Invalid French phone formats', () => {
    it('should reject empty string', () => {
      const control = new FormControl('');
      const result = validator(control);
      expect(result).toBeNull(); // Empty values should pass (use required validator)
    });

    it('should reject null value', () => {
      const control = new FormControl(null);
      const result = validator(control);
      expect(result).toBeNull(); // Null values should pass (use required validator)
    });

    it('should reject phone number that is too short', () => {
      const control = new FormControl('0753801');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject phone number that is too long', () => {
      const control = new FormControl('075380141414');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject phone number starting with 0 followed by 0', () => {
      const control = new FormControl('0053801414');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject wrong country code (+34 instead of +33)', () => {
      const control = new FormControl('+34753801414');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject phone number with invalid characters', () => {
      const control = new FormControl('07a5380b414');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject phone number with special characters like @', () => {
      const control = new FormControl('07@5380@414');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject phone number without proper format', () => {
      const control = new FormControl('123456789');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject US phone number format', () => {
      const control = new FormControl('+1 555 123 4567');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject phone number with only country code', () => {
      const control = new FormControl('+33');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });
  });

  describe('French error messages', () => {
    it('should return French error message for invalid phone', () => {
      const control = new FormControl('invalid');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']?.message).toBe(
        'Veuillez entrer un numéro de téléphone français valide'
      );
    });

    it('should include the invalid value in the error object', () => {
      const invalidValue = '123456';
      const control = new FormControl(invalidValue);
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']?.value).toBe(invalidValue);
    });
  });

  describe('Edge cases', () => {
    it('should reject phone number with leading/trailing spaces', () => {
      const control = new FormControl(' 0753801414 ');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should accept phone number with multiple spaces between digits', () => {
      const control = new FormControl('07  53  80  14  14');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should accept phone number with single space after country code', () => {
      const control = new FormControl('+33 753801414');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should reject phone number with parentheses', () => {
      const control = new FormControl('(07) 53 80 14 14');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });

    it('should reject phone number with slashes', () => {
      const control = new FormControl('07/53/80/14/14');
      const result = validator(control);
      expect(result).not.toBeNull();
      expect(result?.['frenchPhone']).toBeDefined();
    });
  });
});
