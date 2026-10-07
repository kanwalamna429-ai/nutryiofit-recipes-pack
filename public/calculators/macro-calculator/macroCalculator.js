document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Macro Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cals = parseFloat(document.getElementById('calories').value);
    const goal = document.getElementById('goal').value;
    if (!cals || cals < 500 || cals > 10000) { err('Enter a valid calorie amount (500-10,000 kcal).'); return; }
    const [pPct, cPct, fPct] = goal === 'lose' ? [0.35, 0.35, 0.30] : goal === 'gain' ? [0.30, 0.45, 0.25] : [0.25, 0.45, 0.30];
    set('res-protein', Math.round((cals*pPct)/4)+'g');
    set('res-carbs', Math.round((cals*cPct)/4)+'g');
    set('res-fat', Math.round((cals*fPct)/9)+'g');
    const goalLabel = goal === 'lose' ? 'Fat Loss (High Protein)' : goal === 'gain' ? 'Muscle Gain' : 'Maintenance';
    set('res-summary', goalLabel+': '+Math.round(pPct*100)+'% protein / '+Math.round(cPct*100)+'% carbs / '+Math.round(fPct*100)+'% fat. Each gram of protein = 4 kcal, carbs = 4 kcal, fat = 9 kcal.');
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