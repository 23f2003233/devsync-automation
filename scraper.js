name: Playwright Table Scraper

on:
  workflow_dispatch:
  schedule:
    - cron: '0 3 * * *'

jobs:
  scrape:
    runs-on: ubuntu-latest
    
    permissions:
      contents: write

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies for 23f2003233@ds.study.iitm.ac.in
        run: |
          npm init -y
          npm install playwright
          npx playwright install chromium --with-deps

      - name: Run Scraper
        run: node scraper.js | tee scraper_output.txt

      - name: Commit results
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          echo "Scraper run: $(date)" >> scraper_log.txt
          git add scraper_log.txt scraper_output.txt
          git commit -m "Scraper results $(date '+%Y-%m-%d %H:%M:%S')"
          git push https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git
