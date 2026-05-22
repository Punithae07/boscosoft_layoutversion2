import os
import re

# Paths
workspace_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
index_path = os.path.join(workspace_dir, "index.html")

# Read index.html to extract header and footer
with open(index_path, "r", encoding="utf-8") as f:
    index_html = f.read()

# Extract header (everything inside <header class="header" id="header"> ... </header>)
header_match = re.search(r'(<header class="header" id="header">.*?</header>)', index_html, re.DOTALL)
if header_match:
    header_content = header_match.group(1)
else:
    raise ValueError("Header not found in index.html")

# Extract footer (everything inside <footer class="footer"> ... </footer>)
footer_match = re.search(r'(<footer class="footer">.*?</footer>)', index_html, re.DOTALL)
if footer_match:
    footer_content = footer_match.group(1)
else:
    raise ValueError("Footer not found in index.html")

def get_stats_html(stats_list):
    html = ""
    for i, stat in enumerate(stats_list):
        val = stat["val"]
        lbl = stat["lbl"]
        border_class = " border-start border-light border-opacity-25 ps-sm-4 text-start" if i > 0 else ""
        html += f"""
        <div class="stat-item{border_class}">
          <h4 class="mb-0 fw-bold" style="color: white; font-size: 2rem;">{val}</h4>
          <p class="small text-light mb-0" style="color: rgba(255,255,255,0.7);">{lbl}</p>
        </div>
        """
    return html

def get_modules_html(modules_list):
    html = ""
    for mod in modules_list:
        html += f"""
        <div class="module-new-card">
          <div class="module-new-icon"><i class="{mod["icon"]}"></i></div>
          <div class="module-new-title">{mod["title"]}</div>
          <div class="module-new-desc">{mod["desc"]}</div>
        </div>
        """
    return html

def get_advantages_html(advantages_list):
    html = ""
    for i, adv in enumerate(advantages_list):
        bg = "#005a8c" if i % 2 == 0 else "#ffffff"
        txt = "white" if i % 2 == 0 else "var(--navy-dark)"
        desc_txt = "rgba(255,255,255,0.85)" if i % 2 == 0 else "var(--text-gray)"
        icon_color = "white" if i % 2 == 0 else "var(--primary-base)"
        border_style = "border: 1px solid rgba(255,255,255,0.15);" if i % 2 == 0 else "border: 1px solid var(--border-color);"
        
        html += f"""
        <div class="p-4 rounded-4 feature-grid-card" style="background-color: {bg}; {border_style} padding: 2rem; border-radius: 16px;">
          <i class="{adv["icon"]} fa-2x mb-3" style="color: {icon_color}; font-size: 2rem; display: block; margin-bottom: 1rem;"></i>
          <h3 class="fw-bold mb-2 pb-2" style="color: {txt}; font-size: 1.25rem; border-bottom: 1px solid rgba({'255,255,255,0.1' if i % 2 == 0 else '0,0,0,0.05'}); margin-bottom: 1rem; padding-bottom: 0.5rem;">{adv["title"]}</h3>
          <p class="small mb-0" style="color: {desc_txt}; font-size: 0.9rem; line-height: 1.6;">{adv["desc"]}</p>
        </div>
        """
    return html

def get_faq_bootstrap_html(faq_list, faq_id_prefix):
    html = f'<div class="accordion" id="{faq_id_prefix}Faq">'
    for i, faq in enumerate(faq_list):
        show_class = " show" if i == 0 else ""
        collapsed_class = "" if i == 0 else " collapsed"
        html += f"""
        <div class="accordion-item border-0 border-bottom bg-transparent mb-0 overflow-hidden">
            <h3 class="accordion-header">
                <button class="accordion-button bg-transparent fw-bold text-dark px-0 py-4 shadow-none{collapsed_class}"
                    type="button" data-bs-toggle="collapse" data-bs-target="#{faq_id_prefix}faq{i}">
                    {faq["q"]}
                </button>
            </h3>
            <div id="{faq_id_prefix}faq{i}" class="accordion-collapse collapse{show_class}" data-bs-parent="#{faq_id_prefix}Faq">
                <div class="accordion-body px-0 pt-0 pb-4 text-muted" style="line-height: 1.7;">
                   {faq["a"]}
                </div>
            </div>
        </div>
        """
    html += '</div>'
    return html

def get_testimonials_html(testimonials_list):
    html = '<div class="testimonial-cards-container">'
    for i, test in enumerate(testimonials_list):
        html += f"""
        <div class="testimonial-card">
            <div class="testimonial-card-content">
                <div class="testimonial-quote-icon mb-3">
                    <i class="fas fa-quote-left text-primary"></i>
                </div>
                <p class="testimonial-text mb-4">“{test["quote"]}”</p>
                <div class="testimonial-author">
                    <h6 class="mb-1 fw-bold">{test["author"]}</h6>
                    <small class="text-muted">{test["role"]}</small>
                </div>
            </div>
        </div>
        """
    html += '</div>'
    return html

def get_deliverables_html(deliv_list):
    html = ""
    for item in deliv_list:
        html += f"""
        <div class="p-4 rounded-4" style="background: white; border: 1px solid var(--border-color); padding: 2rem; border-radius: 16px;">
          <i class="{item["icon"]} fa-2x mb-3" style="color: var(--primary-base); display: block; margin-bottom: 1rem;"></i>
          <h3 class="fw-bold mb-2 text-dark" style="font-size: 1.2rem; color: var(--navy-dark);">{item["title"]}</h3>
          <p class="small text-muted mb-0" style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6;">{item["desc"]}</p>
        </div>
        """
    return html

def get_process_html(steps):
    html = ""
    for i, step in enumerate(steps):
        html += f"""
        <div class="p-4 rounded-4 text-center" style="background: white; border: 1px solid var(--border-color); border-radius: 16px; padding: 2rem; position: relative;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-base); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; margin: 0 auto 1.5rem auto; font-size: 1.1rem;">{i+1}</div>
          <h4 class="fw-bold mb-2" style="font-size: 1.1rem; color: var(--navy-dark);">{step["title"]}</h4>
          <p class="small text-muted mb-0" style="font-size: 0.85rem; line-height: 1.5;">{step["desc"]}</p>
        </div>
        """
    return html

def get_partners_marquee_html():
    html = """
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
    """
    return html

def write_page(slug_path, html_content):
    full_dir = os.path.join(workspace_dir, slug_path)
    os.makedirs(full_dir, exist_ok=True)
    file_path = os.path.join(full_dir, "index.html")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Wrote page to {file_path}")

