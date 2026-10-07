document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Powerlifting Total Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const sq = parseFloat(document.getElementById('squat').value)||0;
    const bp = parseFloat(document.getElementById('bench').value)||0;
    const dl = parseFloat(document.getElementById('deadlift').value)||0;
    const bw = parseFloat(document.getElementById('bw').value);
    if (!sq && !bp && !dl) { err('Enter at least one lift.'); return; }
    const total = sq + bp + dl;
    const ratio = bw ? total/bw : 0;
    const dots = bw ? (total * 500 / (47.46 + 8.47*bw - 0.033*bw**2 + 0.00014*bw**3 - 7.08E-7*bw**4 + 1.62E-9*bw**5)) : 0;
    set('res-total', total+'kg');
    set('res-ratio', bw ? ratio.toFixed(2)+'×' : 'N/A');
    set('res-dots', bw ? Math.round(dots)+'' : 'N/A');
    const level = ratio < 3 ? 'Beginner' : ratio < 5 ? 'Intermediate' : ratio < 6.5 ? 'Advanced' : 'Elite';
    set('res-level', level);
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