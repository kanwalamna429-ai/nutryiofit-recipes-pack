document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Progressive Overload Tracker' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cur = parseFloat(document.getElementById('current_weight').value);
    const tgt = parseFloat(document.getElementById('target_weight').value);
    const wks = parseInt(document.getElementById('weeks').value);
    const sess = parseInt(document.getElementById('sessions').value);
    if (!cur || !tgt || !wks || cur <= 0 || tgt <= 0 || wks <= 0) { err('Enter valid values.'); return; }
    if (tgt <= cur) { err('Target must be greater than current weight.'); return; }
    const diff = tgt - cur;
    const weeklyIncrease = diff / wks;
    const perSession = diff / (wks * sess);
    const totalSessions = wks * sess;
    set('res-increase', weeklyIncrease.toFixed(2)+'kg/week');
    set('res-per_session', perSession.toFixed(2)+'kg/session');
    set('res-total_sessions', totalSessions+'');
    const feasible = perSession <= 2.5 ? 'Very Achievable' : perSession <= 5 ? 'Challenging but Possible' : perSession <= 10 ? 'Very Aggressive' : 'Likely Unrealistic';
    set('res-feasibility', feasible);
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