document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calcium Needs Calculator' });

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
    if (age <= 3) rda = 700;
    else if (age <= 8) rda = 1000;
    else if (age <= 18) rda = 1300;
    else if (gender === 'female' && age >= 51) rda = 1200;
    else if (gender === 'male' && age >= 71) rda = 1200;
    else if (age >= 19) rda = 1000;
    if (life === 'osteoporosis') rda = Math.max(rda, 1200);
    const upper = age >= 51 ? 2000 : 2500;
    set('res-mg', rda.toLocaleString()+'mg');
    set('res-servings', Math.ceil(rda/300)+'–'+Math.ceil(rda/250));
    set('res-upper', upper.toLocaleString()+'mg');
    const d3note = diet === 'low' ? 'Since you consume little dairy, focus on fortified plant milks, tofu, almonds, and leafy greens. Vitamin D is essential for calcium absorption.' : 'Pair calcium-rich foods with Vitamin D for optimal absorption.';
    set('res-info', d3note);
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