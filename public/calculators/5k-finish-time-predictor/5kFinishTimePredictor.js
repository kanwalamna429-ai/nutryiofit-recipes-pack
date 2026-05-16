document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: '5K Finish Time Predictor' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const type = document.getElementById('input_type').value;
    let paceSecPerKm;
    if (type === 'pace') {
      const m = parseInt(document.getElementById('pace_min').value)||0;
      const s = parseInt(document.getElementById('pace_sec').value)||0;
      if (m === 0 && s === 0) { err('Enter a valid training pace.'); return; }
      paceSecPerKm = m*60+s;
    } else {
      const m = parseInt(document.getElementById('trial_min').value)||0;
      const s = parseInt(document.getElementById('trial_sec').value)||0;
      if (m === 0 && s === 0) { err('Enter a valid time trial result.'); return; }
      paceSecPerKm = (m*60+s) / 5;
    }
    const racePace = paceSecPerKm * 0.92;
    const total5kSec = racePace * 5;
    const fmt = (sec) => { const m = Math.floor(sec/60); const s = Math.round(sec%60); return m+':'+(s<10?'0':'')+s; };
    const fmtPace = (sec) => { const m = Math.floor(sec/60); const s = Math.round(sec%60); return m+':'+(s<10?'0':'')+s; };
    set('res-5k', fmt(total5kSec));
    set('res-pace_km', fmtPace(racePace)+'/km');
    set('res-pace_mi', fmtPace(racePace*1.60934)+'/mi');
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