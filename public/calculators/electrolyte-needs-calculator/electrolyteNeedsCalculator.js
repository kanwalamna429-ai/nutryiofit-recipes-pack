document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Electrolyte Needs Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const dur = parseFloat(document.getElementById('duration').value);
    const intensity = document.getElementById('intensity').value;
    if (!dur || dur <= 0) { err('Enter a valid exercise duration.'); return; }
    const hrs = dur / 60;
    const rates = {low:[400,150,15,500], moderate:[750,250,25,800], high:[1200,400,40,1200], extreme:[1500,500,55,1800]};
    const [sodiumPH, potPH, magPH, fluidPH] = rates[intensity] || rates.moderate;
    set('res-sodium', Math.round(sodiumPH*hrs)+'mg');
    set('res-potassium', Math.round(potPH*hrs)+'mg');
    set('res-magnesium', Math.round(magPH*hrs)+'mg');
    set('res-fluid', Math.round(fluidPH*hrs)+'ml');
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