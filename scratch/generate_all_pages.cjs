const fs = require('fs');
const path = require('path');

// 1. Setup workspace directories
const workspace_dir = path.resolve(__dirname, '..');
const pyScriptPath = path.join(__dirname, 'generate_all_pages.py');

console.log(`Reading Python template script from: ${pyScriptPath}`);
const pyCode = fs.readFileSync(pyScriptPath, 'utf8');

// Helper to extract a python variable block (like products_data = [ ... ])
function extractVariableBlock(varName, endMarker) {
    const startIdx = pyCode.indexOf(`${varName} = [`);
    if (startIdx === -1) {
        throw new Error(`Variable ${varName} not found in python script`);
    }
    const endIdx = pyCode.indexOf(endMarker, startIdx);
    if (endIdx === -1) {
        throw new Error(`End marker ${endMarker} not found for ${varName}`);
    }
    let block = pyCode.substring(startIdx, endIdx).trim();
    // Remove the variable assignment part to get just the array
    block = block.substring(block.indexOf('=') + 1).trim();
    
    // Convert to JavaScript array
    // Since it's clean double-quoted dicts and lists, it's valid JS/JSON!
    // We just need to evaluate it.
    try {
        return eval(block);
    } catch (e) {
        console.error(`Failed to parse ${varName} block:`, e);
        throw e;
    }
}

// 2. Extract products_data and services_data
console.log('Extracting products_data...');
const products_data = extractVariableBlock('products_data', '# ==================== SERVICES LIST ====================');
console.log(`Successfully extracted ${products_data.length} products.`);

console.log('Extracting services_data...');
const services_data = extractVariableBlock('services_data', '# ==================== GENERATING PAGES ====================');
console.log(`Successfully extracted ${services_data.length} services.`);

// 3. Load index.html and extract header & footer
const index_path = path.join(workspace_dir, "index.html");
console.log(`Reading index.html from: ${index_path}`);
const index_html = fs.readFileSync(index_path, 'utf8');

const header_match = index_html.match(/<header class="header" id="header">[\s\S]*?<\/header>/);
if (!header_match) throw new Error("Header not found in index.html");
const header_content = header_match[0];

const footer_match = index_html.match(/<footer class="footer">[\s\S]*?<\/footer>/);
if (!footer_match) throw new Error("Footer not found in index.html");
const footer_content = footer_match[0];

// 4. Implement component generator functions in JS
function get_stats_html(stats_list) {
    let html = "";
    stats_list.forEach((stat, i) => {
        const val = stat.val;
        const lbl = stat.lbl;
        const border_class = i > 0 ? " border-start border-light border-opacity-25 ps-sm-4 text-start" : "";
        html += `
        <div class="stat-item${border_class}">
          <h4 class="mb-0 fw-bold" style="color: white; font-size: 2rem;">${val}</h4>
          <p class="small text-light mb-0" style="color: rgba(255,255,255,0.7);">${lbl}</p>
        </div>
        `;
    });
    return html;
}

function get_modules_html(modules_list) {
    let html = "";
    modules_list.forEach(mod => {
        html += `
        <div class="module-new-card">
          <div class="module-new-icon"><i class="${mod.icon}"></i></div>
          <div class="module-new-title">${mod.title}</div>
          <div class="module-new-desc">${mod.desc}</div>
        </div>
        `;
    });
    return html;
}

function get_advantages_html(advantages_list) {
    let html = "";
    advantages_list.forEach((adv, i) => {
        const bg = i % 2 === 0 ? "#005a8c" : "#ffffff";
        const txt = i % 2 === 0 ? "white" : "var(--navy-dark)";
        const desc_txt = i % 2 === 0 ? "rgba(255,255,255,0.85)" : "var(--text-gray)";
        const icon_color = i % 2 === 0 ? "white" : "var(--primary-base)";
        const border_style = i % 2 === 0 ? "border: 1px solid rgba(255,255,255,0.15);" : "border: 1px solid var(--border-color);";
        
        html += `
        <div class="p-4 rounded-4 feature-grid-card" style="background-color: ${bg}; ${border_style} padding: 2rem; border-radius: 16px;">
          <i class="${adv.icon} fa-2x mb-3" style="color: ${icon_color}; font-size: 2rem; display: block; margin-bottom: 1rem;"></i>
          <h3 class="fw-bold mb-2 pb-2" style="color: ${txt}; font-size: 1.25rem; border-bottom: 1px solid ${i % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}; margin-bottom: 1rem; padding-bottom: 0.5rem;">${adv.title}</h3>
          <p class="small mb-0" style="color: ${desc_txt}; font-size: 0.9rem; line-height: 1.6;">${adv.desc}</p>
        </div>
        `;
    });
    return html;
}

