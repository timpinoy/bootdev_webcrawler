import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('Normalize https://blog.boot.dev/path/', () => {
  expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('Normalize https://blog.boot.dev/path', () => {
  expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('Normalize http://blog.boot.dev/path/', () => {
  expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('Normalize http://blog.boot.dev/path', () => {
  expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});


test('Test getURLsFromHTML with multiple', () => {
  let html = '<html><body><a href="/link"><span>Go to Boot.dev link</span></a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>';
  let expected = [ 'https://blog.boot.dev/link', 'https://blog.boot.dev/'];
  let result = getURLsFromHTML(html, 'https://blog.boot.dev');
  expect(result).toEqual(expected);
});

test('Test getURLsFromHTML with absolute', () => {
  let html = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>';
  let expected = [ 'https://blog.boot.dev/' ];
  let result = getURLsFromHTML(html, 'https://blog.boot.dev');
  expect(result).toEqual(expected);
});

test('Test getURLsFromHTML with relative', () => {
  let html = '<html><body><a href="/link"><span>Go to Boot.dev link</span></a></body></html>';
  let expected = [ 'https://blog.boot.dev/link' ];
  let result = getURLsFromHTML(html, 'https://blog.boot.dev');
  expect(result).toEqual(expected);
});