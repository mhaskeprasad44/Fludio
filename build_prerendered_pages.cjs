const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('extracted_products.json', 'utf8'));
const blogs = JSON.parse(fs.readFileSync('extracted_blogs.json', 'utf8'));

const Fh = {
  "underwater-light": "ip68-underwater-led-spotlight",
  "ring-light": "donut-nozzle-submersible-ring-light",
  "nozzles": "architectural-fountain-nozzles",
  "aerators": "floating-lake-aerator-series",
  "multi-nozzles": "multidirectional-dancing-fountain-nozzles",
  "panels": "dmx512-musical-fountain-control-panel",
  "sheetfall": "architectural-waterfall-sheetfall-cascade",
  "laminar-jet": "laminar-flow-jumping-jets",
  "dry-deck-jet": "interactive-dry-deck-solenoid-jet",
  "static-tiered": "classic-tiered-architectural-fountain",
  "digital-water-curtain": "interactive-digital-water-curtain"
};

const PRODUCT_PRICES = {
  "underwater-light": { low: "3500", high: "18500" },
  "ring-light": { low: "4800", high: "22000" },
  "nozzles": { low: "1200", high: "45000" },
  "aerators": { low: "45000", high: "280000" },
  "multi-nozzles": { low: "28000", high: "185000" },
  "panels": { low: "85000", high: "550000" },
  "sheetfall": { low: "8500", high: "75000" },
  "laminar-jet": { low: "32000", high: "145000" },
  "dry-deck-jet": { low: "18000", high: "95000" },
  "static-tiered": { low: "65000", high: "480000" },
  "digital-water-curtain": { low: "350000", high: "1850000" }
};

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const COMMON_HEAD_SCRIPTS = `
    <!-- Preconnect to Google Fonts for Core Web Vitals -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MV4WMJGG');</script>
    <!-- End Google Tag Manager -->

    <!-- Microsoft Clarity -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "ykat9pylsm");
    </script>
    <!-- End Microsoft Clarity -->

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Fludio Water Solutions" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

    <!-- Local SEO & Geo Targeting (Pune, Mumbai, Maharashtra, India) -->
    <meta name="geo.region" content="IN-MH" />
    <meta name="geo.placename" content="Pune, Mumbai, Maharashtra, India" />
    <meta name="geo.position" content="18.4485;73.8242" />
    <meta name="ICBM" content="18.4485, 73.8242" />

    <!-- Favicon & Icons -->
    <link rel="icon" type="image/webp" href="/images/Fludio-Logo-Color.webp" />
    <link rel="apple-touch-icon" href="/images/Fludio-Logo-Color.webp" />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9MLEYXELL7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9MLEYXELL7', { send_page_view: true });
    </script>
    <script type="module" crossorigin src="/assets/index-CuwLdb-4.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CCiPlLJO.css">
`;

const SHARED_ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.fludio.in/#organization",
  "name": "Fludio Water Solutions",
  "url": "https://www.fludio.in",
  "logo": "https://www.fludio.in/images/Fludio-Logo-Color.webp",
  "image": "https://www.fludio.in/images/Fludio-Logo-Color.webp",
  "email": "info@fludio.in",
  "telephone": "+918530753091",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sr.no 38/1, Shed No.6, Khedekar Industrial Estate, Narhe Dhayari Road",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411041",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/fludio",
    "https://www.instagram.com/fludio.in",
    "https://www.linkedin.com/company/fludio"
  ]
};

const SHARED_LOCAL_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.fludio.in/#localbusiness",
  "name": "Fludio Water Solutions",
  "url": "https://www.fludio.in",
  "image": "https://www.fludio.in/images/Fludio-Logo-Color.webp",
  "telephone": "+918530753091",
  "email": "info@fludio.in",
  "priceRange": "\u20B9\u20B9\u20B9",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "128",
    "bestRating": "5",
    "worstRating": "1"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sr.no 38/1, Shed No.6, Khedekar Industrial Estate, Narhe Dhayari Road",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411041",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.4485,
    "longitude": 73.8242
  },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "State", "name": "Maharashtra" },
    { "@type": "City", "name": "Pune" },
    { "@type": "City", "name": "Mumbai" },
    { "@type": "City", "name": "Bengaluru" },
    { "@type": "City", "name": "Delhi" }
  ]
};

function renderNav() {
  return `
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center">
            <a href="/" class="flex items-center gap-3">
              <img src="/images/Fludio-Logo-Color.webp" alt="Fludio Water Solutions" class="h-12 w-auto" width="180" height="48" fetchpriority="high" />
            </a>
          </div>
          <nav class="hidden md:flex space-x-6 text-sm font-medium text-slate-700">
            <a href="/water-fountain-products" class="hover:text-cyan-600 transition-colors">Products</a>
            <a href="/fountain-design-installation-services" class="hover:text-cyan-600 transition-colors">Services</a>
            <a href="/about-water-fountain-engineers" class="hover:text-cyan-600 transition-colors">About Us</a>
            <a href="/water-fountain-projects-portfolio" class="hover:text-cyan-600 transition-colors">Portfolio</a>
            <a href="/fountain-engineering-blog" class="hover:text-cyan-600 transition-colors">Engineering Blog</a>
            <a href="/water-fountain-faqs" class="hover:text-cyan-600 transition-colors">FAQs</a>
            <a href="/contact-water-fountain-experts" class="hover:text-cyan-600 transition-colors">Contact</a>
          </nav>
          <div class="flex items-center gap-4">
            <a href="tel:+918530753091" class="hidden lg:flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span class="text-cyan-600">📞</span> +91 85307 53091
            </a>
            <a href="https://wa.me/918530753091?text=Hi%20Fludio%20Water%20Solutions,%20I%20would%20like%20to%20request%20a%20technical%20quote." target="_blank" rel="noopener noreferrer" class="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all">
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="bg-slate-900 text-slate-300 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <img src="/images/Fludio-Logo-Color.webp" alt="Fludio Water Solutions Logo" class="h-10 w-auto mb-4 brightness-200" width="150" height="40" loading="lazy" />
          <p class="text-sm text-slate-400 leading-relaxed mb-4">
            India's leading fountain solutions company &amp; turnkey musical fountain manufacturer. Precision hydraulic engineering, IP68 304L underwater lights, and DMX 512 automation.
          </p>
          <p class="text-xs text-slate-500">ISO 9001 Compliant Standards &bull; Certified IP68 Immersion</p>
        </div>
        <div>
          <h4 class="text-white font-semibold text-base mb-4">Equipment &amp; Products</h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li><a href="/water-fountain-products/ip68-underwater-led-spotlight" class="hover:text-cyan-400">IP68 LED Spotlights</a></li>
            <li><a href="/water-fountain-products/donut-nozzle-submersible-ring-light" class="hover:text-cyan-400">Donut Ring Lights</a></li>
            <li><a href="/water-fountain-products/architectural-fountain-nozzles" class="hover:text-cyan-400">Fountain Nozzles</a></li>
            <li><a href="/water-fountain-products/interactive-digital-water-curtain" class="hover:text-cyan-400">Digital Water Curtains</a></li>
            <li><a href="/water-fountain-products/laminar-flow-jumping-jets" class="hover:text-cyan-400">Laminar Jumping Jets</a></li>
            <li><a href="/water-fountain-products/dmx512-musical-fountain-control-panel" class="hover:text-cyan-400">DMX 512 Control Panels</a></li>
            <li><a href="/water-fountain-products/floating-lake-aerator-series" class="hover:text-cyan-400">Floating Lake Aerators</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold text-base mb-4">Regional Engineering Hubs</h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li><a href="/fountain-manufacturer-pune" class="hover:text-cyan-400">Pune &amp; PCMC (Works)</a></li>
            <li><a href="/fountain-manufacturer-mumbai" class="hover:text-cyan-400">Mumbai, BKC &amp; Thane</a></li>
            <li><a href="/fountain-manufacturer-bengaluru" class="hover:text-cyan-400">Bengaluru Tech Parks</a></li>
            <li><a href="/fountain-manufacturer-delhi-ncr" class="hover:text-cyan-400">Delhi NCR &amp; Smart Cities</a></li>
            <li><a href="/fountain-manufacturer-hyderabad" class="hover:text-cyan-400">Hyderabad &amp; Telangana</a></li>
            <li><a href="/fountain-manufacturer-resorts-hotels" class="hover:text-cyan-400">Goa &amp; Luxury Resorts</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold text-base mb-4">Registered Office &amp; Works</h4>
          <p class="text-sm text-slate-400 leading-relaxed mb-3">
            Sr.no 38/1, Shed No.6, Khedekar Industrial Estate, Narhe Dhayari Road, Pune 411041, Maharashtra, India
          </p>
          <p class="text-sm text-slate-300 font-semibold mb-1">Direct Helpline:</p>
          <p class="text-cyan-400 font-bold mb-3"><a href="tel:+918530753091">+91 85307 53091</a></p>
          <p class="text-sm text-slate-300 font-semibold mb-1">Email Inquiries:</p>
          <p class="text-cyan-400"><a href="mailto:info@fludio.in">info@fludio.in</a></p>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; 2026 Fludio Water Solutions. All Rights Reserved.</p>
        <p>Serving Pune, Mumbai, Navi Mumbai, Thane, Bengaluru, Hyderabad, Delhi NCR, and PAN India.</p>
      </div>
    </footer>
  `;
}

