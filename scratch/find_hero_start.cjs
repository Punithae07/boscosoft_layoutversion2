const fs = require('fs');

const files = [
  'bespoke-solutions.html',
  'digital-marketing.html',
  'staff-augmentation.html'
];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const pos = content.indexOf('<section class="service-hero-section');
  if (pos !== -1) {
    const lineNum = content.substring(0, pos).split('\n').length;
    console.log(`${file}: service-hero-section starts at line ${lineNum} (index ${pos})`);
  } else {
    console.log(`${file}: service-hero-section NOT found`);
  }
}
