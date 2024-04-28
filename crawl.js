//const { JSDOM } = require('jsdom')
import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const urlObj = new URL(url);
  if (urlObj.pathname.endsWith('/')) {
    return `${urlObj.host}${urlObj.pathname.slice(0, -1)}`;
  }
  return `${urlObj.host}${urlObj.pathname}`;
}

function getURLsFromHTML(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);
  const urlArray = [];

  for (const link of dom.window.document.querySelectorAll('a')) {
    const linkHREF = link.getAttribute('href');
    const fullUrl = new URL(linkHREF, baseUrl);
    urlArray.push(fullUrl.href);
  }
  return urlArray;
}

async function crawlPage(currentURL) {
  const response = await fetch(currentURL);
  if (response.status >= 400) {
    console.log(`Error status code: ${response.status}`);
    return;
  } else {
    const body = await response.text();
    console.log(body);
  }
}

export { normalizeURL, getURLsFromHTML, crawlPage }