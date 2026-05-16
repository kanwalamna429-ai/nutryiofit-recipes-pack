document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Carbohydrate Intake Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cals = parseFloat(document.getElementById('calories').value);
    const goal = document.getElementById('goal').value;
    if (!cals || cals < 500) { err('Enter a valid calorie amount.'); return; }
    let pct;
    if (goal === 'keto') pct = 0.05;
    else if (goal === 'low_carb') pct = 0.25;
    else if (goal === 'high_carb') pct = 0.60;
    else { const a = document.getElementById('activity').value; pct = a === 'athlete' ? 0.55 : a === 'high' ? 0.50 : 0.45; }
    const kcal = Math.round(cals * pct);
    const grams = Math.round(kcal / 4);
    set('res-grams', grams+'g'); set('res-pct', Math.round(pct*100)+'%'); set('res-kcal', kcal+' kcal');
    const tips = {keto:'Focus on leafy greens and non-starchy vegetables. Limit all grains, legumes, and sugars.',low_carb:'Prioritize complex carbs from vegetables, legumes, and some whole grains.',standard:'Include whole grains, fruits, vegetables, and legumes for sustained energy.',high_carb:'Focus on complex carbs: oats, rice, pasta, sweet potatoes, and fruits.'};
    set('res-tip', tips[goal] || tips.standard);
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