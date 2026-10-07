document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Healthy Aging Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    if (!age) { err('Enter your age.'); return; }
    const physVals = {poor:5, fair:12, good:20, excellent:25};
    const nutrVals = {poor:5, fair:12, good:20, excellent:25};
    const cogVals = {low:7, moderate:16, high:25};
    const socVals = {low:7, moderate:16, high:25};
    const purpVals = {low:7, moderate:14, high:20};
    const prevVals = {poor:5, moderate:12, good:20};
    const physScore = physVals[document.getElementById('physical').value]||12;
    const nutrScore = nutrVals[document.getElementById('nutrition').value]||12;
    const cogScore = cogVals[document.getElementById('cognitive').value]||16;
    const socScore = socVals[document.getElementById('social').value]||16;
    const purpScore = purpVals[document.getElementById('purpose').value]||14;
    const prevScore = prevVals[document.getElementById('preventive').value]||12;
    const physical = Math.round((physScore + nutrScore) / 2);
    const mental = Math.round((cogScore + purpScore) / 2);
    const social = socScore;
    const lifestyle = Math.round((purpScore + prevScore) / 2);
    const total = Math.round((physScore + nutrScore + cogScore + socScore + purpScore + prevScore) / 6 * 100 / 25);
    set('res-score', total);
    set('res-physical', physical+'/25');
    set('res-mental', mental+'/25');
    set('res-social', social+'/25');
    set('res-lifestyle', lifestyle+'/25');
    const level = total >= 85 ? 'Thriving' : total >= 70 ? 'Healthy Aging' : total >= 55 ? 'Needs Attention' : 'High Priority';
    set('res-level', level);
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