function get_faq_bootstrap_html(faq_list, faq_id_prefix) {
    let html = `<div class="accordion" id="${faq_id_prefix}Faq">`;
    faq_list.forEach((faq, i) => {
        const show_class = i === 0 ? " show" : "";
        const collapsed_class = i === 0 ? "" : " collapsed";
        html += `
        <div class="accordion-item border-0 border-bottom bg-transparent mb-0 overflow-hidden">
            <h3 class="accordion-header">
                <button class="accordion-button bg-transparent fw-bold text-dark px-0 py-4 shadow-none${collapsed_class}"
                    type="button" data-bs-toggle="collapse" data-bs-target="#${faq_id_prefix}faq${i}">
                    ${faq.q}
                </button>
            </h3>
            <div id="${faq_id_prefix}faq${i}" class="accordion-collapse collapse${show_class}" data-bs-parent="#${faq_id_prefix}Faq">
                <div class="accordion-body px-0 pt-0 pb-4 text-muted" style="line-height: 1.7;">
                   ${faq.a}
                </div>
            </div>
        </div>
        `;
    });
    html += '</div>';
    return html;
}

function get_testimonials_html(testimonials_list) {
    let html = '<div class="testimonial-cards-container">';
    testimonials_list.forEach(test => {
        html += `
        <div class="testimonial-card">
            <div class="testimonial-card-content">
                <div class="testimonial-quote-icon mb-3">
                    <i class="fas fa-quote-left text-primary"></i>
                </div>
                <p class="testimonial-text mb-4">“${test.quote}”</p>
                <div class="testimonial-author">
                    <h6 class="mb-1 fw-bold">${test.author}</h6>
                    <small class="text-muted">${test.role}</small>
                </div>
            </div>
        </div>
        `;
    });
    html += '</div>';
    return html;
}

// Fixed minor bug where deliverables was using incorrect parameter name
function get_deliverables_html(deliv_list) {
    let html = "";
    deliv_list.forEach(item => {
        html += `
        <div class="p-4 rounded-4" style="background: white; border: 1px solid var(--border-color); padding: 2rem; border-radius: 16px;">
          <i class="${item.icon} fa-2x mb-3" style="color: var(--primary-base); display: block; margin-bottom: 1rem;"></i>
          <h3 class="fw-bold mb-2 text-dark" style="font-size: 1.2rem; color: var(--navy-dark);">${item.title}</h3>
          <p class="small text-muted mb-0" style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6;">${item.desc}</p>
        </div>
        `;
    });
    return html;
}

function get_process_html(steps) {
    let html = "";
    steps.forEach((step, i) => {
        html += `
        <div class="p-4 rounded-4 text-center" style="background: white; border: 1px solid var(--border-color); border-radius: 16px; padding: 2rem; position: relative;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-base); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; margin: 0 auto 1.5rem auto; font-size: 1.1rem;">${i+1}</div>
          <h4 class="fw-bold mb-2" style="font-size: 1.1rem; color: var(--navy-dark);">${step.title}</h4>
          <p class="small text-muted mb-0" style="font-size: 0.85rem; line-height: 1.5;">${step.desc}</p>
        </div>
        `;
    });
    return html;
}

