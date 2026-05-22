const SHARED_LAYOUT_STYLESHEET = 'css/shared-header-footer.css';

const SHARED_HEADER_HTML = `
  <header class="header" id="header">
    <div class="container navbar">
      <a href="index.html" class="logo-container" aria-label="Boscosoft Home">
        <img src="public/images/bosco-logo.png" alt="BoscoSoft Technologies" class="logo-img" />
      </a>

      <nav aria-label="Main Navigation">
        <ul class="nav-menu" id="nav-menu">
          <li class="nav-item">
            <a href="index.html" class="nav-link">Home</a>
          </li>

          <li class="nav-item">
            <a href="index.html#who-we-are" class="nav-link">
              About Us
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </a>
            <div class="mega-menu mega-menu-3col">
              <div class="mega-col">
                <div class="mega-col-title">Our Identity</div>
                <ul class="mega-list">
                  <li class="mega-item">
                    <a href="mission.html">
                      <span class="mega-item-name">Our Story</span>
                      <span class="mega-item-desc">A legacy of ethical B2B innovation since 2001.</span>
                    </a>
                  </li>
                  <li class="mega-item">
                    <a href="mission.html">
                      <span class="mega-item-name">Mission & Vision</span>
                      <span class="mega-item-desc">Pillars driving our digital scaling strategy.</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mega-col">
                <div class="mega-col-title">Leadership & Reach</div>
                <ul class="mega-list">
                  <li class="mega-item">
                    <a href="team.html">
                      <span class="mega-item-name">Leadership Team</span>
                      <span class="mega-item-desc">Meet the directors managing our delivery hubs.</span>
                    </a>
                  </li>
                  <li class="mega-item">
                    <a href="index.html#global-presence">
                      <span class="mega-item-name">Global Presence</span>
                      <span class="mega-item-desc">Deploying digital ecosystems in 22+ countries.</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mega-col">
                <div class="mega-col-title">Careers</div>
                <ul class="mega-list">
                  <li class="mega-item">
                    <a href="careers.html">
                      <span class="mega-item-name">Join Our Team</span>
                      <span class="mega-item-desc">Explore engineering & AI automation positions.</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li class="nav-item">
            <a href="index.html#platforms" class="nav-link">
              Products
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </a>
            <div class="mega-menu mega-menu-4col">
              <div class="mega-col">
                <div class="mega-col-title">EdTech & Higher Ed</div>
                <ul class="mega-list">
                  <li class="mega-item">
                    <a href="smart-school-plus.html">
                      <span class="mega-item-name">SmartSchoolPlus</span>
                      <span class="mega-item-desc">Complete K-12 school management ERP.</span>
                    </a>
                  </li>
                  <li class="mega-item">
                    <a href="hi-grade.html">
                      <span class="mega-item-name">HiGrade</span>
                      <span class="mega-item-desc">Outcome education & accreditation.</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mega-col">
                <div class="mega-col-title">FinTech & ERP</div>
                <ul class="mega-list">
                  <li class="mega-item">
                    <a href="acme-erp.html">
                      <span class="mega-item-name">Acme.erp</span>
                      <span class="mega-item-desc">NGO financial ledger & fund tracking.</span>
                    </a>
                  </li>
                  <li class="mega-item">
                    <a href="microfund.html">
                      <span class="mega-item-name">MicroFund</span>
                      <span class="mega-item-desc">Microfinance group and collection app.</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mega-col">
                <div class="mega-col-title">Specialty & Healthcare</div>
                <ul class="mega-list">
                  <li class="mega-item">
                    <a href="medsysb.html">
                      <span class="mega-item-name">MedSysB</span>
                      <span class="mega-item-desc">10 to 500-bed hospital management.</span>
                    </a>
                  </li>
                  <li class="mega-item">
                    <a href="cristo.html">
                      <span class="mega-item-name">CristO Suite</span>
                      <span class="mega-item-desc">Diocese registries & church books.</span>
                    </a>
                  </li>
                  <li class="mega-item">
                    <a href="eaudithub.html">
                      <span class="mega-item-name">eAuditHub</span>
                      <span class="mega-item-desc">Digital quality & ISO compliance dashboard.</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mega-promo-col">
                <div class="mega-menu-promo" style="background-image: linear-gradient(rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.85)), url('public/images/banking-system.jpg'); background-size: cover; background-position: center;">
                  <span class="promo-badge">New Release</span>
                  <h6>AI Copilot Layer</h6>
                  <p>Integrate practical scheduling analytics and audit logs into your systems.</p>
                  <a href="contact.html?product=ai-copilot" class="btn btn-primary btn-sm">Explore Beta</a>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item">
            <a href="services.html" class="nav-link">
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </a>
            <div class="mega-menu mega-menu-3col">
              <div class="mega-col" style="grid-column: span 2;">
                <div class="mega-col-title">Transformation Services</div>
                <ul class="mega-list" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                  <li class="mega-item"><a href="ai-transformation.html"><span class="mega-item-name">AI & Automation</span><span class="mega-item-desc">Deploy local LLMs & automation workflows.</span></a></li>
                  <li class="mega-item"><a href="integration-digital-ecosystems.html"><span class="mega-item-name">API & Ecosystem Integration</span><span class="mega-item-desc">Connect databases and legacy software.</span></a></li>
                  <li class="mega-item"><a href="app-modernization.html"><span class="mega-item-name">SaaS Engineering</span><span class="mega-item-desc">Re-engineer desktop apps to subscription web.</span></a></li>
                  <li class="mega-item"><a href="erp-customization.html"><span class="mega-item-name">ERP/CRM Implementation</span><span class="mega-item-desc">Optimize Odoo, Frappe, and Dynamics 365.</span></a></li>
                  <li class="mega-item"><a href="data-analytics-ai.html"><span class="mega-item-name">Data & Analytics</span><span class="mega-item-desc">Databricks warehouses & PowerBI dashboards.</span></a></li>
                  <li class="mega-item"><a href="cloud-infrastructure-support.html"><span class="mega-item-name">Cloud Infrastructure</span><span class="mega-item-desc">Azure configurations and 24/7 technical help desks.</span></a></li>
                  <li class="mega-item"><a href="technology-ecosystem-partnerships.html"><span class="mega-item-name">Technology Ecosystem</span><span class="mega-item-desc">Azure, Odoo, ERPNext, analytics, and custom AI layers.</span></a></li>
                </ul>
              </div>
              <div class="mega-promo-col">
                <div class="mega-menu-promo" style="background-image: linear-gradient(rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.85)), url('public/images/digital-transformation.jpg'); background-size: cover; background-position: center;">
                  <h6>Bespoke Roadmap</h6>
                  <p>Consult with our principal architects to design your API & cloud strategy.</p>
                  <a href="contact.html?type=roadmap" class="btn btn-outline btn-sm" style="color: white; border-color: rgba(255,255,255,0.4);">Schedule a Call</a>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item">
            <a href="education.html" class="nav-link">
              Industries
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </a>
            <div class="mega-menu mega-menu-2col">
              <div class="mega-col">
                <div class="mega-col-title">Core Sectors</div>
                <ul class="mega-list">
                  <li class="mega-item"><a href="education.html"><span class="mega-item-name">Education</span><span class="mega-item-desc">School groups, universities, academies.</span></a></li>
                  <li class="mega-item"><a href="healthcare.html"><span class="mega-item-name">Healthcare</span><span class="mega-item-desc">10-500 bed hospitals & diagnostic labs.</span></a></li>
                  <li class="mega-item"><a href="finance-microfinance.html"><span class="mega-item-name">FinTech & Microfinance</span><span class="mega-item-desc">Cooperative banking & loan operations.</span></a></li>
                </ul>
              </div>
              <div class="mega-col">
                <div class="mega-col-title">Social & Corporate</div>
                <ul class="mega-list">
                  <li class="mega-item"><a href="faith-based-organizations.html"><span class="mega-item-name">Faith-Based Organizations</span><span class="mega-item-desc">Dioceses, parishes, and religious communities.</span></a></li>
                  <li class="mega-item"><a href="ngos.html"><span class="mega-item-name">NGOs & NPOs</span><span class="mega-item-desc">Transparent fund bookkeeping & audits.</span></a></li>
                  <li class="mega-item"><a href="enterprises.html"><span class="mega-item-name">Enterprises</span><span class="mega-item-desc">Multi-tenant modernizations & AI pipelines.</span></a></li>
                </ul>
              </div>
            </div>
          </li>

          <li class="nav-item"><a href="resources.html" class="nav-link">Resources</a></li>
          <li class="nav-item"><a href="contact.html" class="nav-link">Contact Us</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a href="contact.html?type=demo" class="btn btn-outline" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">Request a Demo</a>
        <a href="contact.html?type=consultation" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">Schedule Consultation</a>
      </div>

      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle Menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <div class="mobile-sticky-cta" id="mobile-sticky-cta">
    <a href="contact.html?type=demo" class="btn btn-secondary" style="flex: 1; margin-right: 0.5rem; padding: 0.75rem 0.5rem; font-size: 0.85rem; border-radius: 8px;">Request a Demo</a>
    <a href="contact.html?type=consultation" class="btn btn-primary" style="flex: 1; padding: 0.75rem 0.5rem; font-size: 0.85rem; border-radius: 8px;">Talk to Our Experts</a>
  </div>
`;

