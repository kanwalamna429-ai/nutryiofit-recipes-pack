document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Steps to Miles/Km Converter' });

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
    const steps = parseInt(document.getElementById('steps').value);
    let heightCm = parseFloat(document.getElementById('height').value);
    const customStride = parseFloat(document.getElementById('stride').value);
    if (!steps || steps <= 0) { err('Enter a valid step count.'); return; }
    if (!heightCm && !customStride) { err('Enter your height or stride length.'); return; }
    if (unit === 'imperial' && heightCm) heightCm *= 2.54;
    let strideCm;
    if (customStride > 0) strideCm = customStride;
    else strideCm = heightCm * (gender === 'male' ? 0.415 : 0.413);
    const distKm = (steps * strideCm / 100) / 1000;
    const distMi = distKm / 1.60934;
    const calories = Math.round(steps * 0.04);
    set('res-km', distKm.toFixed(2)+'km');
    set('res-miles', distMi.toFixed(2)+'mi');
    set('res-stride', Math.round(strideCm)+'cm');
    set('res-calories', calories+'');
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