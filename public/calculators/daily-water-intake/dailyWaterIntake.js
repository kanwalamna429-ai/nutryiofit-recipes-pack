document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Daily Water Intake Calculator' });

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
    const climate = document.getElementById('climate').value;
    let ml = wKg * 35;
    if (activity === 'light') ml += 300; if (activity === 'moderate') ml += 600; if (activity === 'active') ml += 900; if (activity === 'very_active') ml += 1200;
    if (climate === 'warm') ml += 300; if (climate === 'hot') ml += 700; if (climate === 'ac') ml -= 100;
    ml = Math.max(1500, ml);
    set('res-liters', (ml/1000).toFixed(1)+'L');
    set('res-oz', Math.round(ml/29.574)+'oz');
    set('res-cups', Math.round(ml/237)+'');
    set('res-tip', 'Drink a glass of water when you wake up, before each meal, and before bed. Monitor urine color — pale yellow indicates good hydration. Dark yellow means drink more.');
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