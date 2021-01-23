const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/google-chrome',
    ignoreHTTPSErrors: true,
    args: [
      '--use-fake-ui-for-media-stream',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://localhost:3000', {waitUntil: 'domcontentloaded'});
  await new Promise((resolve, reject) => setTimeout(resolve, 5000));
  await page.screenshot({
    path: '/home/albert/share/screenshot.jpeg',
    type: 'jpeg',
    fullPage: true,
    quality: 95
  });
  return browser.close();
})()