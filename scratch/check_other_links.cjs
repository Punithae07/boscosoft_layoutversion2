const fs = require('fs');

const activeIndexPages = [
  'index.html',
  'about-us/index.html',
  'careers/index.html',
  'contact/index.html',
  'industries/index.html',
  'leadership/index.html',
  'mission-vision/index.html',
  'platforms/acme-erp/index.html',
  'platforms/cristo-suite/index.html',
  'platforms/eaudithub/index.html',
  'platforms/higrade-solutions/index.html',
  'platforms/medsysb/index.html',
  'platforms/microfund/index.html',
  'platforms/smartschoolplus/index.html',
  'services/ai-transformation-automation/index.html',
  'services/cloud-infrastructure-support/index.html',
  'services/data-analytics-ai/index.html',
  'services/erp-crm-platform-implementation/index.html',
  'services/integration-digital-ecosystems/index.html',
  'services/saas-engineering-modernization/index.html',
  'services/technology-ecosystem-partnerships/index.html'
];

const targetFiles = [
  'acme-erp.html',
  'bespoke-solutions.html',
  'digital-marketing.html',
  'staff-augmentation.html',
  'smart-school-plus.html',
  'higrade.html',
  'medsysb.html',
  'cristo.html',
  'microfund.html',
  'eaudithub.html'
];

console.log('Searching for target files in body content (excluding headers/footers):\n');

for (const activePage of activeIndexPages) {
  if (!fs.existsSync(activePage)) continue;
  let content = fs.readFileSync(activePage, 'utf8');
  
  // Strip header and footer
  let bodyStart = content.indexOf('</header>');
  if (bodyStart === -1) bodyStart = 0;
  else bodyStart += '</header>'.length;
  
  let bodyEnd = content.indexOf('<!-- GLOBAL FOOTER -->');
  if (bodyEnd === -1) bodyEnd = content.indexOf('<footer');
  if (bodyEnd === -1) bodyEnd = content.length;
  
  const body = content.substring(bodyStart, bodyEnd);
  
  for (const target of targetFiles) {
    if (body.includes(target)) {
      console.log(`- Found "${target}" in the BODY of ${activePage}`);
    }
  }
}
