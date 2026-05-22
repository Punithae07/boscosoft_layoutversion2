const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// The 7 mockups we want to inject for each tab
const mockups = {
    'ssp-tab': {
        img: '/images/smartschool.png',
        alt: 'SmartSchoolPlus Unified K-12 EdTech Dashboard Mockup'
    },
    'higrade-tab': {
        img: '/images/ssp/ss-3.jpg',
        alt: 'HiGrade Higher Ed timetabling & Scheduling portal mockup'
    },
    'acme-tab': {
        img: '/images/case-study-corporate.jpg',
        alt: 'Acme.erp NGO Funds & project allocation tracker mockup'
    },
    'microfund-tab': {
        img: '/images/banking-system.jpg',
        alt: 'MicroFund cooperative MFI software system interface mockup'
    },
    'medsys-tab': {
        img: '/images/healthcare-portal.jpg',
        alt: 'MedSysB Hospital Healthcare ERP management screen mockup'
    },
    'cristo-tab': {
        img: '/images/cristo/cristodesktop.png',
        alt: 'CristO Suite faith-tech diocese records system mockup'
    },
    'eaudit-tab': {
        img: '/images/digital-transformation.jpg',
        alt: 'eAuditHub B2B institutional audit compliance framework mockup'
    }
};

// We will parse the index.html and inject the <div class="product-corner-image"> 
// inside each <div class="tabs-content" id="ID-tab">...</div> block
Object.keys(mockups).forEach(id => {
    const startTag = `id="${id}"`;
    const startIdx = html.indexOf(startTag);
    if (startIdx === -1) {
        console.error(`Tab ${id} not found in HTML!`);
        return;
    }
    
    // Find the closing </div> of this specific tab panel
    // In our index.html, each tab panel structure is:
    // <div class="tabs-content" id="xxx-tab">
    //    <div class="product-vision">...</div>
    //    <div class="product-specs">...</div>
    // </div>
    // So the closing tag of this tab panel is the </div> that is followed by either 
    // the next <!-- Tab comment, or the closing </div> of the tabs-display container.
    
    // Let's find the closing tag by matching the closing tags sequence.
    // An elegant way is to find the index of "</div>" after the product-specs container.
    const specsIdx = html.indexOf('class="product-specs"', startIdx);
    if (specsIdx === -1) {
        console.error(`product-specs not found inside tab ${id}!`);
        return;
    }
    
    // The closing tag of product-specs is followed by the closing tag of tabs-content.
    // Let's search for "</div>" that closes "product-specs", and then the "</div>" that closes "tabs-content".
    // We can count the nested divs, or since it's well-formatted, find "</div>" index.
    
    // Let's find "</div>" after the "product-specs" opening
    let searchStart = specsIdx;
    
    // Let's count open/close divs inside product-specs to find its exact end
    let openDivs = 1;
    let currentIdx = specsIdx + 20; // past 'class="product-specs"'
    
    while (openDivs > 0 && currentIdx < html.length) {
        const nextOpen = html.indexOf('<div', currentIdx);
        const nextClose = html.indexOf('</div', currentIdx);
        
        if (nextClose === -1) break;
        
        if (nextOpen !== -1 && nextOpen < nextClose) {
            openDivs++;
            currentIdx = nextOpen + 4;
        } else {
            openDivs--;
            currentIdx = nextClose + 6;
        }
    }
    
    // The currentIdx is now just after the closing </div> of product-specs.
    // In index.html, right after the closing </div> of product-specs, there is the closing </div> of tabs-content.
    // Let's find the next "</div>" (which closes tabs-content)
    const closingTabContentIdx = html.indexOf('</div>', currentIdx);
    if (closingTabContentIdx === -1) {
        console.error(`Closing tag for tab content ${id} not found!`);
        return;
    }
    
    // Now we insert the mockup code right before this closingTabContentIdx!
    const mockupCode = `
                <!-- 3rd column: dynamic high-fidelity visual mockup -->
                <div class="product-corner-image">
                  <div class="corner-image-wrapper">
                    <img src="${mockups[id].img}" alt="${mockups[id].alt}" class="corner-product-img" />
                  </div>
                </div>
              `;
              
    // Inject the code!
    html = html.substring(0, closingTabContentIdx) + mockupCode + html.substring(closingTabContentIdx);
    console.log(`Successfully injected visual mockup into ${id}!`);
});

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html updated successfully with all 7 platform mockups!');
