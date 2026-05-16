document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Meal Cost Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const c1=(parseFloat(document.getElementById('ing1_cost').value)||0)*(parseFloat(document.getElementById('ing1_used_pct').value)||100)/100;
    const c2=(parseFloat(document.getElementById('ing2_cost').value)||0)*(parseFloat(document.getElementById('ing2_used_pct').value)||100)/100;
    const c3=(parseFloat(document.getElementById('ing3_cost').value)||0)*(parseFloat(document.getElementById('ing3_used_pct').value)||100)/100;
    const pantry=parseFloat(document.getElementById('pantry_estimate').value)||0;
    const servings=parseInt(document.getElementById('servings').value)||4;
    const total=c1+c2+c3+pantry;
    const perServing=total/servings;
    set('res-total_cost','$'+total.toFixed(2));
    set('res-per_serving','$'+perServing.toFixed(2));
    set('res-vs_restaurant','$'+(18-perServing).toFixed(2)+'/serving saved');
    set('res-vs_takeout','$'+(22-perServing).toFixed(2)+'/serving saved');
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