document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'VO2 Max Estimator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const method = document.getElementById('method').value;
    const rhr = parseFloat(document.getElementById('rhr').value);
    let mhr = parseFloat(document.getElementById('mhr').value);
    const age = parseFloat(document.getElementById('age').value);
    const coopDist = parseFloat(document.getElementById('cooper_dist').value);
    if (!mhr && age) mhr = 220 - age;
    let vo2;
    if (method === 'uth') {
      if (!rhr || !mhr) { err('Enter resting and max heart rate (or age).'); return; }
      vo2 = 15 * (mhr / rhr);
    } else if (method === 'cooper') {
      if (!coopDist) { err('Enter your Cooper test distance.'); return; }
      vo2 = (coopDist * 1000 - 504.9) / 44.73;
    } else {
      if (!rhr || !mhr) { err('Enter resting and max heart rate.'); return; }
      vo2 = 15 * (mhr / rhr);
    }
    vo2 = Math.max(10, Math.round(vo2 * 10) / 10);
    set('res-vo2', vo2+' ml/kg/min');
    set('res-mhr_used', (mhr||'N/A')+'');
    const levels = [[80,'Superior'],[60,'Excellent'],[50,'Good'],[40,'Average'],[30,'Below Average'],[0,'Poor']];
    let fitness = 'Poor';
    for (const [threshold, label] of levels) { if (vo2 >= threshold) { fitness = label; break; } }
    set('res-fitness', fitness);
    set('res-level', fitness+' aerobic fitness. VO2 max of '+vo2+' ml/kg/min means your body can deliver and use '+vo2+' ml of oxygen per kg of bodyweight per minute at maximal effort.');
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