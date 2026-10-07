document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Pre-Workout Dosage Calculator' });

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
    const sens = document.getElementById('sensitivity').value;
    const time = document.getElementById('time').value;
    const factors = {low:5, moderate:3, high:1.5, tolerance:6};
    const factor = factors[sens] || 3;
    const recommended = Math.round(wKg * factor / 5) * 5;
    const safe = Math.min(400, recommended);
    const coffeeEq = (safe / 95).toFixed(1);
    const timing = '30–45';
    set('res-caffeine', safe+'mg');
    set('res-max', '400mg');
    set('res-coffee', coffeeEq+' cups');
    set('res-timing', timing);
    const late = time === 'evening' || time === 'late';
    set('res-note', late ? 'Caffeine has a half-life of 5-6 hours. Evening workouts: use half-dose or switch to caffeine-free pre-workout. Using caffeine after 2pm can impair sleep quality even if you feel unaffected.' : 'Never exceed 400mg caffeine/day. Cycle off caffeine every 4-8 weeks to prevent tolerance. Stay hydrated — caffeine has a mild diuretic effect.');
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