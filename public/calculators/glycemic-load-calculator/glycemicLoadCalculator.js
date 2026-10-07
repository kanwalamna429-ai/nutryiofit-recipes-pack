document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Glycemic Load Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const gi = parseFloat(document.getElementById('gi').value);
    const carbs = parseFloat(document.getElementById('carbs').value);
    if (!gi || gi <= 0 || !carbs || carbs <= 0) { err('Enter GI and carbohydrate grams.'); return; }
    const gl = Math.round(gi * carbs / 100);
    const cat = gl <= 10 ? 'Low' : gl <= 19 ? 'Medium' : 'High';
    set('res-gl', gl+'');
    set('res-category', cat);
    set('res-daily_budget', gl+' of ~100 daily budget used');
    const interp = gl <= 10 ? 'Low glycemic load — minimal blood sugar impact. Appropriate for most people including diabetics.' : gl <= 19 ? 'Moderate glycemic load. Pair with protein, fat, or fiber-rich foods to slow glucose absorption.' : 'High glycemic load — significant blood sugar impact. Reduce portion size, choose a lower-GI alternative, or pair with protein and healthy fat.';
    set('res-interpretation', interp);
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