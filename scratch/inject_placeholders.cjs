const fs = require('fs');
const path = require('path');

const files = [
  'services/bespoke-solutions/index.html',
  'services/digital-marketing/index.html',
  'services/staff-augmentation/index.html'
];

for (const file of files) {
  console.log(`\nProcessing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');

  // Replace Header/Navigation block
  const navStart = content.indexOf('<nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">');
  const heroStart = content.indexOf('<section class="service-hero-section');

  if (navStart === -1 || heroStart === -1) {
    console.error(`ERROR: Could not find navigation or hero section in ${file}`);
    continue;
  }

  const headerPlaceholder = `    <!-- GLOBAL HEADER & NAVIGATION -->\n    <header class="header" id="header">\n    </header>\n\n    `;
  content = content.substring(0, navStart) + headerPlaceholder + content.substring(heroStart);
  console.log(`- Successfully injected header placeholder!`);

  // Replace Footer block
  const footerStart = content.indexOf('<footer class="footer-section">');
  if (footerStart === -1) {
    console.error(`ERROR: Could not find footer section in ${file}`);
    continue;
  }

  // Find the closing footer tag AFTER the start of the footer
  const footerEndClose = content.indexOf('</footer>', footerStart);
  if (footerEndClose === -1) {
    console.error(`ERROR: Could not find closing footer tag in ${file}`);
    continue;
  }
  const footerEnd = footerEndClose + '</footer>'.length;

  const footerPlaceholder = `\n    <!-- GLOBAL FOOTER -->\n    <footer class="footer">\n    </footer>`;
  content = content.substring(0, footerStart) + footerPlaceholder + content.substring(footerEnd);
  console.log(`- Successfully injected footer placeholder!`);

  // Also replace stylesheet and script paths to point to src folder (../../src/...)
  content = content
    .replace('<link rel="stylesheet" href="css/style.css">', '<link rel="stylesheet" href="../../src/style.css" />\n    <link rel="stylesheet" href="../../src/animations.css" />')
    .replace('<link rel="stylesheet" href="css/style.css" />', '<link rel="stylesheet" href="../../src/style.css" />\n    <link rel="stylesheet" href="../../src/animations.css" />')
    .replace('<script src="js/script.js"></script>', '<script type="module" src="../../src/main.js"></script>')
    .replace('<script src="js/service-page.js"></script>', ''); // Remove old service-page.js since animations are handled globally by main.js

  fs.writeFileSync(file, content);
  console.log(`- Saved ${file}!`);
}
