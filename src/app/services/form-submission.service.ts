import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ContactFormData } from '../models/contact-form.model';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionService {
  private readonly SUBMISSION_TIMEOUT = 30000; // 30 seconds

  constructor(private http: HttpClient) {}

  submitForm(formData: ContactFormData): Observable<any> {
    // Netlify Forms expects form-encoded data
    const formBody = this.encodeFormData(formData);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('/', formBody, { headers })
      .pipe(
        timeout(this.SUBMISSION_TIMEOUT),
        catchError(error => {
          console.error('Form submission error:', error);
          return throwError(() => error);
        })
      );
  }

  private encodeFormData(data: ContactFormData): string {
    const formData = {
      'form-name': 'contact',
      ...data
    };
    
    return Object.keys(formData)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key as keyof typeof formData])}`)
      .join('&');
  }
}