const SHARED_FOOTER_HTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo-container" style="align-self: flex-start;">
            <img src="public/images/bosco-logo.png" alt="Boscosoft Logo" class="logo-img" />
          </a>
          <p class="footer-brand-desc">
            Global AI & Digital Transformation Partner delivering cloud-native SaaS systems, database integrations, and long-term tech support.
          </p>
          <div class="footer-socials">
            <a href="#" class="footer-social-icon" aria-label="LinkedIn">In</a>
            <a href="#" class="footer-social-icon" aria-label="Twitter">X</a>
            <a href="#" class="footer-social-icon" aria-label="Facebook">Fb</a>
          </div>
        </div>

        <div class="footer-col">
          <span class="footer-col-title">Company</span>
          <ul class="footer-links">
            <li><a href="mission.html">About Us</a></li>
            <li><a href="mission.html">Mission & Vision</a></li>
            <li><a href="team.html">Leadership</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <span class="footer-col-title">Products</span>
          <ul class="footer-links">
            <li><a href="smart-school-plus.html">SmartSchoolPlus</a></li>
            <li><a href="hi-grade.html">HiGrade</a></li>
            <li><a href="acme-erp.html">Acme.erp</a></li>
            <li><a href="microfund.html">MicroFund</a></li>
            <li><a href="medsysb.html">MedSysB</a></li>
            <li><a href="cristo.html">CristO Suite</a></li>
            <li><a href="eaudithub.html">eAuditHub</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <span class="footer-col-title">Services</span>
          <ul class="footer-links">
            <li><a href="ai-transformation.html">AI & Automation</a></li>
            <li><a href="integration-digital-ecosystems.html">Integration & APIs</a></li>
            <li><a href="app-modernization.html">SaaS Modernization</a></li>
            <li><a href="erp-customization.html">ERP/CRM Setup</a></li>
            <li><a href="data-analytics-ai.html">Data & Analytics</a></li>
            <li><a href="cloud-infrastructure-support.html">Cloud Support</a></li>
            <li><a href="technology-ecosystem-partnerships.html">Technology Ecosystem</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <span class="footer-col-title">Contact</span>
          <div class="footer-links" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="footer-contact-item">
              <span class="footer-contact-lbl">Delivery Centers</span>
              <span class="footer-contact-val">Chennai, India<br>Dubai, UAE</span>
            </div>
            <div class="footer-contact-item">
              <span class="footer-contact-lbl">Email Sales</span>
              <span class="footer-contact-val">binfo@boscosofttech.com</span>
            </div>
            <div class="footer-contact-item">
              <span class="footer-contact-lbl">Inquiries</span>
              <span class="footer-contact-val">+91 962 680 0800</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 Bosco Soft Technologies Pvt. Ltd. All rights reserved.</span>
        <ul class="footer-bottom-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </div>
    </div>
  </footer>
