document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Lactate Threshold Estimator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    let mhr = parseFloat(document.getElementById('mhr').value);
    const training = document.getElementById('training').value;
    if (!age && !mhr) { err('Enter age or max heart rate.'); return; }
    if (!mhr) mhr = 220 - age;
    const ltPcts = {beginner:0.78, recreational:0.83, trained:0.87, elite:0.92};
    const pct = ltPcts[training] || 0.83;
    const ltHr = Math.round(mhr * pct);
    set('res-lt_hr', ltHr+'bpm');
    set('res-lt_pct', Math.round(pct*100)+'% MHR');
    set('res-lt_pace', 'Your threshold pace depends on fitness. LT pace is typically 25–30 min race pace for 10K.');
    set('res-tip', 'Improve LT by: (1) Tempo runs at LT pace for 20–40 min, (2) Cruise intervals (3–4×10 min at LT with 3 min rest), (3) Progressive long runs ending at LT pace. Raising LT is the most impactful way to improve race performance for distances 5K+.');
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