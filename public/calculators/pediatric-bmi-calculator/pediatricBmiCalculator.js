document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Pediatric BMI Calculator' });

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
    const age = parseFloat(document.getElementById('age').value);
    const ht = parseFloat(document.getElementById('height').value);
    const wt = parseFloat(document.getElementById('weight').value);
    if (!age || !ht || !wt) { err('Enter age, height, and weight.'); return; }
    const bmi = wt / ((ht/100)**2);
    const bmiMean = gender === 'male' ? 15.5 + age*0.2 : 15.2 + age*0.3;
    const bmiSD = 2.5;
    const z = (bmi - bmiMean) / bmiSD;
    const zToP = (z) => { const x = z >= 0 ? z : -z; const p = 1/(1+0.2316419*x); const t = p; const prob = 1-0.3989423*Math.exp(-x*x/2)*(0.3193815*t-0.3565638*t*t+1.781478*t**3-1.821256*t**4+1.330274*t**5); return z >= 0 ? Math.round(prob*100) : Math.round((1-prob)*100); };
    const pct = zToP(z);
    let category;
    if (pct < 5) category = 'Underweight';
    else if (pct < 85) category = 'Healthy Weight';
    else if (pct < 95) category = 'Overweight';
    else category = 'Obese';
    set('res-bmi', bmi.toFixed(1));
    set('res-category', category);
    set('res-pct', pct+'th percentile');
    set('res-zscore', z.toFixed(2));
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