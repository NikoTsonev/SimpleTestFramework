import { Browser, Page, launch } from "puppeteer";
import Settings from "../../appsettings.json";
const { BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);

let page: Page = new Page();
let browser: Browser = new Browser();

BeforeAll(async function () {
  browser = await launch({
    headless: Settings.Puppeteer.HeadlessMode,
    args: [Settings.Puppeteer.BrowserArguments],
    ignoreHTTPSErrors: true,
    dumpio: true,
  });
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