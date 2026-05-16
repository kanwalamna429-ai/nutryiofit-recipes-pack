document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Treadmill Pace Converter' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const kmh = parseFloat(document.getElementById('speed_kmh').value);
    const mph = parseFloat(document.getElementById('speed_mph').value);
    let speed_kmh;
    if (kmh > 0) speed_kmh = kmh;
    else if (mph > 0) speed_kmh = mph * 1.60934;
    else { err('Enter a speed value.'); return; }
    const speed_mph = speed_kmh / 1.60934;
    const pace_km = 60 / speed_kmh;
    const pace_mi = 60 / speed_mph;
    const fmt = (dec) => { const m = Math.floor(dec); const s = Math.round((dec-m)*60); return m+':'+(s<10?'0':'')+s; };
    set('res-kmh', speed_kmh.toFixed(1));
    set('res-mph', speed_mph.toFixed(1));
    set('res-pace_km', fmt(pace_km)+'/km');
    set('res-pace_mi', fmt(pace_mi)+'/mile');
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