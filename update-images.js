const fs = require('fs');
const path = require('path');

const mappings = {
  "acme-erp.html": { 
      bg: "case-study-corporate.jpg", 
      mockup: "digital-transformation.jpg",
      og: "case-study-corporate.jpg"
  },
  "higrade.html": { 
      bg: "case-study-school.jpg", 
      mockup: "slider03.png",
      og: "case-study-school.jpg"
  },
  "medsysb.html": { 
      bg: "case-study-hospital.jpg", 
      mockup: "healthcare-portal.jpg",
      og: "case-study-hospital.jpg"
  },
  "cristo.html": { 
      bg: "digital-transformation.jpg", 
      mockup: "cloud-security.jpg",
      og: "digital-transformation.jpg"
  },
  "microfund.html": { 
      bg: "banking-system.jpg", 
      mockup: "ecommerce-analytics.jpg",
      og: "banking-system.jpg"
  },
  "eaudithub.html": { 
      bg: "cloud-security.jpg", 
      mockup: "case-study-corporate.jpg",
      og: "cloud-security.jpg"
  }
};

Object.keys(mappings).forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the Features section background image
    content = content.replace(/images\/slider-02\.jpg/g, `images/${mappings[file].bg}`);
    // There might be another slider-02.jpg reference in the other files if they were copied from elsewhere?
    
    // Replace the App Mockup and Testimonials images
    content = content.replace(/images\/slider02\.png/g, `images/${mappings[file].mockup}`);

    // Replace the OG Image
    content = content.replace(/images\/resource-laptop\.jpg/g, `images/${mappings[file].og}`);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated images for ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});

// For smart-school-plus.html we can also update its images to be somewhat specific
const sspPath = path.join(__dirname, "smart-school-plus.html");
if(fs.existsSync(sspPath)) {
    let content = fs.readFileSync(sspPath, 'utf8');
    content = content.replace(/images\/slider-02\.jpg/g, `images/case-study-school.jpg`);
    content = content.replace(/images\/resource-laptop\.jpg/g, `images/case-study-school.jpg`);
    fs.writeFileSync(sspPath, content, 'utf8');
    console.log(`Updated images for smart-school-plus.html`);
}
