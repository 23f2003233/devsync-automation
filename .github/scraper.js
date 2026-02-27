const { chromium } = require('playwright');

const seeds = [75, 76, 77, 78, 79, 80, 81, 82, 83, 84];

async function scrapeSum(page, seed) {
    const url = `https://sanand0.github.io/tdsdata/table_sum.html?seed=${seed}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    
    const numbers = await page.evaluate(() => {
        const cells = document.querySelectorAll('table td, table th');
        const nums = [];
        cells.forEach(cell => {
            const text = cell.innerText.trim();
            const num = parseFloat(text);
            if (!isNaN(num)) nums.push(num);
        });
        return nums;
    });
    
    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: sum = ${sum} (${numbers.length} numbers)`);
    return sum;
}

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    let totalSum = 0;
    
    for (const seed of seeds) {
        const sum = await scrapeSum(page, seed);
        totalSum += sum;
    }
    
    await browser.close();
    
    console.log(`\n${'='.repeat(50)}`);
    console.log(`TOTAL SUM = ${totalSum}`);
    console.log(`${'='.repeat(50)}`);
})();
```

---

### Step 4: Trigger the workflow

1. Go to **Actions** tab
2. Click **"Playwright Table Scraper"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait ~2 minutes
5. Click on the run → click **"scrape"** job → look for **"TOTAL SUM ="** in logs

---

### Step 5: Submit

Format:
```
https://github.com/23f2003233/devsync-automation ghp_your_token_here
