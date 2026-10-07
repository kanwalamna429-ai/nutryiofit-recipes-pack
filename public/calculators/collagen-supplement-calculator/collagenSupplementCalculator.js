document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Collagen Supplement Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    const goal = document.getElementById('goal').value;
    const type = document.getElementById('type').value;
    if (!age) { err('Enter your age.'); return; }
    let dose, timing, duration, cofactors;
    if (goal === 'skin') { dose = age > 50 ? 10 : 5; timing = 'Morning (empty stomach or with fruit)'; duration = '4–8 weeks'; cofactors = 'Vitamin C, hyaluronic acid'; }
    else if (goal === 'joint') { dose = type === 'type2' ? 10 : 15; timing = '30 min before exercise'; duration = '3–6 months'; cofactors = 'Vitamin C, glucosamine'; }
    else if (goal === 'muscle') { dose = 15; timing = 'Post-workout within 1 hour'; duration = '8–12 weeks'; cofactors = 'Vitamin C, protein shake'; }
    else if (goal === 'bone') { dose = 10; timing = 'Any time with food'; duration = '12+ months'; cofactors = 'Vitamin D, Calcium'; }
    else { dose = 5; timing = 'Morning or before bed'; duration = '4–8 weeks'; cofactors = 'L-glutamine, probiotics'; }
    set('res-dose', dose+'g');
    set('res-timing', timing);
    set('res-duration', duration);
    set('res-cofactors', cofactors);
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