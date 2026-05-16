document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Creatine Loading Calculator' });

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
    const phase = document.getElementById('phase').value;
    const form = document.getElementById('form').value;
    const multiplier = form === 'hcl' ? 0.75 : 1.0;
    let daily, freq, duration;
    if (phase === 'loading') { daily = Math.round(0.3 * wKg * multiplier); freq = 4; duration = 5; }
    else if (phase === 'maintenance') { daily = Math.round(0.03 * wKg * multiplier * 10) / 10; freq = 1; duration = 0; }
    else { daily = Math.round(0.03 * wKg * multiplier * 10) / 10; freq = 1; duration = 0; }
    set('res-dose', daily+'g/day');
    set('res-frequency', freq+'×/day');
    set('res-per_dose', Math.round(daily/freq * 10)/10+'g');
    set('res-loading_end', phase === 'loading' ? duration+' days' : 'N/A (maintenance)');
    const tip = phase === 'loading' ? 'Take '+freq+' doses of '+Math.round(daily/freq)+'g spread throughout the day with meals. After 5 days, switch to maintenance dose ('+Math.round(0.03*wKg)+'g/day). Mix with carbohydrates to improve uptake.' : 'Take '+daily+'g daily, preferably post-workout with carbohydrates. Creatine saturation is reached after 4 weeks on maintenance dose (same endpoint as loading, just slower).';
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