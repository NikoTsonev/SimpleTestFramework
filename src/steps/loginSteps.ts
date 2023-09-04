import { Given, Then, When } from "@cucumber/cucumber";
import { MainPage } from "../POM/pages/mainPage.op";
import { LoginPage } from "../POM/pages/loginPage.po";
import { expect } from "chai";
import { page } from "../hooks/hook";
import  LoginTestData from "../../TestData/logInData.json";

const mainPage = new MainPage();
const loginPage = new LoginPage();

Given('I am on the Main page', async function () {
    await mainPage.goto();
});

When('I click on the Login button', async function () {
    await mainPage.clickOnLoginButton();
});

When('I enter valid email and password', async function () {
    await loginPage.login(LoginTestData.Credentials.Email, LoginTestData.Credentials.Password);
});

Then('I should login successfully', async function () {
     expect(page.url()).not.contain(loginPage.getUrl());
});

When('I enter invalid {string} and {string}', async function (email, password) {
   await loginPage.login(email, password);
});

Then('I should see {string}', async function (message) {
    expect(await loginPage.getErrorMessage()).equal(message)
});