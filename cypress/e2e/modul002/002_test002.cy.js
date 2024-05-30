describe("second test", () => {
  it("visit www, log in, log out", () => {
    cy.visit("https://www.edu.goit.global/account/login");
    cy.login("testowyqa@qa.team", "QA!automation-1");
    cy.get("#open-navigation-menu-mobile").click();
    cy.get("nav > div:last-child > button").click();
  });
});