function renderComparisonTable(productTitle) {
  return `
    <section class="mt-14 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div class="px-6 py-5 bg-gradient-to-r from-slate-900 to-cyan-950 text-white">
        <span class="text-cyan-400 text-xs font-bold uppercase tracking-wider">Engineering Comparison Matrix</span>
        <h2 class="text-xl sm:text-2xl font-bold mt-1">Fludio vs. Competitors &amp; Imported Systems</h2>
        <p class="text-slate-300 text-sm mt-1">Why commercial architects, municipal corporations, and luxury developers select Fludio ${escapeHtml(productTitle)}.</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-xs">
            <tr>
              <th class="px-6 py-4">Engineering Feature</th>
              <th class="px-6 py-4 bg-cyan-50 text-cyan-900 border-x border-cyan-200">Fludio Water Solutions</th>
              <th class="px-6 py-4">Cheap Chinese / Unbranded Imports</th>
              <th class="px-6 py-4">European Imports (e.g. Spain/Germany)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr class="hover:bg-slate-50">
              <td class="px-6 py-4 font-semibold text-slate-900">Material &amp; Metallurgy</td>
              <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                Precision CNC 304L / Marine 316L Stainless Steel. Zero rust in chlorinated or salt water.
              </td>
              <td class="px-6 py-4 text-slate-600">Die-cast aluminum or recycled 201/202 steel. Pitting &amp; corrosion within 6-12 months.</td>
              <td class="px-6 py-4 text-slate-600">High-grade stainless steel. Excellent quality.</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="px-6 py-4 font-semibold text-slate-900">Ingress Protection (IP Rating)</td>
              <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                Certified IP68 Submersible (Hermetic dual O-ring seal tested up to 10m continuous immersion).
              </td>
              <td class="px-6 py-4 text-slate-600">Nominal IP65/IP67. Internal lens condensation and driver burnout common.</td>
              <td class="px-6 py-4 text-slate-600">Certified IP68 immersion standards.</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="px-6 py-4 font-semibold text-slate-900">Automation &amp; Controls</td>
              <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                Standard DMX 512 / RDM with Siemens &amp; Schneider PLCs. Millisecond music synchronization.
              </td>
              <td class="px-6 py-4 text-slate-600">Basic analog relays or cheap unshielded DMX decoders prone to signal lag.</td>
              <td class="px-6 py-4 text-slate-600">Proprietary closed-source controllers requiring expensive recurring licenses.</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="px-6 py-4 font-semibold text-slate-900">Cost &amp; Tariffs</td>
              <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                Direct Indian Factory Pricing in INR with full GST input credit. Zero import customs.
              </td>
              <td class="px-6 py-4 text-slate-600">Low initial unit cost, but 3x higher lifecycle replacement and maintenance cost.</td>
              <td class="px-6 py-4 text-slate-600">40%+ Indian import customs duties, expensive international freight, and Euro currency markups.</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="px-6 py-4 font-semibold text-slate-900">Support &amp; Spares SLA</td>
              <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                24–48 hr on-site engineer dispatch across India. Direct spares stock in Pune factory.
              </td>
              <td class="px-6 py-4 text-slate-600">No local engineering support, replacement parts, or technical documentation.</td>
              <td class="px-6 py-4 text-slate-600">Overseas remote support only; 4–8 weeks wait for replacement components.</td>
            </tr>
            <tr class="hover:bg-slate-50">
              <td class="px-6 py-4 font-semibold text-slate-900">Design Customization &amp; CAD</td>
              <td class="px-6 py-4 bg-cyan-50/50 font-semibold text-cyan-950 border-x border-cyan-100">
                Full 3D fluid simulation, civil-hydraulic schematics, and custom manifold fabrication included.
              </td>
              <td class="px-6 py-4 text-slate-600">Fixed catalog models only; no engineering adaptation for site conditions.</td>
              <td class="px-6 py-4 text-slate-600">Customization available at premium European consulting rates.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// --------------------------------------------------------------------------
// 1. GENERATE PRODUCT PAGES WITH COMPETITOR COMPARISON
// --------------------------------------------------------------------------
products.forEach(p => {
  const slug = Fh[p.id] || p.id;
  const targetDir = path.join(__dirname, 'water-fountain-products', slug);
  ensureDirSync(targetDir);

  const canonicalUrl = `https://www.fludio.in/water-fountain-products/${slug}`;
  const pageTitle = `${p.title} | Fludio Fountain Solutions India`;
  const metaDesc = `${p.title} manufactured by Fludio Water Solutions India in 304L stainless steel. Certified IP68 submersible, DMX 512 compatible, turnkey supply and installation across India.`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fludio.in/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.fludio.in/water-fountain-products" },
      { "@type": "ListItem", "position": 3, "name": p.title, "item": canonicalUrl }
    ]
  };

  const prices = PRODUCT_PRICES[p.id] || { low: "5000", high: "100000" };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    "name": p.title,
    "image": `https://www.fludio.in${p.imageUrl}`,
    "description": p.description,
    "brand": { "@type": "Brand", "name": "Fludio" },
    "manufacturer": { "@id": "https://www.fludio.in/#organization" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": prices.low,
      "highPrice": prices.high,
      "offerCount": p.subproducts ? String(p.subproducts.length) : "1",
      "availability": "https://schema.org/InStock",
      "seller": { "@id": "https://www.fludio.in/#organization" }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "34",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = p.faqs && p.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": p.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const schemas = [SHARED_ORG_SCHEMA, SHARED_LOCAL_SCHEMA, breadcrumbsSchema, productSchema];
  if (faqSchema) schemas.push(faqSchema);

  let subproductsHtml = '';
  if (p.subproducts && p.subproducts.length > 0) {
    subproductsHtml = `
      <section class="mt-12 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div class="px-6 py-5 bg-slate-50 border-b border-slate-200">
          <h2 class="text-xl font-bold text-slate-900">Standard Models &amp; Configurations</h2>
          <p class="text-sm text-slate-600">Manufactured with precision 304L/316L stainless steel at our Pune works.</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-700">
            <thead class="bg-slate-100 text-slate-800 font-semibold uppercase text-xs">
              <tr>
                <th class="px-6 py-3">Model Code</th>
                <th class="px-6 py-3">Variant Name</th>
                <th class="px-6 py-3">Rating / Power</th>
                <th class="px-6 py-3">Key Technical Specs</th>
                <th class="px-6 py-3">Material Grade</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${p.subproducts.map(sp => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="px-6 py-4 font-mono font-bold text-cyan-700">${escapeHtml(sp.model)}</td>
                  <td class="px-6 py-4 font-semibold text-slate-900">${escapeHtml(sp.name)}</td>
                  <td class="px-6 py-4">${escapeHtml(sp.powerOrSize)}</td>
                  <td class="px-6 py-4 text-xs text-slate-600">${escapeHtml(sp.specs)}</td>
                  <td class="px-6 py-4 font-medium text-slate-800">${escapeHtml(sp.material)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  let specsHtml = '';
  if (p.specifications && Object.keys(p.specifications).length > 0) {
    specsHtml = `
      <section class="mt-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Technical Engineering Specifications</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${Object.entries(p.specifications).map(([k, v]) => `
            <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-start gap-4">
              <span class="font-semibold text-slate-800 text-sm">${escapeHtml(k)}:</span>
              <span class="text-slate-600 text-sm text-right font-medium">${escapeHtml(v)}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  const advantagesHtml = p.advantages ? `
    <div class="mt-10 p-6 bg-cyan-50 border border-cyan-200 rounded-xl">
      <h3 class="text-lg font-bold text-cyan-950 mb-4 flex items-center gap-2">
        <span>🛡️</span> Fludio Engineering Superiority
      </h3>
      <ul class="space-y-2.5 text-sm text-cyan-900">
        ${p.advantages.map(adv => `<li class="flex items-start gap-2"><span class="text-cyan-600 font-bold">✔</span><span>${escapeHtml(adv)}</span></li>`).join('')}
      </ul>
    </div>
  ` : '';

  const applicationsHtml = p.applications ? `
    <div class="mt-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
      <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span>📍</span> Recommended Architectural Applications
      </h3>
      <ul class="space-y-2 text-sm text-slate-700">
        ${p.applications.map(app => `<li class="flex items-start gap-2"><span class="text-cyan-600 font-bold">&bull;</span><span>${escapeHtml(app)}</span></li>`).join('')}
      </ul>
    </div>
  ` : '';

  const faqsHtml = p.faqs && p.faqs.length > 0 ? `
    <section class="mt-14">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Engineering Questions</h2>
      <div class="space-y-4">
        ${p.faqs.map(f => `
          <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h3 class="text-base font-bold text-slate-900 mb-2">${escapeHtml(f.question)}</h3>
            <p class="text-sm text-slate-600 leading-relaxed">${escapeHtml(f.answer)}</p>
          </div>
        `).join('')}
      </div>
    </section>
  ` : '';

  const fullHtml = `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(metaDesc)}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <meta property="og:type" content="product" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Fludio Water Solutions" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(metaDesc)}" />
    <meta property="og:image" content="https://www.fludio.in${p.imageUrl}" />
    <meta property="og:locale" content="en_IN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />
    <meta name="twitter:image" content="https://www.fludio.in${p.imageUrl}" />

    ${COMMON_HEAD_SCRIPTS}

    <script type="application/ld+json">
${JSON.stringify(schemas, null, 2)}
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MV4WMJGG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="root">
      ${renderNav()}

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="/" class="hover:text-cyan-600">Home</a>
          <span>/</span>
          <a href="/water-fountain-products" class="hover:text-cyan-600">Water Fountain Products</a>
          <span>/</span>
          <span class="text-slate-800 font-semibold">${escapeHtml(p.title)}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div class="space-y-6">
            <div class="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              ${escapeHtml(p.category)} &bull; Turnkey Manufacturing
            </div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              ${escapeHtml(p.title)}
            </h1>
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="text-amber-500 font-bold">★★★★★</span>
              <span class="font-semibold text-slate-800">5.0 / 5.0 Rating</span>
              <span class="text-slate-400">&bull;</span>
              <span>128 Verified Commercial Projects PAN India</span>
            </div>
            <p class="text-base text-slate-700 leading-relaxed">
              ${escapeHtml(p.description)}
            </p>
            ${p.aeoDefinition ? `
              <div class="p-4 bg-slate-100 border-l-4 border-cyan-600 rounded-r-lg text-sm text-slate-800 italic">
                <strong>Engineering Definition:</strong> ${escapeHtml(p.aeoDefinition)}
              </div>
            ` : ''}

            <div class="pt-4 flex flex-wrap gap-4">
              <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20am%20inquiring%20about%20${encodeURIComponent(p.title)}" target="_blank" rel="noopener noreferrer" class="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all flex items-center gap-2">
                <span>💬</span> Inquire via WhatsApp
              </a>
              <a href="tel:+918530753091" class="border border-slate-300 hover:border-cyan-600 hover:text-cyan-600 text-slate-700 font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2">
                <span>📞</span> +91 85307 53091
              </a>
            </div>
          </div>

          <div>
            <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
              <img src="${p.imageUrl}" alt="${escapeHtml(p.title)}" class="w-full h-auto object-cover max-h-[500px]" width="600" height="400" fetchpriority="high" />
            </div>
            ${advantagesHtml}
            ${applicationsHtml}
          </div>
        </div>

        ${subproductsHtml}
        ${specsHtml}
        ${renderComparisonTable(p.title)}
        ${faqsHtml}

        <!-- RFQ CTA Banner -->
        <section class="mt-16 bg-gradient-to-r from-cyan-900 to-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
          <div class="max-w-3xl">
            <h2 class="text-2xl sm:text-3xl font-extrabold mb-4">Request Complete CAD Drawings &amp; Quotation</h2>
            <p class="text-slate-300 mb-8 leading-relaxed">
              Speak directly with our chief hydraulic and automation engineers at the Narhe Dhayari manufacturing works. We provide custom CAD/civil schematics, hydraulic calculations, and Turnkey RFP proposals within 24 hours.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20need%20CAD%20drawings%20and%20pricing%20for%20${encodeURIComponent(p.title)}" target="_blank" rel="noopener noreferrer" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg shadow transition-all">
                Get Instant Quote on WhatsApp
              </a>
              <a href="mailto:info@fludio.in?subject=RFQ:%20${encodeURIComponent(p.title)}" class="border border-slate-600 hover:border-slate-400 text-white font-semibold px-6 py-3 rounded-lg transition-all">
                Email Engineering RFQ
              </a>
            </div>
          </div>
        </section>
      </main>

      ${renderFooter()}
    </div>
  </body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), fullHtml, 'utf8');
});

// --------------------------------------------------------------------------
// 2. GENERATE BLOG PAGES
// --------------------------------------------------------------------------
blogs.forEach(b => {
  const targetDir = path.join(__dirname, 'fountain-engineering-blog', b.id);
  ensureDirSync(targetDir);

  const canonicalUrl = `https://www.fludio.in/fountain-engineering-blog/${b.id}`;
  const pageTitle = `${b.title} | Fludio Engineering Technical Blog`;
  const metaDesc = `${b.description.slice(0, 150)} Read the comprehensive technical engineering guide by Fludio Water Solutions India.`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fludio.in/" },
      { "@type": "ListItem", "position": 2, "name": "Engineering Blog", "item": "https://www.fludio.in/fountain-engineering-blog" },
      { "@type": "ListItem", "position": 3, "name": b.title, "item": canonicalUrl }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl}#article`,
    "headline": b.title,
    "description": b.description,
    "image": `https://www.fludio.in${b.imageUrl}`,
    "author": { "@id": "https://www.fludio.in/#organization" },
    "publisher": { "@id": "https://www.fludio.in/#organization" },
    "datePublished": "2026-09-17",
    "dateModified": "2026-11-09",
    "mainEntityOfPage": canonicalUrl
  };

  const faqSchema = b.faqs && b.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": b.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  } : null;

  const schemas = [SHARED_ORG_SCHEMA, SHARED_LOCAL_SCHEMA, breadcrumbsSchema, articleSchema];
  if (faqSchema) schemas.push(faqSchema);

  const introHtml = b.intro ? `
    <div class="p-5 my-6 bg-slate-100 border-l-4 border-cyan-600 rounded-r-lg text-slate-800 text-sm leading-relaxed">
      <strong class="text-slate-900 block mb-1">Engineering Definition &amp; Core Takeaway:</strong>
      ${escapeHtml(b.intro)}
    </div>
  ` : '';

  const sectionsHtml = b.sections ? b.sections.map(s => `
    <section class="mt-8">
      <h2 class="text-2xl font-bold text-slate-900 mb-3">${escapeHtml(s.heading || s.title || '')}</h2>
      <p class="text-base text-slate-700 leading-relaxed mb-4">${escapeHtml(s.content)}</p>
      ${s.takeaway ? `
        <div class="p-4 bg-cyan-50 border-l-4 border-cyan-600 rounded-r-lg text-sm text-cyan-950 font-medium">
          <strong>Key Engineering Takeaway:</strong> ${escapeHtml(s.takeaway)}
        </div>
      ` : ''}
    </section>
  `).join('') : '';

  const tableHtml = b.tableData ? `
    <section class="mt-10 mb-8 overflow-x-auto">
      <h3 class="text-xl font-bold text-slate-900 mb-4">${escapeHtml(b.tableData.title || b.tableData.caption || 'Engineering Specification Matrix')}</h3>
      <table class="w-full text-left text-sm border-collapse border border-slate-200 bg-white rounded-lg shadow-sm">
        <thead class="bg-slate-100 text-slate-900 border-b border-slate-200">
          <tr>
            ${b.tableData.headers.map(h => `<th class="p-3.5 font-semibold border-r border-slate-200 last:border-0">${escapeHtml(h)}</th>`).join('')}
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${b.tableData.rows.map(row => `
            <tr class="hover:bg-slate-50 transition-colors">
              ${row.map(cell => `<td class="p-3.5 border-r border-slate-200 last:border-0 text-slate-700">${escapeHtml(cell)}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  ` : '';

  const commercialHtml = b.targetCommercialUrl ? `
    <div class="mt-8 p-5 bg-cyan-50 border border-cyan-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <span class="text-xs font-bold text-cyan-800 uppercase tracking-wider block">Commercial Engineering Reference</span>
        <a href="${b.targetCommercialUrl}" class="text-base font-bold text-cyan-950 hover:underline">
          ${escapeHtml(b.targetCommercialAnchor || b.title)} &rarr;
        </a>
      </div>
      <a href="${b.targetCommercialUrl}" class="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all whitespace-nowrap">
        Explore Hardware
      </a>
    </div>
  ` : '';

  const faqsHtml = b.faqs && b.faqs.length > 0 ? `
    <section class="mt-12 pt-8 border-t border-slate-200">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">Technical FAQs</h2>
      <div class="space-y-4">
        ${b.faqs.map(f => `
          <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h3 class="text-base font-bold text-slate-900 mb-2">${escapeHtml(f.question)}</h3>
            <p class="text-sm text-slate-600 leading-relaxed">${escapeHtml(f.answer)}</p>
          </div>
        `).join('')}
      </div>
    </section>
  ` : '';

  const fullHtml = `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(metaDesc)}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Fludio Water Solutions" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(metaDesc)}" />
    <meta property="og:image" content="https://www.fludio.in${b.imageUrl}" />
    <meta property="og:locale" content="en_IN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(metaDesc)}" />
    <meta name="twitter:image" content="https://www.fludio.in${b.imageUrl}" />

    ${COMMON_HEAD_SCRIPTS}

    <script type="application/ld+json">
${JSON.stringify(schemas, null, 2)}
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MV4WMJGG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="root">
      ${renderNav()}

      <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="/" class="hover:text-cyan-600">Home</a>
          <span>/</span>
          <a href="/fountain-engineering-blog" class="hover:text-cyan-600">Engineering Blog</a>
          <span>/</span>
          <span class="text-slate-800 font-semibold">${escapeHtml(b.title)}</span>
        </nav>

        <header class="mb-8">
          <span class="bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ${escapeHtml(b.category)} &bull; ${escapeHtml(b.readTime)}
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
            ${escapeHtml(b.title)}
          </h1>
          <p class="text-lg text-slate-700 mt-4 leading-relaxed">
            ${escapeHtml(b.description)}
          </p>
        </header>

        <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-8">
          <img src="${b.imageUrl}" alt="${escapeHtml(b.title)}" class="w-full h-auto object-cover max-h-[480px]" width="768" height="400" fetchpriority="high" />
        </div>

        <div class="prose prose-slate max-w-none">
          ${introHtml}
          ${sectionsHtml}
          ${tableHtml}
          ${commercialHtml}
          ${faqsHtml}
        </div>

        <div class="mt-16 p-8 bg-slate-900 rounded-2xl text-white">
          <h3 class="text-xl font-bold mb-2">Have a Fountain Project Requiring Expert Engineering?</h3>
          <p class="text-slate-400 text-sm mb-6">
            Consult with Fludio's hydraulic engineers for complete DMX 512 choreography, pump sizing, and certified 304L stainless steel hardware.
          </p>
          <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20read%20your%20article%20on%20${encodeURIComponent(b.title)}" target="_blank" rel="noopener noreferrer" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg inline-block shadow">
            Consult Our Engineering Team
          </a>
        </div>
      </article>

      ${renderFooter()}
    </div>
  </body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), fullHtml, 'utf8');
});

// --------------------------------------------------------------------------
// 3. GENERATE 6 REGIONAL ENGINEERING HUBS (BEATING SYMPHONY IN INDIA)
// --------------------------------------------------------------------------
const regionalHubs = [
  {
    path: 'fountain-manufacturer-pune',
    city: 'Pune & PCMC',
    title: 'Musical Fountain Manufacturer in Pune | Turnkey Fountain Solutions | Fludio',
    desc: 'Fludio Water Solutions is Pune premier musical fountain manufacturer based at Narhe Dhayari Industrial Estate. Turnkey DMX 512 fountains, IP68 lights & nozzles across Pune & PCMC.',
    h1: 'Premier Musical Fountain Manufacturer & Contractor in Pune',
    sub: 'Direct engineering works at Khedekar Industrial Estate, Narhe Dhayari Road, Pune. Factory visits, live hydraulic testing, and 24-hour on-site engineer dispatch across Pune, PCMC, Baner, Hinjawadi, and Kothrud.',
    highlights: [
      'Pune Factory Direct: Visit our live demo test tank and manufacturing facility at Narhe Dhayari.',
      'Fast Field Support: 2-hour technician dispatch across Hinjawadi, Kharadi, Baner, and Chakan industrial corridors.',
      'Certified SS304L Fabrication: Built to withstand treated industrial and municipal water without corrosion.',
      'Turnkey Delivery: Hydraulic civil schematics, filtration, DMX512 programming, and lifetime AMC support.'
    ],
    faqs: [
      { question: 'Where is Fludio manufacturing factory located in Pune?', answer: 'Our registered manufacturing facility is located at Sr.no 38/1, Shed No.6, Khedekar Industrial Estate, Narhe Dhayari Road, Pune 411041. Clients and architects are welcome to schedule factory tours and inspect live water nozzle and light demonstrations.' },
      { question: 'Do you execute residential bungalow and commercial IT park fountains in Pune?', answer: 'Yes. Fludio engineers fountains for private bungalows in Kothrud, Koregaon Park, and Prabhat Road, as well as large-scale musical fountains for IT parks in Hinjawadi and Kharadi.' }
    ]
  },
  {
    path: 'fountain-manufacturer-mumbai',
    city: 'Mumbai, Thane & Navi Mumbai',
    title: 'Musical Fountain Manufacturer in Mumbai & Thane | Commercial Solutions | Fludio',
    desc: 'Leading musical fountain manufacturer and contractor in Mumbai, BKC, Thane & Navi Mumbai. Marine-grade 316L underwater lights, dancing fountains, and digital water curtains.',
    h1: 'Turnkey Musical Fountain Engineering in Mumbai, BKC & Thane',
    sub: 'Delivering coastal-resilient architectural water features for BKC corporate headquarters, luxury residential high-rises in South Mumbai, and municipal lake revitalizations in Thane and Navi Mumbai.',
    highlights: [
      'Marine-Grade 316L Stainless Steel: Engineered specifically for high-salinity coastal Mumbai humidity to eliminate pitting and staining.',
      'Expressway Dispatch: Seamless 3-hour mobilization from our Pune manufacturing facility to any Mumbai site via the Mumbai-Pune Expressway.',
      'Wind-Deflection Baffles: Specialized hydraulic nozzle configurations for high-altitude rooftop terraces and coastal seaside breezes.',
      'DMX 512 Indoor Water Walls: Silent, zero-splash indoor sheetfalls and digital water curtains for corporate lobbies in BKC and Lower Parel.'
    ],
    faqs: [
      { question: 'How do you prevent salt-air corrosion in Mumbai coastal fountains?', answer: 'For installations in Mumbai, Navi Mumbai, and Thane, Fludio utilizes marine-grade 316L stainless steel (containing 2-3% molybdenum) and specialized passivation treatments that guarantee lifetime protection against coastal atmospheric salinity.' },
      { question: 'Can Fludio handle high-rise rooftop water fountain installations in Mumbai?', answer: 'Yes. We engineer ultra-low weight stainless steel water manifolds, vibration-dampened submersible pumps, and acoustic baffles designed specifically for penthouses and luxury rooftop amenity decks.' }
    ]
  },
  {
    path: 'fountain-manufacturer-bengaluru',
    city: 'Bengaluru',
    title: 'Water Fountain Manufacturer & Contractor in Bengaluru | Fludio India',
    desc: 'Turnkey commercial fountain engineering in Bengaluru. Interactive dry deck fountains, corporate reflection pools, and DMX musical water shows across Electronic City and Whitefield.',
    h1: 'Commercial Water Fountain Engineering in Bengaluru',
    sub: 'Partnering with leading tech parks, corporate campuses, and luxury developers across Electronic City, Whitefield, Outer Ring Road, and North Bengaluru.',
    highlights: [
      'Water Conservation & Zero Waste: Advanced multi-stage sand, carbon, and cartridge filtration with 98%+ closed-loop water recirculation.',
      'Interactive Dry Deck Plazas: Flush-to-ground pedestrian interactive fountains with heel-safe SS304L grates for software tech parks.',
      'Smart Automation: Cloud-connected IoT fountain control panels compatible with Building Management Systems (BMS).',
      'LEED Green Building Compliance: Low-wattage 24V LED lighting and high-efficiency IE4 pumps to maximize building sustainability credits.'
    ],
    faqs: [
      { question: 'Do Fludio fountains integrate with Building Management Systems (BMS) in Bengaluru tech parks?', answer: 'Yes. Our DMX 512 and PLC control panels support Modbus, BACnet, and dry contact relays for seamless two-way integration with centralized corporate Building Management Systems.' },
      { question: 'What is the lead time for equipment delivery to Bengaluru?', answer: 'Standard catalog items like IP68 lights, nozzles, and dry deck solenoids are dispatched within 24 to 48 hours from our Pune works directly to Bengaluru sites.' }
    ]
  },
  {
    path: 'fountain-manufacturer-delhi-ncr',
    city: 'Delhi NCR, Gurgaon & Noida',
    title: 'Fountain Manufacturer & Contractor in Delhi NCR, Gurgaon & Noida | Fludio',
    desc: 'Turnkey musical fountain manufacturer serving Delhi NCR, Gurugram, Noida, and Faridabad. Municipal landmark fountains, smart city plazas, and lake aeration systems.',
    h1: 'Turnkey Musical Fountain Engineering in Delhi NCR',
    sub: 'Executing monumental municipal fountains, public square dry decks, and luxury farmhouse water features across New Delhi, Gurugram, Noida, and Greater Noida.',
    highlights: [
      'Hard Water Scale Resistance: Anti-scaling electromagnetic descalers and easy-access nozzle cleaning unions tailored for Northern Indian groundwater.',
      'Thermal Freeze Protection: Automated freeze-prevention cycles and low-temperature neoprene submersible cables rated to -10°C.',
      'Municipal & CPWD Standards: Complete compliance with Central Public Works Department electrical and hydraulic safety codes.',
      'Mega Show Choreography: Capable of synchronizing 100+ water jets with multi-color laser projections and spatial audio systems.'
    ],
    faqs: [
      { question: 'Do Fludio water fountains comply with CPWD and smart city tender standards?', answer: 'Yes. All Fludio hydraulic manifolds, IP68 underwater luminaires, and DMX control panels meet and exceed CPWD specifications, featuring certified 304L steel, SELV extra-low voltage, and 30mA RCD protection.' },
      { question: 'How do Fludio fountains handle high mineral content / hard water in Delhi NCR?', answer: 'We incorporate automated anti-scaling filtration and provide specialized ultrasonic descaling systems that prevent calcium carbonate buildup on precision nozzle orifices and LED glass lenses.' }
    ]
  },
  {
    path: 'fountain-manufacturer-hyderabad',
    city: 'Hyderabad & Telangana',
    title: 'Musical Fountain Manufacturer in Hyderabad | Commercial Water Features | Fludio',
    desc: 'Leading musical fountain manufacturer and contractor in Hyderabad. Gated community water features, HITEC City plaza fountains, and large lake aerators.',
    h1: 'Turnkey Architectural Fountain Solutions in Hyderabad',
    sub: 'Designing iconic water features for premium gated villa communities, HITEC City commercial towers, Financial District plazas, and public lake aerations in Hyderabad.',
    highlights: [
      'Gated Community Specialists: Tranquil cascading sheetfalls and low-maintenance entry fountains for residential township projects.',
      '2D Robotic Dancing Nozzles: 360-degree motorized jets dancing in sub-millisecond precision with classical and contemporary music.',
      'Ecological Lake Aeration: High-volume 5 HP to 15 HP floating fountains to maintain dissolved oxygen levels and eliminate lake algae.',
      'Complete On-Site Commissioning: Dedicated Fludio field engineers handle installation, piping pressure tests, and sound programming on-site.'
    ],
    faqs: [
      { question: 'Can Fludio assist with lake restoration and aeration in Hyderabad townships?', answer: 'Yes. Our floating lake aerators circulate up to 3,000,000 liters of water per day, increasing dissolved oxygen to 6+ ppm, suppressing anaerobic odor, and clarifying residential township lakes.' },
      { question: 'Do you offer Annual Maintenance Contracts (AMC) in Hyderabad?', answer: 'Yes, Fludio provides full-year comprehensive AMCs including quarterly preventive pump inspections, lighting photometric tests, water chemistry checks, and DMX show reprogramming.' }
    ]
  },
  {
    path: 'fountain-manufacturer-resorts-hotels',
    city: 'Goa & Luxury Resorts',
    title: 'Luxury Hotel & Resort Fountain Solutions India | Goa, Jaipur, Udaipur | Fludio',
    desc: 'Turnkey luxury fountain design and engineering for destination hotels and resorts in Goa, Udaipur, Jaipur, and Kerala. Acoustic water walls, arrival lagoons & reflection pools.',
    h1: 'Turnkey Water Feature Engineering for Luxury Hotels & Resorts',
    sub: 'Crafting unforgettable guest arrival experiences, acoustic waterfall walls, and nocturnal illuminated water features for 5-star hotels and heritage palaces across Goa, Rajasthan, and Kerala.',
    highlights: [
      'Acoustic Decibel Tuning: Precision-engineered weir edges deliver soothing, low-decibel ambient water sounds that enhance guest relaxation.',
      'Zero-Splash Spillover Technology: Safe for high-traffic hotel lobbies, poolside decks, and fine dining alfresco patios.',
      'Heritage & Palace Aesthetics: Seamless integration of classic stone craftsmanship with concealed cutting-edge DMX 512 automation.',
      'Low-Maintenance Operation: Automated water-level sensing and multi-cyclone sediment filtration minimize daily hotel engineering upkeep.'
    ],
    faqs: [
      { question: 'How do you ensure quiet fountain operation near luxury resort guest suites?', answer: 'We calculate water impact velocity and use custom curved sheetfall weir geometries with submerged acoustic absorption baffles, keeping sound levels below 45 dB for tranquil nocturnal guest comfort.' },
      { question: 'Do you execute projects in remote resort locations in Rajasthan or Goa?', answer: 'Yes. Fludio delivers turnkey pre-fabricated skid-mounted pump and control modules that simplify on-site civil connections and reduce remote installation timelines by over 50%.' }
    ]
  }
];

regionalHubs.forEach(hub => {
  const targetDir = path.join(__dirname, hub.path);
  ensureDirSync(targetDir);

  const canonicalUrl = `https://www.fludio.in/${hub.path}`;
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fludio.in/" },
      { "@type": "ListItem", "position": 2, "name": "Regional Engineering Hubs", "item": "https://www.fludio.in/fountain-design-installation-services" },
      { "@type": "ListItem", "position": 3, "name": hub.h1, "item": canonicalUrl }
    ]
  };

  const localHubSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    "name": hub.h1,
    "serviceType": "Musical Fountain Manufacturing & Installation",
    "provider": { "@id": "https://www.fludio.in/#organization" },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": hub.city
    },
    "description": hub.desc,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": hub.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };

  const schemas = [SHARED_ORG_SCHEMA, SHARED_LOCAL_SCHEMA, breadcrumbsSchema, localHubSchema, faqSchema];

  const fullHtml = `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <title>${escapeHtml(hub.title)}</title>
    <meta name="description" content="${escapeHtml(hub.desc)}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Fludio Water Solutions" />
    <meta property="og:title" content="${escapeHtml(hub.title)}" />
    <meta property="og:description" content="${escapeHtml(hub.desc)}" />
    <meta property="og:image" content="https://www.fludio.in/images/Fludio-Logo-Color.webp" />
    <meta property="og:locale" content="en_IN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(hub.title)}" />
    <meta name="twitter:description" content="${escapeHtml(hub.desc)}" />
    <meta name="twitter:image" content="https://www.fludio.in/images/Fludio-Logo-Color.webp" />

    ${COMMON_HEAD_SCRIPTS}

    <script type="application/ld+json">
${JSON.stringify(schemas, null, 2)}
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MV4WMJGG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="root">
      ${renderNav()}

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="/" class="hover:text-cyan-600">Home</a>
          <span>/</span>
          <a href="/fountain-design-installation-services" class="hover:text-cyan-600">Services</a>
          <span>/</span>
          <span class="text-slate-800 font-semibold">${escapeHtml(hub.city)} Hub</span>
        </nav>

        <header class="max-w-3xl mb-12">
          <span class="bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Regional Engineering Hub &bull; ${escapeHtml(hub.city)}
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
            ${escapeHtml(hub.h1)}
          </h1>
          <p class="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed">
            ${escapeHtml(hub.sub)}
          </p>
          <div class="mt-6 flex flex-wrap gap-4">
            <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20am%20inquiring%20about%20fountain%20engineering%20in%20${encodeURIComponent(hub.city)}" target="_blank" rel="noopener noreferrer" class="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all flex items-center gap-2">
              <span>💬</span> WhatsApp Engineering Team
            </a>
            <a href="tel:+918530753091" class="border border-slate-300 hover:border-cyan-600 hover:text-cyan-600 text-slate-700 font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2">
              <span>📞</span> +91 85307 53091
            </a>
          </div>
        </header>

        <!-- Regional Highlights Grid -->
        <section class="mt-8 mb-14">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Regional Engineering &amp; Contracting Advantages</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${hub.highlights.map(hl => `
              <div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex items-start gap-4">
                <span class="text-cyan-600 text-xl font-bold mt-0.5">✔</span>
                <p class="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">${escapeHtml(hl)}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Product Solutions Grid -->
        <section class="mt-12 mb-16">
          <h2 class="text-2xl font-bold text-slate-900 mb-3">Certified Hardware &amp; Fountain Systems Available</h2>
          <p class="text-sm text-slate-600 mb-8">Manufactured at our Pune works with direct logistics to ${escapeHtml(hub.city)} sites.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${products.slice(0, 6).map(p => {
              const s = Fh[p.id] || p.id;
              return `
                <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img src="${p.imageUrl}" alt="${escapeHtml(p.title)}" class="w-full h-44 object-cover" width="400" height="176" loading="lazy" />
                  <div class="p-5">
                    <span class="text-xs font-bold text-cyan-600 uppercase">${escapeHtml(p.category)}</span>
                    <h3 class="text-base font-bold text-slate-900 mt-1 mb-2">
                      <a href="/water-fountain-products/${s}" class="hover:text-cyan-600">${escapeHtml(p.title)}</a>
                    </h3>
                    <p class="text-xs text-slate-600 line-clamp-2 mb-3">${escapeHtml(p.description)}</p>
                    <a href="/water-fountain-products/${s}" class="text-xs font-semibold text-cyan-600 hover:text-cyan-700">View Technical Specs &rarr;</a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        ${renderComparisonTable(hub.city + ' Commercial Fountains')}

        <!-- Regional FAQs -->
        <section class="mt-14 mb-16">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions: ${escapeHtml(hub.city)} Projects</h2>
          <div class="space-y-4">
            ${hub.faqs.map(f => `
              <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-2">${escapeHtml(f.question)}</h3>
                <p class="text-sm text-slate-600 leading-relaxed">${escapeHtml(f.answer)}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- CTA Box -->
        <section class="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h2 class="text-2xl sm:text-3xl font-extrabold mb-3">Schedule an Engineering Consultation for ${escapeHtml(hub.city)}</h2>
          <p class="text-slate-400 text-sm max-w-xl mx-auto mb-6">
            We provide free initial hydraulic feasibility reviews, preliminary civil drawings, and budget BOQs for architects and developers.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="tel:+918530753091" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg shadow">
              Direct Phone: +91 85307 53091
            </a>
            <a href="mailto:info@fludio.in?subject=Project%20Inquiry%20-%20${encodeURIComponent(hub.city)}" class="border border-slate-700 hover:border-slate-500 text-white font-semibold px-6 py-3 rounded-lg">
              Email Tender Documents
            </a>
          </div>
        </section>
      </main>

      ${renderFooter()}
    </div>
  </body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), fullHtml, 'utf8');
  console.log(`Generated Regional Hub: /${hub.path}/index.html`);
});

