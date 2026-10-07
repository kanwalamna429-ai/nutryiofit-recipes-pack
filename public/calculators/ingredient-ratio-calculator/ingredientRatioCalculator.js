document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Ingredient Ratio Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const type = document.getElementById('recipe_type').value;
    const flour = parseFloat(document.getElementById('total_flour').value);
    if (!flour || flour <= 0) { err('Enter a flour / main ingredient amount.'); return; }
    const ratios = {
      bread:[{name:'Bread flour',pct:100},{name:'Water',pct:65},{name:'Salt',pct:2},{name:'Yeast (dried)',pct:1}],
      pasta:[{name:'00 flour',pct:100},{name:'Eggs (medium)',pct:0,exact:Math.round(flour/100),unit:'eggs'},{name:'Salt',pct:0,exact:0.5,unit:'tsp per 100g flour'},{name:'Olive oil',pct:5}],
      pie_crust:[{name:'All-purpose flour',pct:100},{name:'Cold butter',pct:60},{name:'Ice water',pct:25},{name:'Salt',pct:0,exact:0.5,unit:'tsp per 100g flour'}],
      pancake:[{name:'All-purpose flour',pct:100},{name:'Milk',pct:120},{name:'Eggs',pct:0,exact:Math.round(flour/60),unit:'eggs'},{name:'Butter (melted)',pct:15},{name:'Baking powder',pct:5},{name:'Sugar',pct:10}],
      cookie:[{name:'All-purpose flour',pct:100},{name:'Butter (room temp)',pct:75},{name:'Sugar',pct:75},{name:'Eggs',pct:0,exact:Math.round(flour/120),unit:'eggs'},{name:'Vanilla extract',pct:0,exact:1,unit:'tsp per 100g flour'},{name:'Baking soda',pct:0.5}],
      cake:[{name:'All-purpose flour',pct:100},{name:'Sugar',pct:100},{name:'Butter (room temp)',pct:75},{name:'Eggs',pct:0,exact:Math.round(flour/60),unit:'eggs'},{name:'Milk',pct:70},{name:'Baking powder',pct:4},{name:'Salt',pct:1}],
      vinaigrette:[{name:'Oil',pct:75},{name:'Vinegar / lemon juice',pct:25},{name:'Dijon mustard',pct:5},{name:'Salt',pct:0,exact:0.5,unit:'tsp per 100g oil'}],
      pizza:[{name:'Bread flour',pct:100},{name:'Water',pct:60},{name:'Salt',pct:2.5},{name:'Yeast (dried)',pct:0.5},{name:'Olive oil',pct:3}],
    };
    const r = ratios[type] || [];
    const el = document.getElementById('res-ratio-list');
    el.innerHTML = r.map(item => {
      let amount;
      if (item.exact !== undefined) { amount = item.exact+' '+item.unit; }
      else { amount = Math.round(flour * item.pct / 100 * 10)/10+'g'; }
      return `<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0;margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center"><div style="font-weight:600">${item.name}</div><div style="font-weight:700;color:#22c55e;font-size:1.1rem">${amount}</div></div>`;
    }).join('');
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