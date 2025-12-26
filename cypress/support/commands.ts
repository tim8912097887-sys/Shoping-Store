/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Define the interface so TypeScript recognizes 'cy.login'
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in via API request
       * @example cy.login('username', 'password')
       */
      login(username: string, password: string): Chainable<void>;
    }
  }
}

// Custom command for login
Cypress.Commands.add('login',(username,password) => {
    // Clear any existing session data
    cy.clearAllLocalStorage();

    cy.request('POST','https://dummyjson.com/user/login',{
        username,
        password
    }).then(res => {
        localStorage.setItem("auth_token",res.body.accessToken);
        localStorage.setItem("currentUser",res.body.username);
    })
})