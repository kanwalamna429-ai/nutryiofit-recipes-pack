document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Protein Powder Calculator' });

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
    if (!wKg) { err('Enter body weight.'); return; }
    if (unit === 'imperial') wKg *= 0.453592;
    const goals = {maintain:1.6, build:2.0, lose:2.2, athlete:1.4};
    const goal = document.getElementById('goal').value;
    const target = wKg * (goals[goal] || 2.0);
    const foodProtein = parseFloat(document.getElementById('food_protein').value)||0;
    const perScoop = parseFloat(document.getElementById('powder_per_serving').value)||25;
    const deficit = target - foodProtein;
    const scoops = deficit > 0 ? Math.ceil(deficit / perScoop) : 0;
    set('res-total_needed', Math.round(target)+'g');
    set('res-supplement_needed', deficit > 0 ? Math.round(deficit)+'g' : '0g (no supplement needed)');
    set('res-scoops', deficit > 0 ? scoops+' scoop'+(scoops>1?'s':'') : '—');
    set('res-excess', deficit > 0 ? 'Deficit: '+Math.round(deficit)+'g/day' : 'Surplus: '+Math.round(Math.abs(deficit))+'g — no powder needed');
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