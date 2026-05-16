document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Alcohol Impact Calculator' });

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
    const weekly = parseInt(document.getElementById('weekly_drinks').value)||0;
    const binge = parseInt(document.getElementById('binge_days').value)||0;
    const type = document.getElementById('drink_type').value;
    const calsPerDrink = {wine:125, beer:153, spirits:97, mixed:180}[type]||150;
    const weeklyUnits = weekly;
    const annualCals = Math.round(weekly * 52 * calsPerDrink);
    const annualCost = Math.round(weekly * 52 * 8);
    const guidelineLow = gender === 'male' ? 14 : 7;
    const guidelineHigh = gender === 'male' ? 21 : 14;
    let risk;
    if (weekly === 0) risk = 'No risk from alcohol';
    else if (weekly <= guidelineLow && binge === 0) risk = 'Low risk';
    else if (weekly <= guidelineHigh && binge <= 1) risk = 'Moderate risk';
    else if (weekly <= guidelineHigh * 1.5 || binge <= 4) risk = 'High risk';
    else risk = 'Very High risk';
    set('res-weekly_units', weeklyUnits+'');
    set('res-annual_cals', annualCals.toLocaleString()+'');
    set('res-annual_cost', '$'+annualCost.toLocaleString());
    set('res-risk', risk);
    const guideline = gender === 'male' ? 'No more than 14 drinks/week (UK: 14 units). No more than 4 in a single day. 2+ alcohol-free days/week.' : 'No more than 7 drinks/week. No more than 3 in a single day. 2+ alcohol-free days/week.';
    set('res-note', guideline+' Alcohol is classified as a Group 1 carcinogen. Any amount carries some risk; the question is of degree.');
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