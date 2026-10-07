document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Food Waste Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const grocery=parseFloat(document.getElementById('grocery_weekly').value);
    const wastePct=parseFloat(document.getElementById('waste_pct').value)||0;
    if(!grocery||grocery<=0){err('Enter your weekly grocery spend.');return;}
    const weeklyWaste=Math.round(grocery*wastePct/100*100)/100;
    const annualWaste=Math.round(weeklyWaste*52);
    const kgWaste=Math.round(weeklyWaste/5*10)/10;
    const co2Annual=Math.round(kgWaste*52*2.5);
    set('res-weekly_waste','$'+weeklyWaste.toFixed(2));
    set('res-annual_waste','$'+annualWaste.toLocaleString());
    set('res-kg_per_week',kgWaste+'kg');
    set('res-co2',co2Annual+'kg CO2');
    const tips=wastePct>30?'High waste: Plan meals for the week before shopping. Shop more frequently for perishables. Freeze bread, meat, and vegetables before they expire.':wastePct>15?'Moderate waste: Do a weekly fridge audit to use up ingredients near expiry. Learn to "cook from the fridge" before shopping again.':'Good job keeping waste low! Composting remaining food scraps eliminates the environmental impact.';
    set('res-tip',tips);
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