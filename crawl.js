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

export { normalizeURL, getURLsFromHTML }