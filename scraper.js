const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Try different URL formats
    const urls = [
        'https://sanand0.github.io/tdsdata/table_sum.html?seed=75',
        'https://sanand0.github.io/tdsdata/?seed=75',
        'https://sanand0.github.io/tdsdata/table-sum.html?seed=75',
        'https://sanand0.github.io/tdsdata/tablesum.html?seed=75',
    ];
    
    for (const url of urls) {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        const title = await page.title();
        const status = await page.evaluate(() => document.title);
        console.log(`URL: ${url}`);
        console.log(`Title: ${title}`);
        console.log(`---`);
    }
    
    await browser.close();
})();
