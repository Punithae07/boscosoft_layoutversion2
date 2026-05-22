const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      if (entry === 'node_modules' || entry === '.git') continue;
      files.push(...walk(full));
    } else if (entry.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walk('.');
const rootFiles = htmlFiles.filter(f => path.dirname(f) === '.').filter(f => path.basename(f) !== 'index.html');

for (const file of rootFiles) {
  const name = path.basename(file);
  const regex = new RegExp(name.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'g');
  const referenced = htmlFiles.some(f => {
    const content = fs.readFileSync(f, 'utf8');
    return regex.test(content);
  });
  if (!referenced) console.log('UNLINKED:', name);
}
