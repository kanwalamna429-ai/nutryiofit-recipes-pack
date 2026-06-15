/* =================================================================
   Nutryio Ads Manager  ·  /shared/ads.js
   Loaded automatically on every page via template.js.

   Networks (rotated per [data-ad] slot):
     1. Adsterra banners    (728x90 + 300x250)
     2. Advertica banners   (0x0 flex + 300x250)
     3. (optional) Google AdSense — disabled by default

   Smartlinks (direct links, rotated):
     · Advertica smartlink
     · Adsterra smartlink

   Auto-injected smartlink placements (no HTML edits needed):
     · Blog post body  → 2 inline anchor-text links between paragraphs
     · Recipe page     → "Ingredients list" link after ingredients block
     · Sitewide        → floating push-notification CTA widget (bottom-right)

   Per-page rotation: each page load picks a different smartlink/anchor
   pair via a sessionStorage counter so a visitor sees a fresh link
   on every new page they open during the same session.
   ================================================================= */

const NUTRYIO_ADS = {

  /* ── Google AdSense (disabled) ─────────────────────────────── */
  adsense: {
    enabled: false,
    publisherId: 'ca-pub-1056206763644639',
    slots: {},
  },

  /* ── Adsterra banners ──────────────────────────────────────── */
  adsterra: {
    enabled: true,
    units: {
      leaderboard: { key: '529880126f5050c80092250dcea5e50e', width: 728, height: 90 },
      rectangle:   { key: '0f6f2d44485c1bc0f4b725a17a63fae6', width: 300, height: 250 },
    },
  },

  /* ── Advertica banners ─────────────────────────────────────── */
  advertica: {
    enabled: true,
    units: {
      /* 728x90 horizontal leaderboard */
      leaderboard: {
        className:  'b36b1198822',
        domain:     '//data527.click',
        affquery:   '/54c73f944984d4d8f2b7/36b1198822/?placementName=default',
        width:  728,
        height: 90,
      },
      /* 300x250 medium rectangle */
      rectangle: {
        className:  'j0a2a18ff52',
        domain:     '//data527.click',
        affquery:   '/831521adee1baed8293f/0a2a18ff52/?placementName=default',
        width:  300,
        height: 250,
      },
    },
  },

  /* ── Slot → banner size map ────────────────────────────────── */
  slotSizes: {
    'homepage-after-category':     'leaderboard',
    'blog-index-sidebar-top':      'rectangle',
    'blog-index-sidebar-bottom':   'rectangle',
    'post-above-image':            'leaderboard',
    'post-in-article':             'leaderboard',
    'post-below-article':          'leaderboard',
    'post-sidebar-top':            'rectangle',
    'post-sidebar-after-widgets':  'rectangle',
    'calc-after-calculator':       'leaderboard',
    'calc-after-content':          'leaderboard',
    'calc-sidebar':                'rectangle',
    'recipe-index-top':            'leaderboard',
    'recipe-index-sidebar-top':    'rectangle',
    'recipe-index-sidebar-bottom': 'rectangle',
    'recipe-above-card':           'leaderboard',
    'recipe-below-card':           'leaderboard',
    'recipe-sidebar-top':          'rectangle',
    'recipe-sidebar-bottom':       'rectangle',
  },

  /* ── Smartlinks (direct links) ─────────────────────────────── */
  smartlinks: [
    { name: 'advertica', url: 'https://data527.click/73acd69ac3aeec644da2/3e245fe488/?placementName=default' },
    { name: 'adsterra',  url: 'https://www.effectivecpmnetwork.com/gfqn3fakq?key=d1bef1accc3f54512d1e77e6a9a487d1' },
  ],

  /* Anchor-text pool for in-content blog links */
  blogAnchors: [
    '7 days keto diet plan',
    '20 delicious low-calorie desserts',
    'free meal planner download',
    'halal high-protein meal plan',
    'easy 30-minute dinner ideas',
    'best fat-burning foods list',
    'beginner gym workout plan',
    'intermittent fasting starter guide',
    '14-day clean eating challenge',
    'today’s healthy meal plan',
  ],

  /* CTA pool for the floating notification widget */
  widgetCTAs: [
    { icon: '🍽️', text: 'Today’s healthy meal plan' },
    { icon: '🍰', text: 'Check out delicious desserts' },
    { icon: '🥑', text: 'Halal keto diet plan' },
    { icon: '📋', text: 'Free meal planner download' },
    { icon: '🔥', text: '7-day fat-burning challenge' },
    { icon: '💪', text: 'High-protein recipes (halal)' },
  ],
};

/* ================================================================
   Internal helpers
   ================================================================ */

/* Per-tab counter — increments on every page load so each new page
   picks the next item in any rotating list. */
function _nutryioTick() {
  try {
    const k = 'nutryio_ad_tick';
    const n = (parseInt(sessionStorage.getItem(k) || '0', 10) || 0) + 1;
    sessionStorage.setItem(k, String(n));
    return n;
  } catch (_) {
    return Math.floor(Math.random() * 1e9);
  }
}
const _TICK = _nutryioTick();

