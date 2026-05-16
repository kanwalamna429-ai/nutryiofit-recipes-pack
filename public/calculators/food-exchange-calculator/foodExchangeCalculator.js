document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Food Exchange Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const starch = parseFloat(document.getElementById('starch').value)||0;
    const protein = parseFloat(document.getElementById('protein').value)||0;
    const fat = parseFloat(document.getElementById('fat').value)||0;
    const fruit = parseFloat(document.getElementById('fruit').value)||0;
    const milk = parseFloat(document.getElementById('milk').value)||0;
    const veg = parseFloat(document.getElementById('veg').value)||0;
    const calories = starch*80 + protein*75 + fat*45 + fruit*60 + milk*90 + veg*25;
    const totalProtein = starch*3 + protein*7 + milk*8 + veg*2;
    const totalCarbs = starch*15 + fruit*15 + milk*12 + veg*5;
    const totalFat = protein*5 + fat*5 + milk*3;
    set('res-calories', Math.round(calories)+'');
    set('res-protein', Math.round(totalProtein)+'g');
    set('res-carbs', Math.round(totalCarbs)+'g');
    set('res-fat', Math.round(totalFat)+'g');
    set('res-info', 'Exchange system: 1 Starch = 15g carbs, 3g protein, 80 kcal | 1 Protein = 7g protein, 5g fat, 75 kcal | 1 Fat = 5g fat, 45 kcal | 1 Fruit = 15g carbs, 60 kcal | 1 Milk = 12g carbs, 8g protein, 90 kcal | 1 Veg = 5g carbs, 2g protein, 25 kcal');
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