const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      if (['node_modules', '.git', 'public', 'src', 'scratch', 'dist'].includes(entry)) continue;
      files.push(...walk(full));
    } else if (entry.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walk('.');
console.log(`Total HTML files found: ${htmlFiles.length}\n`);

const results = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const hasHeaderStart = content.includes('<!-- GLOBAL HEADER & NAVIGATION -->');
  const hasHeaderEnd = content.includes('</header>');
  const hasFooterStart = content.includes('<!-- GLOBAL FOOTER -->');
  const hasFooterEnd = content.includes('</footer>');
  
  results.push({
    file,
    hasHeader: hasHeaderStart && hasHeaderEnd,
    hasFooter: hasFooterStart && hasFooterEnd,
    details: `Header: ${hasHeaderStart && hasHeaderEnd ? 'YES' : 'NO'}, Footer: ${hasFooterStart && hasFooterEnd ? 'YES' : 'NO'}`
  });
}

console.log('--- SCAN RESULTS ---');
results.forEach(r => {
  console.log(`${r.file}: ${r.details}`);
});
