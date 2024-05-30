import { Login } from "../../pages/Login";
import { homePage } from "../../pages/homePage";

const loginPage = new Login();
const HomePage = new homePage();

describe("testing the login page", () => {
  it("login and logout", () => {
    // visit page
    loginPage.visit();
    // login with valid data
    loginPage.login("testowyqa@qa.team", "QA!automation-1");
    HomePage.logout();
  });
});
