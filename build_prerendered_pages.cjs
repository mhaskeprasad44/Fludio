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

// Realistic INR price ranges for commercial fountain hardware
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
              <img src="/images/Fludio-Logo-Color.webp" alt="Fludio Water Solutions" class="h-12 w-auto" />
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
          <img src="/images/Fludio-Logo-Color.webp" alt="Fludio Water Solutions Logo" class="h-10 w-auto mb-4 brightness-200" />
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
          <h4 class="text-white font-semibold text-base mb-4">Turnkey Services</h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li><a href="/fountain-design-installation-services" class="hover:text-cyan-400">Turnkey Fountain Projects</a></li>
            <li><a href="/fountain-design-installation-services" class="hover:text-cyan-400">DMX 512 Programming &amp; Audio Sync</a></li>
            <li><a href="/fountain-design-installation-services" class="hover:text-cyan-400">Annual Maintenance &amp; Repair (AMC)</a></li>
            <li><a href="/water-fountain-projects-portfolio" class="hover:text-cyan-400">Project Case Studies</a></li>
            <li><a href="/fountain-engineering-blog" class="hover:text-cyan-400">Fountain Engineering Blog</a></li>
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

// --------------------------------------------------------------------------
// 1. GENERATE PRODUCT PAGES
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

  // Subproducts Table HTML
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

  // Specifications Grid HTML
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

    <!-- Open Graph / Social Sharing -->
    <meta property="og:type" content="product" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Fludio Water Solutions" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(metaDesc)}" />
    <meta property="og:image" content="https://www.fludio.in${p.imageUrl}" />
    <meta property="og:locale" content="en_IN" />

    <!-- Twitter Card -->
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
        <!-- Breadcrumb navigation -->
        <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="/" class="hover:text-cyan-600">Home</a>
          <span>/</span>
          <a href="/water-fountain-products" class="hover:text-cyan-600">Water Fountain Products</a>
          <span>/</span>
          <span class="text-slate-800 font-semibold">${escapeHtml(p.title)}</span>
        </nav>

        <!-- Product Hero Block -->
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
              <img src="${p.imageUrl}" alt="${escapeHtml(p.title)}" class="w-full h-auto object-cover max-h-[500px]" />
            </div>
            ${advantagesHtml}
            ${applicationsHtml}
          </div>
        </div>

        ${subproductsHtml}
        ${specsHtml}
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

  const sectionsHtml = b.sections ? b.sections.map(s => `
    <section class="mt-8">
      <h2 class="text-2xl font-bold text-slate-900 mb-3">${escapeHtml(s.heading)}</h2>
      <p class="text-base text-slate-700 leading-relaxed mb-4">${escapeHtml(s.content)}</p>
      ${s.takeaway ? `
        <div class="p-4 bg-cyan-50 border-l-4 border-cyan-600 rounded-r-lg text-sm text-cyan-950 font-medium">
          <strong>Key Engineering Takeaway:</strong> ${escapeHtml(s.takeaway)}
        </div>
      ` : ''}
    </section>
  `).join('') : '';

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
          <img src="${b.imageUrl}" alt="${escapeHtml(b.title)}" class="w-full h-auto object-cover max-h-[480px]" />
        </div>

        <div class="prose prose-slate max-w-none">
          ${sectionsHtml}
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
// 3. GENERATE CORE HUB PAGES
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

        <!-- Quick Links Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          ${products.map(p => {
            const s = Fh[p.id] || p.id;
            return `
              <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="${p.imageUrl}" alt="${escapeHtml(p.title)}" class="w-full h-48 object-cover" />
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

        <!-- Direct Contact Banner -->
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
// 4. OVERHAUL XML SITEMAP WITH IMAGE EXTENSIONS
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

// Add products with images to sitemap
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

// Add blogs with images to sitemap
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
console.log('Overhauled sitemap.xml with image metadata!');
console.log('=== All static pages and sitemap generated successfully! ===');
