document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Running Calorie Burn Calculator' });

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
    let dist = parseFloat(document.getElementById('distance').value);
    const terrain = document.getElementById('terrain').value;
    if (!wKg || !dist) { err('Enter valid weight and distance.'); return; }
    if (unit === 'imperial') { wKg *= 0.453592; dist *= 1.60934; }
    const met = terrain === 'hilly' ? 9.5 : terrain === 'trail' ? 9.0 : 8.0;
    const hours = dist / 10;
    const calories = Math.round(met * wKg * hours);
    const perKm = Math.round(wKg * 1.036 * (terrain === 'hilly' ? 1.1 : 1.0));
    set('res-calories', calories.toLocaleString()+'');
    set('res-per_km', perKm+'');
    set('res-burn_rate', met.toFixed(1)+'');
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