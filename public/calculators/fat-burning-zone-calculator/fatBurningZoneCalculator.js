document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Fat Burning Zone Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    let mhr = parseFloat(document.getElementById('mhr').value);
    const rhr = parseFloat(document.getElementById('rhr').value)||60;
    if (!age && !mhr) { err('Enter your age or max heart rate.'); return; }
    if (!mhr) mhr = 220 - age;
    const lo = Math.round(mhr * 0.60);
    const hi = Math.round(mhr * 0.70);
    const hrReserve = mhr - rhr;
    const karvonenLo = Math.round(0.60 * hrReserve + rhr);
    const karvonenHi = Math.round(0.70 * hrReserve + rhr);
    set('res-zone_lo', lo+'');
    set('res-zone_hi', hi+'');
    set('res-karvonen_lo', karvonenLo+'');
    set('res-karvonen_hi', karvonenHi+'');
    set('res-note', 'While the fat burning zone burns a higher % of calories from fat, higher intensity exercise burns MORE total calories — which matters more for fat loss. Zone 2 training (fat burn zone) is excellent for base building, recovery days, and overall metabolic health.');
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