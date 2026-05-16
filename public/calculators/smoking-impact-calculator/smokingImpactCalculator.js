document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Smoking Impact Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cpd = parseInt(document.getElementById('cigarettes_day').value)||0;
    const years = parseInt(document.getElementById('years_smoked').value)||0;
    const costPack = parseFloat(document.getElementById('cost_per_pack').value)||10;
    const age = parseInt(document.getElementById('age').value)||35;
    if (!cpd || cpd <= 0) { err('Enter cigarettes per day.'); return; }
    const packYears = (cpd / 20) * years;
    const annualCost = Math.round(cpd / 20 * 365 * costPack);
    const remainingYears = Math.max(0, 65 - age);
    const lifetimeCost = Math.round(annualCost * remainingYears);
    const lifeLost = cpd <= 10 ? 5 : cpd <= 20 ? 8 : cpd <= 30 ? 10 : 13;
    set('res-pack_years', packYears.toFixed(1));
    set('res-annual_cost', '$'+annualCost.toLocaleString());
    set('res-lifetime_cost', '$'+lifetimeCost.toLocaleString());
    set('res-life_lost', '-'+lifeLost+' years vs non-smoker');
    set('res-quit_gain', 'Lungs heal, risk of heart attack halves in 1 year');
    set('res-5yr_gain', 'Stroke risk same as non-smoker; mouth/throat cancer risk halves');
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