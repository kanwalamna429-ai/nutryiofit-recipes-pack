document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Protein Intake Calculator' });

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
    let wKg = parseFloat(document.getElementById('weight').value);
    if (!wKg || wKg <= 0) { err('Enter a valid body weight.'); return; }
    if (unit === 'imperial') wKg *= 0.453592;
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    const factors = {sedentary:[0.8,1.0,1.2], light:[1.0,1.4,1.6], moderate:[1.4,1.7,2.0], active:[1.6,2.0,2.4], athlete:[1.8,2.2,2.6]};
    let [mn, tg, mx] = (factors[activity] || factors.moderate).map(f => Math.round(f * wKg));
    if (goal === 'lose') { mn = Math.max(mn, Math.round(wKg*1.4)); tg = Math.max(tg, Math.round(wKg*1.6)); mx = Math.max(mx, Math.round(wKg*2.0)); }
    else if (goal === 'gain') { tg = Math.max(tg, Math.round(wKg*1.8)); mx = Math.max(mx, Math.round(wKg*2.2)); }
    else if (goal === 'endurance') { tg = Math.round(wKg*1.5); mx = Math.round(wKg*1.7); }
    set('res-min', mn+'g'); set('res-target', tg+'g'); set('res-max', mx+'g');
    set('res-info', 'Aim for '+Math.round(tg/4)+'–'+Math.round(mx/4)+'g of protein per meal (assuming 4 meals/day). Space meals 3–4 hours apart for optimal muscle protein synthesis.');
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