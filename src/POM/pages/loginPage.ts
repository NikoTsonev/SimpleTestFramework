import { page } from "../../hooks/hook";
import BasePage from "../basePage";

export default class LoginPage extends BasePage {

    private readonly $mailInputSelector = "#Email";
    private readonly $passwordInputSelector = "#Password";
    private readonly $LoginButtonSelector = "#loginBtn";
    private readonly $errorMessageContainer = "#mainForm div div.error";

    getUrl(): string {
        return "Account/Login";
    };

    async goto(): Promise<void> {
        await this.navigate("marketplace", this.getUrl());
    }

    async enterEmail(email: string) {
        await this.waitForSelectorAndType(this.$mailInputSelector, email);
    }

    async enterPassword(password: string) {
        await this.waitForSelectorAndType(this.$passwordInputSelector, password);
    }

    async clickOnLoginButton() {
        await page.click(this.$mailInputSelector);
        await this.waitForSelectorAndClick(this.$LoginButtonSelector)
    }

    async login(email: string, Password: string) {
        await this.enterEmail(email);
        await this.enterPassword(Password);
        await this.clickOnLoginButton();
    }

    async getErrorMessage(): Promise<string> {
        return await this.getElementTextBySelector(this.$errorMessageContainer);
    }
    
}