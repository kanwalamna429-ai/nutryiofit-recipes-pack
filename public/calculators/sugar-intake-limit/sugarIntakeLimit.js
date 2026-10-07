document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Sugar Intake Limit Calculator' });

  let gender = 'male';
  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
    });
  });
  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cals = parseFloat(document.getElementById('calories').value);
    const guide = document.getElementById('guideline').value;
    if (!cals || cals < 500) { err('Enter a valid calorie amount.'); return; }
    let pct;
    if (guide === 'who_ideal') pct = 0.05;
    else if (guide === 'aha') pct = gender === 'male' ? (150/cals) : (100/cals);
    else pct = 0.10;
    pct = Math.min(pct, 0.15);
    const kcal = Math.round(cals * pct);
    const grams = Math.round(kcal / 4);
    const tsp = Math.round(grams / 4.2 * 10) / 10;
    const sodas = Math.round(grams / 39 * 10) / 10;
    set('res-grams', grams+'g');
    set('res-tsp', tsp+' tsp');
    set('res-sodas', sodas+' cans');
    set('res-pct', Math.round(pct*100)+'%');
    set('res-info', 'This limit applies to ADDED sugars (sugar added during processing or preparation), not naturally occurring sugars in fruits and dairy. Check nutrition labels for "added sugars."');
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