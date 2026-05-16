document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Race Time Predictor (Riegel Formula)' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const d1 = parseFloat(document.getElementById('known_dist').value);
    const d2 = parseFloat(document.getElementById('target_dist').value);
    const h = parseInt(document.getElementById('known_hours').value)||0;
    const m = parseInt(document.getElementById('known_min').value)||0;
    const s = parseInt(document.getElementById('known_sec').value)||0;
    const t1 = h*3600 + m*60 + s;
    if (t1 <= 0 || d1 <= 0 || d2 <= 0) { err('Enter a valid time and select distances.'); return; }
    if (d1 === d2) { err('Known and target distances must be different.'); return; }
    const t2 = t1 * Math.pow(d2/d1, 1.06);
    const fmt = (sec) => { const h = Math.floor(sec/3600); const m = Math.floor((sec%3600)/60); const s = Math.round(sec%60); return (h>0?h+'h ':'')+m+'m '+(s<10?'0':'')+s+'s'; };
    const fmtP = (sec) => { const m = Math.floor(sec/60); const s = Math.round(sec%60); return m+':'+(s<10?'0':'')+s; };
    set('res-predicted', fmt(t2));
    set('res-pace_km', fmtP(t2/d2)+'/km');
    set('res-pace_mi', fmtP(t2/(d2/1.60934))+'/mi');
    ok();
  }
  function err(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = '⚠️ ' + msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
  function ok() {
    document.getElementById('calc-warning').classList.remove('visible');
    document.getElementById('result-section').classList.add('visible');
  }
  function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
  
});