# ==================== PRODUCTS LIST ====================
products_data = [
    {
        "slug": "platforms/smartschoolplus",
        "name": "SmartSchoolPlus",
        "category": "SCHOOL MANAGEMENT ERP",
        "headline_part_1": "Complete Administration,",
        "headline_part_2": "Simplified for K-12",
        "seo_description": "SmartSchoolPlus - The complete, AI-ready school ERP software trusted by 200+ K-12 institutions globally. Streamline admissions, grading, and parent communications.",
        "desc": "SmartSchoolPlus empowers school boards, curriculum directors, and administrators to orchestrate every operation in one place. Simplify scheduling, fee management, assessment workflows, and parent communications with a secure cloud ERP.",
        "stats": [
            {"val": "200+", "lbl": "Institutions Served"},
            {"val": "150k+", "lbl": "Active Students"},
            {"val": "15+", "lbl": "Integrated Modules"}
        ],
        "modules_title": "Fully Integrated School Modules",
        "modules_desc": "Explore our complete suite of administrative and educational modules designed for modern multi-curriculum institutions.",
        "modules": [
            {"icon": "fas fa-user-graduate", "title": "Student Lifecycles", "desc": "From online enrollment and admissions scoring to alumni records tracking, manage the complete student footprint in a single source of truth."},
            {"icon": "fas fa-receipt", "title": "Automated Billing", "desc": "Establish complex fee structures, send digital invoice notifications to parent portals, and accept online payments through secure integrated gateways."},
            {"icon": "fas fa-file-invoice", "title": "Exams & Report Cards", "desc": "Configure custom grading scales, record progress marks, generate report cards dynamically, and publish grades with automatic GPAs."},
            {"icon": "fas fa-bus", "title": "Transport Scheduling", "desc": "Coordinate student routes, track bus fleets, and manage vehicle checklists and fuel accounts to optimize institutional transport logistics."},
            {"icon": "fas fa-book", "title": "Library Automation", "desc": "Digitize book registries, support barcode scanning, automate borrowing policies, and manage fine notices and stock tracking seamlessly."},
            {"icon": "fas fa-users", "title": "Parent-Staff Portal", "desc": "Provide native mobile access for parents to view attendance, exam schedules, teacher messaging, and live homework feeds."}
        ],
        "advantages": [
            {"icon": "fas fa-server", "title": "Cloud-Native SaaS", "desc": "No expensive server deployments. Secure cloud hosting with automatic updates, high uptime, and zero maintenance."},
            {"icon": "fas fa-lock", "title": "GDPR Compliance", "desc": "Enterprise-grade encryption protecting sensitive student personal details, health logs, and financial records."},
            {"icon": "fas fa-mobile-alt", "title": "Mobile First", "desc": "Dedicated portals for teachers, parents, and administrative staff optimize operational efficiency on the go."}
        ],
        "testimonial_image": "/images/case-study-school.jpg",
        "badge_text": "200+ Schools Trusted",
        "testimonials": [
            {"quote": "SmartSchoolPlus transformed our fee collections and grading logs. Parent satisfaction is at an all-time high.", "author": "Fr. Thomas Aquinas", "role": "Rector, Don Bosco School"},
            {"quote": "The parent portal has improved our communication responsiveness by 200%. Faculty grading workflows are seamless.", "author": "Sr. Mary Stella", "role": "Principal, Auxilium Academy"},
            {"quote": "Migrating 25 campuses to SmartSchoolPlus was seamless and completed in 4 weeks. Highly recommend this team.", "author": "Mr. Rajasekaran", "role": "IT Director, K-12 Group"}
        ],
        "faqs": [
            {"q": "How long does it take to implement SmartSchoolPlus?", "a": "A standard implementation for a single school takes 3-4 weeks. For large multi-campus groups, it averages 6-8 weeks, which includes data migration and staff onboarding."},
            {"q": "Can it integrate with our existing accounting systems?", "a": "Yes! SmartSchoolPlus exposes secure REST APIs and can sync student fee collections directly into platforms like Acme.erp, Odoo, or Tally."},
            {"q": "Is data stored securely?", "a": "Absolutely. All databases are isolated per tenant, encrypted at rest and in transit, and hosted on secure Azure infrastructure with daily automated backups."},
            {"q": "Do you support offline access on mobile devices?", "a": "Yes. Our parent and teacher portals cache essential schedules, attendance charts, and contact numbers for offline viewing, syncing updates once connection resumes."},
            {"q": "What support levels do you offer?", "a": "We provide 24/7 dedicated support via telephone, email, and live ticket desk with guaranteed SLA response times based on institutional tier."}
        ],
        "cta_title": "Get Started with SmartSchoolPlus Today",
        "cta_desc": "Ready to digitize scheduling, grade reporting, and admissions? Schedule a personalized demo with our solution architects to review dashboard analytics and parent portal layouts."
    },
    {
        "slug": "platforms/higrade-solutions",
        "name": "HiGrade Solutions",
        "category": "HIGHER EDUCATION ERP",
        "headline_part_1": "Outcome-Based ERP for",
        "headline_part_2": "Higher Education",
        "seo_description": "HiGrade Solutions - outcome education planning and accreditation management ERP for colleges and universities. Trusted by 50+ campus systems.",
        "desc": "Manage the higher education lifecycle from admissions to alumni. HiGrade is built to support outcome-based education (OBE) templates, NAAC/NBA accreditation workflows, multi-course timetables, and college administration scales.",
        "stats": [
            {"val": "50+", "lbl": "Campus systems"},
            {"val": "80k+", "lbl": "Graduated Alumni"},
            {"val": "99.2%", "lbl": "Accreditation readiness"}
        ],
        "modules_title": "University & College Operations",
        "modules_desc": "Streamline complex academic and assessment lifecycles for colleges, universities, and technical academies.",
        "modules": [
            {"icon": "fas fa-university", "title": "Academic OBE Registry", "desc": "Define course outcomes, map them to program goals, and track student attainment indexes to comply with modern educational criteria."},
            {"icon": "fas fa-tasks", "title": "Examination Cell", "desc": "Automate exam center scheduling, generate invigilator rosters, process credit-based marks sheets, and publish graduation transcripts."},
            {"icon": "fas fa-chalkboard-teacher", "title": "Faculty Workloads", "desc": "Monitor teaching hours, lesson plans, research logs, and performance appraisals inside a single central campus administration console."},
            {"icon": "fas fa-credit-card", "title": "Fee & Hostel Ledger", "desc": "Manage registration billings, scholarship distributions, dormitory allocations, mess billing, and online payments."}
        ],
        "advantages": [
            {"icon": "fas fa-award", "title": "Accreditation Audit Ready", "desc": "Export structured documentation, course folders, and OBE charts instantly during accreditation audits (NAAC, NBA, ABET)."},
            {"icon": "fas fa-network-wired", "title": "High Scalability", "desc": "Engineered to handle concurrent registration load for thousands of students registering for classes simultaneously."},
            {"icon": "fas fa-user-shield", "title": "Granular Roles", "desc": "Enforce strict access controls separating student files, registrar records, grading sheets, and financial accounts."}
        ],
        "testimonial_image": "/images/resource-laptop.jpg",
        "badge_text": "NAAC & NBA Audit Ready",
        "testimonials": [
            {"quote": "HiGrade's OBE module is exceptional. Preparing NAAC self-study reports is now stress-free and accurate.", "author": "Dr. P. Subramanian", "role": "Dean of Academics, Salem College"},
            {"quote": "Faculty workloads and credit-based grading are fully automated. It has saved hundreds of admin hours.", "author": "Prof. Maria Joseph", "role": "Director, Sacred Heart Institute"},
            {"quote": "Attainment score calculations are fast and comply perfectly with NAAC and NBA accreditation standards.", "author": "Sr. Helen D'Souza", "role": "Registrar, St. Mary's University"}
        ],
        "faqs": [
            {"q": "Does HiGrade support Choice Based Credit System (CBCS)?", "a": "Yes. HiGrade fully supports the Choice Based Credit System, allowing students to select elective courses, open majors, and non-academic credits from their portal."},
            {"q": "How does the accreditation export work?", "a": "HiGrade continuously aggregates OBE data, grades, feedback surveys, and faculty reports. Administrators can download complete NAAC/NBA SSR folders with one click."},
            {"q": "Is training provided for college faculty?", "a": "Yes. We conduct hands-on training workshops for teaching staff, registrars, and database administrators, supplemented by video guides and documentation."},
            {"q": "Can we host HiGrade on our campus servers?", "a": "While we recommend our secure cloud SaaS deployment for reliability, we do support hybrid on-premise installation for qualified universities."},
            {"q": "How does the system handle alumni donations?", "a": "HiGrade includes an integrated Alumni Portal to track graduate success, schedule reunions, and process donations which sync to the central finance module."}
        ],
        "cta_title": "Get NAAC Audit Ready Today",
        "cta_desc": "Looking to automate outcome education mapping or college fee collections? Schedule a direct system review call with our technical support leads."
    },
    {
        "slug": "platforms/acme-erp",
        "name": "Acme.erp",
        "category": "NONPROFIT FINANCIAL ERP",
        "headline_part_1": "Built for Impact,",
        "headline_part_2": "Designed for NGO Ledger",
        "seo_description": "Acme.erp - Leading NGO accounting software for fund tracking, budget compliance, and transparent financial ledger reporting. Serving 1,800+ nonprofits.",
        "desc": "Simplify bookkeeping and compliance reporting for nonprofits, NGOs, and mission-driven religious organizations. Acme.erp provides multi-branch transparency, FCRA audit trails, and donor receipt automation to let you focus on your mission.",
        "stats": [
            {"val": "1,800+", "lbl": "NGO Clients"},
            {"val": "13", "lbl": "Indian States Active"},
            {"val": "9", "lbl": "Countries Active"}
        ],
        "modules_title": "Comprehensive NGO Financial Modules",
        "modules_desc": "Manage every donation, expense, and budget variance in compliance with nonprofit reporting rules.",
        "modules": [
            {"icon": "fas fa-book-open", "title": "Fund Accounting Ledger", "desc": "Establish separate tracking for restricted and unrestricted funds. Maintain clean balances and demonstrate exact spending compliance to grant makers."},
            {"icon": "fas fa-hand-holding-heart", "title": "Donor & Grant Profiles", "desc": "Record donor contributions, automate tax-exempt receipts, track multi-year grant disbursements, and schedule pledge alerts."},
            {"icon": "fas fa-calculator", "title": "Multi-Branch Consolidations", "desc": "Compile financials across provincial offices, local mission stations, and field projects into single dashboard reports."},
            {"icon": "fas fa-file-signature", "title": "Audit Trail Logs", "desc": "Track every transaction history, user edit, and expense approval to prevent errors and ensure seamless statutory compliance."}
        ],
        "advantages": [
            {"icon": "fas fa-stamp", "title": "Regulatory Compliant", "desc": "Built to satisfy local statutory laws, including Form 10B/10BB reports, FCRA ledger guidelines, and 80G tax receipt rules."},
            {"icon": "fas fa-chart-line", "title": "Budget Control Checks", "desc": "Block transactions that exceed program budgets and output real-time variance charts."},
            {"icon": "fas fa-shield-alt", "title": "Bank Reconciliations", "desc": "Connect directly with local and foreign banking APIs to match bank feeds instantly with ledger records."}
        ],
        "testimonial_image": "/images/banking-system.jpg",
        "badge_text": "Form 10B/10BB Compliant",
        "testimonials": [
            {"quote": "Our finance management has been unified across 12 centers. Acme.erp ensures transparency and accuracy.", "author": "Fr. Edwin Vasanth", "role": "DBIG Chennai, Director"},
            {"quote": "Form 10B audit preparation time dropped from 3 weeks to a single click. The compliance dashboard is outstanding.", "author": "Sr. Bridgit Joseph", "role": "FMA Province Trichy, Treasurer"},
            {"quote": "Managing restricted funding is simple. Our donors receive automated compliance statements and tax receipts.", "author": "Fr. Sebastian", "role": "Salesians of Don Bosco, Province Treasurer"},
            {"quote": "Acme.erp software helps all Institutions and organizations to make efficient use of their resources.", "author": "Sr. T. Agnes", "role": "SAT Trichy, Treasurer"}
        ],
        "faqs": [
            {"q": "Can we manage foreign contributions separately under FCRA?", "a": "Yes. Acme.erp allows you to configure designated FCRA bank accounts, keeping foreign receipts and spending isolated from domestic accounts for auditing."},
            {"q": "How does the budget lock feature prevent overspending?", "a": "When a branch staff submits an expense claim, the system checks the program's remaining budget. If it exceeds, it halts the claim until a supervisor overrides."},
            {"q": "Does it support local language bookkeeping?", "a": "The administrative panels are in English, but ledger accounts, invoice fields, and receipt templates can print in multiple localized scripts."},
            {"q": "Can we transition from Tally to Acme.erp?", "a": "Yes! We have pre-built import templates that let you migrate your charts of accounts, vendor ledgers, and historical balances from Tally in under 48 hours."},
            {"q": "What hosting options are available?", "a": "Acme.erp is deployed as a secure cloud subscription, ensuring all provincial branches access the database instantly over standard web browsers."}
        ],
        "cta_title": "Achieve Financial Transparency",
        "cta_desc": "Struggling with multi-branch budget audits or foreign fund compliance? Contact our NGO finance specialists to schedule a live system walk-through."
    },
    {
        "slug": "platforms/microfund",
        "name": "MicroFund",
        "category": "MICROFINANCE MANAGEMENT SYSTEM",
        "headline_part_1": "Empower Field Operations,",
        "headline_part_2": "Optimize Loan Collections",
        "seo_description": "MicroFund - Microfinance collection software and loan accounting platform for MFIs, SHGs, and cooperative societies. Trusted by 7 Indian MFIs.",
        "desc": "Manage cooperative credit, self-help groups (SHG), and microfinance loan distributions with real-time field collection applications. MicroFund streamlines interest calculations, field agent tracking, and loan repayment accounting.",
        "stats": [
            {"val": "7", "lbl": "Indian MFIs"},
            {"val": "40k+", "lbl": "Active Borrowers"},
            {"val": "99.8%", "lbl": "Repayment Track"}
        ],
        "modules_title": "Microfinance & Credit Modules",
        "modules_desc": "Streamline loan processing, agent collections, and branch accounting for microfinance groups.",
        "modules": [
            {"icon": "fas fa-users-cog", "title": "Group & Center Management", "desc": "Group borrowers into Centers and Joint Liability Groups (JLG). Coordinate meeting schedules, attendance, and joint liability rules."},
            {"icon": "fas fa-hand-holding-usd", "title": "Loan Portfolio Management", "desc": "Configure custom loan products with declining or flat interest rates, processing fees, insurance charges, and repayment frequencies."},
            {"icon": "fas fa-mobile-alt", "title": "Agent Field App", "desc": "Equip field agents with an offline Android app to log cash receipts, verify balances, and print Bluetooth receipts on-site."},
            {"icon": "fas fa-shield-alt", "title": "Risk & Portfolio Quality", "desc": "Monitor Portfolio at Risk (PAR) matrixes, track late repayment alerts, and run credit score analyses."}
        ],
        "advantages": [
            {"icon": "fas fa-wifi-slash", "title": "Offline-First Mobile App", "desc": "Collect loan payments in deep rural regions without internet. Data syncs automatically once agents return to network range."},
            {"icon": "fas fa-print", "title": "Bluetooth Printer Support", "desc": "Print physical collection slips in the field directly from the agent's Android app for trust and verification."},
            {"icon": "fas fa-cogs", "title": "Flexible Repayment Schedules", "desc": "Support daily, weekly, and monthly collection intervals depending on joint liability group contracts."}
        ],
        "testimonial_image": "/images/digital-transformation.jpg",
        "badge_text": "99.8% Repayment Rate",
        "testimonials": [
            {"quote": "Field collections are tracked live. Our portfolio at risk (PAR) dropped under 1% within three months.", "author": "Mr. K. Ramasamy", "role": "CEO, Grama Trust MFI"},
            {"quote": "The Bluetooth printout builds high trust with our rural members. The offline-first mode is a lifesaver.", "author": "Mrs. Lakshmi Devi", "role": "Coordinator, SHG Federation"},
            {"quote": "Agent daily collections sync in real time. Accounts reconciliation is completed by 6 PM every single day.", "author": "Mr. G. Charles", "role": "Operations Manager, Apex Cooperative"}
        ],
        "faqs": [
            {"q": "Does the field app work without internet?", "a": "Yes! The mobile collection app caches client databases and schedules locally. Agents can collect cash and issue prints offline, and the app updates once online."},
            {"q": "What interest calculation methods are supported?", "a": "We support declining balance (EMI), flat rate, bullet repayments, and customized weekly microfinance grids."},
            {"q": "Can it integrate with national credit bureaus?", "a": "Yes. MicroFund supports exporting portfolio logs to credit bureaus like Equifax, Experian, or High Mark to check borrower defaults."},
            {"q": "Is data stored securely on the mobile device?", "a": "All local data stored in the agent's Android app is fully encrypted and automatically wipes if unauthorized logins are detected."},
            {"q": "Do you support SHG-Bank linkage reports?", "a": "Yes, the system generates standard bank linking templates and group grading sheets required for national cooperative banking loans."}
        ],
        "cta_title": "Optimize Loan Collections Today",
        "cta_desc": "Looking to empower rural collection agents and eliminate bookkeeping leakages? Schedule a live product demo to check our offline mobile layouts."
    },
    {
        "slug": "platforms/medsysb",
        "name": "MedSysB",
        "category": "HOSPITAL MANAGEMENT ERP",
        "headline_part_1": "Patient-Centric Workflows,",
        "headline_part_2": "Optimal Clinic Operations",
        "seo_description": "MedSysB - Hospital management software (HMS) for 10-500 bed hospitals. Integrated billing, pharmacy inventory, LIS, and EMR database.",
        "desc": "Orchestrate clinical, financial, and inventory data across outpatient departments (OPD), inpatient wards (IPD), diagnostic labs, and pharmacy stores. MedSysB is designed to optimize clinical operations and improve patient care standards.",
        "stats": [
            {"val": "70+", "lbl": "Hospitals Active"},
            {"val": "5,000+", "lbl": "Daily Outpatients"},
            {"val": "100%", "lbl": "HIPAA & Consent Aligned"}
        ],
        "modules_title": "Comprehensive Healthcare ERP",
        "modules_desc": "Connect clinical records, pharmacy inventory, lab data, and financial billing into one secure HIPAA-compliant network.",
        "modules": [
            {"icon": "fas fa-heartbeat", "title": "Electronic Medical Records (EMR)", "desc": "Maintain detailed patient histories, diagnostic logs, prescription charts, vital logs, and consent agreements in a secure file."},
            {"icon": "fas fa-procedures", "title": "Ward & IPD Admission", "desc": "Track bed availability in real time. Manage nurse rosters, ward transfers, IPD surgical schedules, and discharge processes."},
            {"icon": "fas fa-prescription-bottle", "title": "Pharmacy & Store Stock", "desc": "Automate batch tracking, expiry date monitors, drug inventories, prescription-to-pharmacy syncs, and reorder levels."},
            {"icon": "fas fa-vials", "title": "Lab Information (LIS)", "desc": "Connect diagnostic equipment directly to patient profiles. Publish blood test and imaging results directly to medical portals."}
        ],
        "advantages": [
            {"icon": "fas fa-check-circle", "title": "HIPAA & Data Privacy", "desc": "Granular data encryption protecting patient files, medical charts, and billing histories from unauthorized view."},
            {"icon": "fas fa-file-invoice-dollar", "title": "Integrated Ward Billing", "desc": "Generate invoice bills combining doctor fees, room rent, pharmacy receipts, and lab charges to speed up discharge."},
            {"icon": "fas fa-chart-pie", "title": "Management Dashboards", "desc": "Monitor daily collections, occupancy indexes, surgery waitlists, and inventory margins in live charts."}
        ],
        "testimonial_image": "/images/healthcare-portal.jpg",
        "badge_text": "HIPAA Compliant System",
        "testimonials": [
            {"quote": "Lab reports are sent to patient portals instantly. OPD waiting times are down by over 70%.", "author": "Dr. Antony Raj", "role": "Director, Grace Hospital"},
            {"quote": "Ward admissions, nurse handovers, and pharmacy syncs are paperless. It has changed our care delivery.", "author": "Sr. Clara D'Almeida", "role": "Nursing Superintendent, St. John's Ward"},
            {"quote": "Integrated ward billing has eliminated billing leakage completely, saving us substantial revenue.", "author": "Mr. S. Viswanathan", "role": "CFO, Medicity Labs"}
        ],
        "faqs": [
            {"q": "Is MedSysB compliant with digital health ID standards?", "a": "Yes. MedSysB supports national digital health registries, allowing clinicians to link patient EMRs to national health accounts (ABHA in India)."},
            {"q": "Can laboratory machines feed data directly?", "a": "Yes, we integrate with LIS analyzers via standard HL7 protocols, eliminating manual entry of blood panels and diagnostic metrics."},
            {"q": "Does the system support insurance pre-authorization workflows?", "a": "Yes. The IPD module tracks insurance claims, pre-approvals, copay allocations, and corporate sponsor letters."},
            {"q": "How does pharmacy inventory handle drug expiries?", "a": "The system monitors batch numbers and raises dashboard warnings 60 days before expiration, preventing dispensing of expired items."},
            {"q": "What training is provided to nursing staff?", "a": "We provide dedicated on-site simulation training for nursing teams, lab technicians, and pharmacy staff during implementation."}
        ],
        "cta_title": "Transform Clinical Workflows",
        "cta_desc": "Ready to transition from paper registers to a digital EMR and pharmacy inventory setup? Reach our healthcare team to map your clinic workflows."
    },
    {
        "slug": "platforms/cristo-suite",
        "name": "CristO Suite",
        "category": "CHURCH MANAGEMENT SOFTWARE",
        "headline_part_1": "Parish Registries and",
        "headline_part_2": "Diocesan Bookkeeping",
        "seo_description": "CristO Suite - Diocesan resource planning & parish database management ERP. Track registers, canonical records, and diocese accounts.",
        "desc": "Establish transparent canonical record keeping and resource planning across dioceses, parishes, religious orders, and communities. CristO Suite maintains parish census files, sacramental logs, clergy profiles, and diocese accounting in one secure place.",
        "stats": [
            {"val": "200+", "lbl": "Church Dioceses"},
            {"val": "25+", "lbl": "Years of Church Trust"},
            {"val": "100%", "lbl": "Canonical Compliance"}
        ],
        "modules_title": "Diocesan Resource Planning Modules",
        "modules_desc": "Protect historical sacramental registers and coordinate diocese administrative departments in a secure platform.",
        "modules": [
            {"icon": "fas fa-church", "title": "Parish Census & Registers", "desc": "Record family member files, track baptismal logs, marriage certs, confirmation registries, and generate official certificates."},
            {"icon": "fas fa-user-tie", "title": "Clergy & Personnel profiles", "desc": "Maintain priest directories, transfer logs, health details, ordination history, and assignments across parish stations."},
            {"icon": "fas fa-donate", "title": "Diocesan Finance Ledger", "desc": "Consolidate parish bank accounts, track church donation receipts, manage educational school properties, and audit yearly budgets."},
            {"icon": "fas fa-history", "title": "Archival Documents", "desc": "Digitize and archive diocese decrees, meeting minutes, historical land files, and canonical circulars securely."}
        ],
        "advantages": [
            {"icon": "fas fa-cross", "title": "Canonical Record Validation", "desc": "Enforce registration requirements compliant with Canon Law policies, preventing manual errors in certificate printing."},
            {"icon": "fas fa-lock", "title": "Data Security & Privacy", "desc": "Maintain parish member files under strict access permissions to comply with modern B2B privacy frameworks."},
            {"icon": "fas fa-network-wired", "title": "Diocese-Parish Sync", "desc": "Allows local parishes to operate independently while syncing stats, registers, and finance targets to the Bishop's house."}
        ],
        "testimonial_image": "/images/case-study-corporate.jpg",
        "badge_text": "Canonical Validated System",
        "testimonials": [
            {"quote": "Parish registries, baptisms, and marriage archives are digitized safely. CristO is canonical-aligned.", "author": "Fr. Albert Sebastian", "role": "Chancellor, Diocese Office"},
            {"quote": "Generating parish certificates is now instant. The census database is fast and extremely user friendly.", "author": "Fr. Joseph Kennedy", "role": "Parish Priest, St. Mary's Church"},
            {"quote": "Personnel records and clergy transfer history are securely tracked in CristO diocesan database.", "author": "Sr. Philomena Mary", "role": "Provincial Secretary"}
        ],
        "faqs": [
            {"q": "Are parish census records kept private?", "a": "Yes. Parishes operate with isolated databases. The diocesan headquarters can only view aggregated statistics and certified logs to prevent privacy breaches."},
            {"q": "Can we print sacramental certificates directly?", "a": "Yes. Once baptism, marriage, or confirmation entries are saved, the system prints canonical certificates using custom templates."},
            {"q": "Does CristO support religious congregation accounts?", "a": "Yes, we offer tailored templates for global religious congregations to manage regional houses, personnel details, and local community funds."},
            {"q": "Can we migrate old handwritten registries into CristO?", "a": "We provide data entry templates, and our support team helps transcribe and import historical directories and family logs into the database."},
            {"q": "How does the system handle parish fee collections?", "a": "Parish fees can be recorded for church contributions, subscription payments, and specific donor funds, generating receipts and automatic ledgers."}
        ],
        "cta_title": "Digitize Diocesan Registers",
        "cta_desc": "Protect historical canonical books and align parish budgets. Call our diocesan technology advisers to schedule a custom system review."
    },
    {
        "slug": "platforms/eaudithub",
        "name": "eAuditHub",
        "category": "COMPLIANCE & AUDIT SYSTEM",
        "headline_part_1": "ISO Compliance Tracking,",
        "headline_part_2": "Simplified Quality Audits",
        "seo_description": "eAuditHub - ISO compliance dashboard & quality audit management software. Automate CAPA workflows, audit checklists, and non-conformances.",
        "desc": "Automate internal quality audits, trace non-conformances (NC), and track corrective actions (CAPA) on a single platform. eAuditHub helps quality assurance managers and compliance officers maintain ISO standards with continuous dashboard tracking.",
        "stats": [
            {"val": "40+", "lbl": "Enterprise Clients"},
            {"val": "90%", "lbl": "Audit Time Saved"},
            {"val": "2", "lbl": "Hubs (India & UAE)"}
        ],
        "modules_title": "ISO Quality & Audit Modules",
        "modules_desc": "Establish accountability, schedule checklist checks, and trace audit records across operational units.",
        "modules": [
            {"icon": "fas fa-calendar-alt", "title": "Audit Scheduling & Setup", "desc": "Define audit scope, construct checklists, assign certified auditors, and notify department heads of audits automatically."},
            {"icon": "fas fa-exclamation-circle", "title": "Non-Conformance Tracking", "desc": "Log non-conformances on-site using mobile templates. Upload photo proof, tag severity levels, and assign resolution responsibilities."},
            {"icon": "fas fa-redo", "title": "CAPA Workflows", "desc": "Orchestrate corrective action verification workflows, set review deadlines, and check validation statuses before closing audits."},
            {"icon": "fas fa-file-contract", "title": "ISO Document Control", "desc": "Store SOP versions, log approval stamps, distribute policies to specific staff, and maintain audit-ready documentation."}
        ],
        "advantages": [
            {"icon": "fas fa-tachometer-alt", "title": "Live Compliance Score", "desc": "Monitor compliance ratings, open NC counts, overdue CAPAs, and audit performance across branches in one UI."},
            {"icon": "fas fa-file-export", "title": "PDF/Excel Audit Reports", "desc": "Compile audit summaries, detailed checklist logs, and proof pictures into audit-ready exports for external ISO auditors."},
            {"icon": "fas fa-bell", "title": "Escalation Notifications", "desc": "Raise alerts to management if NC corrective actions remain open past agreed target resolution dates."}
        ],
        "testimonial_image": "/images/cloud-security.jpg",
        "badge_text": "ISO 9001/27001 Ready",
        "testimonials": [
            {"quote": "eAuditHub has reduced our ISO compliance audit prep time by 90%. Checks are fully tracked.", "author": "Mr. Jean-Pierre", "role": "Quality Manager, Gulf Manufacturing"},
            {"quote": "CAPA resolution workflows are tracked live. Non-conformances are cleared on time before audit reviews.", "author": "Mr. S. Karthik", "role": "VP Quality, Global Logistics"},
            {"quote": "Document control SOP versioning complies perfectly with external ISO certification audits.", "author": "Mrs. Amna Al Mansoori", "role": "Director of Compliance, UAE Hub"}
        ],
        "faqs": [
            {"q": "Which ISO frameworks does eAuditHub support?", "a": "eAuditHub supports ISO 9001, ISO 14001, ISO 45001, ISO 27001, and custom B2B quality standards through customizable checklists."},
            {"q": "Can auditors log issues on mobile devices?", "a": "Yes. The responsive layout allows auditors to fill out checklists, take and upload pictures, and log NCs on tablets or smartphones directly during physical audits."},
            {"q": "Does the system support recurring audits?", "a": "Yes. You can schedule weekly, monthly, or quarterly quality sweeps, and the system auto-assigns checklists based on template rules."},
            {"q": "Is there an escalation path for overdue corrective actions?", "a": "Yes. If an assigned CAPA is not addressed by its deadline, the system auto-emails supervisors and flags the dashboard score."},
            {"q": "Can we configure multiple audit templates for different departments?", "a": "Absolutely. You can build separate checklists for IT security, warehouse safety, manufacturing quality, and financial processes."}
        ],
        "cta_title": "Automate ISO Audits Today",
        "cta_desc": "Tired of tracking quality audits and CAPAs in spreadsheets? Set up an automated compliance dashboard with eAuditHub today."
    }
]

