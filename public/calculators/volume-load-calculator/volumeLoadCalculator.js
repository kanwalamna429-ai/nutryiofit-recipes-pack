document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Volume Load Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const s1 = parseInt(document.getElementById('exercise1_sets').value)||0;
    const r1 = parseInt(document.getElementById('exercise1_reps').value)||0;
    const w1 = parseFloat(document.getElementById('exercise1_weight').value)||0;
    const s2 = parseInt(document.getElementById('exercise2_sets').value)||0;
    const r2 = parseInt(document.getElementById('exercise2_reps').value)||0;
    const w2 = parseFloat(document.getElementById('exercise2_weight').value)||0;
    if (!s1 || !r1 || !w1) { err('Enter at least sets, reps, and weight for Exercise 1.'); return; }
    const v1 = s1*r1*w1;
    const v2 = s2*r2*w2;
    const total = v1 + v2;
    const totalReps = s1*r1 + s2*r2;
    set('res-e1', v1.toLocaleString()+'kg');
    set('res-e2', v2 > 0 ? v2.toLocaleString()+'kg' : '—');
    set('res-total', total.toLocaleString()+'kg');
    set('res-reps', totalReps+'');
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