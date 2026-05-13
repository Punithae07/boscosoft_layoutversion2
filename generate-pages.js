const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const templatePath = path.join(__dirname, 'smart-school-plus.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const pages = [
  {
    filename: "medsysb.html",
    title: "MedSysB | ERP for Hospitals | BoscoSoftTech",
    metaDesc: "Comprehensive Hospital Management ERP to streamline operations and enhance patient care.",
    metaKw: "Hospital Management, ERP, Healthcare Software, MedSysB",
    activeNav: "MedSysB",
    breadcrumb: "MedSysB",
    heroTag: "HOSPITAL MANAGEMENT SYSTEM",
    heroTitle: "The Leading Solution for <span>Streamlined Hospital Operations</span>",
    heroDesc: "MedSysB ERP is tailored for the healthcare sector, streamlining hospital operations from registration to billing and enhancing overall patient care.",
    heroLink: "https://medsysb.com/",
    stats: [
      { num: "50+", text: "Hospitals" },
      { num: "100K+", text: "Patients" },
      { num: "26+", text: "Years Exp" }
    ],
    modulesTitle: "Enjoy a hassle-free healthcare administration",
    modulesDesc: "Explore our comprehensive suite of advanced tools designed to streamline your daily hospital workflows.",
    modules: [
        { icon: "fas fa-laptop-medical", title: "Outpatient Registration", desc: "Minimized patient wait times with rapid and effortless registration process." },
        { icon: "fas fa-procedures", title: "Inpatient Admission", desc: "Centralized admission centre to handle bed allocations and inpatient tracking." },
        { icon: "fas fa-vial", title: "Lab & Diagnostic", desc: "Seamless integration for lab results and diagnostic services scheduling." },
        { icon: "fas fa-pills", title: "Pharmacy Control", desc: "Efficient pharmacy control centre to manage inventory, prescription & dispensing." },
        { icon: "fas fa-file-invoice-dollar", title: "Billing & Payment", desc: "Hassle-free, consistent financial transactions and automated billing." },
        { icon: "fas fa-user-md", title: "Surgery Scheduling", desc: "Organized scheduling and management for operation theatres and surgical staff." }
    ],
    featuresTitle: "What makes MedSysB stand out from <span>the rest?</span>",
    featuresDesc: "Enhance workflows, reduce waiting times, and improve patient outcomes seamlessly.",
    features: [
        { icon: "fas fa-cogs", title: "Highly Customizable", desc: "Customized for diverse healthcare setups, from small clinics to large hospitals." },
        { icon: "fas fa-clock", title: "Reduced Wait Times", desc: "Quick registration and bill preparation within seconds to reduce queues." },
        { icon: "fas fa-search", title: "Advanced Search", desc: "Speedy patient record retrieval, payment details, and admission status." },
        { icon: "fas fa-shield-alt", title: "Data Protection", desc: "Prioritized protection of patient data with strict access rights." },
        { icon: "fas fa-expand-arrows-alt", title: "Scalable Platform", desc: "Designed to expand collaboratively with your institutional needs." },
        { icon: "fas fa-headset", title: "Dedicated Training", desc: "Minimal training needed combined with our comprehensive 24/7 support." }
    ],
    faqTitle: "Common questions about<br>MedSysB",
    faqDesc: "Find answers to common questions about MedSysB implementation and features in the healthcare environment.",
    faqs: [
        { q: "Is MedSysB suitable for small clinics?", a: "Yes. MedSysB is flexible and customized for both small clinics and medium-to-large hospitals." },
        { q: "How long does it take to register a patient?", a: "Patient registration and bill preparation are optimized to take only seconds, significantly reducing wait times." },
        { q: "Is patient data secure?", a: "Yes, data is secured with specific access rights, passwords, and advanced encryption methods." }
    ]
  },
  {
    filename: "cristo.html",
    title: "CristO | Church Management ERP | BoscoSoftTech",
    metaDesc: "Complete Church Management ERP solution suitable for parishes and dioceses.",
    metaKw: "Church Management Software, Parish ERP, CristO, Parokia, ReligiO, Cathedra",
    activeNav: "CristO",
    breadcrumb: "CristO",
    heroTag: "PAPERLESS CHURCH MANAGEMENT",
    heroTitle: "Seamless Management for <span>Churches and Parishes</span>",
    heroDesc: "CristO is a comprehensive ERP solution tailored to revolutionize administrative and organizational tasks for religious communities of all sizes.",
    heroLink: "https://boscosofttech.com/public/index.php/products/cristo",
    stats: [
      { num: "500+", text: "Parishes" },
      { num: "50K+", text: "Families" },
      { num: "26+", text: "Years Exp" }
    ],
    modulesTitle: "Modernize your religious community's workflow",
    modulesDesc: "From individual parish details to total diocesan administration, explore tools designed for every level.",
    modules: [
        { icon: "fas fa-church", title: "Parish Mgmt - Parokia", desc: "Seamlessly manage families, members, and sacraments with unparalleled ease." },
        { icon: "fas fa-users", title: "Province Mgmt - ReligiO", desc: "Tailor-made for religious leaders to handle communications and vital records." },
        { icon: "fas fa-map-marked-alt", title: "Diocese Mgmt - Cathedra", desc: "The pinnacle of continuous management software exclusively for Dioceses." },
        { icon: "fas fa-pray", title: "Denomination - Charisma", desc: "Specialized tools designed for diverse denomination church administration." },
        { icon: "fas fa-calendar-check", title: "Mass Booking", desc: "Schedule online holy mass booking and enable live mass streaming seamlessly." },
        { icon: "fas fa-receipt", title: "Donation Tracking", desc: "Detailed subscription and donation records to stay on top of daily finances." }
    ],
    featuresTitle: "Why is CristO the preferred choice for <span>Churches?</span>",
    featuresDesc: "Experience comprehensive transparency, connectivity, and streamlined record-keeping.",
    features: [
        { icon: "fas fa-layer-group", title: "Flexible Access", desc: "Offers different access levels for Diocese, parish Father, families, or members." },
        { icon: "fas fa-laptop", title: "Digital Transformation", desc: "Facilitates the shift from traditional paper records to safe digital storage." },
        { icon: "fas fa-sms", title: "Enhanced Communication", desc: "Includes SMS and Email gateways for sharing event reminders rapidly." },
        { icon: "fas fa-file-invoice-dollar", title: "Financial Features", desc: "Tracks subscriptions, donations, and provides efficient collection reminders." },
        { icon: "fas fa-file-certificate", title: "Custom Certificates", desc: "Customizable certificate processing and simplified, quick report generation." },
        { icon: "fas fa-mobile-alt", title: "Mobile App Integration", desc: "A connected mobile app for parishioners to stay informed securely." }
    ],
    faqTitle: "Common questions about<br>CristO",
    faqDesc: "Find answers regarding implementation, features, and managing tasks within your Parish utilizing the CristO ERP.",
    faqs: [
        { q: "Is it suitable for small parishes and large dioceses alike?", a: "Yes, it is suitable for various levels such as parish priests, and administrative bodies, each with specific access rights." },
        { q: "Does the software support online donations?", a: "Yes, CristO supports online payments for donations and subscriptions, while carefully storing digital records." },
        { q: "Is parishioners' private data secure?", a: "Yes, the software provides robust data security measures to protect all personal and sacramental data of parishioners." }
    ]
  },
  {
    filename: "microfund.html",
    title: "MicroFUND | ERP for Microfinance | BoscoSoftTech",
    metaDesc: "Advanced ERP solution tailored for Microfinance companies of all sizes.",
    metaKw: "Microfinance ERP, Loan Management, MicroFUND",
    activeNav: "MicroFUND",
    breadcrumb: "MicroFUND",
    heroTag: "MICROFINANCE ERP SOLUTION",
    heroTitle: "Advanced ERP Solution for <span>Microfinance Operations</span>",
    heroDesc: "MicroFUND is an innovative software designed to be user-friendly, scalable, and optimized for managing loans and collections with minimal manpower.",
    heroLink: "https://microfund.in/",
    stats: [
      { num: "200+", text: "Branches" },
      { num: "1M+", text: "Transactions" },
      { num: "26+", text: "Years Exp" }
    ],
    modulesTitle: "Streamline your financial transactions effortlessly",
    modulesDesc: "Manage loans, EMI payments, and outstanding balances intelligently at the precise click of a button.",
    modules: [
        { icon: "fas fa-hand-holding-usd", title: "Loan Management", desc: "Entry and monitoring of loan requests and swift processing of dispersed loans." },
        { icon: "fas fa-fingerprint", title: "Biometric Approval", desc: "Secure Android-based solution equipped with fingerprint acknowledgement." },
        { icon: "fas fa-sync-alt", title: "Automated Entries", desc: "Fully automated database entries against continuous collections and repayments." },
        { icon: "fas fa-project-diagram", title: "Workflow Management", desc: "Complete branch and field workflow management streamlining distinct duties." },
        { icon: "fas fa-chart-line", title: "Targets Tracking", desc: "Meticulously track all financial targets and actual performance continuously." },
        { icon: "fas fa-chart-pie", title: "Financial Reports", desc: "Extensive real-time financial reporting available at branch and admin levels." }
    ],
    featuresTitle: "Why Choose MicroFUND for your <span>Finance Business?</span>",
    featuresDesc: "Enhance operational efficiency and secure every single transaction accurately.",
    features: [
        { icon: "fas fa-sliders-h", title: "Tailored Customization", desc: "Specifically designed to meet the unique structural needs of microfinance institutions." },
        { icon: "fas fa-arrows-alt-v", title: "Ultimate Scalability", desc: "Adapts to the growing requirements, supporting both modest startups and large units." },
        { icon: "fas fa-mobile-alt", title: "Real-time Access", desc: "Accessible via the web and mobile app, providing users with live dashboard data." },
        { icon: "fas fa-check-double", title: "Audit Verification", desc: "Presents necessary data promptly on-screen for seamless internal or state audits." },
        { icon: "fas fa-lock", title: "Stringent Security", desc: "Implements high-level data security measures to protect sensitive financial records." },
        { icon: "fas fa-users-cog", title: "Role-Based Logins", desc: "Distinct login interfaces available securely for individual branch staff and admins." }
    ],
    faqTitle: "Common questions about<br>MicroFUND",
    faqDesc: "Answers to recurring queries about system scalability, tracking, and the integration of our microfinance platform.",
    faqs: [
        { q: "Can it support a rapidly growing microfinance startup?", a: "Yes, MicroFUND's scalable structure adapts effortlessly to both growing branch networks and established larger organizations." },
        { q: "Is there a mobile solution for field agents?", a: "Absolutely. We offer a dedicated Android solution with automated synchronization features from the web module." },
        { q: "How is financial data protected against breaches?", a: "MicroFUND implements stringent data security measures and user access rights to safely protect all sensitive transaction information." }
    ]
  },
  {
    filename: "eaudithub.html",
    title: "eAUDiTHub | Digital Audit & Compliance | BoscoSoftTech",
    metaDesc: "State-of-the-art responsive tool tailored for tracking efficient audits in hospitality and food sectors.",
    metaKw: "Audit Software, Compliance, Food Safety, eAUDiTHub",
    activeNav: "eAUDiTHub",
    breadcrumb: "eAUDiTHub",
    heroTag: "DIGITAL AUDIT & COMPLIANCE",
    heroTitle: "State-of-the-Art Tool for <span>Accurate Efficiency Audits</span>",
    heroDesc: "eAUDiTHub facilitates seamless detailed observation records and compliance tracking tailored for diverse environments like hotels and food courts.",
    heroLink: "https://eaudithub.com/",
    stats: [
      { num: "500+", text: "Audits" },
      { num: "100+", text: "Clients" },
      { num: "26+", text: "Years Exp" }
    ],
    modulesTitle: "Perfectly orchestrated compliance workflows",
    modulesDesc: "Proactively guide corrective measures identifying non-conformities through comprehensive audit modules.",
    modules: [
        { icon: "fas fa-tasks", title: "Checklist Management", desc: "Effortlessly streamlined audit procedure tracking and master checklist management." },
        { icon: "fas fa-calendar-alt", title: "Annual Calendar", desc: "Integrated comprehensive annual audit calendar targeting regular inspections." },
        { icon: "fas fa-file-signature", title: "Audit Observations", desc: "Accurate and highly detailed real-time recording of essential remote audit observations." },
        { icon: "fas fa-bell", title: "Proactive Reminders", desc: "Automated alert system issuing timely reminders for follow-up audit protocols." },
        { icon: "fas fa-tablet-alt", title: "Mobile Optimized", desc: "Complete tablet and mobile optimization facilitating straightforward on-the-go auditing." },
        { icon: "fas fa-user-check", title: "Behavior Tracking", desc: "Advanced operational observation and meticulous user behavioral compliance tracking." }
    ],
    featuresTitle: "Why is eAUDiTHub essential for <span>Compliance?</span>",
    featuresDesc: "Align with international standards and simplify your hygiene assurance operations.",
    features: [
        { icon: "fas fa-globe", title: "Global Standards", desc: "Designed thoroughly in absolute alignment with international standards like HACCP, FSSAI, and ISO." },
        { icon: "fas fa-bullseye", title: "Corrective Resolution", desc: "Highlights non-conformities and focuses efficiently on resolving identified critical issues." },
        { icon: "fas fa-tachometer-alt", title: "Interim Tracking", desc: "Review interim audit outcomes allowing for instantaneous rectification of discrepancies." },
        { icon: "fas fa-chart-line", title: "Analysis Reports", desc: "Automatically generates comprehensive structured audit analysis compliance reports seamlessly." },
        { icon: "fas fa-cloud-download-alt", title: "Cloud Technology", desc: "Robust remote analysis, secure data access, and instant support executed via reliable cloud technology." },
        { icon: "fas fa-smile", title: "Intuitive Experience", desc: "Exceptionally user-friendly design catering directly to targeted operational compliance goals." }
    ],
    faqTitle: "Common questions about<br>eAUDiTHub",
    faqDesc: "Answers regarding mobility, compliance standards customization, and system reports generated by eAUDiTHub.",
    faqs: [
        { q: "Does eAUDiTHub align seamlessly with global safety standards?", a: "Yes, it is purposefully designed in alignment with rigorous international standards such as HACCP, FSSAI, and ISO 22000." },
        { q: "Can I conduct comprehensive audits effectively using a tablet?", a: "Indeed. One of its standout features is its optimized mobile accessibility, allowing convenient checks on smartphones or tablets." },
        { q: "How are non-conformities managed by the system?", a: "Post-audit, detailed discrepancy reports are dispatched instantly to hygiene departments prioritizing vital corrective and follow-up actions." }
    ]
  }
];

