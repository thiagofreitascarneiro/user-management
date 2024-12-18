describe('Login Page', () => {
    it('should load the login page', () => {
      cy.visit('/login'); 
      cy.contains('Welcome Back').should('be.visible');
    });
  
    it('should display an error for invalid credentials', () => {
      cy.visit('/login');

      cy.get('input[name="email"]').type('wrong.email@reqres.in');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      cy.get('.text-red-500').should('contain', 'Invalid credentials. Please try again.');
    });

    it('should login successfully and redirect to dashboard', () => {
        cy.intercept('POST', 'https://reqres.in/api/login', {
          statusCode: 200,
          body: { token: 'fake-jwt-token' },
        }).as('loginRequest');
    
        cy.visit('/login');
    
        cy.get('input[name="email"]').type('eve.holt@reqres.in');
        cy.get('input[name="password"]').type('cityslicka');
        cy.get('button[type="submit"]').click();
    
        cy.wait('@loginRequest');
    
        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard').should('be.visible'); 
      });

    it('should save the token in localStorage', () => {
        cy.intercept('POST', 'https://reqres.in/api/login', {
          statusCode: 200,
          body: { token: 'fake-jwt-token' },
        }).as('loginRequest');
      
        cy.visit('/login');
        cy.get('input[name="email"]').type('eve.holt@reqres.in');
        cy.get('input[name="password"]').type('cityslicka');
        cy.get('button[type="submit"]').click();
      
        cy.wait('@loginRequest');
      
        cy.window().then((win) => {
          expect(win.localStorage.getItem('token')).to.eq('fake-jwt-token');
        });
    });
      
  });
  