const fs = require('fs');

const files = [
  'bespoke-solutions.html',
  'digital-marketing.html',
  'staff-augmentation.html'
];

for (const file of files) {
  console.log(`\n================ ${file} ================`);
  const content = fs.readFileSync(file, 'utf8');
  
  // Find all `<nav` and `</nav>` occurrences
  let navIndex = 0;
  let pos = 0;
  while ((pos = content.indexOf('<nav', pos)) !== -1) {
    const endOfTag = content.indexOf('>', pos);
    console.log(`NAV START #${++navIndex} at index ${pos}: ${content.substring(pos, endOfTag + 1)}`);
    pos = endOfTag;
  }
  
  let closeNavIndex = 0;
  pos = 0;
  while ((pos = content.indexOf('</nav>', pos)) !== -1) {
    console.log(`NAV CLOSE #${++closeNavIndex} at index ${pos}`);
    pos += 6;
  }
  
  // Find all `<footer` and `</footer>` occurrences
  let footerIndex = 0;
  pos = 0;
  while ((pos = content.indexOf('<footer', pos)) !== -1) {
    const endOfTag = content.indexOf('>', pos);
    console.log(`FOOTER START #${++footerIndex} at index ${pos}: ${content.substring(pos, endOfTag + 1)}`);
    pos = endOfTag;
  }
  
  let closeFooterIndex = 0;
  pos = 0;
  while ((pos = content.indexOf('</footer>', pos)) !== -1) {
    console.log(`FOOTER CLOSE #${++closeFooterIndex} at index ${pos}`);
    pos += 9;
  }
}
