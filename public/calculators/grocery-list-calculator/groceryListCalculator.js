document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Grocery List Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const people=parseInt(document.getElementById('people').value)||1;
    const weeks=parseInt(document.getElementById('weeks').value)||1;
    const mealsHome=parseFloat(document.getElementById('meals_home').value)||2;
    const diet=document.getElementById('diet_type').value;
    const mealsTotal=people*weeks*7*mealsHome;
    const base=(qty)=>Math.ceil(qty*(mealsTotal/14));
    const items=[
      {cat:'Proteins',items:diet==='vegan'?[['Firm tofu',base(3)+'× 400g blocks'],['Tempeh',base(2)+'× 200g packs'],['Canned lentils / chickpeas',base(6)+' cans'],['Edamame',base(2)+' bags']]:diet==='vegetarian'?[['Eggs',base(12)+' eggs'],['Greek yogurt',base(4)+' cups'],['Cottage cheese',base(2)+'× 500g'],['Canned lentils',base(4)+' cans']]:[['Chicken breast',Math.round(base(1.5)*people*0.6*weeks)+'g'],['Canned tuna/salmon',base(4)+' cans'],['Eggs',base(8)+' eggs'],['Greek yogurt',base(3)+' cups']]},
      {cat:'Vegetables',items:[['Leafy greens (spinach/kale)',Math.ceil(mealsTotal/7)+' bags/bunches'],['Broccoli / cauliflower',Math.ceil(mealsTotal/10)+' heads'],['Tomatoes',Math.ceil(mealsTotal/4)+''],['Bell peppers',Math.ceil(mealsTotal/5)+''],['Onions',Math.ceil(mealsTotal/6)+' onions'],['Carrots',Math.ceil(mealsTotal/8)+''],['Garlic',Math.ceil(mealsTotal/20)+' bulbs']]},
      {cat:'Fruits',items:[['Bananas',Math.ceil(mealsTotal/3)+''],['Apples',Math.ceil(mealsTotal/5)+''],['Mixed berries',Math.ceil(weeks*people)+' bags (frozen OK)']]},
      {cat:'Grains & Starches',items:[['Oats',Math.ceil(weeks*people*0.5)+'kg'],['Brown rice',Math.ceil(weeks*people*0.75)+'kg'],['Whole wheat bread',Math.ceil(weeks*people)+' loaves'],['Pasta / noodles',Math.ceil(weeks*people*0.5)+'kg']]},
      {cat:'Healthy Fats',items:[['Olive oil',weeks<=1?'1 bottle':weeks+' bottles (if needed)'],['Avocados',Math.ceil(mealsTotal/10)+''],['Mixed nuts',Math.ceil(weeks*people*0.2)+'kg bag']]},
    ];
    const el=document.getElementById('res-grocery-list');
    el.innerHTML=items.map(cat=>'<div style="margin-bottom:1rem"><div style="font-weight:700;font-size:0.875rem;text-transform:uppercase;color:#64748b;margin-bottom:0.5rem">'+cat.cat+'</div>'+cat.items.map(([name,qty])=>'<div style="display:flex;justify-content:space-between;padding:0.375rem 0;border-bottom:1px solid #f1f5f9;font-size:0.875rem"><span>'+name+'</span><strong>'+qty+'</strong></div>').join('')+'</div>').join('');
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