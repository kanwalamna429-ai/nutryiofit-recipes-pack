document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Protein per Dollar Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const price=parseFloat(document.getElementById('food_price').value);
    const weight=parseFloat(document.getElementById('package_weight').value);
    const protPer100=parseFloat(document.getElementById('protein_per_100g').value);
    const serving=parseFloat(document.getElementById('serving_size').value);
    if(!price||!weight||!protPer100||!serving){err('Fill in all fields.');return;}
    const totalProtein=weight*protPer100/100;
    const protPerDollar=Math.round(totalProtein/price*10)/10;
    const costPer100gProt=Math.round(price/totalProtein*100*100)/100;
    const costPerServing=Math.round(price/weight*serving*100)/100;
    const protPerServing=Math.round(serving*protPer100/100*10)/10;
    set('res-prot_per_dollar',protPerDollar+'g/$');
    set('res-cost_per_100g_prot','$'+costPer100gProt);
    set('res-cost_per_serving','$'+costPerServing.toFixed(2));
    set('res-protein_per_serving',protPerServing+'g');
    const rating=protPerDollar>=30?'Excellent Value':protPerDollar>=20?'Good Value':protPerDollar>=10?'Average Value':'Expensive';
    set('res-rating',rating);
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