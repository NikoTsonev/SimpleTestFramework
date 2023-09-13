import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { page } from "../hooks/hook";
import { error } from "console";
import CareersPage from "../POM/pages/careersPage";

let careersPage: CareersPage;
Given('I am on the Careers page', async function () {
    careersPage = new CareersPage(page);
    await careersPage.goto();
});

When('I click on the Open careers button', async function () {
    await careersPage.clickOnOpenCareers();
});

When('I click on {string} button', async function (string) {
    await careersPage.clickOnCategory(string);
});

Then('I should see relevant {string} for category', async function (positions: string) {
    const po = await careersPage.getTextListOpenPositions();
    await expect(po).equal(positions);
});

When('I click on {string}', async function (position) {
    await careersPage.clickOnOpenCareers();
    await careersPage.clickOnCategory("All");
    await careersPage.extendPosition(position);
});

Then('I verify information about {string}', async function (position) {
    const href = await careersPage.clickOnLearnMore();
    switch (position) {
        case "BI Analyst": {
            expect(href).contains("BI-Analyst.pdf");
            break;
        }
        case "QA Automation Engineer": {
            expect(href).contains("QA-Automation-Engineer.pdf", `The ${page.url()} should contains "QA-Automation-Engineer.pdf"`);
            break;
        }
        case "Back-end Software Engineer": {
            expect(href).contains("Back-End_Software_Engineer.pdf");
            break;
        }
        case "Front-end Software Engineer": {
            expect(href).contains("Front-End_Software_Engineer.pdf");
            break;
        }
        case "Legal Counsel": {
            expect(href).contains("Legal_Counsel.pdf");
            break;
        }
        case "Product Implementation Consultant": {
            expect(href).contains("Product-implementation-consultant.pdf");
            break;
        }
        default:
            throw error(`Specified position ${position} not found in this context.`);
    }
});