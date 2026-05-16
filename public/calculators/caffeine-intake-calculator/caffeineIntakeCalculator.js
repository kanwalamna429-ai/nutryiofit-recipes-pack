document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Caffeine Intake Calculator' });

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
    if (!wKg) { err('Enter your body weight.'); return; }
    if (unit === 'imperial') wKg *= 0.453592;
    const sens = document.getElementById('sensitivity').value;
    let limit;
    if (sens === 'pregnant') limit = 200;
    else if (sens === 'high') limit = Math.min(200, Math.round(wKg * 3));
    else if (sens === 'low') limit = Math.min(600, Math.round(wKg * 9));
    else limit = Math.min(400, Math.round(wKg * 6));
    const coffees = (parseInt(document.getElementById('coffees').value)||0) * 65;
    const energy = (parseInt(document.getElementById('energy_drinks').value)||0) * 80;
    const teas = (parseInt(document.getElementById('teas').value)||0) * 40;
    const prework = (parseInt(document.getElementById('pre_workout').value)||0) * 200;
    const current = coffees + energy + teas + prework;
    const remaining = limit - current;
    set('res-limit', limit+'mg');
    set('res-current', current+'mg');
    set('res-remaining', Math.max(0, remaining)+'mg');
    const status = current <= limit ? (current > limit*0.8 ? 'Near limit — be cautious' : 'Within safe range') : 'Over limit — reduce intake';
    set('res-status', status);
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