document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Baking Substitution Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const ing = document.getElementById('ingredient').value;
    const amt = parseFloat(document.getElementById('amount').value)||1;
    const subs = {
      butter: [{name:'Coconut oil', ratio:0.75, note:'Use solid coconut oil, same texture'},{name:'Applesauce (reduce fat)', ratio:0.5, note:'Reduces fat, adds moisture, slight apple flavor'},{name:'Greek yogurt', ratio:0.75, note:'Great in muffins and quick breads'}],
      eggs: [{name:'Flax egg (1 tbsp flax + 3 tbsp water)', ratio:1, unit:'per egg', note:'Works well in dense baked goods'},{name:'Chia egg (1 tbsp chia + 3 tbsp water)', ratio:1, unit:'per egg', note:'Good for cookies and muffins'},{name:'Unsweetened applesauce', ratio:0.25, unit:'cups per egg', note:'Adds moisture, slight sweetness'}],
      buttermilk: [{name:'Milk + vinegar (1 tbsp vinegar per cup)', ratio:1, note:'Let sit 5 minutes before using'},{name:'Plain yogurt', ratio:0.75, note:'Thin with a little water if needed'},{name:'Kefir', ratio:1, note:'Direct 1:1 swap'}],
      sour_cream: [{name:'Greek yogurt', ratio:1, note:'Direct substitute, less fat if using low-fat'},{name:'Full-fat coconut cream', ratio:1, note:'Good for dairy-free baking'},{name:'Crème fraîche', ratio:1, note:'Direct 1:1 substitute'}],
      cream: [{name:'Full-fat coconut cream (chilled)', ratio:1, note:'For whipping; use full-fat only'},{name:'Evaporated milk', ratio:1, note:'For cooking and sauces only'},{name:'Half milk + half butter', ratio:1, note:'¾ cup milk + ¼ cup melted butter = 1 cup cream'}],
      bread_flour: [{name:'All-purpose flour + vital wheat gluten', ratio:1, note:'Add 1 tbsp vital wheat gluten per cup of AP flour'},{name:'All-purpose flour', ratio:1, note:'Works for most recipes, slightly less chewy'}],
      cake_flour: [{name:'All-purpose flour + corn starch', ratio:1, note:'14 tbsp AP flour + 2 tbsp cornstarch per cup'},{name:'All-purpose flour', ratio:1, note:'Texture will be slightly denser'}],
      baking_powder: [{name:'Baking soda + cream of tartar', ratio:1, unit:'per tsp (use ¼ tsp soda + ½ tsp cream of tartar)', note:'Exact substitute'},{name:'Self-rising flour', ratio:1, note:'Contains baking powder; omit additional salt'}],
      brown_sugar: [{name:'White sugar + molasses', ratio:1, note:'1 cup white sugar + 1 tbsp molasses = 1 cup light brown sugar'},{name:'Coconut sugar', ratio:1, note:'Direct 1:1, slightly less sweet, more minerals'},{name:'Honey or maple syrup', ratio:0.75, note:'Reduce liquid in recipe by ¼ cup per cup'}],
      corn_starch: [{name:'Arrowroot powder', ratio:1, note:'Direct 1:1 substitute, good for clear sauces'},{name:'All-purpose flour', ratio:2, note:'Use twice as much flour as cornstarch'},{name:'Potato starch', ratio:1, note:'1:1 ratio; not ideal for acidic sauces'}],
    };
    const sub = subs[ing] || [];
    const el = document.getElementById('res-sub-info');
    if (sub.length === 0) { el.innerHTML = '<p>No substitution data available for this ingredient.</p>'; ok(); return; }
    el.innerHTML = sub.map(s => {
      const scaled = Math.round(amt * s.ratio * 100) / 100;
      return `<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0;margin-bottom:0.5rem"><div style="font-weight:600">${s.name}</div><div style="font-size:0.875rem;color:#22c55e;font-weight:600">Use: ${scaled} ${s.unit||'(same units)'}</div><div style="font-size:0.8rem;color:#64748b;margin-top:0.25rem">${s.note}</div></div>`;
    }).join('');
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