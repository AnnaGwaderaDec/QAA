export class homePage {
  logout() {
    cy.get("#open-navigation-menu-mobile").click();
    cy.get("nav > div:last-child > button").click();
  }
}
