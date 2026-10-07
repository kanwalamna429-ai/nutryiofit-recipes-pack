document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Batch Cooking Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const recipeSv=parseInt(document.getElementById('recipe_servings').value)||4;
    const target=parseInt(document.getElementById('target_portions').value)||20;
    const people=parseInt(document.getElementById('people').value)||1;
    const freezePortions=parseInt(document.getElementById('freeze_portions').value)||0;
    const batches=Math.ceil(target/recipeSv);
    const scaleFactor=Math.round(target/recipeSv*10)/10;
    const fridgePortions=target-freezePortions;
    const feedsDays=Math.round(target/people/3);
    set('res-batches',batches+'');
    set('res-scale_factor',scaleFactor+'×');
    set('res-fridge',fridgePortions+' ('+Math.ceil(fridgePortions/people/3)+' days)');
    set('res-freeze',freezePortions>0?freezePortions+' portions':'None');
    set('res-feeds_days',feedsDays+' days (3 meals/day)');
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