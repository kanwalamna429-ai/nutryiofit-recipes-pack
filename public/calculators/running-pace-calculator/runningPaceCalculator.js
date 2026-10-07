document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Running Pace Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const dist = parseFloat(document.getElementById('distance').value);
    const h = parseInt(document.getElementById('hours').value)||0;
    const m = parseInt(document.getElementById('minutes').value)||0;
    const s = parseInt(document.getElementById('seconds').value)||0;
    if (!dist || dist <= 0) { err('Enter a valid distance.'); return; }
    const totalSec = h*3600 + m*60 + s;
    if (totalSec <= 0) { err('Enter a valid time.'); return; }
    const paceSecPerKm = totalSec / dist;
    const paceSecPerMi = totalSec / (dist / 1.60934);
    const speedKmh = dist / (totalSec / 3600);
    const speedMph = speedKmh / 1.60934;
    const fmt = (sec) => { const m = Math.floor(sec/60); const s = Math.round(sec%60); return m+':'+(s<10?'0':'')+s; };
    set('res-pace_km', fmt(paceSecPerKm)+'/km');
    set('res-pace_mi', fmt(paceSecPerMi)+'/mi');
    set('res-speed_kmh', speedKmh.toFixed(2)+' km/h');
    set('res-speed_mph', speedMph.toFixed(2)+' mph');
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