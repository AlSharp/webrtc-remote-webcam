const puppeteer = require('puppeteer');

module.exports = class Webcam {
  constructor() {
    this.browser = null;
  }

  async start() {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome',
        ignoreHTTPSErrors: true,
        args: [
          '--use-fake-ui-for-media-stream',
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
    
      const page = await this.browser.newPage();
      const address = process.env.NODE_ENV === 'production'
        ? 'https://localhost:5000/webcam'
        : 'https://localhost:3001'
      await page.goto(address, {waitUntil: 'domcontentloaded'});
    }
    catch(error) {
      console.log('error: ', error);
    }
  }

  async stop() {
    await this.browser.close();
    this.browser = null;
  }

  async restart() {
    await this.stop();
    await this.start();
  }
}