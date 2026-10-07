document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Run/Walk Interval Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const run = parseFloat(document.getElementById('run_min').value);
    const walk = parseFloat(document.getElementById('walk_min').value);
    const total = parseFloat(document.getElementById('total_min').value);
    const pace = parseFloat(document.getElementById('run_pace').value);
    if (!run || !walk || !total) { err('Enter valid interval times and duration.'); return; }
    const intervalLen = run + walk;
    const intervals = Math.floor(total / intervalLen);
    const remainder = total % intervalLen;
    const totalRun = Math.round(intervals * run + Math.min(remainder, run));
    const totalWalk = Math.round(total - totalRun);
    const distance = pace > 0 ? Math.round((totalRun / pace) * 10) / 10 : 0;
    set('res-intervals', intervals+'');
    set('res-distance', distance > 0 ? distance+'km' : 'N/A');
    set('res-run_time', totalRun+' min');
    set('res-walk_time', totalWalk+' min');
    set('res-tip', 'Jeff Galloway recommends starting with a 1:1 run:walk ratio for beginners. As fitness improves, gradually increase run time. Walk breaks should feel brisk, not recovery shuffles. The walk breaks allow you to run farther with less fatigue and injury risk.');
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