pages.forEach(page => {
    let $ = cheerio.load(templateHtml);

    // Update Meta and Title
    $('title').text(page.title);
    $('meta[property="og:title"]').attr('content', page.title);
    $('meta[name="description"]').attr('content', page.metaDesc);
    $('meta[property="og:description"]').attr('content', page.metaDesc);
    $('meta[name="keywords"]').attr('content', page.metaKw);
    $('meta[property="og:url"]').attr('content', `https://www.boscosofttech.com/${page.filename}`);
    $('link[rel="canonical"]').attr('href', `https://www.boscosofttech.com/${page.filename}`);

    // Update breadcrumb
    $('.breadcrumb-item.active').text(page.breadcrumb);

    // Update active nav (Assuming we just match the dropdown-item href)
    //$('a.mega-menu-item').removeClass('active');
    //$(`a.mega-menu-item[href="${page.filename}"]`).addClass('active');

    // Hero Section
    $('.ssp-hero-tag').text(page.heroTag);
    $('.ssp-hero-title').html(page.heroTitle);
    $('.ssp-hero-desc').text(page.heroDesc);
    $('.ssp-hero-btns a[target="_blank"]').attr('href', page.heroLink);

    // Stats
    const statsItems = $('.hero-trust-stats .stat-item');
    if(statsItems.length === 3 && page.stats.length === 3) {
        $(statsItems[0]).find('h4').text(page.stats[0].num);
        $(statsItems[0]).find('p').text(page.stats[0].text);
        $(statsItems[1]).find('h4').text(page.stats[1].num);
        $(statsItems[1]).find('p').text(page.stats[1].text);
        $(statsItems[2]).find('h4').text(page.stats[2].num);
        $(statsItems[2]).find('p').text(page.stats[2].text);
    }

    // Modules
    $('#modules .section-title').html(page.modulesTitle);
    $('#modules p.text-muted').text(page.modulesDesc);
    
    const moduleCards = $('#modulesScrollTrack .module-new-card');
    page.modules.forEach((mod, idx) => {
        if(idx < moduleCards.length) {
            const card = $(moduleCards[idx]);
            card.find('.module-new-icon i').attr('class', mod.icon);
            card.find('.module-new-title').text(mod.title);
            card.find('.module-new-desc').text(mod.desc);
        }
    });

    // Features Section
    $('#features h3.fw-bold').html(page.featuresTitle);
    $('#features p.text-muted').first().text(page.featuresDesc); // The one under the title in grid

    const featureCards = $('.feature-grid-card');
    // Features are 6 cards total
    page.features.forEach((feat, idx) => {
        if(idx < featureCards.length) {
            const card = $(featureCards[idx]);
            card.find('i').attr('class', feat.icon + ' fa-2x mb-3' + (card.css('background-color') === '#005a8c' || card.find('i').hasClass('text-white') ? ' text-white' : ''));
            // Preserve specific text color logic
            if(card.find('h6').hasClass('text-white')){
               card.find('h6').text(feat.title).addClass('text-white mb-2 pb-2');
            } else {
               card.find('h6').text(feat.title).addClass('text-dark mb-2 pb-2');
            }
            if(card.find('p').hasClass('text-white')){
               card.find('p').text(feat.desc).addClass('small text-white opacity-75 mb-0');
            } else {
               card.find('p').text(feat.desc).addClass('small text-dark opacity-75 mb-0');
            }
        }
    });

    // App Download Section Title
    $('.app-download-title').html(`Make the most of ${page.breadcrumb} -<br>Download App`);

    // FAQ Section
    $('#faq h2.section-title').html(page.faqTitle);
    $('#faq p.text-muted').first().text(page.faqDesc);

    const faqItems = $('#sspFaq .accordion-item');
    page.faqs.forEach((faq, idx) => {
        if(idx < faqItems.length) {
            const item = $(faqItems[idx]);
            item.find('.accordion-button').text(faq.q);
            item.find('.accordion-body').text(faq.a);
        }
    });

    fs.writeFileSync(path.join(__dirname, page.filename), $.html(), 'utf8');
});
console.log('Successfully generated all pages.');
