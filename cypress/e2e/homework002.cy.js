describe("first case", () => {
  it("visit www", () => {
    cy.visit("https://www.edu.goit.global/account/login");
  });
  it("log in", () => {
    cy.visit("https://www.edu.goit.global/account/login");
    cy.get("#user_email").type("user888@gmail.com");
    cy.get("#user_password").type("1234567890");
    cy.get(".eckniwg2").click();
  });
  it("log out", () => {
    cy.visit("https://www.edu.goit.global/account/login");
    cy.get("#user_email").type("user888@gmail.com");
    cy.get("#user_password").type("1234567890");
    cy.get(".eckniwg2").click();
    cy.get("#open-navigation-menu-mobile").click();
    cy.get(":nth-child(12) > .next-bve2vl").click();
  });
});

// - I. Polecenie odnajdzie pole email i wpisze email **[user888@gmail.com](mailto:user888@gmail.com)**.
// - II. Wprowadzi hasło **1234567890**
// - III. Wciśnie przycisk **Log in**
// - IV. Znajdzie przycisk w prawym górnym rogu