`;

function ensureSharedLayoutStyles() {
  if (document.querySelector(`link[href="${SHARED_LAYOUT_STYLESHEET}"]`)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = SHARED_LAYOUT_STYLESHEET;
  document.head.appendChild(link);
}

function createFragment(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.cloneNode(true);
}

function replaceWithSharedHeader() {
  const legacyNav = document.querySelector('nav.navbar');
  const placeholder = document.querySelector('#global-header');
  const target = legacyNav || placeholder;

  if (!target) return;
  target.replaceWith(createFragment(SHARED_HEADER_HTML));
}

function replaceWithSharedFooter() {
  const legacyFooter = document.querySelector('footer.footer-section, footer.site-footer, footer.footer');
  const placeholder = document.querySelector('#global-footer');
  const target = legacyFooter || placeholder;

  if (!target) return;
  target.replaceWith(createFragment(SHARED_FOOTER_HTML));
}

function cleanupLegacyNodes() {
  document.querySelectorAll('#global-header, #global-footer').forEach((node) => node.remove());
  document.querySelectorAll('nav.navbar').forEach((node) => node.remove());
  document.querySelectorAll('footer.footer-section, footer.site-footer').forEach((node) => node.remove());
}

function normalizeActiveLinks() {
  const currentPath = (window.location.pathname.split('/').pop() || 'index.html').split('#')[0].split('?')[0];
  document.querySelectorAll('.nav-menu a, .footer-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const normalizedHref = href.replace(/^\/|\/$/g, '').split('/').pop().split('#')[0].split('?')[0];
    if (!normalizedHref) return;

    if (normalizedHref === currentPath) {
      link.classList.add('active');
      const navLink = link.closest('.nav-item')?.querySelector('.nav-link');
      navLink?.classList.add('active');
    }
  });
}

function initInjectedHeader() {
  document.body.classList.add('has-global-layout');

  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('header-scrolled', window.scrollY > 50);
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.classList.toggle('active');
    navMenu?.classList.toggle('active');
  });

  header.querySelectorAll('.nav-item > .nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (window.innerWidth > 768) return;

      const parent = link.parentElement;
      if (!parent?.querySelector('.mega-menu')) return;

      event.preventDefault();
      parent.classList.toggle('active');
    });
  });

  header.querySelectorAll('.mega-item a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth > 768) return;

      navToggle?.classList.remove('active');
      navToggle?.setAttribute('aria-expanded', 'false');
      navMenu?.classList.remove('active');
      header.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
    });
  });

  normalizeActiveLinks();
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('home-page')) {
    return;
  }

  ensureSharedLayoutStyles();
  replaceWithSharedHeader();
  replaceWithSharedFooter();
  cleanupLegacyNodes();
  initInjectedHeader();
});