// --------------------------------------------------------------------------
// 4. GENERATE CORE HUB PAGES
// --------------------------------------------------------------------------
const coreHubs = [
  {
    path: 'water-fountain-products',
    title: 'Water Fountain Products & Equipment Catalog | Fludio India',
    desc: 'Browse Fludio Water Solutions commercial fountain products: IP68 304L underwater lights, fountain nozzles, DMX 512 control panels, digital water curtains, and floating lake aerators.',
    h1: 'Commercial Water Fountain Equipment & Hydraulic Hardware',
    sub: 'Certified IP68 submersible lighting, CNC machined 304L stainless steel nozzles, and millisecond DMX 512 PLC automation manufactured in Pune for PAN-India deployment.'
  },
  {
    path: 'fountain-design-installation-services',
    title: 'Fountain Design, Engineering & Turnkey Installation Services | Fludio',
    desc: 'Turnkey musical fountain design, civil-hydraulic engineering, 3D fluid simulation, PLC automation, and nationwide installation services by Fludio Water Solutions.',
    h1: 'Turnkey Fountain Engineering & Installation Services',
    sub: 'From preliminary architectural concept and hydraulic schematics to on-site commissioning and lifetime AMC maintenance across India.'
  },
  {
    path: 'about-water-fountain-engineers',
    title: 'About Fludio Water Solutions | Leading Fountain Engineers in India',
    desc: 'Learn about Fludio Water Solutions, India premier fountain manufacturer and hydraulic engineering company based in Pune, Maharashtra.',
    h1: 'Engineering Water into Synchronized Living Art',
    sub: 'Headquartered at Narhe Dhayari Industrial Estate, Pune, Fludio combines precision 304L metallurgy, industrial automation, and acoustic choreography.'
  },
  {
    path: 'water-fountain-projects-portfolio',
    title: 'Water Fountain Projects & Installations Portfolio | Fludio India',
    desc: 'Explore completed musical dancing fountains, dry deck plazas, digital water curtains, and resort water features executed by Fludio across India.',
    h1: 'Featured Commercial & Municipal Installations',
    sub: 'Delivering turnkey architectural and musical fountain landmarks for smart cities, commercial tech parks, luxury resorts, and civic plazas.'
  },
  {
    path: 'fountain-engineering-blog',
    title: 'Fountain Engineering Technical Blog & Knowledge Base | Fludio',
    desc: 'Technical publications on DMX 512 musical fountain choreography, dry deck civil hydraulics, IP68 standards, and lake ecological aeration.',
    h1: 'Fountain Engineering Technical Publications',
    sub: 'In-depth engineering whitepapers, hydraulic design guides, and automation standards authored by Fludio engineering specialists.'
  },
  {
    path: 'water-fountain-faqs',
    title: 'Water Fountain FAQs & Technical Knowledge Base | Fludio',
    desc: 'Frequently asked questions regarding commercial musical fountain costs, maintenance, DMX 512 protocol, water treatment, and turnkey contracts in India.',
    h1: 'Frequently Asked Questions & Technical Advisory',
    sub: 'Clear, transparent answers to design, cost, power, and maintenance questions for architects, municipal bodies, and developers.'
  },
  {
    path: 'client-reviews-testimonials',
    title: 'Client Reviews, Testimonials & Project Endorsements | Fludio',
    desc: 'Read verified client testimonials and project endorsements from commercial developers, architects, and municipal corporations partnering with Fludio.',
    h1: 'Client Endorsements & Proven Track Record',
    sub: 'Rated 5.0 out of 5 across 128 commercial and public fountain installations nationwide.'
  },
  {
    path: 'contact-water-fountain-experts',
    title: 'Contact Fountain Engineers & RFP Submissions | Fludio Pune',
    desc: 'Get in touch with Fludio Water Solutions. Phone: +91 85307 53091 | Email: info@fludio.in | Works: Narhe Dhayari Industrial Estate, Pune, Maharashtra.',
    h1: 'Connect with Our Fountain Engineering Team',
    sub: 'Submit architectural drawings, request turnkey tenders, or schedule an on-site consultation anywhere in India.'
  }
];

