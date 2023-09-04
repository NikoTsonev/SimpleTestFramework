import { ElementHandle } from "puppeteer";
import { page } from "../hooks/hook";
import Settings from "../../appsettings.json";

export default abstract class BasePage {

  abstract getUrl(): string;
  abstract goto(): Promise<void>;

  async navigate(app: string, path: string) {
    if (!app) {
      await page.goto(`${Settings.BaseUrl}${path}`);
      return
    }

    let url = `${Settings.BaseUrl}${path}`.replace("www", "");
    var pageUrl = new URL(url)
    url = `${pageUrl.protocol}//${app}.${pageUrl.host}${pageUrl.pathname}`;

    await page.goto(url);
  }

  async getElementTextBySelector($selector: string): Promise<string> {
    const element = await page.waitForSelector($selector, { visible: true });

    if (!element) {
      return '';
    }
    return await page.$eval($selector, ele => (<HTMLElement>ele).innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim() || '');
  }

  async waitForSelectorAndClick($selector: string): Promise<void> {
    await page.waitForSelector($selector, { visible: true });
    await page.click($selector);
  }

  async waitForSelectorAndType($selector: string, value: string): Promise<void> {
    await page.waitForSelector($selector, { visible: true }).then(async () => {
      await page.type($selector, value);
    });
  }

  async getElementText($element: ElementHandle<Element>): Promise<string> {
    return await $element.evaluate(ele => (<HTMLElement>ele).textContent || '');
  }

  async findAndClickByText($selector: string, text: string) {
    const elements = await page.$$($selector);
    elements.forEach(async (ele) => {
      if (await this.getElementText(ele) == text)
        ele.click();
    });
  }
}

