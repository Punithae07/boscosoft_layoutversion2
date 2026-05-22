const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.html')) {
      let text = fs.readFileSync(p, 'utf8');
      text = text.replace(/href="\/src\//g, 'href="src/');
      text = text.replace(/src="\/src\//g, 'src="src/');
      fs.writeFileSync(p, text);
    }
  }
}

walk('.');
console.log('Fixed all CSS and JS paths to use relative URLs');
