document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Fat Intake Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cals = parseFloat(document.getElementById('calories').value);
    const goal = document.getElementById('goal').value;
    if (!cals || cals < 500) { err('Enter a valid calorie amount.'); return; }
    let pct; const satPct = 0.1; const unsatPct = 0.2;
    if (goal === 'keto') pct = 0.70;
    else if (goal === 'heart') pct = 0.25;
    else if (goal === 'performance') pct = 0.30;
    else pct = 0.30;
    const total = Math.round((cals * pct) / 9);
    const sat = Math.round((cals * satPct) / 9);
    const unsat = total - sat;
    set('res-total', total+'g'); set('res-sat', sat+'g'); set('res-unsat', unsat+'g');
    set('res-omega3', goal === 'heart' ? '2,000–4,000' : '1,000–2,000');
    set('res-omega6', Math.round(unsat * 0.6)+'g');
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