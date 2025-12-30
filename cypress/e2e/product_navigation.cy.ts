
describe("Product Navigation and Filtering",() => {

    // Login before each test or we can't visit the home page
    beforeEach(() => {
        cy.login("emilys","emilyspass");
        cy.visit("/");
    })
    
    it('Should filter products by category and reset page to 0', () => {
        // Select a category from dropdown
        cy.get("select").select("beauty");
        // Verify URL contain correct category
        cy.url().should('include','category=beauty');
        // Verify URL contain page 0
        cy.url().should('include','page=0');
        // Verify product list have products
        cy.get("div.flex-wrap").children().should('have.length.at.least',1);
    })

    it('Should navigate through pagination and update the URL', () => {
        // Should contain no query string when first load
         cy.url().should('include','/');
         cy.get("[data-testid='current-page']").should('have.text',"1");
        // Click the next button change the page
         cy.get("[data-testid='next-link']").click();
        // Wait for the api call
        cy.get("[data-testid='page-loader']").should('not.exist');
        // Verify URL state and content value
        cy.url().should('include','page=1');
        cy.get("[data-testid='current-page']").should('have.text',"2");
        // Verify previous button is able now
        cy.get("[data-testid='previous-link']").should('be.visible');
    })

    it('Should maintain the category state in URL when navigate between page', () => {
        // Select groceries as default category
        cy.get("select").select("groceries");
        // Verify the URL state
        cy.url().should('include',"category=groceries");
        cy.url().should('include',"page=0");
        // Click next button 
        cy.get("[data-testid='next-link']").click();
        // Verify the category is same in the URL
        cy.url().should('include',"category=groceries");
        cy.url().should('include',"page=1");
    })
})