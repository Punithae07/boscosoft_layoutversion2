const fs = require('fs');
const path = require('path');

function walk(dir, list = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      if (['node_modules', '.git'].includes(entry)) continue;
      walk(full, list);
    } else if (entry.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

function getPrefix(filePath) {
  const relDir = path.dirname(path.relative('.', filePath));
  if (!relDir || relDir === '.') return '';
  return relDir.split(path.sep).map(() => '../').join('');
}

const htmlFiles = walk('.');
for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  const prefix = getPrefix(filePath);
  content = content.replace(/href="\/"/g, `href="${prefix}index.html"`);
  content = content.replace(/href="\//g, `href="${prefix}`);
  content = content.replace(/src="\//g, `src="${prefix}`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
}
console.log(`Processed ${htmlFiles.length} HTML files.`);
