const fs = require('fs');
const path = require('path');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const FAQS_DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_faqs.json'), 'utf8'));
const PROJECTS_DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_portfolio_projects.json'), 'utf8'));

// --------------------------------------------------------------------------
// 1. SPECIFIER RESOURCES COMPONENT (FOR PRODUCT PAGES)
// --------------------------------------------------------------------------
function renderSpecifierResources(p) {
  return `
    <section class="mt-14 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 text-white rounded-2xl p-6 sm:p-8 md:p-10 border border-cyan-800/40 shadow-xl">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span class="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-1">Architect &amp; MEP Specifier Hub</span>
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">Download CAD Blocks, BIM Revit &amp; Hydraulic Data Sheets</h2>
          <p class="text-slate-300 text-sm mt-1 max-w-2xl">
            Official technical submittal package for landscape architects, MEP civil contractors, and municipal consultants specifying ${escapeHtml(p.title)}.
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20please%20send%20CAD%20DWG%20and%20BIM%20files%20for%20${encodeURIComponent(p.title)}" target="_blank" rel="noopener noreferrer" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Request CAD Package</span>
          </a>
          <a href="mailto:info@fludio.in?subject=BIM%20and%20CAD%20Submittal:%20${encodeURIComponent(p.title)}" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold px-4 py-3 rounded-xl transition-all">
            Email RFP
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div class="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
          <div class="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          </div>
          <h3 class="font-bold text-white text-sm mb-1">2D AutoCAD (DWG/DXF)</h3>
          <p class="text-xs text-slate-300 leading-relaxed mb-3">Plan, section, and elevation detail drawings for pool basin geometry, nozzle manifold spacing, and plumbing pit layouts.</p>
          <span class="inline-block text-[11px] font-mono text-cyan-300 font-semibold">Format: .DWG / .DXF</span>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
          <div class="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h3 class="font-bold text-white text-sm mb-1">3D BIM / Revit Families</h3>
          <p class="text-xs text-slate-300 leading-relaxed mb-3">LOD 300+ Revit BIM objects with embedded hydraulic connection points, flow LPM, and electrical driver load metadata.</p>
          <span class="inline-block text-[11px] font-mono text-cyan-300 font-semibold">Format: .RFA / .RVT / .IFC</span>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
          <div class="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h3 class="font-bold text-white text-sm mb-1">Hydraulic Flow Curves</h3>
          <p class="text-xs text-slate-300 leading-relaxed mb-3">Pressure vs. spray height curves, pump head calculations, pipe friction loss matrix, and splash basin clearance formula.</p>
          <span class="inline-block text-[11px] font-mono text-cyan-300 font-semibold">Format: PDF Submittal Sheet</span>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
          <div class="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h3 class="font-bold text-white text-sm mb-1">CSI 3-Part MasterFormat</h3>
          <p class="text-xs text-slate-300 leading-relaxed mb-3">Tender-ready specification clauses for Section 11 14 00 (Fountain Equipment) and Section 26 56 00 (Underwater Lighting).</p>
          <span class="inline-block text-[11px] font-mono text-cyan-300 font-semibold">Format: DOCX / PDF</span>
        </div>
      </div>
    </section>
  `;
}

// --------------------------------------------------------------------------
// 2. ENGINEERING CERTIFICATIONS COMPONENT
// --------------------------------------------------------------------------
function renderEngineeringCertifications() {
  return `
    <section class="mt-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span class="text-cyan-700 text-xs font-bold uppercase tracking-wider block mb-1">Certified Quality Standards</span>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">Fludio Engineering &amp; Metallurgy Certifications</h2>
          <p class="text-xs sm:text-sm text-slate-600 mt-0.5">Every component manufactured at our Pune works undergoes rigorous testing before site dispatch.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-xs font-bold text-slate-700">100% Quality Inspected</span>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div class="text-cyan-700 font-mono font-bold text-lg mb-1">IP68</div>
          <div class="font-bold text-slate-900 text-xs mb-1">Submersion Certified</div>
          <p class="text-[11px] text-slate-500 leading-tight">Hydrostatic pressure tested to 10m continuous depth.</p>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div class="text-cyan-700 font-mono font-bold text-lg mb-1">SS304L/316L</div>
          <div class="font-bold text-slate-900 text-xs mb-1">Mill Test Certified</div>
          <p class="text-[11px] text-slate-500 leading-tight">ASTM A240 low-carbon austenitic steel with MTC report.</p>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div class="text-cyan-700 font-mono font-bold text-lg mb-1">ISO 9001</div>
          <div class="font-bold text-slate-900 text-xs mb-1">Quality Management</div>
          <p class="text-[11px] text-slate-500 leading-tight">Standardized factory fabrication and hydraulic calibration.</p>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div class="text-cyan-700 font-mono font-bold text-lg mb-1">DMX 512 / RDM</div>
          <div class="font-bold text-slate-900 text-xs mb-1">Show Protocol</div>
          <p class="text-[11px] text-slate-500 leading-tight">ANSI E1.11 &amp; E1.20 compliant millisecond musical sync.</p>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div class="text-cyan-700 font-mono font-bold text-lg mb-1">CE &amp; BIS</div>
          <div class="font-bold text-slate-900 text-xs mb-1">Electrical Safety</div>
          <p class="text-[11px] text-slate-500 leading-tight">12V/24V DC SELV isolated drivers for human water contact.</p>
        </div>
      </div>
    </section>
  `;
}

