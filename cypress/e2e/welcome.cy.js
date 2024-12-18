describe('Welcome Page', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://reqres.in/api/users/1', {
        statusCode: 200,
        body: {
          data: {
            id: 1,
            email: 'user@example.com',
            first_name: 'John',
            last_name: 'Doe',
            avatar: 'https://via.placeholder.com/150',
          },
        },
      }).as('fetchUser');
    });
  
    it('should redirect to login if not authenticated', () => {
      cy.visit('/dashboard/welcome'); 
  
      cy.url().should('include', '/login');
    });
  
    it('should load and display user data if authenticated', () => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          'user',
          JSON.stringify({ id: 1, email: 'user@example.com' })
        );
        win.localStorage.setItem('token', 'fake-jwt-token');
      });
  
      cy.visit('/dashboard/welcome'); 
  
      cy.wait('@fetchUser'); 
  
      cy.contains('Welcome John Doe').should('be.visible');
      cy.contains('by @user@example.com').should('be.visible');
      cy.get('img[alt="User Avatar"]')
        .should('have.attr', 'src')
        .and('include', 'https://via.placeholder.com/150');
    });
  
    it('should redirect to /dashboard when the button is clicked', () => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          'user',
          JSON.stringify({ id: 1, email: 'user@example.com' })
        );
        win.localStorage.setItem('token', 'fake-jwt-token');
      });
  
      cy.visit('/dashboard/welcome');
  
      cy.wait('@fetchUser');
  
      cy.contains('Go to Dashboard').click();
      cy.url().should('include', '/dashboard');
    });
    
});
  