document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'One Rep Max — Epley Formula' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const w = parseFloat(document.getElementById('weight').value);
    const r = parseInt(document.getElementById('reps').value);
    if (!w || !r || r <= 0 || r > 30) { err('Enter valid weight and reps (1–30).'); return; }
    if (r === 1) { set('res-1rm', w+'kg'); } else {
      const orm = w * (1 + r/30);
      set('res-1rm', Math.round(orm)+'kg');
      set('res-95', Math.round(orm*0.95)+'kg');
      set('res-85', Math.round(orm*0.85)+'kg');
      set('res-75', Math.round(orm*0.75)+'kg');
      set('res-65', Math.round(orm*0.65)+'kg');
      set('res-detail', 'Based on '+w+'kg for '+r+' reps. Epley formula: weight × (1 + reps/30). Most accurate for 2–10 rep ranges. For 1 rep, the actual weight IS your 1RM.');
    }
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