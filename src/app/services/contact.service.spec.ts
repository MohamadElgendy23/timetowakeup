import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactService, ContactFormData } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  const mockFormData: ContactFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Test Subject',
    message: 'Test Message',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService],
    });
    service = TestBed.inject(ContactService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit form data and store in localStorage', (done) => {
    service.submitContactForm(mockFormData).subscribe((response) => {
      expect(response.success).toBeTruthy();
      expect(response.message).toBe('Message sent successfully!');

      const storedData = JSON.parse(
        localStorage.getItem('contactSubmissions') || '[]',
      );
      expect(storedData.length).toBe(1);
      expect(storedData[0].name).toBe(mockFormData.name);
      expect(storedData[0].email).toBe(mockFormData.email);
      expect(storedData[0].timestamp).toBeTruthy();
      done();
    });
  });

  it('should retrieve submissions from localStorage', (done) => {
    // Add mock data to localStorage
    const mockSubmissions = [
      { ...mockFormData, timestamp: new Date().toISOString() },
    ];
    localStorage.setItem('contactSubmissions', JSON.stringify(mockSubmissions));

    service.getSubmissions().subscribe((submissions) => {
      expect(submissions.length).toBe(1);
      expect(submissions[0].name).toBe(mockFormData.name);
      expect(submissions[0].email).toBe(mockFormData.email);
      done();
    });
  });

  it('should return empty array when no submissions exist', (done) => {
    service.getSubmissions().subscribe((submissions) => {
      expect(submissions).toEqual([]);
      done();
    });
  });
});
