document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Dumbbell Weight Estimator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const bar = parseFloat(document.getElementById('barbell').value);
    const ex = document.getElementById('exercise').value;
    if (!bar || bar <= 0) { err('Enter a valid barbell weight.'); return; }
    const factors = {press: 0.40, overhead: 0.38, isolation: 0.45};
    const factor = factors[ex] || 0.40;
    const each = Math.round(bar * factor * 4) / 4;
    set('res-db', each+'kg');
    set('res-db_lb', Math.round(each*2.2046*4)/4+'lbs');
    set('res-total', (each*2)+'kg');
    set('res-note', 'Dumbbells require more stabilizer muscle activation than barbells, making the same weight feel significantly harder. The stabilization demand is especially high with overhead movements. Start ~10–15% lighter than this estimate and increase as needed.');
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