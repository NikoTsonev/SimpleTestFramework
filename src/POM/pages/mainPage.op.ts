import BasePage from "../basePage";

class MainPage extends BasePage {

     async goto(): Promise<void> {
       await this.navigate('','')
    }

    protected readonly loginButtonSelector = "#custom-8397-particle a.jl-button.jl-button-white-negative";

    getUrl(): string {
        return "";
    }

    async clickOnLoginButton() {
        await this.waitForSelectorAndClick(this.loginButtonSelector);
    }
}

export { MainPage };