describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact');
    cy.clearLocalStorage();
  });

  it('should display contact form with all fields', () => {
    cy.get('input[formControlName="name"]').should('be.visible');
    cy.get('input[formControlName="email"]').should('be.visible');
    cy.get('input[formControlName="subject"]').should('be.visible');
    cy.get('textarea[formControlName="message"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show validation errors on empty form submission', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Subject is required').should('be.visible');
    cy.contains('Message is required').should('be.visible');
  });

  it('should show email format validation', () => {
    cy.get('input[formControlName="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Please enter a valid email address').should('be.visible');
  });

  it('should successfully submit form with valid data', () => {
    cy.get('input[formControlName="name"]').type('John Doe');
    cy.get('input[formControlName="email"]').type('john@example.com');
    cy.get('input[formControlName="subject"]').type('Test Subject');
    cy.get('textarea[formControlName="message"]').type(
      'This is a test message',
    );
    cy.get('button[type="submit"]').click();

    // Check for success message
    cy.contains('Thank you for your message!').should('be.visible');

    // Check if form is reset
    cy.get('input[formControlName="name"]').should('have.value', '');

    // Check if submission appears in recent messages
    cy.contains('John Doe').should('be.visible');
    cy.contains('Test Subject').should('be.visible');
  });

  it('should have working social media links', () => {
    cy.get('a[href*="github.com"]')
      .should('have.attr', 'href', 'https://github.com/MohamadElgendy23')
      .and('have.attr', 'target', '_blank');

    cy.get('a[href*="linkedin.com"]')
      .should(
        'have.attr',
        'href',
        'https://www.linkedin.com/in/mohamad-elgendy-4b3bb61ba/',
      )
      .and('have.attr', 'target', '_blank');
  });

  it('should be accessible', () => {
    // Check for ARIA labels and roles
    cy.get('form').should('have.attr', 'role', 'form');
    cy.get('input[formControlName="name"]').should('have.attr', 'aria-label');
    cy.get('input[formControlName="email"]').should('have.attr', 'aria-label');
    cy.get('button[type="submit"]').should('not.have.attr', 'disabled');

    // Test keyboard navigation
    cy.get('body').tab();
    cy.focused().should('have.attr', 'formControlName', 'name');
    cy.tab();
    cy.focused().should('have.attr', 'formControlName', 'email');
  });
});
