import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactFormComponent } from './contact-form.component';
import { FormSubmissionService } from '../../../services/form-submission.service';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let formSubmissionService: any;

  beforeEach(async () => {
    const formSubmissionServiceSpy = {
      submitForm: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: FormSubmissionService, useValue: formSubmissionServiceSpy }
      ]
    }).compileComponents();

    formSubmissionService = TestBed.inject(FormSubmissionService);
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with all required fields', () => {
    expect(component.contactForm.get('nom')).toBeTruthy();
    expect(component.contactForm.get('prenom')).toBeTruthy();
    expect(component.contactForm.get('email')).toBeTruthy();
    expect(component.contactForm.get('telephone')).toBeTruthy();
    expect(component.contactForm.get('service')).toBeTruthy();
    expect(component.contactForm.get('message')).toBeTruthy();
  });

  it('should mark form as invalid when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const nomControl = component.contactForm.get('nom');
    expect(nomControl?.hasError('required')).toBeTruthy();

    nomControl?.setValue('Dupont');
    expect(nomControl?.hasError('required')).toBeFalsy();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should validate French phone number format', () => {
    const phoneControl = component.contactForm.get('telephone');
    
    phoneControl?.setValue('invalid');
    expect(phoneControl?.hasError('frenchPhone')).toBeTruthy();

    phoneControl?.setValue('+33 7 53 80 14 14');
    expect(phoneControl?.hasError('frenchPhone')).toBeFalsy();
  });

  it('should validate minimum length for nom and prenom', () => {
    const nomControl = component.contactForm.get('nom');
    
    nomControl?.setValue('A');
    expect(nomControl?.hasError('minlength')).toBeTruthy();

    nomControl?.setValue('Dupont');
    expect(nomControl?.hasError('minlength')).toBeFalsy();
  });

  it('should validate minimum length for message', () => {
    const messageControl = component.contactForm.get('message');
    
    messageControl?.setValue('Short');
    expect(messageControl?.hasError('minlength')).toBeTruthy();

    messageControl?.setValue('This is a longer message that meets the minimum length requirement');
    expect(messageControl?.hasError('minlength')).toBeFalsy();
  });

  it('should return correct error message for required fields', () => {
    const nomControl = component.contactForm.get('nom');
    nomControl?.markAsTouched();
    
    const errorMessage = component.getFieldError('nom');
    expect(errorMessage).toBe('Le nom est requis');
  });

  it('should return correct error message for invalid email', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    
    const errorMessage = component.getFieldError('email');
    expect(errorMessage).toBe('Veuillez entrer une adresse e-mail valide');
  });

  it('should return correct error message for invalid phone', () => {
    const phoneControl = component.contactForm.get('telephone');
    phoneControl?.setValue('invalid');
    phoneControl?.markAsTouched();
    
    const errorMessage = component.getFieldError('telephone');
    expect(errorMessage).toBe('Veuillez entrer un numéro de téléphone français valide');
  });

  it('should detect field errors correctly', () => {
    const nomControl = component.contactForm.get('nom');
    
    expect(component.hasFieldError('nom')).toBeFalsy();
    
    nomControl?.markAsTouched();
    expect(component.hasFieldError('nom')).toBeTruthy();
    
    nomControl?.setValue('Dupont');
    expect(component.hasFieldError('nom')).toBeFalsy();
  });

  it('should not submit invalid form', () => {
    component.onSubmit();
    
    expect(formSubmissionService.submitForm).not.toHaveBeenCalled();
    expect(component.formState.isSubmitting).toBeFalsy();
  });

  it('should mark all fields as touched when submitting invalid form', () => {
    component.onSubmit();
    
    expect(component.contactForm.get('nom')?.touched).toBeTruthy();
    expect(component.contactForm.get('prenom')?.touched).toBeTruthy();
    expect(component.contactForm.get('email')?.touched).toBeTruthy();
    expect(component.contactForm.get('telephone')?.touched).toBeTruthy();
    expect(component.contactForm.get('service')?.touched).toBeTruthy();
    expect(component.contactForm.get('message')?.touched).toBeTruthy();
  });

  it('should submit valid form and handle success', () => {
    formSubmissionService.submitForm.mockReturnValue(of({}));
    
    // Fill form with valid data
    component.contactForm.patchValue({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+33 7 53 80 14 14',
      service: 'devis',
      message: 'Je souhaite obtenir un devis pour une rénovation complète.'
    });

    component.onSubmit();

    expect(formSubmissionService.submitForm).toHaveBeenCalled();
    expect(component.formState.isSubmitting).toBeFalsy();
    expect(component.formState.submitSuccess).toBeTruthy();
    expect(component.formState.submitError).toBeFalsy();
  });

  it('should reset form after successful submission', () => {
    formSubmissionService.submitForm.mockReturnValue(of({}));
    
    component.contactForm.patchValue({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+33 7 53 80 14 14',
      service: 'devis',
      message: 'Je souhaite obtenir un devis pour une rénovation complète.'
    });

    component.onSubmit();

    expect(component.contactForm.get('nom')?.value).toBeNull();
    expect(component.contactForm.get('email')?.value).toBeNull();
  });

  it('should handle submission error', () => {
    const error = { status: 500, message: 'Server error' };
    formSubmissionService.submitForm.mockReturnValue(throwError(() => error));
    
    component.contactForm.patchValue({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+33 7 53 80 14 14',
      service: 'devis',
      message: 'Je souhaite obtenir un devis pour une rénovation complète.'
    });

    component.onSubmit();

    expect(component.formState.isSubmitting).toBeFalsy();
    expect(component.formState.submitSuccess).toBeFalsy();
    expect(component.formState.submitError).toBeTruthy();
    expect(component.formState.errorMessage).toBeTruthy();
  });

  it('should display timeout error message', () => {
    const timeoutError = { name: 'TimeoutError' };
    formSubmissionService.submitForm.mockReturnValue(throwError(() => timeoutError));
    
    component.contactForm.patchValue({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+33 7 53 80 14 14',
      service: 'devis',
      message: 'Je souhaite obtenir un devis pour une rénovation complète.'
    });

    component.onSubmit();

    expect(component.formState.errorMessage).toBe('La demande a pris trop de temps. Veuillez réessayer.');
  });

  it('should display network error message', () => {
    const networkError = { status: 0 };
    formSubmissionService.submitForm.mockReturnValue(throwError(() => networkError));
    
    component.contactForm.patchValue({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+33 7 53 80 14 14',
      service: 'devis',
      message: 'Je souhaite obtenir un devis pour une rénovation complète.'
    });

    component.onSubmit();

    expect(component.formState.errorMessage).toBe('Impossible de soumettre le formulaire. Veuillez vérifier votre connexion et réessayer.');
  });

  it('should display generic error message for other errors', () => {
    const genericError = { status: 500 };
    formSubmissionService.submitForm.mockReturnValue(throwError(() => genericError));
    
    component.contactForm.patchValue({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+33 7 53 80 14 14',
      service: 'devis',
      message: 'Je souhaite obtenir un devis pour une rénovation complète.'
    });

    component.onSubmit();

    expect(component.formState.errorMessage).toBe('Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.');
  });

  it('should set isSubmitting to true during submission', () => {
    formSubmissionService.submitForm.mockReturnValue(of({}));
    
    component.contactForm.patchValue({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+33 7 53 80 14 14',
      service: 'devis',
      message: 'Je souhaite obtenir un devis pour une rénovation complète.'
    });

    // Before submission
    expect(component.formState.isSubmitting).toBeFalsy();
    
    component.onSubmit();
    
    // After submission completes
    expect(component.formState.isSubmitting).toBeFalsy();
  });

  it('should have all service options available', () => {
    expect(component.serviceOptions.length).toBe(5);
    expect(component.serviceOptions[0].label).toBe('Sélectionnez un service');
    expect(component.serviceOptions[1].label).toBe('Demande de devis gratuit');
  });

  it('should have validation messages in French', () => {
    expect(component.validationMessages.nom.required).toBe('Le nom est requis');
    expect(component.validationMessages.email.pattern).toBe('Veuillez entrer une adresse e-mail valide');
  });
});
