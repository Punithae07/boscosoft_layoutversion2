const fs = require('fs');
const path = require('path');

function addHeaderFooterComments(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    
    if (stat.isDirectory() && f !== 'node_modules' && f !== '.git' && f !== 'public' && f !== 'src' && f !== 'scratch') {
      const indexPath = path.join(p, 'index.html');
      
      if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Add header comment if missing
        if (!content.includes('<!-- GLOBAL HEADER & NAVIGATION -->')) {
          content = content.replace(
            /<header class="header" id="header">/,
            '    <!-- GLOBAL HEADER & NAVIGATION -->\n    <header class="header" id="header">'
          );
        }
        
        // Add footer comment if missing
        if (!content.includes('<!-- GLOBAL FOOTER -->')) {
          content = content.replace(
            /<footer class="footer">/,
            '      <!-- GLOBAL FOOTER -->\n    <footer class="footer">'
          );
        }
        
        fs.writeFileSync(indexPath, content);
        console.log('Added comments to:', indexPath);
      }
      
      // Recurse into subdirectories
      addHeaderFooterComments(p);
    }
  }
}

addHeaderFooterComments('.');
console.log('Done! Added header/footer comments to all subpages.');
