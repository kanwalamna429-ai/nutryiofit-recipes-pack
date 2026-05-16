document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Marathon Finish Time Predictor' });

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
    const d2 = 42.195;
    const t2 = t1 * Math.pow(d2/d1, 1.06);
    const fmt = (sec) => { const h = Math.floor(sec/3600); const m = Math.floor((sec%3600)/60); const s = Math.round(sec%60); return h+'h '+m+'m '+(s<10?'0':'')+s+'s'; };
    const fmtPace = (sec) => { const m = Math.floor(sec/60); const s = Math.round(sec%60); return m+':'+(s<10?'0':'')+s; };
    set('res-marathon', fmt(t2));
    set('res-pace', fmtPace(t2/d2)+'/km');
    set('res-pace_mi', fmtPace(t2/(d2/1.60934))+'/mi');
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