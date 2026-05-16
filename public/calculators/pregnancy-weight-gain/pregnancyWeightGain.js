document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Pregnancy Weight Gain Calculator' });

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
    let h = parseFloat(document.getElementById('height').value);
    let w = parseFloat(document.getElementById('pre_weight').value);
    const week = parseInt(document.getElementById('current_week').value);
    const twins = document.getElementById('twins').value === 'twins';
    if (!h || !w || !week) { err('Enter height, weight, and gestational week.'); return; }
    if (unit === 'imperial') { h *= 2.54; w *= 0.453592; }
    const bmi = w / ((h/100)**2);
    let minGain, maxGain, rate;
    if (twins) { minGain = bmi < 25 ? 17 : bmi < 30 ? 14 : 11; maxGain = bmi < 25 ? 25 : bmi < 30 ? 23 : 19; rate = 0.68; }
    else if (bmi < 18.5) { minGain = 12.5; maxGain = 18; rate = 0.51; }
    else if (bmi < 25) { minGain = 11.5; maxGain = 16; rate = 0.42; }
    else if (bmi < 30) { minGain = 7; maxGain = 11.5; rate = 0.28; }
    else { minGain = 5; maxGain = 9; rate = 0.22; }
    const firstTri = 1;
    const currentRec = week <= 13 ? firstTri : firstTri + rate * (week - 13);
    const cats = {underweight:'Underweight (BMI < 18.5) — Allow yourself to gain at the higher end of the range.',normal:'Normal weight (BMI 18.5–24.9) — You're on track. Aim for the middle of your recommended range.',overweight:'Overweight (BMI 25–29.9) — Focus on nutrient-dense foods. Excess weight gain increases risks.',obese:'Obese (BMI ≥ 30) — Work closely with your OB. Limiting gain reduces complication risks.'};
    set('res-bmi', bmi.toFixed(1));
    set('res-total', minGain+'–'+maxGain+'kg');
    set('res-current_rec', currentRec.toFixed(1)+'kg');
    set('res-per_week', rate.toFixed(2)+'kg/wk');
    const cat = bmi < 18.5 ? cats.underweight : bmi < 25 ? cats.normal : bmi < 30 ? cats.overweight : cats.obese;
    set('res-note', cat);
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