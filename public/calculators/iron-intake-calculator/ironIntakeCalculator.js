document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Iron Intake Calculator' });

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
    const life = document.getElementById('lifestage').value;
    const diet = document.getElementById('diet').value;
    if (!age || age <= 0) { err('Enter a valid age.'); return; }
    let rda;
    if (gender === 'female') {
      if (life === 'pregnant') rda = 27;
      else if (life === 'breastfeeding') rda = 9;
      else if (age >= 51) rda = 8;
      else if (age >= 19) rda = 18;
      else rda = 15;
    } else {
      rda = age >= 19 ? 8 : 11;
    }
    if (diet === 'vegetarian') rda = Math.round(rda * 1.8);
    if (life === 'athlete') rda = Math.round(rda * 1.3);
    set('res-mg', rda+'mg');
    set('res-type', life === 'pregnant' ? 'Elevated (Pregnancy)' : diet === 'vegetarian' ? '1.8x (Plant-Based)' : 'Standard RDA');
    set('res-upper', '45mg');
    set('res-info', 'Heme iron (meat, fish, poultry) is absorbed 2–3x better than non-heme iron (plants). Pair plant-based iron with vitamin C to enhance absorption. Avoid coffee/tea with iron-rich meals.');
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