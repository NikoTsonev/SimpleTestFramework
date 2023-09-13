import { ElementHandle, Page } from "puppeteer";
import Settings from "../../appsettings.json";

export default abstract class BasePage {

  private page: Page;
  abstract getUrl(): string;
  abstract goto(): Promise<void>;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(app: string, path: string) {
    if (!app) {
      await this.page.goto(`${Settings.BaseUrl}${path}`);
      return
    }

    let url = `${Settings.BaseUrl}${path}`.replace("www", "");
    var pageUrl = new URL(url)
    url = `${pageUrl.protocol}//${app}.${pageUrl.host}${pageUrl.pathname}`;

    await this.page.goto(url);
  }

  async getElementTextBySelector($selector: string): Promise<string> {
    await this.page.waitForSelector($selector, { visible: true });

    return await this.page.$eval($selector, ele => (<HTMLElement>ele).innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim() || '');
  }
  async getAttributeBySelector(attributeName: string, $selector: string): Promise<string> {
    await this.page.waitForSelector($selector, { visible: true });
    return await this.page.$eval($selector, ele => ele.getAttribute(attributeName) || '');
  }

  async waitForSelectorAndClick($selector: string): Promise<void> {
    await this.page.waitForSelector($selector, { visible: true });
    await this.page.click($selector);
  }

  async waitForSelectorAndType($selector: string, value: string): Promise<void> {
    await this.page.waitForSelector($selector, { visible: true }).then(async () => {
      await this.page.type($selector, value);
    });
  }

  async getElementText($element: ElementHandle<Element>): Promise<string> {
    return await $element.evaluate(ele => (<HTMLElement>ele).textContent || '');
  }

  async findAndClickByText($selector: string, text: string) {
    const elements = await this.page.$$($selector);
    elements.forEach(async (ele) => {
      if (await this.getElementText(ele) == text)
        ele.click();
    });
  }
}

