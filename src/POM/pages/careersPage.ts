import BasePage from "../basePage";
import { page } from "../../hooks/hook";


export default class CareersPage extends BasePage {

    private readonly $OpenPositionButton = "a[href='#open-positions']";
    private readonly $OpenPositionsList = "#module-jlfaq-205 > div > div[style=''] > a";
    private readonly $AllCategoryButton = "#module-jlfaq-205  ul  li[jl-filter-control=''] a";
    private readonly $DataCategoryButton = "#module-jlfaq-205  ul  li[jl-filter-control=\"[data-tag~='data']\"] a";
    private readonly $EngineeringCategoryButton = "#module-jlfaq-205  ul  li[jl-filter-control=\"[data-tag~='engineering']\"] a";
    private readonly $LegalCategoryButton = "#module-jlfaq-205  ul  li[jl-filter-control=\"[data-tag~='legal']\"] a";
    private readonly $ProductCategoryButton = "#module-jlfaq-205  ul  li[jl-filter-control=\"[data-tag~='product']\"] a";
    private readonly $LearnMoreButton = "#module-jlfaq-205 > div > div.tm-wrapper.jl-open > div.jl-accordion-content > div > div > a.jl-button.jl-button-primary";


    getUrl(): string {
        return "careers";
    }

    async goto(): Promise<void> {
        await this.navigate("", this.getUrl());
    }

    async clickOnOpenCareers() {
        await this.waitForSelectorAndClick(this.$OpenPositionButton);
    }

    async clickOnCategory(category: string) {
        switch (category) {
            case 'All':
                await this.waitForSelectorAndClick(this.$AllCategoryButton);
                return;
            case 'Data':
                await this.waitForSelectorAndClick(this.$DataCategoryButton);
                return;
            case 'Engineering':
                await this.waitForSelectorAndClick(this.$EngineeringCategoryButton);
                return;
            case 'Legal':
                await this.waitForSelectorAndClick(this.$LegalCategoryButton);
                return;
            case 'Product':
                await this.waitForSelectorAndClick(this.$ProductCategoryButton);
                return;
            default:
                throw new Error(`Category ${category} is not in this context.`);
        }
    }

    async getTextListOpenPositions(): Promise<string> {
        const elements = await this.GetAllPositions();
        const textPromises: Promise<string>[] = [];

        for (const element of elements) {
            textPromises.push(this.getElementText(element));
        }

        const textResults = await Promise.all(textPromises);
        const result = textResults.join(',');
        return result;
    }

    async extendPosition(position: string): Promise<void> {
        await page.waitForSelector(this.$OpenPositionsList);
        const elements = await this.GetAllPositions();

        for (const element of elements) {
            if (await this.getElementText(element) === position) {
                await element.click();
                return;
            }
        }
    }

    async clickOnLearnMore(): Promise<string> {
        await this.waitForSelectorAndClick(this.$LearnMoreButton);
        const button = await page.$(this.$LearnMoreButton);
        return await button?.evaluate(element => element.href) || '';
    }

    private async GetAllPositions() {
        await page.waitForSelector(this.$OpenPositionsList);
        const elements = await page.$$(this.$OpenPositionsList);
        return elements;
    }
}