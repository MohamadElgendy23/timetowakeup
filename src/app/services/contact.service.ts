import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  // Simulate API call since we don't have a backend
  submitContactForm(formData: ContactFormData): Observable<any> {
    // In a real app, this would be an HTTP POST to your backend
    return of({ success: true, message: 'Message sent successfully!' }).pipe(
      delay(1000), // Simulate network delay
      tap((response) => {
        // Save to localStorage for demo purposes
        const submissions = JSON.parse(
          localStorage.getItem('contactSubmissions') || '[]',
        );
        submissions.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      }),
    );
  }

  getSubmissions(): Observable<ContactFormData[]> {
    return of(JSON.parse(localStorage.getItem('contactSubmissions') || '[]'));
  }
}
