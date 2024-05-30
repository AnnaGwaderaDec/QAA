describe("first test", () => {
  it("visit www, log in, log out", () => {
    cy.visit("https://www.edu.goit.global/account/login");
    cy.login("user888@gmail.com", "1234567890");
    cy.get("#open-navigation-menu-mobile").click();
    cy.get(":nth-child(12) > .next-bve2vl").click();
  });
});
