import { Given, Then, When } from "@cucumber/cucumber";
import { CareersPage } from "../POM/pages/careersPage.po";
import { expect } from "chai";
import { page } from "../hooks/hook";
import { error } from "console";

const careersPage = new CareersPage();

Given('I am on the Careers page', async function () {
    await careersPage.goto();
});

When('I click on the Open careers button', async function () {
    await careersPage.clickOnOpenCareers();
});

When('I click on {string} button', async function (string) {
    await careersPage.clickOnCategory(string);
});

Then('I should see relevant {string} for {string}', async function (positions: string, category) {
    const po = await careersPage.getTextListOpenPositions();
    await expect(po).equal(positions);
});

When('I click on {string}', async function (position) {
    await careersPage.clickOnOpenCareers();
    await careersPage.clickOnCategory("All");
    await careersPage.extendPosition(position);
});

Then('I verify information about {string}', async function (position) {
    await careersPage.clickOnLearnMore();
    switch (position) {
        case "BI Analyst": {
            expect(page.url()).contains("BI-Analyst.pdf");
            break;
        }
        case "QA Automation Engineer": {
            expect(await page.url()).contains("QA-Automation-Engineer.pdf");
            break;
        }
        case "Back-end Software Engineer": {
            expect(await page.url()).contains("Back-End_Software_Engineer.pdf");
            break;
        }
        case "Front-end Software Engineer": {
            expect(await page.url()).contains("Front-End_Software_Engineer.pdf");
            break;
        }
        case "Legal Counsel": {
            expect(await page.url()).contains("Legal_Counsel.pdf");
            break;
        }
        case "Product Implementation Consultant": {
            expect(await page.url()).contains("Product-implementation-consultant.pdf");
            break;
        }
        default:
            throw error(`Specified position ${position} not found in this context.`);
    }
});