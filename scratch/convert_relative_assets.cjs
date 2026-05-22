const fs = require('fs');

const files = [
  'services/bespoke-solutions/index.html',
  'services/digital-marketing/index.html',
  'services/staff-augmentation/index.html'
];

for (const file of files) {
  console.log(`\nAdjusting relative asset and link paths in ${file}...`);
  let content = fs.readFileSync(file, 'utf8');

  // We want to replace relative paths in src="..." and href="..."
  // but ONLY in the body (between </header> and <!-- GLOBAL FOOTER -->)
  // because the header and footer themselves will be replaced by the sync script!
  let bodyStart = content.indexOf('</header>');
  if (bodyStart === -1) {
    console.error(`ERROR: Could not find </header> in ${file}`);
    continue;
  }
  bodyStart += '</header>'.length;

  let bodyEnd = content.indexOf('<!-- GLOBAL FOOTER -->');
  if (bodyEnd === -1) {
    console.error(`ERROR: Could not find <!-- GLOBAL FOOTER --> in ${file}`);
    continue;
  }

  let body = content.substring(bodyStart, bodyEnd);

  // Prepend '../../' to relative href and src attributes in the body
  // Matches URLs that don't start with '#', 'http', 'https', 'tel:', 'mailto:', '//', or '../'
  const urlRegex = /(href|src)=\"(?!#|http|https|tel:|mailto:|\/\/|\.\.\/)([^\"]+)\"/g;
  
  body = body.replace(urlRegex, (match, attr, url) => {
    const updated = `${attr}="../../${url}"`;
    console.log(`  - Updated ${attr}="${url}" to "../../${url}"`);
    return updated;
  });

  content = content.substring(0, bodyStart) + body + content.substring(bodyEnd);
  
  fs.writeFileSync(file, content);
  console.log(`- Saved adjusted paths in ${file}!`);
}
