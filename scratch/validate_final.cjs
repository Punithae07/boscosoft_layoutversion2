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
  'services/bespoke-solutions/index.html',
  'services/cloud-infrastructure-support/index.html',
  'services/data-analytics-ai/index.html',
  'services/digital-marketing/index.html',
  'services/erp-crm-platform-implementation/index.html',
  'services/integration-digital-ecosystems/index.html',
  'services/saas-engineering-modernization/index.html',
  'services/staff-augmentation/index.html',
  'services/technology-ecosystem-partnerships/index.html'
];

let totalChecks = 0;
let failedChecks = 0;
const errors = [];

function checkLink(sourceFile, attr, originalUrl) {
  // Ignore external links, mailto, tel, and JS voids
  if (
    originalUrl.startsWith('http://') ||
    originalUrl.startsWith('https://') ||
    originalUrl.startsWith('mailto:') ||
    originalUrl.startsWith('tel:') ||
    originalUrl.startsWith('javascript:') ||
    originalUrl === '#' ||
    originalUrl === ''
  ) {
    return;
  }

  totalChecks++;

  // Separate query parameters first
  const urlWithoutQuery = originalUrl.split('?')[0];

  // Separate hash/anchor if any
  const parts = urlWithoutQuery.split('#');
  const filePart = parts[0];
  const hashPart = parts[1];

  let targetPath;
  if (filePart === '') {
    // Local hash on the same file
    targetPath = sourceFile;
  } else {
    // Path relative to the source file
    targetPath = path.normalize(path.join(path.dirname(sourceFile), filePart));
  }

  // Check if file exists
  if (!fs.existsSync(targetPath)) {
    failedChecks++;
    errors.push({
      source: sourceFile,
      attribute: attr,
      url: originalUrl,
      resolvedPath: targetPath,
      reason: 'File does not exist'
    });
    return;
  }

  // If there's a hash, check if the ID exists in the target file
  if (hashPart) {
    const targetContent = fs.readFileSync(targetPath, 'utf8');
    // Simple regex to check for id="hashPart" or id='hashPart'
    const idRegex = new RegExp(`id=["']${hashPart}["']`, 'i');
    const nameRegex = new RegExp(`name=["']${hashPart}["']`, 'i');
    
    if (!idRegex.test(targetContent) && !nameRegex.test(targetContent)) {
      failedChecks++;
      errors.push({
        source: sourceFile,
        attribute: attr,
        url: originalUrl,
        resolvedPath: targetPath,
        reason: `Element with id/name="${hashPart}" not found in target file`
      });
    }
  }
}

console.log('--- STARTING COMPREHENSIVE LINK VALIDATION ---\n');

for (const page of activeIndexPages) {
  if (!fs.existsSync(page)) {
    console.error(`ERROR: Active page listed in configuration does not exist: ${page}`);
    failedChecks++;
    errors.push({
      source: 'config',
      attribute: 'path',
      url: page,
      resolvedPath: page,
      reason: 'Active page file itself is missing!'
    });
    continue;
  }

  const content = fs.readFileSync(page, 'utf8');

  // Extract all href attributes
  const hrefRegex = /href=["']([^"']*)["']/gi;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    checkLink(page, 'href', match[1]);
  }

  // Extract all src attributes
  const srcRegex = /src=["']([^"']*)["']/gi;
  while ((match = srcRegex.exec(content)) !== null) {
    checkLink(page, 'src', match[1]);
  }
}

console.log(`Validation Complete. Checked ${totalChecks} relative links/assets.`);
if (failedChecks > 0) {
  console.log(`\n❌ FOUND ${failedChecks} ERRORS:\n`);
  errors.forEach((err, idx) => {
    console.log(`${idx + 1}. [${err.source}] Failed to resolve ${err.attribute}="${err.url}"`);
    console.log(`   Resolved path: ${err.resolvedPath}`);
    console.log(`   Reason: ${err.reason}\n`);
  });
} else {
  console.log('\n✅ ALL LINKS AND ASSETS PASSED VALIDATION! No broken links, missing files, or unresolved anchor IDs found.');
}
