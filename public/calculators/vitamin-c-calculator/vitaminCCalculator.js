document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Vitamin C Needs Calculator' });

  let gender = 'male';
  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
    });
  });
  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    if (!age) { err('Enter your age.'); return; }
    const smoker = document.getElementById('smoker').value === 'yes';
    const health = document.getElementById('health').value;
    let rda = gender === 'male' ? 90 : 75;
    if (age < 14) rda = 65; if (age < 9) rda = 45; if (age < 4) rda = 15;
    if (smoker) rda += 35;
    let supplement = 0;
    if (health === 'immune_support') { rda = Math.max(rda, 200); supplement = 500; }
    else if (health === 'wound') { rda = Math.max(rda, 300); supplement = 500; }
    else if (health === 'cancer') supplement = 1000;
    const upper = age > 18 ? 2000 : age > 14 ? 1800 : 1200;
    const orangeEq = (rda / 70).toFixed(1);
    set('res-rda', rda+'mg');
    set('res-upper', upper+'mg');
    set('res-supplement', supplement > 0 ? supplement+'mg (consult doctor)' : 'Food sources likely sufficient');
    set('res-food_servings', orangeEq+' oranges');
    set('res-tip', 'Best food sources: bell peppers (95mg/cup), kiwi (64mg), broccoli (51mg per cup), strawberries (89mg/cup), citrus fruits (70mg). Vitamin C is water-soluble — excess is excreted. Cook briefly to preserve vitamin C content.');
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