import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ContactService } from '../services/contact.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: jasmine.SpyObj<ContactService>;

  const mockFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Test Subject',
    message: 'Test Message',
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ContactService', [
      'submitContactForm',
      'getSubmissions',
    ]);
    spy.submitContactForm.and.returnValue(
      of({ success: true, message: 'Success' }),
    );
    spy.getSubmissions.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [{ provide: ContactService, useValue: spy }],
    }).compileComponents();

    contactService = TestBed.inject(
      ContactService,
    ) as jasmine.SpyObj<ContactService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.contactForm.get('name')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('subject')?.value).toBe('');
    expect(component.contactForm.get('message')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('should mark form as valid with correct data', () => {
    component.contactForm.patchValue(mockFormData);
    expect(component.contactForm.valid).toBeTruthy();
  });

  it('should show validation errors when submitted with empty form', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
    expect(
      component.contactForm.get('name')?.errors?.['required'],
    ).toBeTruthy();
    expect(
      component.contactForm.get('email')?.errors?.['required'],
    ).toBeTruthy();
    expect(
      component.contactForm.get('subject')?.errors?.['required'],
    ).toBeTruthy();
    expect(
      component.contactForm.get('message')?.errors?.['required'],
    ).toBeTruthy();
  });

  it('should call service and show success message on valid submit', fakeAsync(() => {
    component.contactForm.patchValue(mockFormData);
    component.onSubmit();

    expect(contactService.submitContactForm).toHaveBeenCalledWith(mockFormData);
    tick(1000);

    expect(component.submitSuccess).toBeTruthy();
    expect(component.submitted).toBeFalsy();
    expect(component.contactForm.pristine).toBeTruthy();

    tick(5000);
    expect(component.submitSuccess).toBeFalsy();
  }));

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should validate minimum length requirements', () => {
    const nameControl = component.contactForm.get('name');
    nameControl?.setValue('a');
    expect(nameControl?.errors?.['minlength']).toBeTruthy();

    nameControl?.setValue('John');
    expect(nameControl?.errors).toBeNull();
  });
});
