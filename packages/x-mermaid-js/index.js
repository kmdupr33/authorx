const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

module.exports = () => ({
  "~": async (text, args, outputDir) => {
    const puppeteerConfig = require("./puppeteer-config");
    const browser = await puppeteer.launch(puppeteerConfig);
    const page = await makePage(browser, puppeteerConfig);
    const result = await page.$eval("#container", initializeMermaid, text);
    if (result.status === "error") {
      throw new Error(result.message);
    }
    const svg = await page.$eval(
      "#container",
      (container) => container.innerHTML
    );
    const fileName = (args && args[0].value) || "diagram.svg";
    const dest = path.resolve(outputDir, fileName);
    fs.writeFileSync(dest, svg);
    await browser.close();
    return `![](/${fileName})`;
  },
});
const initializeMermaid = (container, text) => {
  container.textContent = text;
  try {
    window.mermaid.init(undefined, container);
    return { status: "success" };
  } catch (error) {
    return { status: "error", error, message: error.message };
  }
};

async function makePage(browser, puppeteerConfig) {
  const page = await browser.newPage();
  page.setViewport({ width: 600, height: 600, deviceScaleFactor: 1 });
  await page.goto(`file://${path.join(__dirname, "index.html")}`);
  await page.evaluate(`document.body.style.background = 'white'`);
  return page;
}
