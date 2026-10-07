document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Zinc Needs Calculator' });

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
    const diet = document.getElementById('diet').value;
    const health = document.getElementById('health').value;
    let rda = gender === 'male' ? 11 : 8;
    if (health === 'pregnant') rda = 11; else if (health === 'breastfeeding') rda = 12;
    if (age < 14) rda = gender === 'male' ? 8 : 8; if (age < 9) rda = 5; if (age < 4) rda = 3;
    if (diet === 'vegetarian') rda = Math.round(rda * 1.5);
    if (diet === 'vegan') rda = Math.round(rda * 1.8);
    if (health === 'athlete') rda += 2;
    const upper = age > 18 ? 40 : 34;
    const foodSource = diet === 'omnivore' ? 'Oysters (74mg/3oz), beef, pumpkin seeds' : 'Pumpkin seeds (2mg/oz), hemp seeds, legumes, fortified cereals';
    set('res-rda', rda+'mg');
    set('res-upper', upper+'mg');
    set('res-type', diet !== 'omnivore' ? '1.5–1.8× standard (plant-based)' : 'Standard RDA');
    set('res-food_source', foodSource);
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