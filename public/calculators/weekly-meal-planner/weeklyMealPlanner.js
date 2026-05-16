document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Weekly Meal Planner' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const tdee=parseFloat(document.getElementById('tdee').value);
    const meals=document.getElementById('meals_per_day').value;
    const goal=document.getElementById('goal').value;
    if(!tdee||tdee<500){err('Enter your daily calorie target.');return;}
    let adjTdee=goal==='lose'?tdee-500:goal==='gain'?tdee+300:tdee;
    const mealPlans={'3':[{name:'Breakfast',pct:0.30},{name:'Lunch',pct:0.35},{name:'Dinner',pct:0.35}],'4':[{name:'Breakfast',pct:0.28},{name:'Lunch',pct:0.33},{name:'Afternoon Snack',pct:0.12},{name:'Dinner',pct:0.27}],'5':[{name:'Breakfast',pct:0.25},{name:'Mid-Morning Snack',pct:0.10},{name:'Lunch',pct:0.30},{name:'Afternoon Snack',pct:0.10},{name:'Dinner',pct:0.25}],'6':[{name:'Meal 1',pct:0.18},{name:'Meal 2',pct:0.17},{name:'Meal 3',pct:0.18},{name:'Meal 4',pct:0.17},{name:'Meal 5',pct:0.15},{name:'Meal 6',pct:0.15}]};
    const plan=mealPlans[meals]||mealPlans['3'];
    const el=document.getElementById('res-meal-plan');
    el.innerHTML='<div style="display:grid;gap:0.5rem">'+plan.map(m=>{const mCal=Math.round(adjTdee*m.pct);const prot=Math.round(mCal*0.30/4);const carbs=Math.round(mCal*0.40/4);const fat=Math.round(mCal*0.30/9);return '<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0"><div style="display:flex;justify-content:space-between;align-items:center"><strong>'+m.name+'</strong><strong style="color:#22c55e">'+mCal+' kcal</strong></div><div style="font-size:0.75rem;color:#64748b;margin-top:0.25rem">'+prot+'g protein · '+carbs+'g carbs · '+fat+'g fat</div></div>';}).join('')+'</div><div class="info-card" style="margin-top:1rem"><h3>Daily Total</h3><p>'+Math.round(adjTdee).toLocaleString()+' kcal/day ('+(goal==='lose'?'Fat loss deficit':goal==='gain'?'Muscle gain surplus':'Maintenance')+' — adjusted from '+tdee+' kcal TDEE)</p></div>';
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