# ==================== SERVICES LIST ====================
services_data = [
    {
        "slug": "services/ai-transformation-automation",
        "name": "AI Transformation & Automation",
        "headline_part_1": "Deploy Local LLMs and",
        "headline_part_2": "Intelligent Agent Workflows",
        "seo_description": "AI transformation and automation services by Boscosoft. Deploy secure local LLMs, AI agents, and RAG systems to optimize operations.",
        "desc": "Boscosoft helps organizations implement practical AI solutions. From secure Retrieval-Augmented Generation (RAG) platforms for search to autonomous workflows and local LLM fine-tuning, we translate AI concepts into operational efficiency.",
        "primary_cta_label": "Build Your AI Roadmap",
        "deliverables": [
            {"icon": "fas fa-brain", "title": "Local LLM Deployments", "desc": "Set up open-source LLMs (Llama 3, Mistral) on your infrastructure to maintain complete data privacy without third-party API exposure."},
            {"icon": "fas fa-robot", "title": "AI Agent Workflows", "desc": "Build autonomous agent routines to monitor folders, classify incoming support tickets, and execute background databases tasks."},
            {"icon": "fas fa-database", "title": "Enterprise RAG Systems", "desc": "Construct secure knowledge search engines across internal PDF directories, policy boards, and SQL datasets with accurate citation logs."},
            {"icon": "fas fa-chart-line", "title": "Predictive Models", "desc": "Design regression algorithms and forecasting pipelines to predict student enrollment targets, hospital bed needs, or invoice collections."},
            {"icon": "fas fa-cogs", "title": "Workflow Integrations", "desc": "Connect AI layers to legacy databases, CRMs, and custom software pipelines using secure API wrappers."},
            {"icon": "fas fa-shield-alt", "title": "Responsible AI Audits", "desc": "Establish data sanitation pipelines to filter out PII, audit prompts, log compliance ratings, and ensure secure models."}
        ],
        "process": [
            {"title": "AI Feasibility Survey", "desc": "We evaluate your datasets, process bottlenecks, and compute resources to outline high-ROI AI test cases."},
            {"title": "Proof of Concept (PoC)", "desc": "Deploy a sandbox model using your actual document sets to verify accuracy and response times."},
            {"title": "Ecosystem Integration", "desc": "Connect the validated models into your core ERP databases and staff tools via secure endpoints."},
            {"title": "Scaling & Monitoring", "desc": "Provision server compute clusters and track cost, token usage, and drift metrics in real-time."}
        ],
        "faqs": [
            {"q": "Will our company data be used to train public models?", "a": "Never. We specialize in secure on-premise deployments and private cloud environments. Your documents, logs, and database records remain inside your private systems."},
            {"q": "What datasets are suitable for RAG search?", "a": "Unstructured document logs like product manuals, policy booklets, canonical records, audit guidelines, or database exports format perfectly."},
            {"q": "Do we need high-end GPUs to deploy local models?", "a": "For testing and moderate usage, quantised models run efficiently on cost-effective virtual servers. We design architectures matching your budget requirements."},
            {"q": "How do you control AI hallucination?", "a": "We use vector search database prompts and fine-grained citation scoring to ensure AI answers only reference your verified knowledge bases."},
            {"q": "What is the typical timeline for an AI transformation project?", "a": "A basic search PoC takes 2-3 weeks, while complete enterprise-wide agent integrations average 2-4 months."}
        ],
        "testimonial_image": "/images/cloud-security.jpg",
        "badge_text": "AI Integration Partner",
        "testimonials": [
            {"quote": "Deploying the local Llama model on-premise has completely resolved our customer data privacy concerns. The search system is exceptionally fast.", "author": "Dr. Ramesh Nair", "role": "IT Director, Apex Health Group"},
            {"quote": "We automated 60% of our student admissions scoring using Boscosoft's LLM agent pipeline. Highly recommended.", "author": "Prof. S. Krishnan", "role": "Registrar, Global Academy"}
        ],
        "cta_title": "Build Your AI Capability",
        "cta_desc": "Looking to deploy private LLMs, vector database search, or secure workflow automation agents? Consult our AI advisors to design your roadmap."
    },
    {
        "slug": "services/integration-digital-ecosystems",
        "name": "Integration & Digital Ecosystems",
        "headline_part_1": "Connect Legacy Databases,",
        "headline_part_2": "APIs and SaaS Applications",
        "seo_description": "API integration and digital ecosystem services. Connect legacy software, databases, CRM, and cloud platforms with Boscosoft's middleware architectures.",
        "desc": "Break down data silos across your organization. Boscosoft designs secure API layers, cloud middleware, and data sync bridges to connect legacy ERPs, banking networks, parent apps, and clinical systems into unified ecosystems.",
        "primary_cta_label": "Connect Your Digital Ecosystem",
        "deliverables": [
            {"icon": "fas fa-plug", "title": "RESTful API Development", "desc": "Design and document secure, high-performance API endpoints to expose legacy database queries to external SaaS interfaces."},
            {"icon": "fas fa-sync", "title": "Real-Time Data Bridges", "desc": "Deploy background sync scripts using message queues (RabbitMQ, Kafka) to update records instantly across platforms."},
            {"icon": "fas fa-university", "title": "Banking Gateway Integration", "desc": "Connect accounting software to national and international banks for automated bank statement feeds and processing payments."},
            {"icon": "fas fa-project-diagram", "title": "Enterprise Service Bus", "desc": "Build centralized middleware routing systems to manage secure data traffic between web apps, databases, and local networks."},
            {"icon": "fas fa-lock", "title": "OAuth2 Security Layers", "desc": "Enforce industry-standard authentication (OAuth2, JWT) to shield database APIs from unauthorized connection queries."},
            {"icon": "fas fa-file-code", "title": "EDI & File Translators", "desc": "Build automated script pipelines to ingest and translate legacy file formats (CSV, XML, flat files) into clean database schemas."}
        ],
        "process": [
            {"title": "Schema Analysis", "desc": "We inspect your database architectures, catalog existing endpoints, and outline the target integration roadmap."},
            {"title": "Middleware Prototyping", "desc": "Construct API wrappers, configure credentials, and check database sync rules inside sandbox environments."},
            {"title": "Production Deployment", "desc": "Publish the API layers on secure cloud gateways and hook up automated data monitoring checkers."},
            {"title": "Support & Performance", "desc": "Perform regular load testing, optimize database query speeds, and resolve API alerts."}
        ],
        "faqs": [
            {"q": "Can you connect systems that don't have built-in APIs?", "a": "Yes! We can build database trigger loops, script file exports, or create secure middleware wrappers that talk directly to legacy SQL/Oracle databases."},
            {"q": "How do you guarantee data consistency during syncs?", "a": "We use transactional message queues. If a system goes offline, the queue holds transactions and replays them in order once connection resumes, preventing losses."},
            {"q": "Are your integration services compatible with Odoo and SAP?", "a": "Yes. We regularly connect custom applications, SmartSchoolPlus, or MedSysB to Odoo, SAP, ERPNext, Salesforce, and Zoho databases."},
            {"q": "Do you provide API documentation?", "a": "Always. We build self-documenting APIs using Swagger/OpenAPI guidelines, making it easy for your internal teams to read and reference."},
            {"q": "How do you secure API traffic?", "a": "We implement HTTPS encryption, API gateway key rules, IP address restrictions, and strict OAuth2 authentication access levels."}
        ],
        "testimonial_image": "/images/digital-transformation.jpg",
        "badge_text": "API Integration Expert",
        "testimonials": [
            {"quote": "We connected our legacy Oracle database to 15 partner SaaS tools using Boscosoft's API service. Transaction sync is flawless.", "author": "Mr. David Al-Mansoori", "role": "VP Operations, Gulf Commerce"},
            {"quote": "Their message queue implementation has secured our bank integration. No double collections or lost ledger entries.", "author": "Sr. Margaret", "role": "Diocesan Accountant"}
        ],
        "cta_title": "Integrate Your Applications",
        "cta_desc": "Struggling to sync data between your CRM, accounting, and operational databases? Schedule an API mapping review call with our architects."
    },
    {
        "slug": "services/saas-engineering-modernization",
        "name": "SaaS Engineering & Modernization",
        "headline_part_1": "Transition Legacy Desktop Apps,",
        "headline_part_2": "to Cloud-Native SaaS",
        "seo_description": "Legacy application modernization and SaaS engineering services by Boscosoft. Re-engineer desktop software into modern web applications.",
        "desc": "Upgrade obsolete client-server desktop installations into modern, multi-tenant cloud-native web systems. Boscosoft re-architects legacy software layouts, databases, and code to run efficiently on Microsoft Azure or AWS.",
        "primary_cta_label": "Start Your SaaS Journey",
        "deliverables": [
            {"icon": "fas fa-cloud", "title": "Multi-Tenant Architecture", "desc": "Design databases that securely isolate client records while running on shared virtual servers to maximize resource efficiency."},
            {"icon": "fas fa-mobile-alt", "title": "Responsive UI Overhauls", "desc": "Redesign complex desktop entry forms into fluid, modern, browser-based web portals utilizing React or modern Javascript."},
            {"icon": "fas fa-server", "title": "Microservices Migration", "desc": "Refactor monolithic application code bases into modular microservices to make upgrades and scaling easy."},
            {"icon": "fas fa-database", "title": "Database Normalization", "desc": "Migrate legacy files or flat database systems into high-performance relational databases (PostgreSQL, SQL Server)."},
            {"icon": "fas fa-credit-card", "title": "Billing Systems Setup", "desc": "Integrate subscription billing engines (Stripe, Chargebee) to manage recurring invoice billings, upgrades, and limits."},
            {"icon": "fas fa-rocket", "title": "CI/CD Pipeline Building", "desc": "Configure automated testing and deployment lines (GitHub Actions, Docker) to publish updates with zero downtime."}
        ],
        "process": [
            {"title": "Codebase Audit", "desc": "We inspect your legacy application codes, analyze database tables, and establish the migration plan."},
            {"title": "Target Architecture Design", "desc": "Draft the cloud-native layout, choosing database schemas, microservice divisions, and security levels."},
            {"title": "Agile Web Re-building", "desc": "Develop the responsive web application in sprints, porting features and testing interfaces incrementally."},
            {"title": "Data Migration & Go-Live", "desc": "Migrate live database files safely, run compliance checks, and switch operations to the cloud SaaS."}
        ],
        "faqs": [
            {"q": "What are the main benefits of modernizing desktop apps to SaaS?", "a": "SaaS eliminates local installations, lets clients access systems from any device, lowers maintenance overheads, and provides recurring subscription revenue."},
            {"q": "How is database security handled in multi-tenant environments?", "a": "We use isolated database schemas and strict column-level encryption keys to ensure tenant data is completely hidden from other users."},
            {"q": "Can we retain the look and feel of our legacy software?", "a": "We prioritize logical layouts and user workflows to minimize training, while upgrading controls to modern, responsive design systems."},
            {"q": "Do we have to rewrite the entire application at once?", "a": "We recommend a phased approach. We can deploy a modern web layer that talks to your legacy database first, updating backend modules incrementally."},
            {"q": "Which cloud providers do you build on?", "a": "We primarily design for Microsoft Azure and Amazon Web Services (AWS), depending on your compliance requirements and budget targets."}
        ],
        "testimonial_image": "/images/resource-laptop.jpg",
        "badge_text": "Cloud Migration Lead",
        "testimonials": [
            {"quote": "Our VB6 desktop app was re-engineered into a modern web SaaS in under 4 months. Our customer acquisition scaled by 300%.", "author": "Mr. Vikram Mehta", "role": "Founder, TradeHub India"},
            {"quote": "The multi-tenant schema isolation is robust and meets all ISO security controls for our clients.", "author": "Mrs. Sarah Jenkins", "role": "CTO, FinTech Services"}
        ],
        "cta_title": "Transition to the Cloud",
        "cta_desc": "Have an obsolete server installation or desktop program to modernize? Let our cloud engineers audit your codebase and draft a roadmap."
    },
    {
        "slug": "services/erp-crm-platform-implementation",
        "name": "ERP & CRM Platform Implementation",
        "headline_part_1": "Optimize and Deploy Odoo,",
        "headline_part_2": "Frappe, and Dynamics 365",
        "seo_description": "ERP and CRM implementation services by Boscosoft. Certified setup and customization of Odoo, Frappe/ERPNext, and Microsoft Dynamics 365.",
        "desc": "We help businesses implement, customize, and maintain standard enterprise platforms. Our team optimizes Odoo, Frappe/ERPNext, and Microsoft Dynamics 365 to fit your specific manufacturing, sales, or financial workflows.",
        "primary_cta_label": "Discuss Your ERP Needs",
        "deliverables": [
            {"icon": "fas fa-cogs", "title": "Custom Module Development", "desc": "Write custom python, javascript, or C# modules to add specialized tracking fields and workflows to standard ERP platforms."},
            {"icon": "fas fa-file-import", "title": "Data Migrations", "desc": "Sanitize and migrate historical sales ledgers, customer directories, and inventories from legacy tools into the new ERP database."},
            {"icon": "fas fa-chart-bar", "title": "Executive Reporting dashboards", "desc": "Build tailored BI reports, automated balance sheets, and real-time inventory widgets inside the platform UI."},
            {"icon": "fas fa-sync-alt", "title": "Third-Party Integrations", "desc": "Connect your ERP/CRM to email systems (Outlook, Gmail), e-commerce portals (Shopify, WooCommerce), and local payment gateways."},
            {"icon": "fas fa-user-check", "title": "Role Permission Audits", "desc": "Establish strict access rules separating accounting, inventory editing, human resources, and sales details."},
            {"icon": "fas fa-headset", "title": "Ongoing Technical Support", "desc": "Receive dedicated support SLA desks, system updates, server maintenance, and troubleshooting support."}
        ],
        "process": [
            {"title": "Requirement Mapping", "desc": "We document your business workflows, trace document paths, and map them to ERP features."},
            {"title": "Customization & Sandbox Setup", "desc": "Set up the sandbox server, write custom modules, import test datasets, and dry-run workflows."},
            {"title": "Staff Simulator Training", "desc": "Conduct training sessions for sales, inventory, and finance teams to ensure high software adoption."},
            {"title": "Go-Live Cutover", "desc": "Perform final database imports, double-check balances, and switch business operations to the live ERP system."}
        ],
        "faqs": [
            {"q": "Should we choose Odoo, Frappe, or Microsoft Dynamics?", "a": "Odoo is highly modular and fits standard sales/inventories. Frappe/ERPNext is excellent for lightweight developer-friendly custom setups. Dynamics suits large enterprises already on Microsoft. We help you choose the best fit."},
            {"q": "How do you handle ERP customizations without breaking future upgrades?", "a": "We design custom modules as separate code layers rather than changing core system files. This allows you to upgrade the main ERP engine without breaking custom features."},
            {"q": "Can we import historic data from excel files?", "a": "Yes. We help clean, map, and import your excel databases, inventory lists, and customer profiles into the target ERP tables."},
            {"q": "What is the typical cost of an ERP implementation?", "a": "Costs depend on company size, module counts, and customization scope. Lightweight setups (Odoo/Frappe) start at lower tiers, while large enterprise setups scale based on user licenses."},
            {"q": "Do you provide support after go-live?", "a": "Yes. We provide 3-6 months of post-launch stabilization support, followed by annual maintenance SLA options."}
        ],
        "testimonial_image": "/images/case-study-corporate.jpg",
        "badge_text": "Odoo & Frappe Certified",
        "testimonials": [
            {"quote": "Boscosoft customized Odoo to fit our manufacturing inventory routes. Our stock discrepancy fell to zero.", "author": "Mr. A. K. Sharma", "role": "Director, Apex Polymers"},
            {"quote": "Frappe ERPNext implementation was completed on schedule. The custom dashboards are excellent for our billing.", "author": "Mr. Nilesh Patel", "role": "CFO, LinkLogistics"}
        ],
        "cta_title": "Configure Your Enterprise ERP",
        "cta_desc": "Planning an Odoo, Frappe/ERPNext, or Microsoft Dynamics deployment? Contact our certified platform engineers to map your operational requirements."
    },
    {
        "slug": "services/data-analytics-ai",
        "name": "Data, Analytics & AI",
        "headline_part_1": "Build Databricks Pipelines and",
        "headline_part_2": "Interactive BI Dashboards",
        "seo_description": "Data analytics and AI solutions by Boscosoft. Implement Databricks lakes, data warehouse pipelines, and PowerBI dashboards.",
        "desc": "Translate raw enterprise database logs into clear business insights. Boscosoft builds secure cloud data warehouses, ETL pipeline scripts, predictive models, and custom analytics dashboards to empower your team.",
        "primary_cta_label": "Improve Data Visibility",
        "deliverables": [
            {"icon": "fas fa-database", "title": "Data Warehouse Engineering", "desc": "Establish centralized data storage (Databricks, Snowflake) to aggregate databases from sales, finance, and support tools."},
            {"icon": "fas fa-filter", "title": "ETL & Pipeline Automation", "desc": "Write script lines (Python, Spark) to extract, clean, and load source database entries into analytical schemas automatically."},
            {"icon": "fas fa-chart-line", "title": "PowerBI & Tableau Layouts", "desc": "Construct interactive business intelligence dashboards tracking KPIs, monthly sales, retention rates, and inventory speeds."},
            {"icon": "fas fa-brain", "title": "Machine Learning Pipelines", "desc": "Deploy regression and classification models to identify customer churn, predict seasonal inventory demand, or flag errors."},
            {"icon": "fas fa-shield-alt", "title": "Data Governance Audits", "desc": "Enforce security standards separating access levels, mask sensitive customer records (PII), and maintain clean compliance records."},
            {"icon": "fas fa-history", "title": "Time-Series Analysis", "desc": "Process historical database snapshots to identify seasonal trends, workflow bottlenecks, and growth opportunities."}
        ],
        "process": [
            {"title": "Data Source Auditing", "desc": "We evaluate your database architectures, identify analytical targets, and design the warehouse model."},
            {"title": "ETL & Warehouse Building", "desc": "Write clean data cleaning scripts, build database tables, and configure server compute engines."},
            {"title": "Dashboard Design", "desc": "Build the interactive visual charts in PowerBI or Tableau matching your management KPIs."},
            {"title": "Launch & Training", "desc": "Train business leaders to read reports, filter queries, and export insight charts."}
        ],
        "faqs": [
            {"q": "What is the difference between operational databases and data warehouses?", "a": "Operational databases handle daily app actions. Data warehouses aggregate historical snapshots from multiple systems and optimize queries for fast analysis."},
            {"q": "Can we combine data from Odoo, Salesforce, and local Excel sheets?", "a": "Yes. We design pipelines that extract records from multiple cloud APIs, local database servers, and excel files into a single repository."},
            {"q": "Is our data protected during pipeline processing?", "a": "Always. We implement data encryption in transit and at rest, and set up masking scripts to hide sensitive PII details from general analysts."},
            {"q": "Can you build real-time streaming dashboards?", "a": "Yes. We configure streaming pipes (using Kafka/Spark) for cases needing immediate visibility, though standard daily sync batches fit most business needs."},
            {"q": "Do we need an internal team to maintain the pipelines?", "a": "We offer managed service support options to check pipelines, verify data feeds, and tweak dashboard charts, letting you focus on reading reports."}
        ],
        "testimonial_image": "/images/case-study-school.jpg",
        "badge_text": "Databricks & BI Partner",
        "testimonials": [
            {"quote": "The PowerBI dashboard consolidated our 12 branch school logs. We now track fee arrears and admissions live.", "author": "Sr. Latha Mary", "role": "Provincial Superior, Province Office"},
            {"quote": "Our Databricks data lake migration has cut our analysis query times from 5 minutes to 10 seconds.", "author": "Mr. Rajiv Nair", "role": "VP Analytics, Credo Finance"}
        ],
        "cta_title": "Leverage Your Business Data",
        "cta_desc": "Ready to build analytical pipelines or compile interactive executive dashboards? Get in touch with our data engineering team."
    },
    {
        "slug": "services/cloud-infrastructure-support",
        "name": "Cloud Infrastructure & Support",
        "headline_part_1": "Scale Secure Azure Clouds,",
        "headline_part_2": "with 24/7 Managed Help Desk",
        "seo_description": "Cloud infrastructure management and technical support services by Boscosoft. Configure Azure and AWS networks with 24/7 managed help desks.",
        "desc": "Optimize your cloud infrastructure spend, ensure security, and achieve high system availability. Boscosoft configures secure networks on Microsoft Azure or AWS, manages servers, and runs 24/7 technical help desks.",
        "primary_cta_label": "Modernize Your Infrastructure",
        "deliverables": [
            {"icon": "fas fa-cloud-upload-alt", "title": "Cloud Migrations", "desc": "Migrate local physical servers or legacy databases safely to Microsoft Azure or AWS with minimal business downtime."},
            {"icon": "fas fa-shield-alt", "title": "Infrastructure Security Setup", "desc": "Enforce firewall rules, configure VPN tunnels, monitor intrusion logs, and apply security patches to protect databases."},
            {"icon": "fas fa-coins", "title": "Cloud Cost Optimization", "desc": "Audit monthly cloud utility bills to identify idle resources, resize virtual servers, and lower subscription costs."},
            {"icon": "fas fa-clock", "title": "24/7 System Monitoring", "desc": "Deploy automatic monitoring checkers to track database load, response times, memory leaks, and uptime logs."},
            {"icon": "fas fa-life-ring", "title": "Technical Help Desk SLA", "desc": "Run dedicated, multi-tiered support help desks to resolve system bugs, assist users, and handle database updates."},
            {"icon": "fas fa-undo", "title": "Disaster Recovery Systems", "desc": "Configure automated geo-redundant backups and write disaster recovery steps to ensure business continuity."}
        ],
        "process": [
            {"title": "Infrastructure Audit", "desc": "We inspect your local network setups, check application requirements, and design the cloud model."},
            {"title": "Environment Provisioning", "desc": "Establish secure network zones, provision server databases, and apply firewall security rules."},
            {"title": "System Migrating", "desc": "Deploy database backup files, test server routing, and transition operations to the cloud network."},
            {"title": "Managed Support SLA", "desc": "Activate 24/7 system monitoring alerts and open our technical support help desk channels."}
        ],
        "faqs": [
            {"q": "What is your support desk response SLA?", "a": "We offer multi-tier SLA agreements. Critical issues (Severity 1) receive emergency response within 30 minutes, while general queries are resolved in under 4 hours."},
            {"q": "Can you lower our existing Azure monthly bill?", "a": "Yes. We audit server configurations, reserve database tiers, set up auto-scaling scripts, and eliminate idle storage, often cutting bills by 20-40%."},
            {"q": "How often are database backups executed?", "a": "Standard policies include daily automated backups, with options for hourly incremental logs stored in geo-redundant secure storage zones."},
            {"q": "Are your cloud engineers certified?", "a": "Yes. Our team holds official certifications for Microsoft Azure Solution Architecture, AWS SysOps, and Kubernetes Administration."},
            {"q": "Do you support hybrid cloud environments?", "a": "Absolutely. We configure secure VPN bridges to sync local campus servers with cloud backup endpoints, ensuring local speed and cloud redundancy."}
        ],
        "testimonial_image": "/images/cloud-security.jpg",
        "badge_text": "Azure Certified Architects",
        "testimonials": [
            {"quote": "Boscosoft's cloud support team has maintained 100% uptime for our hospital portal. The security configuration is outstanding.", "author": "Dr. S. John", "role": "CEO, Holy Cross Hospitals"},
            {"quote": "They audited our Azure cloud setup and reduced our monthly subscriptions by 35% without losing speed.", "author": "Mr. George Kurian", "role": "CTO, EduCorp Group"}
        ],
        "cta_title": "Secure Your Cloud Systems",
        "cta_desc": "Looking to migrate servers to Azure or AWS, cut cloud bills, or implement 24/7 help desk support? Reach out to our systems engineers."
    },
    {
        "slug": "services/technology-ecosystem-partnerships",
        "name": "Technology Ecosystem & Partnerships",
        "headline_part_1": "Architect Custom AI Layers,",
        "headline_part_2": "over Gold Partner Infrastructures",
        "seo_description": "Technology ecosystem & partnerships integration by Boscosoft. Align Microsoft Gold Partner systems, custom AI layers, and secure B2B APIs.",
        "desc": "Deploy enterprise-grade software architectures aligned with world-class technology partners. Boscosoft integrates custom AI layers, RESTful API databases, and cloud systems with verified partner solutions from Microsoft, Odoo, and Frappe.",
        "primary_cta_label": "Design Your Technology Ecosystem",
        "deliverables": [
            {"icon": "fas fa-handshake", "title": "Partner Infrastructure Alignments", "desc": "Leverage certified partner frameworks to deploy Odoo modules, ERPNext databases, and Microsoft cloud architectures."},
            {"icon": "fas fa-project-diagram", "title": "Ecosystem Architecture Design", "desc": "Draft high-fidelity diagrams showing database schemas, API connectors, and cloud zones for enterprise applications."},
            {"icon": "fas fa-network-wired", "title": "B2B API Integrations", "desc": "Deploy secure, rate-limited integration interfaces to share metrics with corporate partners, banks, and regulators."},
            {"icon": "fas fa-brain", "title": "Custom AI Copilot Layers", "desc": "Deploy custom RAG pipelines and workflow agents over standard CRM and ERP databases to automate data checks."},
            {"icon": "fas fa-shield-alt", "title": "Compliance Audits", "desc": "Verify that your technology ecosystem meets ISO security controls, GDPR privacy regulations, and audit requirements."},
            {"icon": "fas fa-terminal", "title": "Developer Tooling Setup", "desc": "Configure secure code repositories, automated testing pipelines, and deployment environments for internal technical teams."}
        ],
        "process": [
            {"title": "Partner Ecosystem Audit", "desc": "We inspect your existing vendor software, catalog licenses, and review integration bottlenecks."},
            {"title": "Architecture Blueprinting", "desc": "Draft the detailed system layout showing API nodes, database servers, and custom AI layers."},
            {"title": "Sandbox API Testing", "desc": "Deploy test systems, verify data syncs across partner integrations, and run performance checks."},
            {"title": "Production Rollout", "desc": "Launch the integrated ecosystem, apply security certificates, and hand over documentation."}
        ],
        "faqs": [
            {"q": "What partnership benefits does Boscosoft bring?", "a": "Our partner status grants us early access to API updates, priority engineering support, and specialized certification training from Microsoft, Odoo, and Frappe."},
            {"q": "Can you design ecosystems that mix proprietary and open-source software?", "a": "Yes. We design hybrid environments that connect proprietary systems (Microsoft) to open-source databases (Frappe, Odoo) to optimize licensing costs."},
            {"q": "Do you help with third-party software licensing?", "a": "We audit your user counts and recommend cost-effective licensing models, though clients retain direct subscription relationships with major vendors."},
            {"q": "How do custom AI layers talk to partner software?", "a": "We develop secure API middleware that reads database records from standard CRMs, feeds it to isolated LLMs, and returns insights directly to ERP dashboards."},
            {"q": "What document control standards do you follow during designs?", "a": "We document all layouts using standard architectural frameworks, ensuring your team has clean diagrams, API schemas, and support manuals."}
        ],
        "testimonial_image": "/images/digital-transformation.jpg",
        "badge_text": "Verified Gold Partner",
        "testimonials": [
            {"quote": "Aligning our custom AI layer with Microsoft Gold standards has unlocked immense efficiency. Their design is outstanding.", "author": "Mrs. Priya Sen", "role": "IT Lead, TechScale"},
            {"quote": "Boscosoft's B2B API integrations have bridged our CRM and Frappe backend seamlessly. We have zero sync delays.", "author": "Mr. K. C. Mathew", "role": "COO, Apex Enterprises"}
        ],
        "cta_title": "Design Your Partner Architecture",
        "cta_desc": "Looking to connect Odoo platforms, custom AI nodes, or Microsoft partner clouds? Schedule a design review session with our partner lead."
    }
]

