const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function testSite() {
  console.log('--- Launching End-to-End Automated Browser Test ---');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--use-angle=default',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--window-size=1920,1080',
    ],
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    if (msg.type() === 'error') {
      console.error('BROWSER CONSOLE ERROR:', msg.text());
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
    console.error('BROWSER PAGE ERROR:', err.message);
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for 3D model and loading screen to complete
  console.log('Waiting for loading screen transition...');
  await new Promise((r) => setTimeout(r, 2500));

  await page.screenshot({ path: 'test_hero.png', fullPage: false });
  console.log('Captured test_hero.png');

  // Scroll to Showcase section
  console.log('Scrolling to #showcase ...');
  await page.evaluate(() => {
    document.querySelector('#showcase')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: 'test_showcase.png', fullPage: false });
  console.log('Captured test_showcase.png');

  // Scroll to Performance section
  console.log('Scrolling to #performance ...');
  await page.evaluate(() => {
    document.querySelector('#performance')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: 'test_performance.png', fullPage: false });
  console.log('Captured test_performance.png');

  // Scroll to Configurator section
  console.log('Scrolling to #configurator ...');
  await page.evaluate(() => {
    document.querySelector('#configurator')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: 'test_configurator.png', fullPage: false });
  console.log('Captured test_configurator.png');

  // Test interactive configurator buttons
  console.log('Testing Configurator paint color change ...');
  const clickedColor = await page.evaluate(() => {
    // Look for button title containing "Red"
    const buttons = Array.from(document.querySelectorAll('button'));
    const redBtn = buttons.find((b) => b.getAttribute('title')?.includes('Red'));
    if (redBtn) {
      redBtn.click();
      return true;
    }
    return false;
  });
  console.log('Clicked Guards Red button:', clickedColor);
  await new Promise((r) => setTimeout(r, 800));

  // Test Camera Preset button
  const clickedPreset = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const rearBtn = buttons.find((b) => b.textContent?.includes('REAR AERO'));
    if (rearBtn) {
      rearBtn.click();
      return true;
    }
    return false;
  });
  console.log('Clicked REAR AERO camera preset:', clickedPreset);
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: 'test_configurator_red_rear.png', fullPage: false });
  console.log('Captured test_configurator_red_rear.png');

  await browser.close();

  console.log('\n--- Test Summary ---');
  console.log('Total console messages:', consoleMessages.length);
  console.log('Total page errors:', pageErrors.length);
  if (pageErrors.length === 0) {
    console.log('VERIFICATION PASSED: ZERO RUNTIME JAVASCRIPT ERRORS!');
  } else {
    console.error('FAILED WITH ERRORS:', pageErrors);
  }
}

testSite().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});

