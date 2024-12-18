describe('Dashboard Page', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          'user',
          JSON.stringify({ id: 1, email: 'user@example.com' })
        );
        win.localStorage.setItem('token', 'fake-jwt-token');
      });
  
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
  
      cy.intercept('GET', 'https://reqres.in/api/users?page=1', {
        statusCode: 200,
        body: {
          data: [
            {
              id: 1,
              email: 'john.doe@example.com',
              first_name: 'John',
              last_name: 'Doe',
              avatar: 'https://via.placeholder.com/150',
            },
          ],
          total_pages: 1,
        },
      }).as('fetchUsers');
    });
  
    it('should redirect to login if not authenticated', () => {
      cy.clearLocalStorage();
      cy.visit('/dashboard');
  
      cy.url().should('include', '/login');
    });
  
    it('should allow access to dashboard if authenticated', () => {
      cy.visit('/dashboard');
  
      cy.wait('@fetchUsers');
  
      cy.contains('User Management Dashboard').should('be.visible');
    });
  
    it('should create a new user and display it in the list', () => {
      cy.visit('/dashboard');
  
      cy.wait('@fetchUsers');
  
      cy.get('input[placeholder="First Name"]').type('Jane');
      cy.get('input[placeholder="Last Name"]').type('Doe');
      cy.get('input[placeholder="Email"]').type('jane.doe@example.com');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Jane Doe').should('be.visible');
      cy.contains('jane.doe@example.com').should('be.visible');
    });
  
    it('should update an existing user and reflect changes in the list', () => {
      cy.visit('/dashboard');
  
      cy.wait('@fetchUsers');
  
      cy.contains('John Doe')
        .parent()
        .within(() => {
          cy.get('button').first().click(); 
        });
  
      cy.get('input[placeholder="First Name"]').clear().type('Johnny');
      cy.get('input[placeholder="Last Name"]').clear().type('Smith');
      cy.get('input[placeholder="Email"]').clear().type('johnny.smith@example.com');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Johnny Smith').should('be.visible');
      cy.contains('johnny.smith@example.com').should('be.visible');
    });
    
    it('should delete a user and remove it from the list', () => {
        cy.visit('/dashboard');
      
        cy.wait('@fetchUsers');
      
        cy.contains('John Doe')
          .parent()
          .within(() => {
            cy.get('button').last().click(); 
        });
      
        cy.contains('Are you sure you want to delete this user?').should('be.visible');
        cy.contains('Yes').click();
      
        cy.contains('John Doe').should('not.exist');
    });

    it('should navigate between pages using pagination buttons', () => {
        cy.window().then((win) => {
          win.localStorage.setItem(
            'user',
            JSON.stringify({ id: 1, email: 'user@example.com' })
          );
          win.localStorage.setItem('token', 'fake-jwt-token');
        });
      
        cy.intercept('GET', 'https://reqres.in/api/users?page=1', {
          statusCode: 200,
          body: {
            data: [
              {
                id: 1,
                email: 'user1@example.com',
                first_name: 'John',
                last_name: 'Doe',
                avatar: 'https://via.placeholder.com/150',
              },
            ],
            total_pages: 2,
          },
        }).as('fetchPage1');
      
        cy.intercept('GET', 'https://reqres.in/api/users?page=2', {
          statusCode: 200,
          body: {
            data: [
              {
                id: 2,
                email: 'user2@example.com',
                first_name: 'Jane',
                last_name: 'Doe',
                avatar: 'https://via.placeholder.com/150',
              },
            ],
            total_pages: 2,
          },
        }).as('fetchPage2');
      
        cy.visit('/dashboard');
      
        cy.wait('@fetchPage1');
        cy.contains('John Doe').should('be.visible');
      
        cy.contains('Next').click();
      
        cy.wait('@fetchPage2');
        cy.contains('Jane Doe').should('be.visible');
        cy.contains('John Doe').should('not.exist'); 
      
        cy.contains('Previous').click();
      
        cy.wait('@fetchPage1');
        cy.contains('John Doe').should('be.visible');
        cy.contains('Jane Doe').should('not.exist');
    });
      
    it('should display only 6 cards per page after creating a new user', () => {
        cy.window().then((win) => {
          win.localStorage.setItem(
            'user',
            JSON.stringify({ id: 1, email: 'user@example.com' })
          );
          win.localStorage.setItem('token', 'fake-jwt-token');
        });
      
        cy.intercept('GET', 'https://reqres.in/api/users?page=1', {
          statusCode: 200,
          body: {
            data: [
              { id: 1, email: 'user1@example.com', first_name: 'User', last_name: 'One', avatar: 'https://via.placeholder.com/150' },
              { id: 2, email: 'user2@example.com', first_name: 'User', last_name: 'Two', avatar: 'https://via.placeholder.com/150' },
              { id: 3, email: 'user3@example.com', first_name: 'User', last_name: 'Three', avatar: 'https://via.placeholder.com/150' },
              { id: 4, email: 'user4@example.com', first_name: 'User', last_name: 'Four', avatar: 'https://via.placeholder.com/150' },
              { id: 5, email: 'user5@example.com', first_name: 'User', last_name: 'Five', avatar: 'https://via.placeholder.com/150' },
            ],
            total_pages: 1,
          },
        }).as('fetchUsers');
      
        cy.visit('/dashboard');
      
        cy.wait('@fetchUsers');
      
        cy.get('input[placeholder="First Name"]').type('New');
        cy.get('input[placeholder="Last Name"]').type('User');
        cy.get('input[placeholder="Email"]').type('new.user@example.com');
        cy.get('button[type="submit"]').click();
      
        cy.contains('New User').should('be.visible');
        cy.contains('new.user@example.com').should('be.visible');
      
        cy.get('[data-testid^="user-card-"]').should('have.length', 6);
    });
       
});
  