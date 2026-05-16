document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calorie Density Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cals = parseFloat(document.getElementById('calories').value);
    const wt = parseFloat(document.getElementById('weight').value);
    if (!cals || !wt || wt <= 0) { err('Enter valid calories and weight.'); return; }
    const density = cals / wt;
    set('res-density', density.toFixed(2)+' kcal/g');
    set('res-per100', Math.round(density*100)+' kcal');
    set('res-per200', Math.round(200/density)+'g');
    let tip;
    if (density < 0.6) tip = 'Very Low Density (< 0.6 kcal/g): High volume, very filling. Examples: most vegetables, broth-based soups, watermelon.';
    else if (density < 1.5) tip = 'Low Density (0.6–1.5 kcal/g): Good for satiety. Examples: fruits, legumes, lean meats, low-fat dairy.';
    else if (density < 4.0) tip = 'Medium Density (1.5–4.0 kcal/g): Moderate — watch portions. Examples: pasta, bread, lean protein, eggs.';
    else tip = 'High Density (> 4.0 kcal/g): Calorie-dense — small volumes pack many calories. Examples: nuts, oils, cookies, chips.';
    set('res-tip', tip);
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