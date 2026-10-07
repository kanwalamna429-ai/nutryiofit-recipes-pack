document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Growth Percentile Calculator' });

  let gender = 'male';
  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
    });
  });
  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const ageMo = parseInt(document.getElementById('age_months').value);
    const ht = parseFloat(document.getElementById('height_cm').value);
    const wt = parseFloat(document.getElementById('weight_kg').value);
    if (!ageMo || !ht || !wt) { err('Enter age, height, and weight.'); return; }
    const ageYr = ageMo / 12;
    const htMean = gender === 'male' ? 75 + (ageYr * 6.5) : 74 + (ageYr * 6.3);
    const htSD = 3.5;
    const wtMean = gender === 'male' ? 8 + (ageYr * 2.5) : 7.5 + (ageYr * 2.4);
    const wtSD = 2.5;
    const htZ = (ht - htMean) / htSD;
    const wtZ = (wt - wtMean) / wtSD;
    const zToP = (z) => { const x = z >= 0 ? z : -z; const p = 1/(1+0.2316419*x); const t = p; const prob = 1-0.3989423*Math.exp(-x*x/2)*(0.3193815*t-0.3565638*t*t+1.781478*t**3-1.821256*t**4+1.330274*t**5); return z >= 0 ? Math.round(prob*100) : Math.round((1-prob)*100); };
    set('res-height_pct', zToP(htZ)+'th');
    set('res-weight_pct', zToP(wtZ)+'th');
    set('res-height_zscore', htZ.toFixed(2));
    set('res-weight_zscore', wtZ.toFixed(2));
    set('res-note', 'Percentiles from 5th–95th are considered normal. 50th percentile = average for age/sex. Consistency of tracking is more important than a single reading — a child tracking at the 25th percentile consistently is growing normally. Consult your pediatrician for any concerns.');
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