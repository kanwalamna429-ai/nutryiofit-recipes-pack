document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Max Heart Rate Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    if (!age || age < 10 || age > 90) { err('Enter a valid age between 10 and 90.'); return; }
    const standard = 220 - age;
    const gellish = Math.round(206.9 - 0.67 * age);
    const tanaka = Math.round(208 - 0.7 * age);
    const inbar = Math.round(205.8 - 0.685 * age);
    set('res-standard', standard+'bpm');
    set('res-gellish', gellish+'bpm');
    set('res-tanaka', tanaka+'bpm');
    set('res-inbar', inbar+'bpm');
    const avg = Math.round((standard+gellish+tanaka+inbar)/4);
    set('res-recommend', 'Average of all formulas: '+avg+' bpm. For training purposes, use the Tanaka or Gellish formula — they are more accurate for older adults. The "220 - age" formula is a population average with high individual variation (±10–12 bpm).');
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