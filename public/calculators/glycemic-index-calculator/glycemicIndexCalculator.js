document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Glycemic Index Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const foods = {white_bread:75,whole_wheat:69,brown_rice:68,white_rice:72,pasta:49,oats:55,cornflakes:81,banana:51,apple:36,orange:43,watermelon:72,potato_boiled:78,sweet_potato:63,carrot:16,lentils:32,chickpeas:28,ice_cream:51,chocolate:40,honey:61,table_sugar:65};
    const food = document.getElementById('food').value;
    const carbs = parseFloat(document.getElementById('serving_carbs').value);
    const gi = foods[food];
    if (!gi || !carbs || carbs <= 0) { err('Select a food and enter carb grams.'); return; }
    const gl = Math.round(gi * carbs / 100);
    const giCat = gi <= 55 ? 'Low GI (≤ 55)' : gi <= 69 ? 'Medium GI (56-69)' : 'High GI (≥ 70)';
    const glCat = gl <= 10 ? 'Low GL (≤ 10)' : gl <= 19 ? 'Medium GL (11-19)' : 'High GL (≥ 20)';
    set('res-gi', gi+'');
    set('res-category', giCat);
    set('res-gl', gl+'');
    set('res-gl_cat', glCat);
    const note = gi <= 55 ? 'Low GI foods cause a slow, gradual rise in blood sugar. Ideal for sustained energy, diabetes management, and weight control.' : gi <= 69 ? 'Medium GI foods have a moderate effect on blood sugar. Portion control and food pairing with protein/fat can lower the glycemic response.' : 'High GI foods cause rapid blood sugar spikes. Pair with protein, fat, or fiber to blunt the glycemic response. Reduce portion size or choose a lower-GI alternative.';
    set('res-note', note);
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