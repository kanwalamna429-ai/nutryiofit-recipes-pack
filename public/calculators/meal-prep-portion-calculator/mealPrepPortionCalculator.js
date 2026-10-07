document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Meal Prep Portion Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const orig = parseFloat(document.getElementById('original').value);
    const targ = parseFloat(document.getElementById('target').value);
    const i1 = parseFloat(document.getElementById('ingredient1').value);
    const i2 = parseFloat(document.getElementById('ingredient2').value);
    const i3 = parseFloat(document.getElementById('ingredient3').value);
    if (!orig || orig <= 0 || !targ || targ <= 0) { err('Enter valid original and target servings.'); return; }
    if (!i1 && !i2) { err('Enter at least one ingredient amount.'); return; }
    const f = targ / orig;
    set('res-factor', f.toFixed(2)+'x');
    if (i1) set('res-i1', (Math.round(i1*f*100)/100).toString());
    if (i2) set('res-i2', (Math.round(i2*f*100)/100).toString());
    if (i3) set('res-i3', (Math.round(i3*f*100)/100).toString());
    const tip = f > 2 ? 'For large batches, increase cooking time slightly and ensure even heat distribution. Season to taste at end rather than scaling spices linearly.' : 'For smaller batches, spices and salt often need less scaling than proteins/carbs.';
    set('res-tip', tip);
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