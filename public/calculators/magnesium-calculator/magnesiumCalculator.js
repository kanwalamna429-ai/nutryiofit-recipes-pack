document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Magnesium Needs Calculator' });

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
    const health = document.getElementById('health').value;
    const diet = document.getElementById('diet').value;
    let rda = gender === 'male' ? (age >= 31 ? 420 : 400) : (age >= 31 ? 320 : 310);
    if (age < 18) rda = gender === 'male' ? 410 : 360;
    if (age < 14) rda = 240; if (age < 9) rda = 130;
    if (health === 'athletic') rda += 50; if (health === 'stress') rda += 50; if (health === 'diabetes') rda += 100;
    const dietPenalty = diet === 'processed' ? 0.85 : diet === 'whole_food' ? 1.0 : 0.95;
    const fromFood = Math.round(rda * dietPenalty);
    const supplement = Math.max(0, rda - fromFood);
    set('res-rda', rda+'mg');
    set('res-upper', '350mg (supplements only; no upper limit from food)');
    set('res-food_target', fromFood+'mg from food');
    set('res-supplement', supplement > 0 ? supplement+'mg supplement' : 'Diet likely sufficient');
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