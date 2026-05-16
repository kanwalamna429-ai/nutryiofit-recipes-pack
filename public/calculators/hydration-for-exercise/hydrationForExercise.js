document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Hydration for Exercise' });

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
    let wKg = parseFloat(document.getElementById('weight').value);
    const dur = parseFloat(document.getElementById('duration').value);
    const intensity = document.getElementById('intensity').value;
    const climate = document.getElementById('climate').value;
    if (!wKg || wKg <= 0 || !dur || dur <= 0) { err('Enter valid weight and duration.'); return; }
    if (unit === 'imperial') wKg *= 0.453592;
    let pre = 400;
    const perPeriod = intensity === 'extreme' ? 350 : intensity === 'high' ? 300 : intensity === 'moderate' ? 200 : 150;
    const climateAdd = climate === 'hot' ? 100 : climate === 'cool' ? -50 : 0;
    const during = perPeriod + climateAdd;
    const post = 1500;
    set('res-pre', Math.round(pre)+'ml ('+Math.round(pre/29.574)+'oz)');
    set('res-during', Math.round(during)+'ml ('+Math.round(during/29.574)+'oz)');
    set('res-post', post+'ml per kg of body weight lost');
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