const fs = require('fs');

const homePage = fs.readFileSync('index.html', 'utf8');

const headerStart = homePage.indexOf('<!-- GLOBAL HEADER & NAVIGATION -->');
const headerEnd = homePage.indexOf('</header>') + '</header>'.length;
const footerStart = homePage.indexOf('<!-- GLOBAL FOOTER -->');
const footerEnd = homePage.indexOf('</footer>') + '</footer>'.length;

const header = homePage.substring(headerStart, headerEnd);
const footer = homePage.substring(footerStart, footerEnd);

function findLinks(html, name) {
  const matches = html.match(/href=["']([^"']*\.html[^"']*)["']/g) || [];
  console.log(`\n--- Links in ${name} ---`);
  matches.forEach(m => console.log(m));
}

findLinks(header, 'Header');
findLinks(footer, 'Footer');
