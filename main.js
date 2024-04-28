import { argv } from "node:process";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  if (argv.length <= 2) {
    console.log('Missing BASE_URL parameter.');
  } else if (argv.length >= 4) {
    console.log('Too many parameters passed.');
  } else {
    const baseURL = argv[2];
    console.log(`Crawling from ${baseURL}`);;
    const pages = await crawlPage(baseURL);
    printReport(pages);
  }
}

main();