document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Half Marathon Finish Time Predictor' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const d1 = parseFloat(document.getElementById('race_dist').value);
    const h = parseInt(document.getElementById('race_hours').value)||0;
    const m = parseInt(document.getElementById('race_min').value)||0;
    const s = parseInt(document.getElementById('race_sec').value)||0;
    const t1 = h*3600 + m*60 + s;
    if (!d1 || t1 <= 0) { err('Enter valid race distance and time.'); return; }
    const hmSec = t1 * Math.pow(21.095/d1, 1.06);
    const tenKSec = d1 === 5 ? t1 * Math.pow(10/5, 1.06) : t1;
    const fmt = (sec) => { const h = Math.floor(sec/3600); const m = Math.floor((sec%3600)/60); const s = Math.round(sec%60); return (h>0?h+'h ':'')+m+'m '+(s<10?'0':'')+s+'s'; };
    const fmtPace = (sec) => { const m = Math.floor(sec/60); const s = Math.round(sec%60); return m+':'+(s<10?'0':'')+s; };
    set('res-hm', fmt(hmSec));
    set('res-10k', d1 === 5 ? fmt(tenKSec) : 'N/A (entered 10K)');
    set('res-pace', fmtPace(hmSec/21.095)+'/km');
    ok();
  }
  function err(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = ' ' + msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
  function ok() {
    document.getElementById('calc-warning').classList.remove('visible');
    document.getElementById('result-section').classList.add('visible');
  }
  function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
  
});