coreHubs.forEach(hub => {
  const targetDir = path.join(__dirname, hub.path);
  ensureDirSync(targetDir);

  const canonicalUrl = `https://www.fludio.in/${hub.path}`;
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fludio.in/" },
      { "@type": "ListItem", "position": 2, "name": hub.h1, "item": canonicalUrl }
    ]
  };

  const schemas = [SHARED_ORG_SCHEMA, SHARED_LOCAL_SCHEMA, breadcrumbsSchema];

  const fullHtml = `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <title>${escapeHtml(hub.title)}</title>
    <meta name="description" content="${escapeHtml(hub.desc)}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Fludio Water Solutions" />
    <meta property="og:title" content="${escapeHtml(hub.title)}" />
    <meta property="og:description" content="${escapeHtml(hub.desc)}" />
    <meta property="og:image" content="https://www.fludio.in/images/Fludio-Logo-Color.webp" />
    <meta property="og:locale" content="en_IN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(hub.title)}" />
    <meta name="twitter:description" content="${escapeHtml(hub.desc)}" />
    <meta name="twitter:image" content="https://www.fludio.in/images/Fludio-Logo-Color.webp" />

    ${COMMON_HEAD_SCRIPTS}

    <script type="application/ld+json">
${JSON.stringify(schemas, null, 2)}
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MV4WMJGG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="root">
      ${renderNav()}

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header class="text-center max-w-3xl mx-auto mb-16">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">${escapeHtml(hub.h1)}</h1>
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">${escapeHtml(hub.sub)}</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          ${hub.path === 'fountain-engineering-blog' ? blogs.map(b => `
            <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <img src="${b.imageUrl}" alt="${escapeHtml(b.title)}" class="w-full h-48 object-cover" width="400" height="192" loading="lazy" />
                <div class="p-6">
                  <div class="flex items-center justify-between text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">
                    <span>${escapeHtml(b.category)}</span>
                    <span class="text-slate-400 font-normal">${escapeHtml(b.readTime)}</span>
                  </div>
                  <h3 class="text-lg font-bold text-slate-900 mb-2">
                    <a href="/fountain-engineering-blog/${b.id}" class="hover:text-cyan-600 transition-colors">${escapeHtml(b.title)}</a>
                  </h3>
                  <p class="text-sm text-slate-600 line-clamp-3 mb-4">${escapeHtml(b.description)}</p>
                </div>
              </div>
              <div class="px-6 pb-6 pt-0">
                <a href="/fountain-engineering-blog/${b.id}" class="text-sm font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                  Read Technical Guide &rarr;
                </a>
              </div>
            </div>
          `).join('') : products.map(p => {
            const s = Fh[p.id] || p.id;
            return `
              <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="${p.imageUrl}" alt="${escapeHtml(p.title)}" class="w-full h-48 object-cover" width="400" height="192" loading="lazy" />
                <div class="p-6">
                  <span class="text-xs font-bold text-cyan-600 uppercase tracking-wider">${escapeHtml(p.category)}</span>
                  <h3 class="text-lg font-bold text-slate-900 mt-2 mb-2">
                    <a href="/water-fountain-products/${s}" class="hover:text-cyan-600 transition-colors">${escapeHtml(p.title)}</a>
                  </h3>
                  <p class="text-sm text-slate-600 line-clamp-2 mb-4">${escapeHtml(p.description)}</p>
                  <a href="/water-fountain-products/${s}" class="text-sm font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                    Explore Specifications &rarr;
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-extrabold mb-3">Consult Fludio Technical Engineering Works</h2>
          <p class="text-slate-400 text-sm max-w-xl mx-auto mb-6">
            Direct dispatch from Narhe Dhayari Industrial Estate, Pune with complete on-site civil and electrical installation support across India.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="tel:+918530753091" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg shadow">
              Call +91 85307 53091
            </a>
            <a href="https://wa.me/918530753091?text=Hi%20Fludio,%20I%20would%20like%20to%20consult%20on%20a%20fountain%20project." target="_blank" rel="noopener noreferrer" class="border border-slate-700 hover:border-slate-500 text-white font-semibold px-6 py-3 rounded-lg">
              WhatsApp Engineering Team
            </a>
          </div>
        </div>
      </main>

      ${renderFooter()}
    </div>
  </body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), fullHtml, 'utf8');
});

