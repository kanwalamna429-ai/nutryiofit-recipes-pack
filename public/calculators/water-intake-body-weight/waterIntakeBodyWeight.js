document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Water Intake by Body Weight' });

  let unit = 'metric';
  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });
  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    let wt = parseFloat(document.getElementById('weight').value);
    const formula = document.getElementById('formula').value;
    if (!wt || wt <= 0) { err('Enter a valid weight.'); return; }
    let ml;
    if (formula === 'us') {
      const lbs = unit === 'metric' ? wt * 2.20462 : wt;
      ml = lbs * 0.5 * 29.574;
    } else {
      if (unit === 'imperial') wt *= 0.453592;
      ml = wt * (formula === 'moderate' ? 30 : 33);
    }
    set('res-ml', Math.round(ml)+'ml');
    set('res-liters', (ml/1000).toFixed(1)+'L');
    set('res-oz', Math.round(ml/29.574)+'oz');
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