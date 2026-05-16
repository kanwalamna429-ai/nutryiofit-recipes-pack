document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Food Temperature Converter' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const f = parseFloat(document.getElementById('fahrenheit').value);
    const c = parseFloat(document.getElementById('celsius').value);
    let fahr, cels;
    if (!isNaN(f) && document.getElementById('fahrenheit').value !== '') {
      fahr = f; cels = (f - 32) * 5/9;
    } else if (!isNaN(c)) {
      cels = c; fahr = c * 9/5 + 32;
    } else { err('Enter a temperature in °F or °C.'); return; }
    const contexts = [[482,250,'Extremely hot oven — pizza, bread'],[446,230,'Very hot oven — roasting'],[392,200,'Hot oven — baking bread'],[356,180,'Moderate-hot oven — cakes, cookies'],[320,160,'Moderate oven — roast meats'],[300,149,'Slow oven — casseroles'],[212,100,'Water boils'],[165,74,'Chicken safe internal temp'],[160,71,'Ground meat safe internal temp'],[145,63,'Beef, pork, fish safe internal temp'],[40,4,'Refrigerator (safe below this)'],[-18,-28,'Freezer temperature']];
    let context = 'Custom temperature';
    for (const [fRef, cRef, label] of contexts) {
      if (Math.abs(fahr - fRef) < 15) { context = label; break; }
    }
    set('res-fahrenheit', Math.round(fahr)+'°F');
    set('res-celsius', Math.round(cels*10)/10+'°C');
    set('res-context', context);
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