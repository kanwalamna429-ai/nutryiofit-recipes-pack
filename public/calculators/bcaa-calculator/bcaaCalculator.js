document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'BCAA Calculator' });

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
    if (!wKg) { err('Enter body weight.'); return; }
    if (unit === 'imperial') wKg *= 0.453592;
    const goal = document.getElementById('goal').value;
    const protein = document.getElementById('protein_adequate').value;
    let totalBCAA;
    if (goal === 'muscle_preserve') totalBCAA = Math.round(wKg * 0.17);
    else if (goal === 'performance') totalBCAA = Math.round(wKg * 0.12);
    else if (goal === 'recovery') totalBCAA = 10;
    else totalBCAA = Math.round(wKg * 0.10);
    if (protein === 'adequate') totalBCAA = Math.max(5, totalBCAA - 3);
    const leucine = Math.round(totalBCAA * 0.5 * 10) / 10;
    const isoleucine = Math.round(totalBCAA * 0.25 * 10) / 10;
    const valine = Math.round(totalBCAA * 0.25 * 10) / 10;
    const timings = {muscle_preserve:'Between meals and/or during fasted training', performance:'30 min pre-workout and intra-workout', recovery:'Immediately post-workout', endurance:'During workout (every 45-60 min)'};
    set('res-total', totalBCAA+'g');
    set('res-leucine', leucine+'g');
    set('res-isoleucine', isoleucine+'g');
    set('res-valine', valine+'g');
    set('res-timing', timings[goal]);
    set('res-servings', Math.ceil(totalBCAA/5)+' servings');
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