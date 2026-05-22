const fs = require('fs');
const path = require('path');

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

// Get all root-level html files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

console.log('Checking links for root flat HTML files in the active 21 pages:\n');

for (const flatFile of files) {
  const linksToIt = [];
  for (const activePage of activeIndexPages) {
    if (!fs.existsSync(activePage)) continue;
    const content = fs.readFileSync(activePage, 'utf8');
    // We search for the file name in href attributes
    const regex = new RegExp(`href=["'][^"']*${flatFile}["']`, 'i');
    if (regex.test(content)) {
      linksToIt.push(activePage);
    }
  }
  if (linksToIt.length > 0) {
    console.log(`- ${flatFile} is LINKED from:`, linksToIt);
  } else {
    console.log(`- ${flatFile} is NOT LINKED anywhere in the active pages.`);
  }
}
