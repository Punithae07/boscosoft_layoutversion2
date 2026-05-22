const fs = require('fs');
const path = require('path');

function removeLogoFilter(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    
    if (stat.isDirectory() && f !== 'node_modules' && f !== '.git' && f !== 'public' && f !== 'src' && f !== 'scratch') {
      const indexPath = path.join(p, 'index.html');
      
      if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Remove filter from footer logo
        content = content.replace(
          /style="filter: brightness\(0\) invert\(1\); height: 40px; width: auto;"/,
          ''
        );
        
        fs.writeFileSync(indexPath, content);
        console.log('Removed filter from:', indexPath);
      }
      
      // Recurse into subdirectories
      removeLogoFilter(p);
    }
  }
}

removeLogoFilter('.');
console.log('Done! Removed brightness filters from all subpage footers.');
