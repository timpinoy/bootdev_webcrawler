import { argv } from "node:process";

function main() {
  if (argv.length <= 2) {
    console.log('Missing BASE_URL parameter.');
  } else if (argv.length >= 4) {
    console.log('Too many parameters passed.');
  } else {
    console.log(`Crawling from ${argv[2]}`);
  }
}

main();