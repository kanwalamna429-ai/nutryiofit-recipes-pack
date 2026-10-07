document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Fiber Intake Calculator' });

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
    const cals = parseFloat(document.getElementById('calories').value);
    if (!age || age <= 0 || !cals || cals < 500) { err('Enter valid age and calorie intake.'); return; }
    let target;
    if (gender === 'male') target = age >= 51 ? 30 : 38;
    else target = age >= 51 ? 21 : 25;
    const calBased = Math.round(cals / 1000 * 14);
    target = Math.max(target, calBased);
    set('res-target', target+'g');
    set('res-soluble', Math.round(target * 0.3)+'g');
    set('res-insoluble', Math.round(target * 0.7)+'g');
    set('res-tip', 'Soluble fiber (oats, beans, apples, citrus) helps lower cholesterol. Insoluble fiber (whole grains, vegetables, nuts) promotes bowel regularity. Increase fiber gradually to avoid digestive discomfort.');
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