// --------------------------------------------------------------------------
// 3. SERVICES HUB CONTENT
// --------------------------------------------------------------------------
function renderServicesHubContent() {
  return `
    <div class="space-y-16">
      <!-- 5-Phase Turnkey EPC Engineering Workflow -->
      <section class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            Structured Turnkey Project Delivery
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Our 5-Stage Turnkey Engineering Process</h2>
          <p class="text-slate-600 text-sm sm:text-base mt-2">
            From preliminary architectural concept through computational fluid modeling, in-house fabrication, site commissioning, and lifetime AMC.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl relative flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-cyan-600 text-white font-mono font-bold text-base flex items-center justify-center mb-4 shadow-sm">
                01
              </div>
              <h3 class="font-bold text-slate-900 text-base mb-2">Feasibility &amp; Hydraulic Sizing</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                Site survey, basin water volume analysis, hydraulic flow loop calculation (LPM vs head), wind-drift clearance radius ($R \\ge H$), and power budget estimation.
              </p>
            </div>
            <span class="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded inline-block">Week 1: Survey &amp; Sizing</span>
          </div>

          <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl relative flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-cyan-600 text-white font-mono font-bold text-base flex items-center justify-center mb-4 shadow-sm">
                02
              </div>
              <h3 class="font-bold text-slate-900 text-base mb-2">CAD, BIM &amp; 3D Choreography</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                Full 2D civil/MEP AutoCAD schematics, 3D Revit BIM model integration, single-line electrical diagrams (SLD), and realistic 3D acoustic water simulation.
              </p>
            </div>
            <span class="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded inline-block">Week 2: Engineering Specs</span>
          </div>

          <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl relative flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-cyan-600 text-white font-mono font-bold text-base flex items-center justify-center mb-4 shadow-sm">
                03
              </div>
              <h3 class="font-bold text-slate-900 text-base mb-2">Pune Factory Works Fabrication</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                Precision CNC machining of SS304L/316L manifolds, IP68 underwater spotlight potting, assembly of DMX 512 PLC control panels, and factory hydrostatic testing.
              </p>
            </div>
            <span class="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded inline-block">Week 3-4: Factory Build</span>
          </div>

          <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl relative flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-cyan-600 text-white font-mono font-bold text-base flex items-center justify-center mb-4 shadow-sm">
                04
              </div>
              <h3 class="font-bold text-slate-900 text-base mb-2">Site Erection &amp; Commissioning</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                On-site manifold fixation, laser jet alignment, low-voltage cable pull, pump calibration, live musical choreography programming, and client operator training.
              </p>
            </div>
            <span class="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded inline-block">Week 5-6: Live Handover</span>
          </div>

          <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl relative flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-cyan-600 text-white font-mono font-bold text-base flex items-center justify-center mb-4 shadow-sm">
                05
              </div>
              <h3 class="font-bold text-slate-900 text-base mb-2">Lifetime AMC &amp; Spares SLA</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-3">
                Annual Maintenance Contracts (AMC) with quarterly preventive inspections, nozzle descaling, water quality audits, and 24-48h emergency engineer dispatch PAN India.
              </p>
            </div>
            <span class="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded inline-block">Lifetime: 24/7 SLA Support</span>
          </div>
        </div>
      </section>

      <!-- Scope of Work Matrix: Fludio vs Client Civil MEP Contractor -->
      <section class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="px-6 py-5 bg-gradient-to-r from-slate-900 to-cyan-950 text-white">
          <span class="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-1">Turnkey Responsibility Matrix</span>
          <h2 class="text-xl sm:text-2xl font-bold">Scope of Work Division (Fludio vs. Project Civil Contractor)</h2>
          <p class="text-slate-300 text-xs sm:text-sm mt-1">Clear demarcation ensuring seamless MEP execution and zero on-site coordination clashes.</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-700">
            <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-xs">
              <tr>
                <th class="px-6 py-4">Project Work Package</th>
                <th class="px-6 py-4 bg-cyan-50 text-cyan-950 border-x border-cyan-200">Fludio Engineering Scope</th>
                <th class="px-6 py-4">Client / Civil Contractor Scope</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr class="hover:bg-slate-50">
                <td class="px-6 py-4 font-semibold text-slate-900">Hydraulic &amp; MEP Design</td>
                <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                  Complete hydraulic loop sizing, flow calculations, CAD pipe layouts, and electrical load schedules.
                </td>
                <td class="px-6 py-4 text-slate-600">Provide site masterplan CAD, architectural constraints, and structural load approvals.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-6 py-4 font-semibold text-slate-900">Civil Basin &amp; Pump Room</td>
                <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                  Provide detailed civil cut-outs, balancing tank sizing, sleeve penetrations, and puddle flange locations.
                </td>
                <td class="px-6 py-4 text-slate-600">Construct RCC pool basin, waterproof membrane, pump room/pit masonry, and tile finishes.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-6 py-4 font-semibold text-slate-900">Equipment Manufacturing &amp; Supply</td>
                <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                  Manufacture 304L/316L nozzles, SS manifolds, IP68 LED lights, submersible pumps, and DMX control panels.
                </td>
                <td class="px-6 py-4 text-slate-600">Safe unloading and secure on-site storage area for equipment prior to erection.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-6 py-4 font-semibold text-slate-900">Electrical &amp; Water Utilities</td>
                <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                  Provide electrical Single Line Diagram (SLD), cable schedule, panel termination, and low-voltage drivers.
                </td>
                <td class="px-6 py-4 text-slate-600">Provide incoming 3-phase raw power supply, earthing pit, fresh water refill line, and overflow drain.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-6 py-4 font-semibold text-slate-900">Installation &amp; Commissioning</td>
                <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                  On-site mechanical erection, laser alignment of nozzles, DMX musical choreography programming, and handover.
                </td>
                <td class="px-6 py-4 text-slate-600">Provide clean water filling (potable/filtered) and access scaffolding if required.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Specifier Hub Block -->
      <section class="bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 text-white rounded-2xl p-6 sm:p-10 border border-cyan-800/40 shadow-xl">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <span class="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-1">Architect &amp; Engineering Consultation</span>
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">Need Customized CAD Blueprints or Tender Submittals?</h2>
            <p class="text-slate-300 text-sm mt-1 max-w-2xl">
              Our engineering team in Pune provides free preliminary hydraulic layouts, power sizing, and itemized Bill of Quantities (BOQ) within 24 hours.
            </p>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20have%20a%20project%20and%20need%20turnkey%20fountain%20engineering%20consultation." target="_blank" rel="noopener noreferrer" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Consult on WhatsApp</span>
            </a>
            <a href="mailto:info@fludio.in?subject=Turnkey%20Fountain%20RFP" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold px-4 py-3 rounded-xl transition-all">
              Submit RFP Document
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 class="font-bold text-white text-base mb-2">Commercial &amp; Smart City Plazas</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">Interactive dry decks, flush-floor walking fountains, and synchronized musical water shows that boost retail foot traffic.</p>
            <span class="text-xs font-semibold text-cyan-300">&bull; Foot traffic increase &bull; Zero standing water risk</span>
          </div>
          <div class="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 class="font-bold text-white text-base mb-2">Luxury Resorts &amp; Hospitality</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">Laminar glass-like jumping jets, stainless steel sheetfall cascades, and warm underwater LED illumination for relaxing ambient luxury.</p>
            <span class="text-xs font-semibold text-cyan-300">&bull; Micro-climate cooling &bull; 5-star acoustic prestige</span>
          </div>
          <div class="p-5 bg-white/5 border border-white/10 rounded-xl">
            <h3 class="font-bold text-white text-base mb-2">Township Lakes &amp; Eco Bodies</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">Floating lake aerators, high-thrust center geysers, and solar-powered aeration systems for biological water rejuvenation.</p>
            <span class="text-xs font-semibold text-cyan-300">&bull; High SOTR oxygen transfer &bull; Algae prevention</span>
          </div>
        </div>
      </section>

      ${renderEngineeringCertifications()}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 4. ABOUT HUB CONTENT
// --------------------------------------------------------------------------
function renderAboutHubContent() {
  return `
    <div class="space-y-16">
      <!-- Factory & Manufacturing Capability -->
      <section class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
              Pune Manufacturing Works
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
              Precision Hydraulic Engineering from the Industrial Heart of Maharashtra
            </h2>
            <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Headquartered at Khedekar Industrial Estate, Narhe Dhayari Road, Pune, Fludio Water Solutions is India’s foremost aquatic engineering and musical fountain manufacturing firm.
            </p>
            <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Our in-house fabrication facility features precision CNC turning lathes, robotic TIG welding for austenitic stainless steel, and specialized hydrostatic IP68 immersion pressure testing tanks. We do not rely on white-label rebadged imports; our hardware is engineered, fabricated, and rigorously tested in Pune for long-lasting performance in Indian water conditions.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
              <div>
                <div class="text-2xl font-extrabold text-cyan-700">10+</div>
                <div class="text-xs text-slate-500 font-medium">Years Experience</div>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-cyan-700">300+</div>
                <div class="text-xs text-slate-500 font-medium">PAN India Projects</div>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-cyan-700">100%</div>
                <div class="text-xs text-slate-500 font-medium">SS304L/316L Steel</div>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-cyan-700">5.0 ★</div>
                <div class="text-xs text-slate-500 font-medium">Client Rating</div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">01</div>
                <h3 class="font-bold text-slate-900 text-base">Austenitic Metallurgy (SS304L &amp; SS316L)</h3>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                We standardize exclusively on low-carbon austenitic stainless steel certified under ASTM A240. Every manifold and nozzle is acid-passivated to resist pitting in chlorinated pool water and saline coastal air.
              </p>
            </div>

            <div class="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">02</div>
                <h3 class="font-bold text-slate-900 text-base">Open DMX 512 &amp; RDM Automation</h3>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                We reject closed proprietary controllers. Fludio automation systems run on open industrial DMX 512 / RDM with Siemens and Schneider PLCs, giving clients lifetime freedom, easy spares availability, and zero recurring license fees.
              </p>
            </div>

            <div class="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">03</div>
                <h3 class="font-bold text-slate-900 text-base">Certified IP68 Hydrostatic Testing</h3>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Every underwater spotlight and submersible electrical enclosure is tested under 1.0 bar hydrostatic pressure in our Pune immersion tank, ensuring hermetic sealing down to 10 meters depth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Client Invitation to Inspect Factory -->
      <section class="bg-gradient-to-r from-slate-900 to-cyan-950 text-white rounded-2xl p-8 sm:p-12 shadow-xl">
        <div class="max-w-3xl">
          <span class="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-2">Factory Visit &amp; Quality Inspection</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold mb-4">Visit Our Pune Manufacturing Works</h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            We actively welcome architects, MEP consultants, property developers, and municipal officials to visit our Narhe Dhayari workshop. Inspect raw SS304L mill test certificates, witness live nozzle spray demonstrations, and review ongoing DMX 512 control panel assembly in person.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20would%20like%20to%20schedule%20a%20visit%20to%20your%20Pune%20works." target="_blank" rel="noopener noreferrer" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg shadow transition-all text-xs sm:text-sm">
              Schedule Factory Visit on WhatsApp
            </a>
            <a href="tel:+918530753091" class="border border-slate-600 hover:border-slate-400 text-white font-semibold px-6 py-3 rounded-lg transition-all text-xs sm:text-sm">
              Call Works Manager: +91 85307 53091
            </a>
          </div>
        </div>
      </section>

      ${renderEngineeringCertifications()}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 5. PROJECTS PORTFOLIO HUB CONTENT
// --------------------------------------------------------------------------
function renderProjectsHubContent() {
  return `
    <div class="space-y-16">
      <!-- Project Filter Bar -->
      <div id="project-filter-bar" class="flex items-center justify-center flex-wrap gap-2.5 mb-10">
        <button type="button" data-pfilter="all" class="proj-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-slate-900 text-white shadow-sm cursor-pointer">
          All Projects (${PROJECTS_DATA.length})
        </button>
        <button type="button" data-pfilter="musical" class="proj-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
          Musical Fountains (${PROJECTS_DATA.filter(p => p.categories.includes('musical')).length})
        </button>
        <button type="button" data-pfilter="static" class="proj-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
          Static &amp; Architectural (${PROJECTS_DATA.filter(p => p.categories.includes('static') || p.categories.includes('architectural')).length})
        </button>
        <button type="button" data-pfilter="commercial" class="proj-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
          Commercial Plazas (${PROJECTS_DATA.filter(p => p.categories.includes('commercial')).length})
        </button>
        <button type="button" data-pfilter="residential" class="proj-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
          Hospitality &amp; Estates (${PROJECTS_DATA.filter(p => p.categories.includes('residential')).length})
        </button>
      </div>

      <!-- Landmark Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${PROJECTS_DATA.map(p => `
          <div data-pcat="${p.categories.join(' ')}" class="proj-card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div class="relative h-56 overflow-hidden bg-slate-900">
                <img src="${p.imageUrl}" alt="${escapeHtml(p.title)} - ${escapeHtml(p.location)}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width="400" height="224" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span class="flex items-center gap-1 font-semibold">
                    <svg class="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    ${escapeHtml(p.location)}
                  </span>
                  <span class="bg-cyan-600/90 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-bold uppercase">
                    ${escapeHtml(p.categories[0])}
                  </span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-cyan-700 transition-colors">
                  ${escapeHtml(p.title)}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">${escapeHtml(p.description)}</p>
                <div class="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-700">${escapeHtml(p.impact_title)}:</span>
                  <span class="text-xs font-extrabold text-cyan-700">${escapeHtml(p.impact_value)}</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-0">
              <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20am%20interested%20in%20a%20project%20similar%20to%20${encodeURIComponent(p.title)}" target="_blank" rel="noopener noreferrer" class="w-full bg-slate-50 hover:bg-cyan-600 hover:text-white text-slate-800 text-xs font-bold py-2.5 px-4 rounded-lg border border-slate-200 hover:border-cyan-600 transition-all flex items-center justify-center gap-1.5 shadow-2xs">
                <span>Inquire About Similar Setup</span> &rarr;
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <script>
      (function() {
        const filterBtns = document.querySelectorAll('.proj-filter-btn');
        const cards = document.querySelectorAll('.proj-card');
        if (!filterBtns.length || !cards.length) return;

        filterBtns.forEach(function(btn) {
          btn.addEventListener('click', function() {
            const target = btn.getAttribute('data-pfilter');

            filterBtns.forEach(function(b) {
              b.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
              b.classList.add('bg-white', 'border', 'border-slate-200', 'text-slate-700');
            });
            btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
            btn.classList.remove('bg-white', 'border', 'border-slate-200', 'text-slate-700');

            cards.forEach(function(card) {
              const cat = card.getAttribute('data-pcat') || '';
              if (target === 'all' || cat.includes(target)) {
                card.style.display = '';
              } else {
                card.style.display = 'none';
              }
            });
          });
        });
      })();
      </script>

      <!-- Video Demonstrations Showcase -->
      <section class="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span class="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-1">Live Motion Captures</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Turnkey Water Features in Motion</h2>
            <p class="text-slate-400 text-xs sm:text-sm mt-1">Authentic on-site video recordings of Fludio commissioned installations.</p>
          </div>
          <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20would%20like%20to%20see%20more%20project%20videos." target="_blank" rel="noopener noreferrer" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg transition-all shrink-0">
            Request More Videos on WhatsApp
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-slate-950 border border-white/10 rounded-xl overflow-hidden">
            <video controls preload="metadata" playsinline class="w-full aspect-video object-cover" poster="/images/musical_fountain_hero.jpg">
              <source src="/videos/fludio-musical-dancing-fountain-choreography-show-01.mp4" type="video/mp4" />
            </video>
            <div class="p-4">
              <h4 class="font-bold text-white text-sm mb-1">Amenora Grand Musical Fountain</h4>
              <p class="text-xs text-slate-400">Variable speed pumps with DMX 512 RGBW lighting in Pune.</p>
            </div>
          </div>

          <div class="bg-slate-950 border border-white/10 rounded-xl overflow-hidden">
            <video controls preload="metadata" playsinline class="w-full aspect-video object-cover" poster="/images/realtime-projects/fludio-architectural-sheetfall-waterfall-wall-cascade-01.jpeg">
              <source src="/videos/fludio-architectural-sheetfall-waterfall-cascade-video-01.mp4" type="video/mp4" />
            </video>
            <div class="p-4">
              <h4 class="font-bold text-white text-sm mb-1">SS304L Sheetfall Cascade</h4>
              <p class="text-xs text-slate-400">Precision glass-like waterfall weir for luxury hotel atrium.</p>
            </div>
          </div>

          <div class="bg-slate-950 border border-white/10 rounded-xl overflow-hidden">
            <video controls preload="metadata" playsinline class="w-full aspect-video object-cover" poster="/images/realtime-projects/fludio-completed-commercial-residential-fountain-installation-01.jpeg">
              <source src="/videos/fludio-interactive-dry-deck-plaza-fountain-video-01.mp4" type="video/mp4" />
            </video>
            <div class="p-4">
              <h4 class="font-bold text-white text-sm mb-1">Interactive Dry Deck Plaza</h4>
              <p class="text-xs text-slate-400">Sub-millisecond 24V solenoids with safe flush-floor pedestrian grates.</p>
            </div>
          </div>
        </div>
      </section>

      ${renderEngineeringCertifications()}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 6. FAQS HUB CONTENT
// --------------------------------------------------------------------------
function renderFaqsHubContent() {
  const categories = [...new Set(FAQS_DATA.map(f => f.category))];

  return `
    <div class="space-y-12">
      <!-- FAQ Category Filter Bar -->
      <div id="faq-filter-bar" class="flex items-center justify-center flex-wrap gap-2 mb-10">
        <button type="button" data-fcat="all" class="faq-filter-btn px-4 py-2 rounded-full font-headline text-xs font-bold transition-all bg-slate-900 text-white shadow-sm cursor-pointer">
          All Questions (${FAQS_DATA.length})
        </button>
        ${categories.map(c => `
          <button type="button" data-fcat="${escapeHtml(c)}" class="faq-filter-btn px-4 py-2 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
            ${escapeHtml(c)} (${FAQS_DATA.filter(f => f.category === c).length})
          </button>
        `).join('')}
      </div>

      <!-- FAQ Accordion List -->
      <div class="space-y-4 max-w-4xl mx-auto">
        ${FAQS_DATA.map((f, idx) => `
          <details class="faq-item group bg-white border border-slate-200 rounded-xl p-6 shadow-xs open:shadow-md transition-all" data-category="${escapeHtml(f.category)}">
            <summary class="flex items-center justify-between gap-4 cursor-pointer list-none select-none font-bold text-slate-900 text-base sm:text-lg">
              <div class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ${idx + 1}
                </span>
                <span>${escapeHtml(f.question)}</span>
              </div>
              <svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <div class="pt-4 pl-9 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-4">
              <p>${escapeHtml(f.answer)}</p>
              <div class="mt-3 flex items-center justify-between text-xs">
                <span class="inline-block px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">${escapeHtml(f.category)}</span>
                <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20have%20a%20question%20about:%20${encodeURIComponent(f.question)}" target="_blank" rel="noopener noreferrer" class="text-cyan-600 hover:text-cyan-700 font-bold">
                  Ask More on WhatsApp &rarr;
                </a>
              </div>
            </div>
          </details>
        `).join('')}
      </div>

      <script>
      (function() {
        const filterBtns = document.querySelectorAll('.faq-filter-btn');
        const items = document.querySelectorAll('.faq-item');
        if (!filterBtns.length || !items.length) return;

        filterBtns.forEach(function(btn) {
          btn.addEventListener('click', function() {
            const target = btn.getAttribute('data-fcat');

            filterBtns.forEach(function(b) {
              b.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
              b.classList.add('bg-white', 'border', 'border-slate-200', 'text-slate-700');
            });
            btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
            btn.classList.remove('bg-white', 'border', 'border-slate-200', 'text-slate-700');

            items.forEach(function(item) {
              const cat = item.getAttribute('data-category');
              if (target === 'all' || cat === target) {
                item.style.display = '';
              } else {
                item.style.display = 'none';
              }
            });
          });
        });
      })();
      </script>

      <!-- Direct Technical Assistance CTA -->
      <section class="bg-gradient-to-r from-slate-900 to-cyan-950 text-white rounded-2xl p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-xl">
        <h3 class="text-xl sm:text-2xl font-bold mb-2">Have a Site-Specific Engineering Inquiry?</h3>
        <p class="text-slate-300 text-xs sm:text-sm mb-6 max-w-xl mx-auto">
          Our chief hydraulic engineers are available for technical design consultations, nozzle sizing reviews, and tender spec advisory.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20have%20a%20technical%20question%20for%20an%20upcoming%20fountain%20project." target="_blank" rel="noopener noreferrer" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm shadow transition-all">
            Chat on WhatsApp (+91 85307 53091)
          </a>
          <a href="tel:+918530753091" class="border border-slate-600 hover:border-slate-400 text-white font-semibold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all">
            Call Engineering Desk
          </a>
        </div>
      </section>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 7. CONTACT HUB CONTENT
// --------------------------------------------------------------------------
function renderContactHubContent() {
  return `
    <div class="space-y-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Contact Details & Factory Address -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <span class="text-cyan-700 text-xs font-bold uppercase tracking-wider block mb-2">Engineering Works &amp; HQ</span>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Fludio Water Solutions, Pune</h2>

            <div class="space-y-4 text-sm text-slate-700">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <strong class="text-slate-900 block">Manufacturing Facility Address:</strong>
                  <span>Sr.no 38/1, Shed No.6, Khedekar Industrial Estate, Narhe Dhayari Road, Pune - 411041, Maharashtra, India</span>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <div>
                  <strong class="text-slate-900 block">Engineering Hotlines:</strong>
                  <span>+91 85307 53091 / +91 91753 29337</span>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <div>
                  <strong class="text-slate-900 block">Direct Email:</strong>
                  <a href="mailto:info@fludio.in" class="text-cyan-700 font-semibold hover:underline">info@fludio.in</a> / <a href="mailto:fludiofountains@gmail.com" class="text-cyan-700 font-semibold hover:underline">fludiofountains@gmail.com</a>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <div>
                  <strong class="text-slate-900 block">Operating Hours:</strong>
                  <span>Mon - Sat: 9:00 AM - 6:30 PM (24/7 Breakdown SLA for AMC Clients)</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
              <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20would%20like%20to%20discuss%20a%20water%20fountain%20project." target="_blank" rel="noopener noreferrer" class="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
                <span>💬</span> WhatsApp Instant Chat
              </a>
              <a href="https://share.google/dA2tME9tn7KujiqkO" target="_blank" rel="noopener noreferrer" class="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
                <span>📍</span> Open Google Maps Location
              </a>
            </div>
          </div>

          <div class="bg-cyan-50 border border-cyan-200 rounded-2xl p-6">
            <h3 class="font-bold text-cyan-950 text-base mb-2">Architectural Blueprint Submission</h3>
            <p class="text-xs text-cyan-900 leading-relaxed mb-3">
              To expedite tender calculation and hydraulic sizing, please share your pool basin dimensions, water depth, and preferred fountain nozzles directly to our engineering desk via WhatsApp or email.
            </p>
            <span class="text-[11px] font-mono text-cyan-700 font-bold">Supported Formats: DWG, DXF, PDF, RVT, SKP</span>
          </div>
        </div>

        <!-- RFQ Submission Form -->
        <div class="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <span class="text-cyan-700 text-xs font-bold uppercase tracking-wider block mb-2">Direct Project Request</span>
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Request Technical Quotation &amp; Sizing</h2>
          <p class="text-slate-600 text-xs sm:text-sm mb-6">Fill out the project details below and our chief hydraulic engineer will review your inquiry within 24 hours.</p>

          <form action="mailto:info@fludio.in" method="POST" enctype="text/plain" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input type="text" name="name" required placeholder="e.g. Ar. Rajesh Sharma" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-600" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                <input type="tel" name="phone" required placeholder="e.g. +91 98765 43210" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-600" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input type="email" name="email" required placeholder="e.g. rajesh@architecture.com" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-600" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Project City &amp; State *</label>
                <input type="text" name="location" required placeholder="e.g. Pune, Maharashtra" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-600" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Project Type *</label>
                <select name="projectType" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-600 bg-white">
                  <option value="Turnkey Musical Fountain">Turnkey Musical Fountain</option>
                  <option value="Architectural Static Fountain">Architectural Static Fountain</option>
                  <option value="Interactive Dry Deck Plaza">Interactive Dry Deck Plaza</option>
                  <option value="Sheetfall / Water Curtain">Sheetfall / Water Curtain</option>
                  <option value="Lake Aerator / Ecological">Lake Aerator / Ecological</option>
                  <option value="Hardware / Lighting Supply Only">Hardware / Lighting Supply Only</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Approximate Basin Sizing</label>
                <input type="text" name="basinSize" placeholder="e.g. 10m x 6m x 0.6m depth" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-600" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Project Scope &amp; Special Requirements</label>
              <textarea name="message" rows="4" placeholder="Mention nozzle preferences, DMX musical sync, timelines, or CAD drawing details..." class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-600"></textarea>
            </div>

            <div class="pt-2">
              <button type="submit" class="w-full bg-slate-900 hover:bg-cyan-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer text-sm">
                Submit Engineering RFQ &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>

      ${renderEngineeringCertifications()}
    </div>
  `;
}

// --------------------------------------------------------------------------
// 8. PRODUCTS HUB CONTENT (4 CATEGORIES FILTER)
// --------------------------------------------------------------------------
function renderProductsHubContent(products, Fh, getNormalizedCategory) {
  return `
    <div>
      <div id="product-filter-bar" class="flex items-center justify-center flex-wrap gap-2.5 mb-10">
        <button type="button" data-filter="all" class="prod-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-slate-900 text-white shadow-sm cursor-pointer">
          All Products (${products.length})
        </button>
        <button type="button" data-filter="fountain" class="prod-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
          Water Fountains (${products.filter(p=>getNormalizedCategory(p)==='fountain').length})
        </button>
        <button type="button" data-filter="nozzles" class="prod-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
          Fountain Nozzles &amp; Jets (${products.filter(p=>getNormalizedCategory(p)==='nozzles').length})
        </button>
        <button type="button" data-filter="lights" class="prod-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
          Underwater &amp; Landscape Lights (${products.filter(p=>getNormalizedCategory(p)==='lights').length})
        </button>
        <button type="button" data-filter="accessories" class="prod-filter-btn px-5 py-2.5 rounded-full font-headline text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:border-cyan-600 hover:text-cyan-600 cursor-pointer">
          Hardware &amp; Control Accessories (${products.filter(p=>getNormalizedCategory(p)==='accessories').length})
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        ${products.map(p => {
          const s = Fh[p.id] || p.id;
          const normCat = getNormalizedCategory(p);
          const badgeLabel = normCat === 'fountain' ? 'Water Fountain' : normCat === 'nozzles' ? 'Nozzle & Jet' : normCat === 'lights' ? 'IP68 Lighting' : 'Hardware & Controls';
          return `
            <div data-prod-cat="${normCat}" class="prod-catalog-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div class="relative h-48 overflow-hidden bg-slate-900">
                  <img src="${p.imageUrl}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" width="400" height="192" loading="lazy" />
                  <span class="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10 shadow-xs">
                    ${badgeLabel}
                  </span>
                </div>
                <div class="p-6">
                  <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    <a href="/water-fountain-products/${s}" class="hover:text-cyan-600 transition-colors">${escapeHtml(p.title)}</a>
                  </h3>
                  <p class="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">${escapeHtml(p.description)}</p>
                </div>
              </div>
              <div class="px-6 pb-6 pt-0">
                <a href="/water-fountain-products/${s}" class="w-full bg-slate-50 hover:bg-cyan-600 hover:text-white text-slate-800 text-xs font-bold py-2.5 px-4 rounded-lg border border-slate-200 hover:border-cyan-600 transition-all flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>Explore Specifications &amp; Media</span> &rarr;
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <script>
      (function() {
        const filterBtns = document.querySelectorAll('.prod-filter-btn');
        const cards = document.querySelectorAll('.prod-catalog-card');
        if (!filterBtns.length || !cards.length) return;

        filterBtns.forEach(function(btn) {
          btn.addEventListener('click', function() {
            const target = btn.getAttribute('data-filter');

            filterBtns.forEach(function(b) {
              b.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
              b.classList.add('bg-white', 'border', 'border-slate-200', 'text-slate-700');
            });
            btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
            btn.classList.remove('bg-white', 'border', 'border-slate-200', 'text-slate-700');

            cards.forEach(function(card) {
              const cat = card.getAttribute('data-prod-cat');
              if (target === 'all' || cat === target) {
                card.style.display = '';
              } else {
                card.style.display = 'none';
              }
            });
          });
        });
      })();
      </script>

      ${renderEngineeringCertifications()}
    </div>
  `;
}

module.exports = {
  renderSpecifierResources,
  renderEngineeringCertifications,
  renderServicesHubContent,
  renderAboutHubContent,
  renderProjectsHubContent,
  renderFaqsHubContent,
  renderContactHubContent,
  renderProductsHubContent
};