# ==================== GENERATING PAGES ====================

for prod in products_data:
    stats_html = get_stats_html(prod["stats"])
    modules_html = get_modules_html(prod["modules"])
    advantages_html = get_advantages_html(prod["advantages"])
    faq_html = get_faq_bootstrap_html(prod["faqs"], prod["slug"].split("/")[-1])
    testimonials_html = get_testimonials_html(prod["testimonials"])
    partners_marquee_html = get_partners_marquee_html()
    
    # Split headline
    part1 = prod["headline_part_1"]
    part2 = prod["headline_part_2"]
    
    # Compile Product Template
    html_content = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{prod["name"]} | Boscosoft Platform</title>
    <meta name="description" content="{prod["seo_description"]}" />
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
    {header_content}
    
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
              <li class="breadcrumb-item active" style="color: white; font-weight: 600;">{prod["name"]}</li>
            </ol>
          </nav>
          <div class="row align-items-center text-center">
            <div class="col-lg-12">
              <span class="acme-hero-tag mb-3 d-inline-block">{prod["category"]}</span>
              <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
                {part1} <span style="background: linear-gradient(135deg, var(--teal-accent), var(--primary-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">{part2}</span>
              </h1>
              <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto 3rem auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
                {prod["desc"]}
              </p>
              <div class="acme-hero-btns d-flex gap-3 justify-content-center" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                <a href="/contact/index.html?product={prod["name"]}&type=demo" class="btn btn-primary" style="padding: 0.8rem 2rem; border-radius: 8px;">Request Free Demo</a>
                <a href="/contact/index.html?product={prod["name"]}&type=experts" class="btn btn-outline" style="padding: 0.8rem 2rem; border-radius: 8px; border: 2px solid rgba(255,255,255,0.4); color: white;">Talk to Our Experts</a>
              </div>
              
              <!-- STATS CARD -->
              <div class="acme-stats-card mt-5" style="max-width: 700px; margin: 4rem auto 0 auto; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); padding: 2rem; border-radius: 16px; backdrop-filter: blur(10px);">
                <div class="hero-trust-stats" style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 1.5rem;">
                  {stats_html}
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
        <h2 class="section-title display-6 fw-bold text-dark mb-3" style="font-size: 2.25rem; font-weight: 800; color: var(--navy-dark);">{prod["modules_title"]}</h2>
        <p class="text-muted mx-auto fs-5" style="max-width: 700px; color: var(--text-gray); font-size: 1.1rem;">{prod["modules_desc"]}</p>
      </div>

      <div class="container position-relative">
        <div class="modules-scroll-container" id="modulesScrollContainer" style="overflow-x: auto; display: flex; gap: 1.5rem; padding-bottom: 2rem;">
          <div class="modules-scroll-track" id="modulesScrollTrack" style="display: flex; gap: 1.5rem;">
            {modules_html}
          </div>
        </div>

        <!-- Controls (Bottom row) -->
        <div class="d-flex justify-content-between align-items-center mt-4" style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; flex-wrap: wrap; gap: 1.5rem;">
          <a href="/contact/index.html?product={prod["name"]}&type=demo" class="btn btn-primary" style="padding: 0.6rem 1.5rem; font-size: 0.9rem;">View Pricing Options <i class="fas fa-chevron-right ms-2 fs-6"></i></a>
          
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
          <h2 class="display-5 fw-bold text-dark mb-3 lh-base" style="font-size: 2.5rem; font-weight: 800; color: var(--navy-dark);">Why Choose <span style="color: var(--primary-base);">{prod["name"]}</span>?</h2>
          <p class="fs-6 text-muted mb-0" style="max-width: 600px; margin: 0 auto; color: var(--text-gray);">Built for high performance, compliance, security, and long-term client success.</p>
        </div>
        <div class="row g-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          {advantages_html}
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
            {testimonials_html}
          </div>
          <div class="col-lg-6">
            <div class="testimonial-image-container ms-lg-4">
              <div class="testimonial-main-image">
                <img src="{prod["testimonial_image"]}" alt="{prod["name"]} System Screen" class="img-fluid rounded-3 shadow-lg" />
                <div class="testimonial-image-overlay">
                  <div class="testimonial-image-badge">
                    <i class="fas fa-award text-white me-2"></i>
                    <span class="text-white fw-bold">{prod["badge_text"]}</span>
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
        {partners_marquee_html}
      </div>
    </section>

    <!-- FAQS ACCORDION -->
    <section id="faq" class="section-padding" style="padding: 6rem 0; background: #f8fafc; border-top: 1px solid var(--border-color);">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">FAQ</span>
          <h2 class="display-5 fw-bold text-dark mb-3" style="font-size: 2.5rem; font-weight: 800; color: var(--navy-dark);">Frequently Asked Questions</h2>
          <p class="text-muted" style="color: var(--text-gray);">Find answers to common questions about {prod["name"]}'s implementation, hosting, support, and licensing.</p>
        </div>
        <div class="faq-accordion-list" style="margin-top: 3rem;">
          {faq_html}
        </div>
      </div>
    </section>

    <!-- APP DOWNLOAD / CTA ILLUSTRATED SECTION -->
    <section class="app-download-section" style="overflow: visible;">
      <div class="container position-relative" style="z-index: 2;">
        <div class="row align-items-center">
          <div class="col-lg-5 text-center text-lg-start position-relative mb-4 mb-lg-0">
            <img src="/images/resource-laptop.jpg" alt="{prod["name"]} Demo Laptop" class="demo-illustration acme-demo-illustration rounded-4 img-fluid" />
          </div>
          <div class="col-lg-7 offset-lg-0 ps-lg-5">
            <h2 class="display-5 app-download-title mb-4" style="font-size: 2.25rem; font-weight: 800;">{prod["cta_title"]}</h2>
            <p class="fs-5 text-muted mb-5 pe-lg-5" style="line-height: 1.6;">{prod["cta_desc"]}</p>
            <div class="d-flex flex-wrap gap-3">
              <a href="/contact/index.html?product={prod["name"]}&type=demo" class="btn btn-primary btn-lg rounded-pill px-5" style="padding: 0.8rem 2rem;">Request Free Demo</a>
              <a href="/contact/index.html?product={prod["name"]}&type=consultation" class="btn btn-outline-primary btn-lg rounded-pill px-5" style="padding: 0.8rem 2rem; border: 2px solid var(--primary-base); color: var(--primary-base); background: transparent;">Talk to Our Experts</a>
            </div>
          </div>
        </div>
      </div>
      <div class="app-bottom-border"></div>
    </section>

    {footer_content}
    
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
"""
    write_page(prod["slug"], html_content)

# ==================== SERVICES GENERATING ====================
for srv in services_data:
    deliv_html = get_deliverables_html(srv["deliverables"])
    process_html = get_process_html(srv["process"])
    faq_html = get_faq_bootstrap_html(srv["faqs"], srv["slug"].split("/")[-1])
    testimonials_html = get_testimonials_html(srv["testimonials"])
    partners_marquee_html = get_partners_marquee_html()
    
    # Split headline
    part1 = srv["headline_part_1"]
    part2 = srv["headline_part_2"]
    
    html_content = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{srv["name"]} | Boscosoft Service</title>
    <meta name="description" content="{srv["seo_description"]}" />
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
    {header_content}
    
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
              <li class="breadcrumb-item active" style="color: white; font-weight: 600;">{srv["name"]}</li>
            </ol>
          </nav>
          <div class="row align-items-center text-center">
            <div class="col-lg-12">
              <span class="acme-hero-tag mb-3 d-inline-block">B2B TRANSFORMATION SERVICES</span>
              <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
                {part1} <span style="background: linear-gradient(135deg, var(--teal-accent), var(--primary-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">{part2}</span>
              </h1>
              <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto 3rem auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
                {srv["desc"]}
              </p>
              <div class="acme-hero-btns d-flex gap-3 justify-content-center" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                <a href="/contact/index.html?service={srv["name"]}&type=consultation" class="btn btn-primary" style="padding: 0.8rem 2rem; border-radius: 8px;">{srv["primary_cta_label"]}</a>
                <a href="/contact/index.html?service={srv["name"]}&type=roadmap" class="btn btn-outline" style="padding: 0.8rem 2rem; border-radius: 8px; border: 2px solid rgba(255,255,255,0.4); color: white;">Talk to Our Experts</a>
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
          {deliv_html}
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
          {process_html}
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
            {testimonials_html}
          </div>
          <div class="col-lg-6">
            <div class="testimonial-image-container ms-lg-4">
              <div class="testimonial-main-image">
                <img src="{srv["testimonial_image"]}" alt="{srv["name"]} Service Illustration" class="img-fluid rounded-3 shadow-lg" />
                <div class="testimonial-image-overlay">
                  <div class="testimonial-image-badge">
                    <i class="fas fa-award text-white me-2"></i>
                    <span class="text-white fw-bold">{srv["badge_text"]}</span>
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
        {partners_marquee_html}
      </div>
    </section>

    <!-- FAQS ACCORDION -->
    <section id="faq" class="section-padding" style="padding: 6rem 0; background: #f8fafc; border-top: 1px solid var(--border-color);">
      <div class="container" style="max-width: 800px; margin: 0 auto;">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">FAQ</span>
          <h2 class="display-5 fw-bold text-dark mb-3" style="font-size: 2.5rem; font-weight: 800; color: var(--navy-dark);">Frequently Asked Questions</h2>
          <p class="text-muted" style="color: var(--text-gray);">Find answers to common questions about our {srv["name"]} capability, pricing, SLAs, and technical stack.</p>
        </div>
        <div class="faq-accordion-list" style="margin-top: 3rem;">
          {faq_html}
        </div>
      </div>
    </section>

    <!-- FINAL CTA ILLUSTRATED BANNER -->
    <section class="app-download-section" style="overflow: visible;">
      <div class="container position-relative" style="z-index: 2;">
        <div class="row align-items-center">
          <div class="col-lg-5 text-center text-lg-start position-relative mb-4 mb-lg-0">
            <img src="/images/resource-laptop.jpg" alt="{srv["name"]} Service Laptop" class="demo-illustration acme-demo-illustration rounded-4 img-fluid" />
          </div>
          <div class="col-lg-7 offset-lg-0 ps-lg-5">
            <h2 class="display-5 app-download-title mb-4" style="font-size: 2.25rem; font-weight: 800;">{srv["cta_title"]}</h2>
            <p class="fs-5 text-muted mb-5 pe-lg-5" style="line-height: 1.6;">{srv["cta_desc"]}</p>
            <div class="d-flex flex-wrap gap-3">
              <a href="/contact/index.html?service={srv["name"]}&type=consultation" class="btn btn-primary btn-lg rounded-pill px-5" style="padding: 0.8rem 2rem;">{srv["primary_cta_label"]}</a>
              <a href="/contact/index.html?service={srv["name"]}&type=roadmap" class="btn btn-outline-primary btn-lg rounded-pill px-5" style="padding: 0.8rem 2rem; border: 2px solid var(--primary-base); color: var(--primary-base); background: transparent;">Talk to Our Experts</a>
            </div>
          </div>
        </div>
      </div>
      <div class="app-bottom-border"></div>
    </section>

    {footer_content}
    
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
"""
    write_page(srv["slug"], html_content)