function get_partners_marquee_html() {
    return `
    <div class="partners-marquee-container">
      <div class="partners-marquee-track">
        <div class="partner-item"><img src="/images/acemerp/client01.jpg" alt="Client Logo 1"></div>
        <div class="partner-item"><img src="/images/acemerp/client02.jpg" alt="Client Logo 2"></div>
        <div class="partner-item"><img src="/images/acemerp/client03.jpg" alt="Client Logo 3"></div>
        <div class="partner-item"><img src="/images/acemerp/client04.jpg" alt="Client Logo 4"></div>
        <div class="partner-item"><img src="/images/acemerp/client05.jpg" alt="Client Logo 5"></div>
        <div class="partner-item"><img src="/images/acemerp/client06.jpg" alt="Client Logo 6"></div>
        <!-- Duplicate for loop -->
        <div class="partner-item"><img src="/images/acemerp/client01.jpg" alt="Client Logo 1"></div>
        <div class="partner-item"><img src="/images/acemerp/client02.jpg" alt="Client Logo 2"></div>
        <div class="partner-item"><img src="/images/acemerp/client03.jpg" alt="Client Logo 3"></div>
        <div class="partner-item"><img src="/images/acemerp/client04.jpg" alt="Client Logo 4"></div>
        <div class="partner-item"><img src="/images/acemerp/client05.jpg" alt="Client Logo 5"></div>
        <div class="partner-item"><img src="/images/acemerp/client06.jpg" alt="Client Logo 6"></div>
      </div>
    </div>
    `;
}

function write_page(slug_path, html_content) {
    const full_dir = path.join(workspace_dir, slug_path);
    fs.mkdirSync(full_dir, { recursive: true });
    const file_path = path.join(full_dir, "index.html");
    fs.writeFileSync(file_path, html_content, "utf-8");
    console.log(`Wrote page to ${file_path}`);
}