// --------------------------------------------------------------------------
// 5. OVERHAUL XML SITEMAP INCLUDING REGIONAL HUBS & IMAGES
// --------------------------------------------------------------------------
const today = '2026-11-09';
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Primary Landing Page -->
  <url>
    <loc>https://www.fludio.in/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
    <image:image>
      <image:loc>https://www.fludio.in/images/Fludio-Logo-Color.webp</image:loc>
      <image:title>Fludio Water Solutions Logo</image:title>
      <image:caption>Premier Musical Fountain Manufacturer and Fountain Solutions PAN India</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://www.fludio.in/images/musical_fountain_hero.jpg</image:loc>
      <image:title>Turnkey Musical Fountain Engineering</image:title>
      <image:caption>Automated Musical Fountain Show with DMX 512 Lighting and Audio Sync</image:caption>
    </image:image>
  </url>

  <!-- Core Hub Pages -->
  <url>
    <loc>https://www.fludio.in/water-fountain-products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://www.fludio.in/fountain-design-installation-services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://www.fludio.in/about-water-fountain-engineers</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://www.fludio.in/water-fountain-projects-portfolio</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://www.fludio.in/fountain-engineering-blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://www.fludio.in/water-fountain-faqs</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.fludio.in/client-reviews-testimonials</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.fludio.in/contact-water-fountain-experts</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
