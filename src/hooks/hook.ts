import { Browser, Page, PuppeteerLaunchOptions, launch } from "puppeteer";
import Settings from "../../appsettings.json";
import { After, Status } from "@cucumber/cucumber";
const { BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);

let page: Page = new Page();
let browser: Browser = new Browser();

BeforeAll(async function () {
  let browserLaunchOptions: PuppeteerLaunchOptions = {
    headless: Settings.Puppeteer.HeadlessMode,
    args: [Settings.Puppeteer.BrowserArguments],
    ignoreHTTPSErrors: true,
    dumpio: true,
  };

  if (process.env.CHROME_PAHT) {
    browserLaunchOptions.executablePath = process.env.CHROME_PAHT;
  }

  browser = await launch(browserLaunchOptions);

  page = await browser.newPage();
  if (Settings.Puppeteer.UseCoverageReport) {
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage(),
      page.setViewport(
        {
          width: Settings.Puppeteer.Viewport.Width, height: Settings.Puppeteer.Viewport.Height
        })
    ]);
  }
});

After(async function ({ pickle, result }) {
  if (result?.status == Status.FAILED) {
    const img = await page.screenshot({ path: `reports\\${pickle.name}_${Date.now()}.png`, type: "png", fullPage: true });
    await this.attach(img, "image/png");
  }
});

AfterAll(async function () {
  if (Settings.Puppeteer.UseCoverageReport) {
    const pti = require('puppeteer-to-istanbul');
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);
    pti.write(jsCoverage);
    pti.write(cssCoverage);
  }

  return await browser.close();
});

export { page };