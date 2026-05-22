const fs = require('fs');
const path = require('path');

function fixImagePaths(dir, isRoot = true) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'public') {
        fixImagePaths(p, false);
      }
    } else if (p.endsWith('.html') || p.endsWith('.css')) {
      let text = fs.readFileSync(p, 'utf8');
      
      if (isRoot) {
        // Root level files: use public/images/
        text = text.replace(/url\('\/images\//g, "url('public/images/");
        text = text.replace(/url\("\/images\//g, 'url("public/images/');
        text = text.replace(/src="\/images\//g, 'src="public/images/');
      } else {
        // Subdirectory files: use ../public/images/
        text = text.replace(/url\('\/images\//g, "url('../public/images/");
        text = text.replace(/url\("\/images\//g, 'url("../public/images/');
        text = text.replace(/src="\/images\//g, 'src="../public/images/');
        text = text.replace(/src='\/images\//g, "src='../public/images/");
      }
      
      fs.writeFileSync(p, text);
    }
  }
}

fixImagePaths('.');
console.log('Fixed all image paths!');
