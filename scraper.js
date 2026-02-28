const { chromium } = require('playwright');

const seeds = [75, 76, 77, 78, 79, 80, 81, 82, 83, 84];

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Test with just seed 75 first
    const url = `https://sanand0.github.io/tdsdata/table_sum.html?seed=75`;
    console.log(`Visiting: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    
    // Get full page HTML to debug
    const html = await page.content();
    console.log(`Page HTML (first 2000 chars):`);
    console.log(html.substring(0, 2000));
    
    // Count tables
    const tableCount = await page.evaluate(() => document.querySelectorAll('table').length);
    console.log(`Number of tables found: ${tableCount}`);
    
    // Count all cells
    const cellCount = await page.evaluate(() => document.querySelectorAll('td').length);
    console.log(`Number of td cells: ${cellCount}`);
    
    // Get all text content
    const allText = await page.evaluate(() => document.body.innerText);
    console.log(`Page text: ${allText.substring(0, 1000)}`);
    
    await browser.close();
})();
