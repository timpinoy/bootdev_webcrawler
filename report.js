function printReport(pages) {
  const sortedPages = sortPages(pages);
  for (const [url, count] of Object.entries(sortedPages)) {
    console.log(`Found ${count} internal links to ${url}`)
  }
}

function sortPages(pages) {
  return Object.fromEntries(
    Object.entries(pages).sort((a, b) => b[1] - a[1])
  );
}

export { printReport }