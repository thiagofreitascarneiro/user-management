
describe('Login Page', () => {
    it('should load the sign-up page', () => {
        cy.visit('/register'); 
    
        cy.contains('Welcome to the platform').should('be.visible'); 
        cy.get('input[name="email"]').should('be.visible'); 
        cy.get('input[name="password"]').should('be.visible'); 
        cy.get('input[name="confirmPassword"]').should('be.visible');
        cy.get('button[type="submit"]').should('contain', 'Sign Up');
    });
  
  it('should display an error when passwords do not match', () => {
    cy.visit('/register');
  
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password456');
    cy.get('button[type="submit"]').click();
  
    cy.contains('Passwords do not match!').should('be.visible');
  });

  it('should register successfully and redirect to welcome page', () => {
    cy.intercept('POST', 'https://reqres.in/api/register', {
      statusCode: 200,
      body: { token: 'fake-jwt-token' },
    }).as('registerRequest');
  
    cy.visit('/register');
  
    cy.get('input[name="email"]').type('eve.holt@reqres.in');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123'); 
    cy.get('button[type="submit"]').click();
  
    cy.wait('@registerRequest'); 
    cy.url().should('include', '/dashboard/welcome'); 
    cy.contains('Welcome').should('be.visible'); 
  });

  it('should save the token in localStorage after successful registration', () => {
    cy.intercept('POST', 'https://reqres.in/api/register', {
      statusCode: 200,
      body: { token: 'fake-jwt-token' },
    }).as('registerRequest');
  
    cy.visit('/register');
  
    cy.get('input[name="email"]').type('eve.holt@reqres.in');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();
  
    cy.wait('@registerRequest');
  
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('fake-jwt-token'); 
    });
  });

  it('should not submit the form with empty fields', () => {
    cy.visit('/register');
  
    cy.get('button[type="submit"]').click(); 
    cy.url().should('include', '/register'); 
    cy.get('input[name="email"]:invalid').should('exist'); 
    cy.get('input[name="password"]:invalid').should('exist');
  });
  
});