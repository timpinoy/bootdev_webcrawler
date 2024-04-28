import { argv } from "node:process";
import { crawlPage } from "./crawl.js";

async function main() {
  if (argv.length <= 2) {
    console.log('Missing BASE_URL parameter.');
  } else if (argv.length >= 4) {
    console.log('Too many parameters passed.');
  } else {
    const baseURL = argv[2];
    console.log(`Crawling from ${baseURL}`);;
    crawlPage(baseURL);
  }
}

main();