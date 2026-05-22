const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const targets = [
  'acme-erp.html',
  'bespoke-solutions.html',
  'digital-marketing.html',
  'staff-augmentation.html'
];

targets.forEach(target => {
  console.log(`\nOccurrences of "${target}":`);
  lines.forEach((line, idx) => {
    if (line.includes(target)) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  });
});
