document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Pantry Stock Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const people=parseInt(document.getElementById('people').value)||1;
    const weeks=parseInt(document.getElementById('weeks').value)||1;
    const meals=parseInt(document.getElementById('meals_home').value)||14;
    const scale=people*weeks;
    const mealScale=(people*meals*weeks)/14;
    const staples=[
      {cat:'Grains & Starches',items:[['Rice (kg)',Math.ceil(mealScale*0.2)],['Pasta (kg)',Math.ceil(mealScale*0.15)],['Oats (kg)',Math.ceil(scale*0.3)],['Flour, all-purpose (kg)',Math.ceil(scale*0.25)],['Bread (loaves)',Math.ceil(scale*0.5)]]},
      {cat:'Canned & Preserved',items:[['Canned tomatoes',Math.ceil(mealScale*0.6)],['Canned chickpeas / lentils',Math.ceil(mealScale*0.4)],['Canned tuna / salmon',Math.ceil(mealScale*0.3)],['Canned coconut milk',Math.ceil(mealScale*0.2)],['Stock / broth (cartons)',Math.ceil(mealScale*0.4)]]},
      {cat:'Oils & Condiments',items:[['Olive oil (500ml bottles)',Math.ceil(scale*0.25)],['Soy sauce / tamari (bottles)',Math.ceil(scale*0.15)],['Apple cider vinegar',weeks<=4?'1 bottle':'2 bottles'],['Dijon mustard',weeks<=8?'1 jar':'2 jars']]},
      {cat:'Baking Essentials',items:[['Baking powder (cans)',Math.ceil(scale*0.1)],['Baking soda (boxes)',Math.ceil(scale*0.1)],['Honey / maple syrup',weeks<=6?'1 jar':'2 jars'],['Vanilla extract','1 bottle (lasts months)']]},
      {cat:'Spices & Herbs',items:[['Salt, sea/kosher (kg)',Math.ceil(scale*0.05)],['Black pepper',weeks<=8?'1 jar':'2 jars'],['Cumin, paprika, turmeric','1 jar each (if running low)'],['Dried herbs (oregano, thyme)','Check and restock as needed']]},
    ];
    const el=document.getElementById('res-pantry');
    el.innerHTML=staples.map(cat=>'<div style="margin-bottom:1rem"><div style="font-weight:700;font-size:0.875rem;text-transform:uppercase;color:#64748b;margin-bottom:0.5rem">'+cat.cat+'</div>'+cat.items.map(([name,qty])=>'<div style="display:flex;justify-content:space-between;padding:0.375rem 0;border-bottom:1px solid #f1f5f9;font-size:0.875rem"><span>'+name+'</span><strong>'+qty+'</strong></div>').join('')+'</div>').join('');
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