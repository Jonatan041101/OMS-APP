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

Cypress.Commands.add('getBySel', (selector, ...args) => {
	return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
	return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add('orderCard', (card,client,item,status) => {
	cy.wrap(card).find('a').should('be.visible');
	cy.wrap(card).find('a').should('contain.text', 'View Details');
	cy.wrap(card).find('p').first().should('contain.text', client);
	cy.wrap(card).find('p').eq(1).should('contain.text', item);
	cy.wrap(card).find('p').eq(2).should('contain.text', status);
});

Cypress.Commands.add("formFieldInput",(selector,label,placeholder)=>{
	cy.getBySel(selector).should('be.visible').within((field)=>{
		cy.wrap(field).find("label").should("contain.text",label)
		cy.wrap(field).find("input").should('have.attr', 'placeholder', placeholder)
	});
})

Cypress.Commands.add("formWriteInput",(selector,write)=>{
	cy.getBySel(selector).should('be.visible').within((field)=>{
		cy.wrap(field).find("input").type(write)
	});
})

Cypress.Commands.add("formFieldSelect",(selector,label,value)=>{
	cy.getBySel(selector).should('be.visible').within((field)=>{
		cy.wrap(field).find("label").should("contain.text",label)
		cy.wrap(field).find("select").should('have.value',  value)
	});
})

Cypress.Commands.add("orderUpdate",()=>{
	cy.getBySel('order-form-status').within((field) => {
		cy.wrap(field).find('select').select('completed');
	});
	cy.getBySel('order-form-button-submit')
		.should('be.visible')
		.and('contain.text', 'Update Order')
		.click();
	cy.getBySel('toast-container').contains('Order updated successfully.');
})