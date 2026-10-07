document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Serving Size Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const total = parseFloat(document.getElementById('total_weight').value);
    const servings = parseInt(document.getElementById('servings').value);
    const cals = parseFloat(document.getElementById('total_calories').value)||0;
    const prot = parseFloat(document.getElementById('total_protein').value)||0;
    const carbs = parseFloat(document.getElementById('total_carbs').value)||0;
    const fat = parseFloat(document.getElementById('total_fat').value)||0;
    if (!total || !servings || servings <= 0) { err('Enter total weight and servings.'); return; }
    const wps = Math.round(total / servings);
    set('res-weight', wps+'g');
    set('res-calories', cals > 0 ? Math.round(cals/servings)+' kcal' : 'N/A');
    set('res-protein', prot > 0 ? Math.round(prot/servings*10)/10+'g' : 'N/A');
    set('res-carbs', carbs > 0 ? Math.round(carbs/servings*10)/10+'g' : 'N/A');
    set('res-fat', fat > 0 ? Math.round(fat/servings*10)/10+'g' : 'N/A');
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