// 5. Generate Products
console.log('Generating product subpages...');
products_data.forEach(prod => {
    const stats_html = get_stats_html(prod.stats);
    const modules_html = get_modules_html(prod.modules);
    const advantages_html = get_advantages_html(prod.advantages);
    const faq_html = get_faq_bootstrap_html(prod.faqs, prod.slug.split("/").pop());
    const testimonials_html = get_testimonials_html(prod.testimonials);
    const partners_marquee_html = get_partners_marquee_html();
    
    const part1 = prod.headline_part_1;
    const part2 = prod.headline_part_2;
    
    const html_content = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${prod.name} | Boscosoft Platform</title>
    <meta name="description" content="${prod.seo_description}" />
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- Font Awesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    ${header_content}
    
    <!-- PRODUCT HERO -->
    <div class="acme-hero-wrapper">
      <section class="acme-hero-section section-padding pt-5" style="padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container">
          <nav aria-label="breadcrumb" class="mb-5">
            <ol class="breadcrumb justify-content-center" style="display: flex; gap: 0.5rem; list-style: none; padding: 0; justify-content: center; margin-bottom: 3rem;">
              <li class="breadcrumb-item"><a href="/index.html" style="color: var(--teal-accent); text-decoration: none;">Home</a></li>
              <li class="breadcrumb-item" style="color: rgba(255,255,255,0.4);">&nbsp;/&nbsp;</li>
              <li class="breadcrumb-item"><a href="/index.html#platforms" style="color: var(--teal-accent); text-decoration: none;">Products</a></li>
              <li class="breadcrumb-item" style="color: rgba(255,255,255,0.4);">&nbsp;/&nbsp;</li>
              <li class="breadcrumb-item active" style="color: white; font-weight: 600;">${prod.name}</li>
            </ol>
          </nav>
          <div class="row align-items-center text-center">
            <div class="col-lg-12">
              <span class="acme-hero-tag mb-3 d-inline-block">${prod.category}</span>
              <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
                ${part1} <span style="background: linear-gradient(135deg, var(--teal-accent), var(--primary-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${part2}</span>
              </h1>
              <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto 3rem auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
                ${prod.desc}
              </p>
              <div class="acme-hero-btns d-flex gap-3 justify-content-center" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                <a href="/contact/index.html?product=${prod.name}&type=demo" class="btn btn-primary" style="padding: 0.8rem 2rem; border-radius: 8px;">Request Free Demo</a>
                <a href="/contact/index.html?product=${prod.name}&type=experts" class="btn btn-outline" style="padding: 0.8rem 2rem; border-radius: 8px; border: 2px solid rgba(255,255,255,0.4); color: white;">Talk to Our Experts</a>
              </div>
              
              <!-- STATS CARD -->
              <div class="acme-stats-card mt-5" style="max-width: 700px; margin: 4rem auto 0 auto; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); padding: 2rem; border-radius: 16px; backdrop-filter: blur(10px);">
                <div class="hero-trust-stats" style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 1.5rem;">
                  ${stats_html}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- MODULES / FEATURES SECTION -->
    <section id="modules" class="section-padding bg-pattern-circuit overflow-hidden pb-5" style="padding: 5rem 0; position: relative;">
      <div class="container text-center mb-5">
        <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">FEATURES</span>
        <h2 class="section-title display-6 fw-bold text-dark mb-3" style="font-size: 2.25rem; font-weight: 800; color: var(--navy-dark);">${prod.modules_title}</h2>
        <p class="text-muted mx-auto fs-5" style="max-width: 700px; color: var(--text-gray); font-size: 1.1rem;">${prod.modules_desc}</p>
      </div>

      <div class="container position-relative">
        <div class="modules-scroll-container" id="modulesScrollContainer" style="overflow-x: auto; display: flex; gap: 1.5rem; padding-bottom: 2rem;">
          <div class="modules-scroll-track" id="modulesScrollTrack" style="display: flex; gap: 1.5rem;">
            ${modules_html}
          </div>
        </div>

        <!-- Controls (Bottom row) -->
        <div class="d-flex justify-content-between align-items-center mt-4" style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; flex-wrap: wrap; gap: 1.5rem;">
          <a href="/contact/index.html?product=${prod.name}&type=demo" class="btn btn-primary" style="padding: 0.6rem 1.5rem; font-size: 0.9rem;">View Pricing Options <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
          
          <div class="modules-pagination" id="modulesPagination" style="display: flex; gap: 0.5rem;">
            <!-- Dots added dynamically via main.js -->
          </div>

          <div class="modules-arrows" style="display: flex; gap: 0.75rem;">
            <button type="button" class="btn slider-btn-oval" id="btnScrollLeft"><i class="fas fa-chevron-left"></i></button>
            <button type="button" class="btn slider-btn-oval" id="btnScrollRight"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </section>

    <!-- ADVANTAGES FEATURES GRID -->
    <section id="features" class="section-padding text-dark position-relative" style="padding: 6rem 0; background: #f8fafc; border-top: 1px solid var(--border-color);">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">ADVANTAGES</span>
          <h2 class="display-5 fw-bold text-dark mb-3 lh-base" style="font-size: 2.5rem; font-weight: 800; color: var(--navy-dark);">Why Choose <span style="color: var(--primary-base);">${prod.name}</span>?</h2>
          <p class="fs-6 text-muted mb-0" style="max-width: 600px; margin: 0 auto; color: var(--text-gray);">Built for high performance, compliance, security, and long-term client success.</p>
        </div>
        <div class="row g-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          ${advantages_html}
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section id="testimonials" class="section-padding bg-light position-relative overflow-hidden border-top" style="padding: 6rem 0;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">TESTIMONIALS</span>
            <h2 class="display-6 fw-bold text-dark mb-4" style="font-size: 2.25rem; font-weight: 800; color: var(--navy-dark);">What Our Clients Say</h2>
            ${testimonials_html}
          </div>
          <div class="col-lg-6">
            <div class="testimonial-image-container ms-lg-4">
              <div class="testimonial-main-image">
                <img src="${prod.testimonial_image}" alt="${prod.name} System Screen" class="img-fluid rounded-3 shadow-lg" />
                <div class="testimonial-image-overlay">
                  <div class="testimonial-image-badge">
                    <i class="fas fa-award text-white me-2"></i>
                    <span class="text-white fw-bold">${prod.badge_text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUSTED PARTNERS MARQUEE -->
    <section class="py-5 bg-white overflow-hidden border-top">
      <div class="container">
        <div class="text-center mb-4">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="letter-spacing: 2px; font-size: 0.85rem; color: var(--primary-base);">OUR TRUSTED PARTNERS</span>
        </div>
        ${partners_marquee_html}
      </div>
    </section>

    <!-- FAQS ACCORDION -->
    <section id="faq" class="section-padding" style="padding: 6rem 0; background: #f8fafc; border-top: 1px solid var(--border-color);">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">FAQ</span>
          <h2 class="display-5 fw-bold text-dark mb-3" style="font-size: 2.5rem; font-weight: 800; color: var(--navy-dark);">Frequently Asked Questions</h2>
          <p class="text-muted" style="color: var(--text-gray);">Find answers to common questions about ${prod.name}'s implementation, hosting, support, and licensing.</p>
        </div>
        <div class="faq-accordion-list" style="margin-top: 3rem;">
          ${faq_html}
        </div>
      </div>
    </section>

    <!-- APP DOWNLOAD / CTA ILLUSTRATED SECTION -->
    <section class="app-download-section" style="overflow: visible;">
      <div class="container position-relative" style="z-index: 2;">
        <div class="row align-items-center">
          <div class="col-lg-5 text-center text-lg-start position-relative mb-4 mb-lg-0">
            <img src="/images/resource-laptop.jpg" alt="${prod.name} Demo Laptop" class="demo-illustration acme-demo-illustration rounded-4 img-fluid" />
          </div>
          <div class="col-lg-7 offset-lg-0 ps-lg-5">
            <h2 class="display-5 app-download-title mb-4" style="font-size: 2.25rem; font-weight: 800;">${prod.cta_title}</h2>
            <p class="fs-5 text-muted mb-5 pe-lg-5" style="line-height: 1.6;">${prod.cta_desc}</p>
            <div class="d-flex flex-wrap gap-3">
              <a href="/contact/index.html?product=${prod.name}&type=demo" class="btn btn-primary btn-lg rounded-pill px-5" style="padding: 0.8rem 2rem;">Request Free Demo</a>
              <a href="/contact/index.html?product=${prod.name}&type=consultation" class="btn btn-outline-primary btn-lg rounded-pill px-5" style="padding: 0.8rem 2rem; border: 2px solid var(--primary-base); color: var(--primary-base); background: transparent;">Talk to Our Experts</a>
            </div>
          </div>
        </div>
      </div>
      <div class="app-bottom-border"></div>
    </section>

    ${footer_content}
    
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
    write_page(prod.slug, html_content);
});

// 6. Generate Services
console.log('Generating service subpages...');
services_data.forEach(srv => {
    const deliv_html = get_deliverables_html(srv.deliverables);
    const process_html = get_process_html(srv.process);
    const faq_html = get_faq_bootstrap_html(srv.faqs, srv.slug.split("/").pop());
    const testimonials_html = get_testimonials_html(srv.testimonials);
    const partners_marquee_html = get_partners_marquee_html();
    
    const part1 = srv.headline_part_1;
    const part2 = srv.headline_part_2;
    
    const html_content = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${srv.name} | Boscosoft Service</title>
    <meta name="description" content="${srv.seo_description}" />
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- Font Awesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    ${header_content}
    
    <!-- SERVICE HERO -->
    <div class="acme-hero-wrapper">
      <section class="acme-hero-section section-padding pt-5" style="padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container">
          <nav aria-label="breadcrumb" class="mb-5">
            <ol class="breadcrumb justify-content-center" style="display: flex; gap: 0.5rem; list-style: none; padding: 0; justify-content: center; margin-bottom: 3rem;">
              <li class="breadcrumb-item"><a href="/index.html" style="color: var(--teal-accent); text-decoration: none;">Home</a></li>
              <li class="breadcrumb-item" style="color: rgba(255,255,255,0.4);">&nbsp;/&nbsp;</li>
              <li class="breadcrumb-item"><a href="/index.html#services" style="color: var(--teal-accent); text-decoration: none;">Services</a></li>
              <li class="breadcrumb-item" style="color: rgba(255,255,255,0.4);">&nbsp;/&nbsp;</li>
              <li class="breadcrumb-item active" style="color: white; font-weight: 600;">${srv.name}</li>
            </ol>
          </nav>
          <div class="row align-items-center text-center">
            <div class="col-lg-12">
              <span class="acme-hero-tag mb-3 d-inline-block">B2B TRANSFORMATION SERVICES</span>
              <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
                ${part1} <span style="background: linear-gradient(135deg, var(--teal-accent), var(--primary-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${part2}</span>
              </h1>
              <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto 3rem auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
                ${srv.desc}
              </p>
              <div class="acme-hero-btns d-flex gap-3 justify-content-center" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                <a href="/contact/index.html?service=${srv.name}&type=consultation" class="btn btn-primary" style="padding: 0.8rem 2rem; border-radius: 8px;">${srv.primary_cta_label}</a>
                <a href="/contact/index.html?service=${srv.name}&type=roadmap" class="btn btn-outline" style="padding: 0.8rem 2rem; border-radius: 8px; border: 2px solid rgba(255,255,255,0.4); color: white;">Talk to Our Experts</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- WHAT WE DELIVER GRID -->
    <section id="deliverables" class="section-padding bg-pattern-circuit pb-5" style="padding: 5rem 0; background: #f8fafc; border-bottom: 1px solid var(--border-color);">
      <div class="container text-center mb-5">
        <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">CAPABILITIES</span>
        <h2 class="section-title display-6 fw-bold text-dark mb-3" style="font-size: 2.25rem; font-weight: 800; color: var(--navy-dark);">What We Deliver</h2>
        <p class="text-muted mx-auto fs-5" style="max-width: 700px; color: var(--text-gray); font-size: 1.1rem;">Robust, enterprise-grade engineering deliverables matching your strategic requirements.</p>
      </div>

      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
          ${deliv_html}
        </div>
      </div>
    </section>

    <!-- PROCESS STEPS SECTION -->
    <section id="process" class="section-padding" style="padding: 6rem 0; background: white;">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">PROCESS TIMELINE</span>
          <h2 class="display-5 fw-bold text-dark mb-3" style="font-size: 2.5rem; font-weight: 800; color: var(--navy-dark);">Our Delivery Methodology</h2>
          <p class="text-muted" style="max-width: 600px; margin: 0 auto; color: var(--text-gray);">How we partner with you to transition systems, adopt AI, and deploy digital ecosystems securely.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 3rem;">
          ${process_html}
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section id="testimonials" class="section-padding bg-light position-relative overflow-hidden border-top" style="padding: 6rem 0;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">TESTIMONIALS</span>
            <h2 class="display-6 fw-bold text-dark mb-4" style="font-size: 2.25rem; font-weight: 800; color: var(--navy-dark);">What Our Clients Say</h2>
            ${testimonials_html}
          </div>
          <div class="col-lg-6">
            <div class="testimonial-image-container ms-lg-4">
              <div class="testimonial-main-image">
                <img src="${srv.testimonial_image}" alt="${srv.name} Service Illustration" class="img-fluid rounded-3 shadow-lg" />
                <div class="testimonial-image-overlay">
                  <div class="testimonial-image-badge">
                    <i class="fas fa-award text-white me-2"></i>
                    <span class="text-white fw-bold">${srv.badge_text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUSTED PARTNERS MARQUEE -->
    <section class="py-5 bg-white overflow-hidden border-top">
      <div class="container">
        <div class="text-center mb-4">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="letter-spacing: 2px; font-size: 0.85rem; color: var(--primary-base);">OUR TRUSTED PARTNERS</span>
        </div>
        ${partners_marquee_html}
      </div>
    </section>

    <!-- FAQS ACCORDION -->
    <section id="faq" class="section-padding" style="padding: 6rem 0; background: #f8fafc; border-top: 1px solid var(--border-color);">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">FAQ</span>
          <h2 class="display-5 fw-bold text-dark mb-3" style="font-size: 2.5rem; font-weight: 800; color: var(--navy-dark);">Frequently Asked Questions</h2>
          <p class="text-muted" style="color: var(--text-gray);">Find answers to common questions about our ${srv.name} capability, pricing, SLAs, and technical stack.</p>
        </div>
        <div class="faq-accordion-list" style="margin-top: 3rem;">
          ${faq_html}
        </div>
      </div>
    </section>

    <!-- FINAL CTA ILLUSTRATED BANNER -->
    <section class="app-download-section" style="overflow: visible;">
      <div class="container position-relative" style="z-index: 2;">
        <div class="row align-items-center">
          <div class="col-lg-5 text-center text-lg-start position-relative mb-4 mb-lg-0">
            <img src="/images/resource-laptop.jpg" alt="${srv.name} Service Laptop" class="demo-illustration acme-demo-illustration rounded-4 img-fluid" />
          </div>
          <div class="col-lg-7 offset-lg-0 ps-lg-5">
            <h2 class="display-5 app-download-title mb-4" style="font-size: 2.25rem; font-weight: 800;">${srv.cta_title}</h2>
            <p class="fs-5 text-muted mb-5 pe-lg-5" style="line-height: 1.6;">${srv.cta_desc}</p>
            <div class="d-flex flex-wrap gap-3">
              <a href="/contact/index.html?service=${srv.name}&type=consultation" class="btn btn-primary btn-lg rounded-pill px-5" style="padding: 0.8rem 2rem;">${srv.primary_cta_label}</a>
              <a href="/contact/index.html?service=${srv.name}&type=roadmap" class="btn btn-outline-primary btn-lg rounded-pill px-5" style="padding: 0.8rem 2rem; border: 2px solid var(--primary-base); color: var(--primary-base); background: transparent;">Talk to Our Experts</a>
            </div>
          </div>
        </div>
      </div>
      <div class="app-bottom-border"></div>
    </section>

    ${footer_content}
    
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
    write_page(srv.slug, html_content);
});

// Helper to extract a python string literal (e.g. variable = f""" ... """)
function extractStringLiteralBlock(varName) {
    const regex = new RegExp(`${varName}\\s*=\\s*f?"""([\\s\\S]*?)"""`, 'm');
    const match = pyCode.match(regex);
    if (!match) {
        throw new Error(`String block ${varName} not found in python script`);
    }
    let block = match[1];
    
    // Convert python string formatting to JS template formatting
    // Replace {header_content} with ${header_content} and {footer_content} with ${footer_content}
    // Also replace {partners_marquee_html} with ${partners_marquee_html}
    block = block.replace(/{header_content}/g, '${header_content}')
                 .replace(/{footer_content}/g, '${footer_content}')
                 .replace(/{partners_marquee_html}/g, '${partners_marquee_html}');
                 
    // Escape backticks and unhandled ${} templates to prevent JavaScript compilation errors
    block = block.replace(/`/g, '\\`').replace(/\${(?!header_content|footer_content|partners_marquee_html)/g, '\\${');
                 
    return block;
}

// 7. Generate Core Pages
console.log('Generating core subpages...');

const about_html_tmpl = extractStringLiteralBlock('about_html');
const about_html = eval('`' + about_html_tmpl + '`');
write_page('about-us', about_html);

const mission_html_tmpl = extractStringLiteralBlock('mission_html');
const mission_html = eval('`' + mission_html_tmpl + '`');
write_page('mission-vision', mission_html);

const leadership_html_tmpl = extractStringLiteralBlock('leadership_html');
const leadership_html = eval('`' + leadership_html_tmpl + '`');
write_page('leadership', leadership_html);

const industries_html_tmpl = extractStringLiteralBlock('industries_html');
const industries_html = eval('`' + industries_html_tmpl + '`');
write_page('industries', industries_html);

const careers_html_tmpl = extractStringLiteralBlock('careers_html');
const careers_html = eval('`' + careers_html_tmpl + '`');
write_page('careers', careers_html);

const contact_html_tmpl = extractStringLiteralBlock('contact_html');
const contact_html = eval('`' + contact_html_tmpl + '`');
write_page('contact', contact_html);

console.log("All subpages generated successfully via Node.js CommonJS script!");
