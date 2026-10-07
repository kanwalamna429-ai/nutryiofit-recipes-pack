document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Nutritional Balance Score' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const veg=parseFloat(document.getElementById('vegetables').value)||0;
    const fruit=parseFloat(document.getElementById('fruits').value)||0;
    const grains=parseFloat(document.getElementById('grains').value)||0;
    const wgPct=parseFloat(document.getElementById('whole_grains_pct').value)||0;
    const prot=parseFloat(document.getElementById('protein').value)||0;
    const dairy=parseFloat(document.getElementById('dairy').value)||0;
    const sodium=parseFloat(document.getElementById('sodium').value)||2300;
    const sugar=parseFloat(document.getElementById('added_sugar').value)||0;
    const vegScore=Math.min(20,veg/2.5*20);
    const fruitScore=Math.min(15,fruit/2*15);
    const wgScore=Math.min(15,(wgPct/100)*15);
    const protScore=Math.min(15,prot/5.5*15);
    const dairyScore=Math.min(10,dairy/3*10);
    const sodiumPenalty=sodium>3400?15:sodium>2300?8:0;
    const sugarPenalty=sugar>12?15:sugar>6?8:0;
    const score=Math.min(100,Math.max(0,Math.round(vegScore+fruitScore+wgScore+protScore+dairyScore+25-sodiumPenalty-sugarPenalty)));
    const hei=Math.min(100,Math.round(score*0.9+Math.random()*5));
    set('res-score',score);
    set('res-hei_approx',hei+'');
    const level=score>=80?'Excellent nutritional balance':score>=60?'Good — with some areas to improve':score>=40?'Fair — significant gaps present':'Poor — major nutritional imbalances';
    set('res-level',level);
    const priorities=[];
    if(veg<2)priorities.push('Increase vegetables to 2.5+ cups/day');
    if(fruit<1.5)priorities.push('Add more fruit (aim 1.5-2 cups/day)');
    if(wgPct<50)priorities.push('Switch to whole grains (aim 50%+)');
    if(sodium>2300)priorities.push('Reduce sodium below 2300mg/day');
    if(sugar>6)priorities.push('Cut added sugar below 6 tsp/day');
    set('res-top_priority',priorities[0]||'Maintain your excellent dietary balance!');
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