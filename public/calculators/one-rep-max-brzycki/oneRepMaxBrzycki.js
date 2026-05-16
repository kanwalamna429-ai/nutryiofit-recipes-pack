document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'One Rep Max — Brzycki Formula' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const w = parseFloat(document.getElementById('weight').value);
    const r = parseInt(document.getElementById('reps').value);
    if (!w || !r || r < 1 || r > 30) { err('Enter valid weight and reps (1–30).'); return; }
    if (r === 1) { set('res-1rm', w+'kg'); set('res-detail', 'You performed 1 rep — this IS your 1RM.'); ok(); return; }
    if (r >= 37) { err('Brzycki formula is not valid for 37+ reps.'); return; }
    const brzycki = w * (36 / (37 - r));
    const epley = w * (1 + r/30);
    const lander = (100*w) / (101.3 - 2.67123*r);
    const oconner = w * (1 + 0.025*r);
    set('res-1rm', Math.round(brzycki)+'kg');
    set('res-epley', Math.round(epley)+'kg');
    set('res-lander', Math.round(lander)+'kg');
    set('res-oconner', Math.round(oconner)+'kg');
    set('res-detail', 'Brzycki: '+Math.round(brzycki)+'kg | Best for 2–10 reps. The formula becomes unreliable past 10 reps as fatigue affects form more than strength.');
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