document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Diet Diversity Score' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const veg=parseInt(document.getElementById('different_veg').value)||0;
    const fruit=parseInt(document.getElementById('different_fruits').value)||0;
    const protein=parseInt(document.getElementById('different_proteins').value)||0;
    const grains=parseInt(document.getElementById('different_grains').value)||0;
    const fermented=parseInt(document.getElementById('fermented').value)||0;
    const herbs=parseInt(document.getElementById('herbs_spices').value)||0;
    const totalFoods=veg+fruit+protein+grains+Math.ceil(fermented/2)+Math.ceil(herbs/2);
    const score=Math.min(100,Math.round(Math.min(30,veg*2.5)+Math.min(15,fruit*2.5)+Math.min(20,protein*3.5)+Math.min(10,grains*2.5)+Math.min(15,fermented*3)+Math.min(10,herbs*1.5)));
    const level=score>=80?'Exceptional Diversity':score>=60?'Good Diversity':score>=40?'Moderate Diversity':'Low Diversity';
    const gut=score>=70?'Excellent for microbiome health':score>=50?'Good — aim for 30+ unique plant foods/week':'Limited — low diversity linked to reduced microbiome richness';
    set('res-score', score);
    set('res-level', level);
    set('res-total_foods', totalFoods+'');
    set('res-gut_health', gut);
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