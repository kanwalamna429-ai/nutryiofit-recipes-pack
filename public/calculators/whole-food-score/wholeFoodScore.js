document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Whole Food Score' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const total=parseInt(document.getElementById('meals_total').value)||5;
    const whole=parseInt(document.getElementById('whole_food_meals').value)||0;
    const homemade=parseInt(document.getElementById('homemade_pct').value)||0;
    const veg=parseInt(document.getElementById('vegetables_daily').value)||0;
    const ultra=parseInt(document.getElementById('ultra_processed').value)||0;
    const wholePct=total>0?Math.round(whole/total*100):0;
    let score=wholePct*0.4+homemade*0.3+Math.min(veg*8,24)-ultra*8;
    score=Math.min(100,Math.max(0,Math.round(score)));
    const level=score>=80?'Excellent — Whole Food Plant-Rich':score>=60?'Good — Mostly Whole Foods':score>=40?'Mixed — Room for Improvement':'Poor — High in Processed Foods';
    set('res-score', score);
    set('res-whole_pct', wholePct+'%');
    set('res-level', level);
    const tip=score<40?'Start by cooking one more meal at home per day and replacing one processed snack with fresh fruit or vegetables.':score<60?'Focus on increasing vegetable variety and reducing ultra-processed foods to 1 or fewer per day.':'Great foundation! Boost variety by trying 2 new vegetables each week.';
    set('res-tip', tip);
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