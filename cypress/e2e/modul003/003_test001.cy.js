import { Login } from "../../pages/Login";
import { homePage } from "../../pages/homePage";

const loginPage = new Login();
const HomePage = new homePage();

describe("testing the login page", () => {
  it("login and logout", () => {
    // visit page
    loginPage.visit();
    // login with valid data
    loginPage.login("user888@gmail.com", "1234567890");
    HomePage.logout();
  });
});
