document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Sweat Rate Calculator' });

  let unit = 'metric';
  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });
  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    let pre = parseFloat(document.getElementById('pre_weight').value);
    let post = parseFloat(document.getElementById('post_weight').value);
    const fluid = parseFloat(document.getElementById('fluid_consumed').value)||0;
    const dur = parseFloat(document.getElementById('duration').value);
    if (!pre || !post || !dur || dur <= 0) { err('Enter pre/post weights and duration.'); return; }
    if (unit === 'imperial') { pre *= 0.453592; post *= 0.453592; }
    const weightLossKg = pre - post;
    const totalLoss = weightLossKg * 1000 + fluid;
    const rate = (totalLoss / dur) * 60;
    const pct = (weightLossKg / pre) * 100;
    const replace = weightLossKg * 1500;
    set('res-sweat', Math.round(rate)+'ml/hr');
    set('res-loss', (totalLoss/1000).toFixed(2)+'L');
    set('res-pct', pct.toFixed(1)+'%');
    set('res-replace', Math.round(replace)+'ml');
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