function _pick(arr, offset = 0) {
  if (!arr || !arr.length) return null;
  return arr[(_TICK + offset) % arr.length];
}

/* ── Banner rendering ───────────────────────────────────────── */

function _nutryioRenderAdsterra(el, size) {
  const unit = NUTRYIO_ADS.adsterra.units[size];
  if (!unit || !unit.key) return false;
  const html = `<!doctype html><html><head><meta charset="utf-8">
    <style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style>
    </head><body>
    <script type="text/javascript">
      atOptions = { 'key':'${unit.key}','format':'iframe','height':${unit.height},'width':${unit.width},'params':{} };
    <\/script>
    <script type="text/javascript" src="https://www.highperformanceformat.com/${unit.key}/invoke.js"><\/script>
    </body></html>`;
  el.innerHTML = `<iframe title="Advertisement" scrolling="no" frameborder="0"
    style="display:block;margin:0 auto;border:0;width:${unit.width}px;height:${unit.height}px;max-width:100%"
    srcdoc='${html.replace(/'/g, "&#39;")}'></iframe>`;
  return true;
}

function _nutryioRenderAdvertica(el, size) {
  const unit = NUTRYIO_ADS.advertica.units[size];
  if (!unit || !unit.className) return false;
  const w = unit.width || 0;
  const h = unit.height || 0;
  const frameW = w > 0 ? w : 320;
  const frameH = h > 0 ? h : 250;
  const html = `<!doctype html><html><head><meta charset="utf-8">
    <style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style>
    </head><body>
    <ins style="width:${w}px;height:${h}px" data-width="${w}" data-height="${h}"
      class="${unit.className}" data-domain="${unit.domain}" data-affquery="${unit.affquery}"></ins>
    <script src="${unit.domain}/js/responsive.js" async><\/script>
    </body></html>`;
  el.innerHTML = `<iframe title="Advertisement" scrolling="no" frameborder="0"
    style="display:block;margin:0 auto;border:0;width:${frameW}px;height:${frameH}px;max-width:100%"
    srcdoc='${html.replace(/'/g, "&#39;")}'></iframe>`;
  return true;
}

function _nutryioRenderSlot(el) {
  const slotKey = el.dataset.ad;
  const size = NUTRYIO_ADS.slotSizes[slotKey] || 'rectangle';

  const networks = [];
  if (NUTRYIO_ADS.adsterra.enabled)  networks.push('adsterra');
  if (NUTRYIO_ADS.advertica.enabled) networks.push('advertica');
  if (!networks.length) return;

  /* Hash slot key into a stable offset so different slots on the
     same page rotate to different networks. */
  let hash = 0;
  for (let i = 0; i < slotKey.length; i++) hash = (hash * 31 + slotKey.charCodeAt(i)) | 0;
  const net = networks[Math.abs(_TICK + hash) % networks.length];

  let ok = false;
  if (net === 'adsterra')  ok = _nutryioRenderAdsterra(el, size);
  if (net === 'advertica') ok = _nutryioRenderAdvertica(el, size);

  /* Fallback to the other network if the chosen one had no unit */
  if (!ok) {
    const other = networks.find(n => n !== net);
    if (other === 'adsterra')  ok = _nutryioRenderAdsterra(el, size);
    if (other === 'advertica') ok = _nutryioRenderAdvertica(el, size);
  }
  if (ok) el.dataset.adLive = '1';
}

/* ── Smartlink helpers ──────────────────────────────────────── */

function _pickSmartlink(offset = 0) {
  const s = _pick(NUTRYIO_ADS.smartlinks, offset);
  return s ? s.url : '#';
}

function _smartlinkAttrs(url) {
  return `href="${url}" target="_blank" rel="nofollow sponsored noopener"`;
}

/* Insert "Ingredients list" link after the ingredients section on
   recipe pages. */
function _nutryioInjectRecipeLink() {
  const list = document.querySelector('.recipe-ingredients-list');
  if (!list) return;
  if (document.querySelector('[data-nutryio-recipe-link]')) return;
  const url = _pickSmartlink(0);
  const a = document.createElement('p');
  a.setAttribute('data-nutryio-recipe-link', '1');
  a.style.cssText = 'margin:1rem 0 0;font-size:0.95rem;';
  a.innerHTML = `<a ${_smartlinkAttrs(url)}
    style="display:inline-flex;align-items:center;gap:.4rem;color:var(--primary,#16a34a);font-weight:600;text-decoration:none;border-bottom:1px dashed currentColor;padding-bottom:2px;">
    📋 Printable ingredients list &amp; shopping checklist →</a>`;
  /* place right after the <ul> */
  list.parentNode.insertBefore(a, list.nextSibling);
}

