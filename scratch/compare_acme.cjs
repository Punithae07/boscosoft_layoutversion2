const fs = require('fs');
const path = require('path');

const rootAcme = fs.readFileSync('acme-erp.html', 'utf8');
const nestedAcme = fs.readFileSync('platforms/acme-erp/index.html', 'utf8');

console.log('acme-erp.html length:', rootAcme.length);
console.log('platforms/acme-erp/index.html length:', nestedAcme.length);

// Compare title and core contents
const rootTitle = rootAcme.match(/<title>([\s\S]*?)<\/title>/);
const nestedTitle = nestedAcme.match(/<title>([\s\S]*?)<\/title>/);

console.log('Root title:', rootTitle ? rootTitle[1].trim() : 'None');
console.log('Nested title:', nestedTitle ? nestedTitle[1].trim() : 'None');

// Check if bespoke-solutions, digital-marketing, staff-augmentation have nested folders
console.log('\nChecking if bespoke-solutions, digital-marketing, staff-augmentation have nested folder structures:');
['bespoke-solutions', 'digital-marketing', 'staff-augmentation'].forEach(p => {
  const dirExists = fs.existsSync(p);
  const platformsDirExists = fs.existsSync(`platforms/${p}`);
  const servicesDirExists = fs.existsSync(`services/${p}`);
  console.log(`- ${p}: root folder exists? ${dirExists}, platforms folder exists? ${platformsDirExists}, services folder exists? ${servicesDirExists}`);
});
