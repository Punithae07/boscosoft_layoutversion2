const fs = require('fs');

function getBodyContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find where header ends and footer starts
  let bodyStart = content.indexOf('</header>');
  if (bodyStart === -1) {
    bodyStart = content.indexOf('</nav>');
  } else {
    bodyStart += '</header>'.length;
  }
  
  let bodyEnd = content.indexOf('<!-- GLOBAL FOOTER -->');
  if (bodyEnd === -1) {
    bodyEnd = content.indexOf('<footer');
  }
  
  if (bodyStart === -1 || bodyEnd === -1) {
    return content;
  }
  
  return content.substring(bodyStart, bodyEnd).trim();
}

const rootBody = getBodyContent('acme-erp.html');
const nestedBody = getBodyContent('platforms/acme-erp/index.html');

console.log('--- root acme-erp.html body character count:', rootBody.length);
console.log('--- platforms/acme-erp/index.html body character count:', nestedBody.length);

console.log('\n--- ROOT ACME-ERP.HTML FIRST 500 CHARS OF BODY ---');
console.log(rootBody.substring(0, 500));

console.log('\n--- PLATFORMS/ACME-ERP/INDEX.HTML FIRST 500 CHARS OF BODY ---');
console.log(nestedBody.substring(0, 500));
