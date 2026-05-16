/* ─────────────────────────────────────────────────────────────
   Nutryio Shared Header / Footer Component
   Include on any page via:
     <header class="header" id="site-header"></header>
     <footer class="footer"  id="site-footer"></footer>
     <script src="/shared/template.js" defer></script>

   Optionally call:
     initTemplate({ title: 'Page Title' })
   to set the <title> tag and track recently-viewed calculators.
──────────────────────────────────────────────────────────── */

const _HEADER_HTML = `
  <div class="container header-inner">
    <a href="/" class="logo">Nutryio</a>
    <nav class="desktop-nav">
      <a href="/">Home</a>
      <a href="/#categories" class="nav-scroll-btn">Calculators</a>
      <a href="/blog/">Blog</a>
      <a href="/recipes/">Recipes</a>
      <a href="/about/">About</a>
    </nav>
    <button id="menu-btn" class="menu-btn" aria-label="Toggle menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" x2="20" y1="12" y2="12"/>
        <line x1="4" x2="20" y1="6"  y2="6"/>
        <line x1="4" x2="20" y1="18" y2="18"/>
      </svg>
    </button>
  </div>
  <div id="mobile-nav" class="mobile-nav hidden">
    <nav class="mobile-nav-inner">
      <a href="/">Home</a>
      <a href="/#categories" class="mobile-nav-scroll-btn">Calculators</a>
      <a href="/blog/">Blog</a>
      <a href="/recipes/">Recipes</a>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
    </nav>
  </div>
`;

const _FOOTER_HTML = `
  <div class="container">
    <div class="footer-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:3rem;margin-bottom:3rem;">
      <div class="footer-brand">
        <a href="/" class="logo text-white" style="color:white;">Nutryio</a>
        <p class="footer-tagline" style="margin-top:1rem;font-size:0.875rem;color:#94a3b8;line-height:1.6;max-width:300px;">
          Your precision health calculator hub. Empowering your health journey with precision and simplicity.
        </p>
      </div>
      <div class="footer-links">
        <h3 style="font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:1.25rem;">Quick Links</h3>
        <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.75rem;">
          <li><a href="/"           style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Home</a></li>
          <li><a href="/#categories" style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">All Calculators</a></li>
          <li><a href="/blog/"      style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Blog</a></li>
          <li><a href="/recipes/"    style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Recipes</a></li>
          <li><a href="/about/"     style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">About Us</a></li>
          <li><a href="/contact/"   style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Contact</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h3 style="font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:1.25rem;">Top Categories</h3>
        <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.75rem;">
          <li><a href="/#body-metrics"      style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Body Metrics</a></li>
          <li><a href="/#calories-energy"   style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Calories &amp; Energy</a></li>
          <li><a href="/#nutrition-macros"  style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Nutrition &amp; Macros</a></li>
          <li><a href="/#strength-lifting"  style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Strength &amp; Lifting</a></li>
          <li><a href="/#cooking-kitchen"   style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Cooking &amp; Kitchen</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h3 style="font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:1.25rem;">Legal &amp; Info</h3>
        <p style="font-size:0.875rem;color:#94a3b8;line-height:1.6;margin-bottom:1rem;">
          We build precise, easy-to-use calculators to help you reach your health and fitness goals. No paywalls, no nonsense.
        </p>
        <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.75rem;">
          <li><a href="/privacy-policy/" style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Privacy Policy</a></li>
          <li><a href="/terms-of-use/"   style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Terms of Use</a></li>
          <li><a href="/contact/"        style="font-size:0.875rem;color:#94a3b8;text-decoration:none;">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:1rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.1);font-size:0.75rem;color:#94a3b8;">
      <p>© 2026 Nutryio. All rights reserved.
        <a href="/privacy-policy/" style="color:#64748b;text-decoration:none;margin-left:1rem;">Privacy Policy</a>
        · <a href="/terms-of-use/" style="color:#64748b;text-decoration:none;margin-left:0.5rem;">Terms of Use</a>
      </p>
      <p>Made with precision for your health. Not medical advice — always consult a healthcare professional.</p>
    </div>
  </div>
`;

