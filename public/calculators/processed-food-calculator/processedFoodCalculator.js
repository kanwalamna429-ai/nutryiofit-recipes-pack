document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Processed Food Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const soda=parseFloat(document.getElementById('soda_drinks').value)||0;
    const fast=parseFloat(document.getElementById('fast_food').value)||0;
    const snacks=parseFloat(document.getElementById('packaged_snacks').value)||0;
    const frozen=parseFloat(document.getElementById('frozen_meals').value)||0;
    const cereal=parseFloat(document.getElementById('breakfast_cereal').value)||0;
    const weeklyUpf=Math.round((soda*7+fast+snacks*7+frozen+cereal)*10)/10;
    const score=Math.min(100,Math.round(soda*12+fast/7*15+snacks*8+frozen/7*10+cereal/7*5));
    const risk=score>=70?'High Risk — significant UPF intake':score>=40?'Moderate Risk — above average UPF':score>=20?'Low-Moderate — some UPF intake':'Low Risk — minimal ultra-processed foods';
    const kcalEst=Math.round((soda*150+fast/7*600+snacks*200+frozen/7*450+cereal/7*120));
    set('res-score', score);
    set('res-risk', risk);
    set('res-weekly_upf', weeklyUpf+' servings');
    set('res-kcal_est', kcalEst+' kcal/day');
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