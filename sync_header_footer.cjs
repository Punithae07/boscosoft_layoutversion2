const fs = require('fs');
const path = require('path');

const homePage = fs.readFileSync('./index.html', 'utf8');
const headerStart = homePage.indexOf('<!-- GLOBAL HEADER & NAVIGATION -->');
const headerEnd = homePage.indexOf('</header>') + '</header>'.length;
const footerStart = homePage.indexOf('<!-- GLOBAL FOOTER -->');
const footerEnd = homePage.indexOf('</footer>') + '</footer>'.length;

if (headerStart === -1 || headerEnd === -1 || footerStart === -1 || footerEnd === -1) {
  throw new Error('Could not find header or footer markers in index.html');
}

const homeHeader = homePage.substring(headerStart, headerEnd);
const homeFooter = homePage.substring(footerStart, footerEnd);

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function prefixRelativePaths(html, prefix) {
  const safePrefix = prefix === '' ? '' : toPosix(prefix.endsWith('/') ? prefix : `${prefix}/`);

  return html
    .replace(/(href|src)=\"(?!#|\/|[a-zA-Z0-9+.-]+:|\/\/)([^\"]+)\"/g, (match, attr, url) => {
      return `${attr}="${safePrefix}${url}"`;
    })
    .replace(/url\('(?!#|\/|[a-zA-Z0-9+.-]+:|\/\/)([^']+)'\)/g, (match, url) => {
      return `url('${safePrefix}${url}')`;
    });
}

function getRelativePrefix(filePath) {
  const rel = path.relative(path.dirname(filePath), '.');
  if (!rel || rel === '.') {
    return '';
  }
  return toPosix(rel) + '/';
}

function updateSubpageHeaderFooter(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const entryPath = path.join(dir, entry);
    const stat = fs.statSync(entryPath);
    if (!stat.isDirectory()) continue;
    if (['node_modules', '.git', 'public', 'src', 'scratch'].includes(entry)) continue;

    const indexPath = path.join(entryPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, 'utf8');
      const prefix = getRelativePrefix(indexPath);
      const updatedHeader = prefixRelativePaths(homeHeader, prefix);
      const updatedFooter = prefixRelativePaths(homeFooter, prefix);

      const oldHeaderStart = content.indexOf('<!-- GLOBAL HEADER & NAVIGATION -->');
      const oldHeaderEnd = content.indexOf('</header>') + '</header>'.length;
      if (oldHeaderStart !== -1 && oldHeaderEnd !== -1) {
        content = content.substring(0, oldHeaderStart) + updatedHeader + content.substring(oldHeaderEnd);
      }

      const oldFooterStart = content.indexOf('<!-- GLOBAL FOOTER -->');
      const oldFooterEnd = content.indexOf('</footer>') + '</footer>'.length;
      if (oldFooterStart !== -1 && oldFooterEnd !== -1) {
        content = content.substring(0, oldFooterStart) + updatedFooter + content.substring(oldFooterEnd);
      }

      fs.writeFileSync(indexPath, content);
      console.log('Updated:', indexPath);
    }

    updateSubpageHeaderFooter(entryPath);
  }
}

updateSubpageHeaderFooter('.');
console.log('Done! Updated subpage headers and footers from index.html.');