/* ── Inject components ──────────────────────────────────────── */
let _injected = false;

function _injectComponents() {
  if (_injected) return;
  _injected = true;

  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = _HEADER_HTML;
  }

  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = _FOOTER_HTML;
  }

  /* Google Analytics (gtag.js) — load once per page */
  if (!window.__gaLoaded) {
    window.__gaLoaded = true;
    const gaId = 'G-KSY4FSVQJL';
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(gaScript);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }

  /* Auto-load the AdSense manager on every page */
  if (!document.querySelector('script[src="/shared/ads.js"]')) {
    const adsScript = document.createElement('script');
    adsScript.src = '/shared/ads.js';
    document.head.appendChild(adsScript);
  }

  /* Auto-load recipe enhancements (copy / print). No-op on non-recipe pages. */
  if (!document.querySelector('script[src="/shared/recipe.js"]')) {
    const recipeScript = document.createElement('script');
    recipeScript.src = '/shared/recipe.js';
    recipeScript.defer = true;
    document.head.appendChild(recipeScript);
  }
}

/* Run immediately — defer scripts execute after HTML is parsed,
   so the DOM elements are already available at this point.      */
_injectComponents();

/* Wire up mobile menu after all deferred scripts have run      */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn  = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav && !menuBtn._navReady) {
    menuBtn._navReady = true;
    menuBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.add('hidden'));
    });
  }
});

/* ── Public API ─────────────────────────────────────────────── */
const initTemplate = ({ title } = {}) => {
  if (title) document.title = title + ' | Nutryio';

  _injectComponents(); // no-op if already injected

  /* Track this page as recently viewed (calculator pages only) */
  try {
    const path = window.location.pathname;
    if (path.startsWith('/calculators/')) {
      const slug = path.replace(/^\/calculators\//, '').replace(/\/$/, '');
      if (slug) {
        const nameEl  = document.querySelector('h1');
        const descEl  = document.querySelector('.calc-description');
        const badgeEl = document.querySelector('.category-badge');
        const entry   = {
          slug,
          name:        nameEl  ? nameEl.textContent.trim()  : title,
          description: descEl  ? descEl.textContent.trim()  : '',
          category:    badgeEl ? badgeEl.textContent.trim() : '',
          ts:          Date.now(),
        };
        const KEY      = 'nutryio_recent';
        const existing = JSON.parse(localStorage.getItem(KEY) || '[]');
        const filtered = existing.filter(e => e.slug !== entry.slug);
        localStorage.setItem(KEY, JSON.stringify([entry, ...filtered].slice(0, 6)));
      }
    }
  } catch (_) {}
};

window.initTemplate = initTemplate;

/* Recipe image category tag overlay removed per user request */

/* ── Newsletter form handler ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.onsubmit = null;
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const btn   = form.querySelector('.newsletter-btn');
      if (!input || !btn) return;
      const email = input.value.trim();
      if (!email) return;

      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Subscribing...';

      let status = form.querySelector('.newsletter-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'newsletter-status';
        status.style.cssText = 'margin-top:.75rem;font-size:.875rem;font-weight:500;';
        form.appendChild(status);
      }
      status.textContent = '';

      try {
        const resp = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await resp.json();
        if (resp.ok && data.success) {
          status.style.color = '#16a34a';
          status.textContent = data.message || "You're subscribed! Thanks for joining.";
          input.value = '';
        } else {
          throw new Error(data.error || 'Subscription failed. Please try again.');
        }
      } catch (err) {
        status.style.color = '#dc2626';
        status.textContent = err.message || 'Something went wrong. Please try again.';
      }

      btn.disabled = false;
      btn.textContent = originalText;
    });
  });
});
