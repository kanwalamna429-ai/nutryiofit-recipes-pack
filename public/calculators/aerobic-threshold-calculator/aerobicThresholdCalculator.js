document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Aerobic Threshold Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    let mhr = parseFloat(document.getElementById('mhr').value);
    const rhr = parseFloat(document.getElementById('rhr').value)||60;
    if (!age && !mhr) { err('Enter age or max heart rate.'); return; }
    if (!mhr) mhr = 220 - age;
    const atLo = Math.round(mhr * 0.65);
    const atHi = Math.round(mhr * 0.75);
    const ltLo = Math.round(mhr * 0.82);
    const ltHi = Math.round(mhr * 0.88);
    set('res-at_lo', atLo+'bpm');
    set('res-at_hi', atHi+'bpm');
    set('res-lt_lo', ltLo+'bpm');
    set('res-lt_hi', ltHi+'bpm');
    set('res-tip', '80% of your training should be in the aerobic threshold zone (Zone 2). This builds the aerobic engine that supports all faster running. You should be able to hold a full conversation at this intensity. Spending too much time above this zone (Zone 3 "junk miles") limits development.');
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