# ==================== CORE PAGES ====================

# 1. About Us
about_html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us | Boscosoft Technologies</title>
    <meta name="description" content="About Boscosoft Technologies. Our story, evolution milestones since 2001, global partner presence, and corporate digital scaling commitment." />
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
    {header_content}
    
    <div class="acme-hero-wrapper">
      <section class="acme-hero-section section-padding pt-5" style="padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container text-center">
          <span class="acme-hero-tag mb-3 d-inline-block">ABOUT US</span>
          <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
            Partnering for a <span>Digital Future</span>
          </h1>
          <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
            Boscosoft Technologies Pvt. Ltd. is a global AI & Digital Transformation partner. Since 2001, we have helped organizations modernize operations, integrate silos, adopt AI, and scale cloud-native SaaS systems.
          </p>
        </div>
      </section>
    </div>

    <!-- OUR STORY -->
    <section class="section-padding" style="padding: 6rem 0; background: white;">
      <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 4rem; align-items: center;">
        <div>
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">OUR STORY</span>
          <h2 class="display-6 fw-bold mb-3" style="color: var(--navy-dark); font-size: 2.25rem; font-weight: 800;">25+ Years of Technology Trust</h2>
          <p style="color: var(--text-gray); line-height: 1.6; margin-bottom: 1.5rem;">Founded in 2001, Boscosoft started with a vision to deliver custom software systems with high ethical principles and reliable support. Over two decades, we scaled our engineering capacity, deploying digital ecosystems in 22+ countries, serving schools, dioceses, nonprofits, MFIs, and medical institutions.</p>
          <p style="color: var(--text-gray); line-height: 1.6;">We have transformed ourselves from a local bespoke developer into an AI-forward B2B platform modernization agency, driving cloud-native transitions, Microsoft Gold partnerships, and enterprise API integrations.</p>
        </div>
        <div style="background: linear-gradient(135deg, var(--navy-dark), var(--primary-dark)); padding: 3rem; border-radius: 20px; color: white; box-shadow: 0 10px 30px rgba(0,102,204,0.15);">
          <h3 class="fw-bold mb-4" style="color: white; font-size: 1.5rem;">Corporate Footprint</h3>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1.5rem;">
            <li style="display: flex; gap: 1rem; align-items: center;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;"><i class="fas fa-building"></i></div>
              <div>
                <h4 style="font-size: 1.1rem; font-weight: 700; margin: 0;">2,600+</h4>
                <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.85rem;">Global Clients Served</p>
              </div>
            </li>
            <li style="display: flex; gap: 1rem; align-items: center;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;"><i class="fas fa-globe-asia"></i></div>
              <div>
                <h4 style="font-size: 1.1rem; font-weight: 700; margin: 0;">22+</h4>
                <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.85rem;">Countries Active</p>
              </div>
            </li>
            <li style="display: flex; gap: 1rem; align-items: center;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;"><i class="fas fa-award"></i></div>
              <div>
                <h4 style="font-size: 1.1rem; font-weight: 700; margin: 0;">Microsoft Gold</h4>
                <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.85rem;">Partner Infrastructure Status</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta-section" style="padding: 5rem 0; background: var(--navy-dark); color: white;">
      <div class="container text-center">
        <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
          <h2 style="font-size: 2.25rem; font-weight: 800;">Let's Build Together</h2>
          <p style="color: rgba(255,255,255,0.85); line-height: 1.6;">Contact our advisory board to schedule a detailed system migration overview and AI roadmap session.</p>
          <a href="/contact/index.html" class="btn btn-primary" style="background: white; color: var(--navy-dark); margin-top: 1rem; text-decoration: none;">Get in Touch</a>
        </div>
      </div>
    </section>

    {footer_content}
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
"""
write_page("about-us", about_html)


# 2. Mission & Vision
mission_html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mission & Vision | Boscosoft Technologies</title>
    <meta name="description" content="Mission, Vision, and Strategic Corporate Pillars of Boscosoft Technologies. Cloud first modernization, ethical technology scaling, and long term success." />
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
    {header_content}
    
    <div class="acme-hero-wrapper">
      <section class="acme-hero-section section-padding pt-5" style="padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container text-center">
          <span class="acme-hero-tag mb-3 d-inline-block">STRATEGY</span>
          <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
            Purpose and <span>Corporate Pillars</span>
          </h1>
          <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
            Guiding Boscosoft's engineering delivery model, SaaS product architectures, and AI-first B2B integration frameworks.
          </p>
        </div>
      </section>
    </div>

    <!-- SPLIT BLOCK -->
    <section class="section-padding" style="padding: 6rem 0; background: white;">
      <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 4rem;">
        
        <div style="padding: 3rem; background: #f8fafc; border-radius: 24px; border: 1px solid var(--border-color);">
          <i class="fas fa-eye fa-2x mb-3 text-primary" style="color: var(--primary-base); display: block; margin-bottom: 1.5rem;"></i>
          <h3 style="font-size: 1.75rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Our Vision</h3>
          <p style="color: var(--text-gray); line-height: 1.7; font-size: 1rem;">To build global, ethical, AI-ready platforms and scalable digital ecosystems that simplify B2B operations, elevate compliance, and sustain long-term technology trust for mission-driven and corporate client partnerships.</p>
        </div>

        <div style="padding: 3rem; background: #f8fafc; border-radius: 24px; border: 1px solid var(--border-color);">
          <i class="fas fa-bullseye fa-2x mb-3 text-primary" style="color: var(--primary-base); display: block; margin-bottom: 1.5rem;"></i>
          <h3 style="font-size: 1.75rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Our Mission</h3>
          <p style="color: var(--text-gray); line-height: 1.7; font-size: 1rem;">We empower organizations by re-engineering legacy desktop systems to secure cloud-native SaaS products, designing robust B2B APIs, adopting responsible AI agents, and delivering 24/7 technical support help desks.</p>
        </div>

      </div>
    </section>

    <!-- STRATEGIC PILLARS -->
    <section class="section-padding" style="padding: 6rem 0; background: #f8fafc; border-top: 1px solid var(--border-color);">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">PILLARS</span>
          <h2 class="display-5 fw-bold mb-3" style="color: var(--navy-dark); font-size: 2.5rem; font-weight: 800;">Strategic Corporate Pillars</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 4rem;">
          <div style="background: white; padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color);">
            <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.75rem;">AI-Driven Transformation</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">Integrating private LLM layers, RAG document search engines, and automated agent workflows to optimize operational efficiency.</p>
          </div>
          <div style="background: white; padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color);">
            <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.75rem;">Platform-Led SaaS</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">Architecting scalable K-12 school ERPs, university OBE tools, hospital systems, and nonprofit ledgers under unified codebases.</p>
          </div>
          <div style="background: white; padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color);">
            <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.75rem;">Connected Digital Ecosystems</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">Developing secure OAuth2 RESTful API middleware bridges, banking sync engines, and messaging pipelines.</p>
          </div>
          <div style="background: white; padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color);">
            <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.75rem;">Responsible AI & Compliance</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">Adhering strictly to HIPAA details privacy, GDPR data laws, Bishop canonical regulations, and NGO tax compliance audits.</p>
          </div>
          <div style="background: white; padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color);">
            <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.75rem;">Cloud-First Modernization</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">Re-engineering obsolete VB6/Access database installations into containerized, high-performance Microsoft Azure virtual clouds.</p>
          </div>
          <div style="background: white; padding: 2rem; border-radius: 16px; border: 1px solid var(--border-color);">
            <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.75rem;">Long-Term Client Success</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">Delivering predictable SLA support help desks, regular server patches, and direct support lines with guaranteed uptime benchmarks.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta-section" style="padding: 5rem 0; background: var(--navy-dark); color: white;">
      <div class="container text-center">
        <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
          <h2 style="font-size: 2.25rem; font-weight: 800;">Align Your Digital Strategy</h2>
          <p style="color: rgba(255,255,255,0.85); line-height: 1.6;">Coordinate software integrations, platform hosting, and automated data processing scopes with our solutions advisory team.</p>
          <a href="/contact/index.html" class="btn btn-primary" style="background: white; color: var(--navy-dark); margin-top: 1rem; text-decoration: none;">Contact Our Advisory Board</a>
        </div>
      </div>
    </section>

    {footer_content}
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
"""
write_page("mission-vision", mission_html)


