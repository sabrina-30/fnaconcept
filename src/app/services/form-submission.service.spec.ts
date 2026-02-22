import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormSubmissionService } from './form-submission.service';
import { ContactFormData } from '../models/contact-form.model';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('FormSubmissionService', () => {
  let service: FormSubmissionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormSubmissionService]
    });
    service = TestBed.inject(FormSubmissionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Form Data Encoding', () => {
    it('should encode form data as application/x-www-form-urlencoded', () => {
      const formData: ContactFormData = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        telephone: '+33 7 53 80 14 14',
        service: 'devis',
        message: 'Je souhaite un devis pour une rénovation'
      };

      service.submitForm(formData).subscribe();

      const req = httpMock.expectOne('/');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
      
      // Verify the body contains form-name and all form fields
      const body = req.request.body;
      expect(body).toContain('form-name=contact');
      expect(body).toContain('nom=Dupont');
      expect(body).toContain('prenom=Jean');
      expect(body).toContain('email=jean.dupont%40example.com');
      expect(body).toContain('service=devis');
      
      req.flush({});
    });

    it('should properly encode special characters in form data', () => {
      const formData: ContactFormData = {
        nom: 'O\'Brien',
        prenom: 'François',
        email: 'test+tag@example.com',
        telephone: '+33 7 53 80 14 14',
        service: 'autre',
        message: 'Message avec des caractères spéciaux: é, è, à, &, ='
      };

      service.submitForm(formData).subscribe();

      const req = httpMock.expectOne('/');
      const body = req.request.body;
      
      // Verify special characters are properly encoded
      // Note: encodeURIComponent doesn't encode apostrophes
      expect(body).toContain('nom=O\'Brien');
      expect(body).toContain('prenom=Fran%C3%A7ois');
      expect(body).toContain('email=test%2Btag%40example.com');
      expect(body).toContain('%C3%A9'); // é encoded
      expect(body).toContain('%26'); // & encoded
      expect(body).toContain('%3D'); // = encoded
      
      req.flush({});
    });
  });

  describe('Successful Submission', () => {
    it('should successfully submit form data and return response', () => {
      const formData: ContactFormData = {
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@example.com',
        telephone: '0753801414',
        service: 'info',
        message: 'Demande d\'information'
      };

      const mockResponse = { success: true };
      let receivedResponse: any;

      service.submitForm(formData).subscribe({
        next: (response) => {
          receivedResponse = response;
        }
      });

      const req = httpMock.expectOne('/');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
      
      expect(receivedResponse).toEqual(mockResponse);
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors', () => {
      const formData: ContactFormData = {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com',
        telephone: '+33 7 53 80 14 14',
        service: 'devis',
        message: 'Test message'
      };

      let receivedError: any;

      service.submitForm(formData).subscribe({
        error: (error) => {
          receivedError = error;
        }
      });

      const req = httpMock.expectOne('/');
      req.error(new ProgressEvent('Network error'), { status: 0 });
      
      expect(receivedError).toBeTruthy();
      expect(receivedError.status).toBe(0);
    });

    it('should handle server errors', () => {
      const formData: ContactFormData = {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com',
        telephone: '+33 7 53 80 14 14',
        service: 'devis',
        message: 'Test message'
      };

      let receivedError: any;

      service.submitForm(formData).subscribe({
        error: (error) => {
          receivedError = error;
        }
      });

      const req = httpMock.expectOne('/');
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
      
      expect(receivedError).toBeTruthy();
      expect(receivedError.status).toBe(500);
    });

    it('should log errors to console', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const formData: ContactFormData = {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com',
        telephone: '+33 7 53 80 14 14',
        service: 'devis',
        message: 'Test message'
      };

      service.submitForm(formData).subscribe({
        error: () => {
          // Error handled
        }
      });

      const req = httpMock.expectOne('/');
      req.error(new ProgressEvent('Network error'));
      
      expect(consoleSpy).toHaveBeenCalledWith('Form submission error:', expect.any(Object));
      consoleSpy.mockRestore();
    });
  });

  describe('Timeout Handling', () => {
    it('should timeout after 30 seconds', () => {
      vi.useFakeTimers();
      
      const formData: ContactFormData = {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com',
        telephone: '+33 7 53 80 14 14',
        service: 'devis',
        message: 'Test message'
      };

      let receivedError: any;

      service.submitForm(formData).subscribe({
        error: (error) => {
          receivedError = error;
        }
      });

      const req = httpMock.expectOne('/');
      
      // Advance time by 30 seconds
      vi.advanceTimersByTime(30000);
      
      // Clean up
      vi.useRealTimers();
      
      expect(receivedError?.name).toBe('TimeoutError');
    });
  });

  describe('HTTP Headers', () => {
    it('should set correct Content-Type header', () => {
      const formData: ContactFormData = {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com',
        telephone: '+33 7 53 80 14 14',
        service: 'devis',
        message: 'Test message'
      };

      service.submitForm(formData).subscribe();

      const req = httpMock.expectOne('/');
      expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
      req.flush({});
    });
  });

  describe('POST to Root Path', () => {
    it('should POST to root path /', () => {
      const formData: ContactFormData = {
        nom: 'Test',
        prenom: 'User',
        email: 'test@example.com',
        telephone: '+33 7 53 80 14 14',
        service: 'devis',
        message: 'Test message'
      };

      service.submitForm(formData).subscribe();

      const req = httpMock.expectOne('/');
      expect(req.request.url).toBe('/');
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });
});
