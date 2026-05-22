const fs = require('fs');

const rootContent = fs.readFileSync('acme-erp.html', 'utf8');
const nestedContent = fs.readFileSync('platforms/acme-erp/index.html', 'utf8');

function getHeadings(html) {
  const matches = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
  return matches.map(m => m.replace(/<[^>]+>/g, '').trim());
}

console.log('--- ROOT ACME HEADINGS ---');
console.log(getHeadings(rootContent).slice(0, 15));

console.log('\n--- NESTED ACME HEADINGS ---');
console.log(getHeadings(nestedContent).slice(0, 15));
