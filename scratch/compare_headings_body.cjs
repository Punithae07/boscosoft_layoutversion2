const fs = require('fs');

function getBodyContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let bodyStart = content.indexOf('</header>');
  if (bodyStart === -1) bodyStart = content.indexOf('</nav>');
  else bodyStart += '</header>'.length;
  
  let bodyEnd = content.indexOf('<!-- GLOBAL FOOTER -->');
  if (bodyEnd === -1) bodyEnd = content.indexOf('<footer');
  
  if (bodyStart === -1 || bodyEnd === -1) return content;
  return content.substring(bodyStart, bodyEnd).trim();
}

const rootBody = getBodyContent('acme-erp.html');
const nestedBody = getBodyContent('platforms/acme-erp/index.html');

function getHeadings(html) {
  const matches = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
  return matches.map(m => m.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
}

console.log('--- ROOT BODY HEADINGS ---');
console.log(getHeadings(rootBody));

console.log('\n--- NESTED BODY HEADINGS ---');
console.log(getHeadings(nestedBody));
