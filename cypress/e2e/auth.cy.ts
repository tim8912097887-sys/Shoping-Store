
describe('Authentication Flow', () => {
  // Cypress need to know where app running
  beforeEach(() => {
    cy.visit('/')
  })
  it('Should login successfully and redirect to home page', () => {
        // Go to the login page if is not default
        cy.contains(/login/i).click();
        // Input the correct username and password
        cy.get('input[name="username"]').type('emilys');
        cy.get('input[name="password"]').type('emilyspass');
        // Click the submit button
        cy.get('button[type="submit"]').click();

        // Assertion
        // Verify redirect to the home page after successfully login
        cy.url().should('eq',Cypress.config().baseUrl+'/');
        // Verify TitleBar updated to show up the logout button instead of login
        cy.contains(/login/i).should('not.exist');
        cy.contains(/logout/i).should('be.visible');
  })

  it('Should logout successfully and redirect to login page', () => {
       // Because this does not trigger rerender so after this should visit the home page again  
       cy.login('emilys','emilyspass');
       cy.visit('/');
       // logout
       cy.contains(/logout/i).click();
       // Verify redirect to correct url and Title Bar updated to login and signup button instead of logout button
       cy.url().should('eq',Cypress.config().baseUrl+'/login');
       cy.contains(/login/i).should('be.visible');  
       cy.contains(/signup/i).should('be.visible');
       cy.contains(/logout/i).should('not.exist');  
  })
})