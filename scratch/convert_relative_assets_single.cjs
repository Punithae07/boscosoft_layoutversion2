const fs = require('fs');

const files = [
  'services/bespoke-solutions/index.html',
  'services/digital-marketing/index.html',
  'services/staff-augmentation/index.html'
];

for (const file of files) {
  console.log(`\nChecking single-quoted paths in ${file}...`);
  let content = fs.readFileSync(file, 'utf8');

  let bodyStart = content.indexOf('</header>');
  if (bodyStart === -1) continue;
  bodyStart += '</header>'.length;

  let bodyEnd = content.indexOf('<!-- GLOBAL FOOTER -->');
  if (bodyEnd === -1) continue;

  let body = content.substring(bodyStart, bodyEnd);

  // Prepend '../../' to relative href and src attributes with single quotes
  const urlRegexSingle = /(href|src)=\'(?!#|http|https|tel:|mailto:|\/\/|\.\.\/)([^\']+)\'/g;
  
  let replaced = false;
  body = body.replace(urlRegexSingle, (match, attr, url) => {
    const updated = `${attr}='../../${url}'`;
    console.log(`  - Updated single-quoted ${attr}='${url}' to "../../${url}"`);
    replaced = true;
    return updated;
  });

  if (replaced) {
    content = content.substring(0, bodyStart) + body + content.substring(bodyEnd);
    fs.writeFileSync(file, content);
    console.log(`- Saved adjusted paths in ${file}!`);
  } else {
    console.log(`- No single-quoted relative paths found.`);
  }
}
