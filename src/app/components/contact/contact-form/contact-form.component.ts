import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormSubmissionService } from '../../../services/form-submission.service';
import { frenchPhoneValidator } from '../../../validators/french-phone.validator';
import { ContactFormData, ContactFormState, validationMessages, serviceOptions } from '../../../models/contact-form.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  serviceOptions = serviceOptions;
  validationMessages = validationMessages;
  
  formState: ContactFormState = {
    isSubmitting: false,
    submitSuccess: false,
    submitError: false,
    errorMessage: ''
  };

  constructor(
    private fb: FormBuilder,
    private formSubmissionService: FormSubmissionService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, frenchPhoneValidator()]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      const errors = field.errors;
      if (errors) {
        const messages = this.validationMessages[fieldName as keyof typeof this.validationMessages];
        
        if (errors['required']) {
          return messages.required;
        }
        if (errors['minlength'] && 'minlength' in messages) {
          return messages.minlength;
        }
        if ((errors['email'] || errors['pattern']) && 'pattern' in messages) {
          return messages.pattern;
        }
        if (errors['frenchPhone']) {
          return errors['frenchPhone'].message;
        }
      }
    }
    return '';
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.formState.isSubmitting = true;
    this.formState.submitSuccess = false;
    this.formState.submitError = false;

    const formData: ContactFormData = this.contactForm.value;

    this.formSubmissionService.submitForm(formData).subscribe({
      next: () => {
        this.formState.isSubmitting = false;
        this.formState.submitSuccess = true;
        this.contactForm.reset();
      },
      error: (error) => {
        this.formState.isSubmitting = false;
        this.formState.submitError = true;
        this.formState.errorMessage = this.getErrorMessage(error);
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error.name === 'TimeoutError') {
      return 'La demande a pris trop de temps. Veuillez réessayer.';
    }
    if (error.status === 0) {
      return 'Impossible de soumettre le formulaire. Veuillez vérifier votre connexion et réessayer.';
    }
    return 'Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.';
  }
}