/* Insert 4 inline anchor-text links between blog body paragraphs. */
function _nutryioInjectBlogLinks() {
  const body = document.querySelector('.post-body');
  if (!body) return;
  if (body.dataset.nutryioLinks === '1') return;
  const paragraphs = body.querySelectorAll(':scope > p');
  if (paragraphs.length < 4) return;
  body.dataset.nutryioLinks = '1';

  const pool = NUTRYIO_ADS.blogAnchors.slice();
  const pickAnchor = (off) => pool[(_TICK + off) % pool.length];
  const anchors = [pickAnchor(0), pickAnchor(2), pickAnchor(4), pickAnchor(6)];

  const n = paragraphs.length;
  const rawPositions = [
    Math.min(2, n - 1),
    Math.max(3, Math.floor(n * 0.30)),
    Math.max(5, Math.floor(n * 0.55)),
    Math.max(7, Math.floor(n * 0.80)),
  ];
  const used = new Set();
  rawPositions.forEach((pos, k) => {
    let idx = Math.min(pos, n - 1);
    while (used.has(idx) && idx < n - 1) idx++;
    used.add(idx);
    const p = paragraphs[idx];
    if (!p || p.dataset.nutryioLinked) return;
    p.dataset.nutryioLinked = '1';
    const url = _pickSmartlink(k);
    const callout = document.createElement('p');
    callout.style.cssText = 'margin:1.25rem 0;padding:.75rem 1rem;border-left:3px solid var(--primary,#16a34a);background:rgba(22,163,74,.06);font-size:.95rem;border-radius:6px;';
    callout.innerHTML = `Related: <a ${_smartlinkAttrs(url)}
      style="color:var(--primary,#16a34a);font-weight:600;text-decoration:underline;">${anchors[k]}</a> →`;
    p.parentNode.insertBefore(callout, p.nextSibling);
  });
}

/* Floating push-notification CTA widget — bottom-right, dismissable. */
function _nutryioInjectWidget() {
  if (document.getElementById('nutryio-cta-widget')) return;
  try {
    if (sessionStorage.getItem('nutryio_widget_dismissed') === '1') return;
  } catch (_) {}

  const cta = _pick(NUTRYIO_ADS.widgetCTAs, 0) || NUTRYIO_ADS.widgetCTAs[0];
  const url = _pickSmartlink(1);

  const css = `
    #nutryio-cta-widget{position:fixed;right:16px;bottom:16px;z-index:9998;max-width:320px;
      background:#fff;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.18);
      padding:.85rem 2.2rem .85rem .85rem;display:flex;align-items:center;gap:.75rem;
      font-family:inherit;animation:nutryioSlide .4s ease-out;border:1px solid rgba(0,0,0,.06);}
    #nutryio-cta-widget .nutryio-cta-icon{font-size:2rem;line-height:1;flex-shrink:0;
      width:48px;height:48px;display:flex;align-items:center;justify-content:center;
      border-radius:12px;background:linear-gradient(135deg,#fef3c7,#fde68a);}
    #nutryio-cta-widget a.nutryio-cta-text{color:#0f172a;font-weight:600;font-size:.92rem;
      line-height:1.25;text-decoration:none;display:block;}
    #nutryio-cta-widget small{display:block;color:#64748b;font-size:.7rem;
      text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px;font-weight:500;}
    #nutryio-cta-widget .nutryio-cta-close{position:absolute;top:6px;right:8px;
      background:transparent;border:0;color:#94a3b8;cursor:pointer;font-size:1.1rem;
      line-height:1;padding:2px 6px;border-radius:6px;}
    #nutryio-cta-widget .nutryio-cta-close:hover{background:#f1f5f9;color:#0f172a;}
    @keyframes nutryioSlide{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
    @media (max-width:480px){#nutryio-cta-widget{right:8px;left:8px;bottom:8px;max-width:none}}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const w = document.createElement('div');
  w.id = 'nutryio-cta-widget';
  w.setAttribute('role', 'complementary');
  w.innerHTML = `
    <span class="nutryio-cta-icon" aria-hidden="true">${cta.icon}</span>
    <div style="min-width:0;">
      <small>Recommended</small>
      <a class="nutryio-cta-text" ${_smartlinkAttrs(url)}>${cta.text} →</a>
    </div>
    <button class="nutryio-cta-close" type="button" aria-label="Dismiss">×</button>`;
  w.querySelector('.nutryio-cta-close').addEventListener('click', () => {
    w.remove();
    try { sessionStorage.setItem('nutryio_widget_dismissed', '1'); } catch (_) {}
  });
  document.body.appendChild(w);
}

/* ── Activation ─────────────────────────────────────────────── */

function _nutryioActivateAds() {
  document.querySelectorAll('[data-ad]').forEach(_nutryioRenderSlot);
  _nutryioInjectRecipeLink();
  _nutryioInjectBlogLinks();
  _nutryioInjectWidget();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _nutryioActivateAds);
} else {
  _nutryioActivateAds();
}

window.NUTRYIO_ADS = NUTRYIO_ADS;