# 3. Leadership Team
leadership_html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Leadership Team | Boscosoft Technologies</title>
    <meta name="description" content="Meet the executive directors managing Boscosoft's regional delivery centers and global B2B SaaS modernization offices." />
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
    {header_content}
    
    <div class="acme-hero-wrapper">
      <section class="acme-hero-section section-padding pt-5" style="padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container text-center">
          <span class="acme-hero-tag mb-3 d-inline-block">LEADERSHIP</span>
          <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
            Our Executive <span>Board Directors</span>
          </h1>
          <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
            Managing technical deliveries, partner alliances, customer support desks, and B2B project executions globally.
          </p>
        </div>
      </section>
    </div>

    <!-- DIRECTORS GRID -->
    <section class="section-padding" style="padding: 6rem 0; background: white;">
      <div class="container">
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem; margin-top: 2rem;">
          
          <div style="text-align: center;">
            <div style="width: 200px; height: 200px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem auto; border: 4px solid var(--primary-base); box-shadow: var(--shadow-md);">
              <img src="/images/ceo_portrait.png" alt="Fr. Rector" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.25rem;">Fr. Maria Antony</h3>
            <p style="color: var(--primary-base); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1rem;">Managing Director & CEO</p>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; max-width: 300px; margin: 0 auto;">Coordinates global partner alignments, compliance checks, and B2B SaaS modernization roadmaps.</p>
          </div>

          <div style="text-align: center;">
            <div style="width: 200px; height: 200px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem auto; border: 4px solid var(--primary-base); box-shadow: var(--shadow-md);">
              <img src="/images/frrector.avif" alt="Director" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.25rem;">Fr. Thaddeus</h3>
            <p style="color: var(--primary-base); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1rem;">Executive Director</p>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; max-width: 300px; margin: 0 auto;">Manages core India delivery hubs, software engineers directories, and cloud infrastructure support pipelines.</p>
          </div>

          <div style="text-align: center;">
            <div style="width: 200px; height: 200px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem auto; border: 4px solid var(--primary-base); box-shadow: var(--shadow-md);">
              <img src="/images/fr_arun.avif" alt="Director" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 0.25rem;">Fr. Arun</h3>
            <p style="color: var(--primary-base); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 1rem;">Director - ME Operations</p>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; max-width: 300px; margin: 0 auto;">Manages Middle East corporate clients support desks, partner networks, and custom integrations rollout.</p>
          </div>

        </div>

      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta-section" style="padding: 5rem 0; background: var(--navy-dark); color: white;">
      <div class="container text-center">
        <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
          <h2 style="font-size: 2.25rem; font-weight: 800;">Work with Our Delivery Team</h2>
          <p style="color: rgba(255,255,255,0.85); line-height: 1.6;">Design your software blueprint and coordinate deployment targets with our principal engineering directors.</p>
          <a href="/contact/index.html" class="btn btn-primary" style="background: white; color: var(--navy-dark); margin-top: 1rem; text-decoration: none;">Get in Touch</a>
        </div>
      </div>
    </section>

    {footer_content}
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
"""
write_page("leadership", leadership_html)


# 4. Industries
industries_html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Industries We Serve | Boscosoft Technologies</title>
    <meta name="description" content="Explore Boscosoft's sector-specific ERP platforms and custom AI modernization solutions for Education, Healthcare, NGOs, FinTech, and FaithTech." />
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
    {header_content}
    
    <div class="acme-hero-wrapper">
      <section class="acme-hero-section section-padding pt-5" style="padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container text-center">
          <span class="acme-hero-tag mb-3 d-inline-block">B2B SECTORS</span>
          <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
            Sectors We <span>Empower</span>
          </h1>
          <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
            Deploying tailored SaaS platforms, database integrations, and automated AI layers across specific corporate and institutional industries.
          </p>
        </div>
      </section>
    </div>

    <!-- INDUSTRIES SECTOR GRID -->
    <section class="section-padding" style="padding: 6rem 0; background: white;">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem;">
          
          <div id="education" style="padding: 3rem; background: #f8fafc; border: 1px solid var(--border-color); border-radius: 20px;">
            <i class="fas fa-graduation-cap fa-2x mb-3 text-primary" style="color: var(--primary-base); font-size: 2rem; display: block; margin-bottom: 1.5rem;"></i>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Education & Academies</h3>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>Challenges:</strong> Fragmented student files, manual fee queues, complex assessment spreadsheets, and slow parent communication.</p>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>How We Help:</strong> SmartSchoolPlus automates admissions, invoicing, schedules, and grading in a single secure console.</p>
            <a href="/platforms/smartschoolplus/index.html" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; display: inline-flex; text-decoration: none;">Explore School ERP</a>
          </div>

          <div id="higher-education" style="padding: 3rem; background: #f8fafc; border: 1px solid var(--border-color); border-radius: 20px;">
            <i class="fas fa-university fa-2x mb-3 text-primary" style="color: var(--primary-base); font-size: 2rem; display: block; margin-bottom: 1.5rem;"></i>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Higher Education</h3>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>Challenges:</strong> OBE attainment logs tracking, university accreditation filings, faculty schedules, and student registration congestion.</p>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>How We Help:</strong> HiGrade tracks outcome metrics, exam cell records, and compiles SSR reports with 1-click audit downloads.</p>
            <a href="/platforms/higrade-solutions/index.html" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; display: inline-flex; text-decoration: none;">Explore Higher Ed ERP</a>
          </div>

          <div id="healthcare" style="padding: 3rem; background: #f8fafc; border: 1px solid var(--border-color); border-radius: 20px;">
            <i class="fas fa-hospital-user fa-2x mb-3 text-primary" style="color: var(--primary-base); font-size: 2rem; display: block; margin-bottom: 1.5rem;"></i>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Healthcare & Wards</h3>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>Challenges:</strong> Patient billing errors, uncoordinated inventory, slow lab reports distribution, and HIPAA data compliance.</p>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>How We Help:</strong> MedSysB integrates clinical records, EMR, pharmacy store stocks, lab analysis tables, and billing.</p>
            <a href="/platforms/medsysb/index.html" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; display: inline-flex; text-decoration: none;">Explore Hospital Software</a>
          </div>

          <div id="faith" style="padding: 3rem; background: #f8fafc; border: 1px solid var(--border-color); border-radius: 20px;">
            <i class="fas fa-church fa-2x mb-3 text-primary" style="color: var(--primary-base); font-size: 2rem; display: block; margin-bottom: 1.5rem;"></i>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Faith-Based Institutions</h3>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>Challenges:</strong> Tracking family registers, certificate typing errors, clergy profiles, and branch parish accounting.</p>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>How We Help:</strong> CristO Suite maintains census records, sacramental registers, decrees, and parish budgets canonical-aligned.</p>
            <a href="/platforms/cristo-suite/index.html" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; display: inline-flex; text-decoration: none;">Explore FaithTech ERP</a>
          </div>

          <div id="finance" style="padding: 3rem; background: #f8fafc; border: 1px solid var(--border-color); border-radius: 20px;">
            <i class="fas fa-coins fa-2x mb-3 text-primary" style="color: var(--primary-base); font-size: 2rem; display: block; margin-bottom: 1.5rem;"></i>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Microfinance (FinTech)</h3>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>Challenges:</strong> Field agent collection losses, lack of internet in rural centers, complex weekly interest schedules, and default tracking.</p>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>How We Help:</strong> MicroFund offline collection app syncs agent logs automatically and calculates weekly credit EMIs.</p>
            <a href="/platforms/microfund/index.html" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; display: inline-flex; text-decoration: none;">Explore Finance Platforms</a>
          </div>

          <div id="ngo" style="padding: 3rem; background: #f8fafc; border: 1px solid var(--border-color); border-radius: 20px;">
            <i class="fas fa-hand-holding-heart fa-2x mb-3 text-primary" style="color: var(--primary-base); font-size: 2rem; display: block; margin-bottom: 1.5rem;"></i>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">NGOs & NPOs</h3>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>Challenges:</strong> Restricting funds tracking, budget variance blocks, statutory audit reports, and tracking foreign grants (FCRA).</p>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><strong>How We Help:</strong> Acme.erp provides multi-branch transparency, restricted fund accounting, and 10B compliance export logs.</p>
            <a href="/platforms/acme-erp/index.html" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; display: inline-flex; text-decoration: none;">Explore NGO Solutions</a>
          </div>

        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta-section" style="padding: 5rem 0; background: var(--navy-dark); color: white;">
      <div class="container text-center">
        <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
          <h2 style="font-size: 2.25rem; font-weight: 800;">Find Your Sector Specific Solution</h2>
          <p style="color: rgba(255,255,255,0.85); line-height: 1.6;">Contact our advisory board to schedule custom software engineering blueprints matching your industry scale.</p>
          <a href="/contact/index.html" class="btn btn-primary" style="background: white; color: var(--navy-dark); margin-top: 1rem; text-decoration: none;">Talk to Our Experts</a>
        </div>
      </div>
    </section>

    {footer_content}
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
"""
write_page("industries", industries_html)