`;

// Regional Hubs
regionalHubs.forEach(hub => {
  sitemapXml += `
  <url>
    <loc>https://www.fludio.in/${hub.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.92</priority>
    <image:image>
      <image:loc>https://www.fludio.in/images/Fludio-Logo-Color.webp</image:loc>
      <image:title>${escapeHtml(hub.h1)}</image:title>
      <image:caption>${escapeHtml(hub.desc)}</image:caption>
    </image:image>
  </url>`;
});

// Products with images
products.forEach(p => {
  const slug = Fh[p.id] || p.id;
  sitemapXml += `
  <url>
    <loc>https://www.fludio.in/water-fountain-products/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
    <image:image>
      <image:loc>https://www.fludio.in${p.imageUrl}</image:loc>
      <image:title>${escapeHtml(p.title)}</image:title>
      <image:caption>${escapeHtml(p.description.slice(0, 150))}</image:caption>
    </image:image>
  </url>`;
});

// Blogs with images
blogs.forEach(b => {
  sitemapXml += `
  <url>
    <loc>https://www.fludio.in/fountain-engineering-blog/${b.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>https://www.fludio.in${b.imageUrl}</image:loc>
      <image:title>${escapeHtml(b.title)}</image:title>
      <image:caption>${escapeHtml(b.description.slice(0, 150))}</image:caption>
    </image:image>
  </url>`;
});

sitemapXml += `\n</urlset>\n`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('=== All static pages, regional hubs, comparison tables, and sitemaps generated successfully! ===');
