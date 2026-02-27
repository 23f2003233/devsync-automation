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

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;
  for (const seed of seeds) {
    const sum = await scrapeSum(page, seed);
    totalSum += sum;
  }
  await browser.close();
  console.log('==================================================');
  console.log('TOTAL SUM = ' + totalSum);
  console.log('==================================================');
}

main();