# 5. Careers
careers_html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Careers | Boscosoft Technologies</title>
    <meta name="description" content="Explore open developer roles, engineering cultures, learning pathways, and B2B software modernization career options at Boscosoft." />
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
    {header_content}
    
    <div class="acme-hero-wrapper">
      <section class="acme-hero-section section-padding pt-5" style="padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container text-center">
          <span class="acme-hero-tag mb-3 d-inline-block">CAREERS</span>
          <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
            Join Our <span>Engineering Hub</span>
          </h1>
          <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
            Build B2B SaaS modernization layers, integrate secure API middleware pipelines, and deploy autonomous LLM agents.
          </p>
        </div>
      </section>
    </div>

    <!-- CULTURE CARDS -->
    <section class="section-padding" style="padding: 6rem 0; background: white;">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">WHY BOSCOSOFT</span>
          <h2 class="display-5 fw-bold mb-3" style="color: var(--navy-dark); font-size: 2.5rem; font-weight: 800;">Our Innovation Environment</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 4rem;">
          <div style="padding: 2.5rem; background: #f8fafc; border-radius: 16px; border: 1px solid var(--border-color);">
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Continuous Growth</h3>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">We invest in professional development training. Programmers gain certifications in Microsoft Azure cloud systems and Odoo module development.</p>
          </div>
          <div style="padding: 2.5rem; background: #f8fafc; border-radius: 16px; border: 1px solid var(--border-color);">
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">AI-First Engineering</h3>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">Work in our core AI labs to build RAG vector search indices, coordinate autonomous agents workflows, and tune open-source LLMs.</p>
          </div>
          <div style="padding: 2.5rem; background: #f8fafc; border-radius: 16px; border: 1px solid var(--border-color);">
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1rem;">Ethical Mission Alignment</h3>
            <p style="color: var(--text-gray); font-size: 0.9rem; line-height: 1.6; margin: 0;">Help nonprofits, hospitals, and educational organizations modernize. Your work directly drives efficiency and transparent bookkeeping worldwide.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- OPEN ROLES -->
    <section class="section-padding" style="padding: 6rem 0; background: #f8fafc; border-top: 1px solid var(--border-color);">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-label d-block text-uppercase fw-bold text-primary mb-2" style="color: var(--primary-base); font-weight: 700; letter-spacing: 2px; font-size: 0.85rem; display: block; text-transform: uppercase;">OPENINGS</span>
          <h2 class="display-5 fw-bold mb-3" style="color: var(--navy-dark); font-size: 2.5rem; font-weight: 800;">Explore Opportunities</h2>
        </div>
        
        <div style="max-width: 900px; margin: 4rem auto 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
          
          <div style="background: white; border: 1px solid var(--border-color); padding: 2rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
            <div>
              <span style="font-size: 0.75rem; background: rgba(0, 102, 204, 0.08); color: var(--primary-base); padding: 0.25rem 0.75rem; border-radius: 50px; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; display: inline-block;">SaaS Engineering</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin: 0 0 0.5rem 0;">Full-Stack Python/JS Developer</h3>
              <p style="margin: 0; color: var(--text-gray); font-size: 0.9rem;">Chennai Delivery Center / Remote Hybrid</p>
            </div>
            <a href="/contact/index.html?type=careers&role=fullstack" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; text-decoration: none;">Apply Now</a>
          </div>

          <div style="background: white; border: 1px solid var(--border-color); padding: 2rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
            <div>
              <span style="font-size: 0.75rem; background: rgba(0, 102, 204, 0.08); color: var(--primary-base); padding: 0.25rem 0.75rem; border-radius: 50px; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; display: inline-block;">AI & Automation</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin: 0 0 0.5rem 0;">AI Automation & RAG Engineer</h3>
              <p style="margin: 0; color: var(--text-gray); font-size: 0.9rem;">Chennai Delivery Center</p>
            </div>
            <a href="/contact/index.html?type=careers&role=ai" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; text-decoration: none;">Apply Now</a>
          </div>

          <div style="background: white; border: 1px solid var(--border-color); padding: 2rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
            <div>
              <span style="font-size: 0.75rem; background: rgba(0, 102, 204, 0.08); color: var(--primary-base); padding: 0.25rem 0.75rem; border-radius: 50px; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; display: inline-block;">Technical Support</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-dark); margin: 0 0 0.5rem 0;">ERP Implementation Consultant</h3>
              <p style="margin: 0; color: var(--text-gray); font-size: 0.9rem;">Dubai, UAE / Chennai Office</p>
            </div>
            <a href="/contact/index.html?type=careers&role=erp" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem; text-decoration: none;">Apply Now</a>
          </div>

        </div>
      </div>
    </section>

    {footer_content}
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
"""
write_page("careers", careers_html)


# 6. Contact
contact_html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Us | Boscosoft Technologies</title>
    <meta name="description" content="Contact Boscosoft Technologies. Request product demos, consult with our AI modernization experts, or reach our regional support offices." />
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
    {header_content}
    
    <div class="acme-hero-wrapper">
      <section class="acme-hero-section section-padding pt-5" style="padding-top: 5rem; padding-bottom: 5rem;">
        <div class="container text-center">
          <span class="acme-hero-tag mb-3 d-inline-block">CONTACT US</span>
          <h1 class="acme-hero-title mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; font-weight: 800; color: white;">
            Get in <span>Touch</span>
          </h1>
          <p class="acme-hero-desc mb-5" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; color: rgba(255,255,255,0.85); line-height: 1.6;">
            Consult with our advisory board to schedule custom product demos, discuss API middleware integrations, or open support SLAs.
          </p>
        </div>
      </section>
    </div>

    <!-- CONTACT FORM & ADDRESSES -->
    <section class="section-padding" style="padding: 6rem 0; background: white;">
      <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 4rem;">
        
        <!-- FORM COLUMN -->
        <div style="background: #f8fafc; border: 1px solid var(--border-color); padding: 3rem; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
          <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 2rem;">Submit an Inquiry</h2>
          <form style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; color: var(--navy-dark); display: block; margin-bottom: 0.5rem;">Full Name</label>
              <input type="text" placeholder="John Doe" class="form-input" required />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; color: var(--navy-dark); display: block; margin-bottom: 0.5rem;">Organization Name</label>
              <input type="text" placeholder="Acme Org" class="form-input" required />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; color: var(--navy-dark); display: block; margin-bottom: 0.5rem;">Work Email</label>
              <input type="email" placeholder="john@acme.org" class="form-input" required />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; color: var(--navy-dark); display: block; margin-bottom: 0.5rem;">Phone Number</label>
              <input type="tel" placeholder="+91 9626 800 800" class="form-input" required />
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; color: var(--navy-dark); display: block; margin-bottom: 0.5rem;">Interest Area</label>
              <select class="form-select">
                <option>Product Demo Request</option>
                <option>AI Transformation Consulting</option>
                <option>ERP/CRM Customization</option>
                <option>SaaS Engineering Modernization</option>
                <option>API & Data Integrations</option>
                <option>24/7 Cloud Support SLA</option>
                <option>Careers Application</option>
              </select>
            </div>
            <div>
              <label style="font-weight: 600; font-size: 0.85rem; color: var(--navy-dark); display: block; margin-bottom: 0.5rem;">Message</label>
              <textarea placeholder="Tell us about your technical roadmap..." rows="4" class="form-textarea" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Submit Inquiry</button>
          </form>
        </div>

        <!-- ADDRESSES COLUMN -->
        <div style="display: flex; flex-direction: column; gap: 3rem;">
          
          <div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1.5rem; border-bottom: 2px solid var(--primary-base); padding-bottom: 0.5rem; display: inline-block;">Registered Office (India)</h3>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
              <strong>Bosco Soft Technologies Pvt. Ltd.</strong><br>
              No. 231/77, S.H.C Complex, Vaniyambadi Road,<br>
              Tirupattur District, Tamil Nadu 635 601, INDIA.
            </p>
            <p style="color: var(--text-gray); font-size: 0.95rem; margin: 0 0 0.5rem 0;"><i class="fas fa-phone-alt text-primary" style="margin-right: 0.5rem; color: var(--primary-base);"></i> +91 9626 800 800</p>
            <p style="color: var(--text-gray); font-size: 0.95rem; margin: 0;"><i class="fas fa-envelope text-primary" style="margin-right: 0.5rem; color: var(--primary-base);"></i> binfo@boscosofttech.com</p>
          </div>

          <div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-dark); margin-bottom: 1.5rem; border-bottom: 2px solid var(--primary-base); padding-bottom: 0.5rem; display: inline-block;">Middle East Office (UAE)</h3>
            <p style="color: var(--text-gray); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
              <strong>Bosco Soft Technologies FZE</strong><br>
              BC4, Business Park RAK Free Trade Zone,<br>
              Ras Al Khaimah, UAE.
            </p>
            <p style="color: var(--text-gray); font-size: 0.95rem; margin: 0 0 0.5rem 0;"><i class="fas fa-mobile-alt text-primary" style="margin-right: 0.5rem; color: var(--primary-base);"></i> +971 058 860 1821</p>
            <p style="color: var(--text-gray); font-size: 0.95rem; margin: 0;"><i class="fas fa-envelope text-primary" style="margin-right: 0.5rem; color: var(--primary-base);"></i> info@boscosoft.ae</p>
          </div>

        </div>
      </div>
    </section>

    {footer_content}
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
"""
write_page("contact", contact_html)

print("All 19 subpages generated successfully!")
