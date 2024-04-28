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

async function fetchPage(url) {
  const response = await fetch(url);
  if (response.status >= 400) {
    console.log(`Error status code: ${response.status}`);
    return [];
  } else {
    const body = await response.text();
    return getURLsFromHTML(body, url);
  }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const normalizedCurrentURL = normalizeURL(currentURL);
  const baseDomain = (new URL(baseURL)).host;
  const currentDomain = (new URL(currentURL)).host;
  if (baseDomain !== currentDomain) {
    return pages;
  }
  if (normalizedCurrentURL in pages) {
    pages[normalizedCurrentURL] += 1;
    return pages;
  } else {
    pages[normalizedCurrentURL] = 1;
  }
  
  const urls = await fetchPage(currentURL);
  for (const url of urls) {
    pages = await crawlPage(baseURL, url, pages);
  }

  return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage }