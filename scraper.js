const { chromium } = require('playwright');

const seeds = [75, 76, 77, 78, 79, 80, 81, 82, 83, 84];

async function scrapeSum(browser, seed) {
    const page = await browser.newPage();
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    
    try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
        
        const numbers = await page.evaluate(() => {
            const cells = document.querySelectorAll('table td, table th');
            const nums = [];
            cells.forEach(cell => {
                const text = cell.innerText.trim().replace(/,/g, '');
                const num = parseFloat(text);
                if (!isNaN(num)) nums.push(num);
            });
            return nums;
        });
        
        const sum = numbers.reduce((a, b) => a + b, 0);
        console.log(`Seed ${seed}: sum = ${sum} (${numbers.length} numbers)`);
        await page.close();
        return sum;
    } catch (e) {
        console.log(`Seed ${seed}: ERROR - ${e.message}`);
        await page.close();
        return 0;
    }
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    
    let totalSum = 0;
    
    for (const seed of seeds) {
        const sum = await scrapeSum(browser, seed);
        totalSum += sum;
    }
    
    await browser.close();
    
    console.log(`\n==================================================`);
    console.log(`TOTAL SUM = ${totalSum}`);
    console.log(`==================================================`);
})();
