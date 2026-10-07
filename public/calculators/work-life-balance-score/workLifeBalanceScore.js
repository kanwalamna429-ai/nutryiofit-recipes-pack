document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Work-Life Balance Score' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const work = parseFloat(document.getElementById('work_hours').value)||0;
    const sleep = parseFloat(document.getElementById('sleep_hours').value)||0;
    const exercise = parseFloat(document.getElementById('exercise_min').value)||0;
    const personal = parseFloat(document.getElementById('personal_time').value)||0;
    const family = parseFloat(document.getElementById('family_time').value)||0;
    const sat = parseInt(document.getElementById('satisfaction').value)||3;
    let score = 0;
    const workScore = work <= 40 ? 25 : work <= 50 ? 15 : work <= 60 ? 5 : 0;
    const sleepScore = sleep >= 7 && sleep <= 9 ? 20 : sleep >= 6.5 ? 12 : sleep >= 6 ? 5 : 0;
    const exScore = exercise >= 150 ? 15 : exercise >= 90 ? 10 : exercise >= 30 ? 5 : 0;
    const timeScore = (personal + family) >= 3 ? 15 : (personal + family) >= 2 ? 10 : 5;
    const satScore = (sat - 1) * 6.25;
    score = Math.min(100, Math.round(workScore + sleepScore + exScore + timeScore + satScore));
    set('res-score', score);
    const level = score >= 75 ? 'Excellent Balance' : score >= 55 ? 'Good Balance' : score >= 35 ? 'Needs Improvement' : 'Imbalanced';
    set('res-level', level);
    set('res-work_health', work > 50 ? 'Overworked ('+work+'h/wk)' : 'Healthy ('+work+'h/wk)');
    set('res-sleep_status', sleep >= 7 ? 'Good ('+sleep+'h)' : 'Insufficient ('+sleep+'h)');
    set('res-exercise_status', exercise >= 150 ? 'Meeting WHO guideline' : 'Below WHO 150 min target');
    set('res-personal_status', (personal+family) >= 3 ? 'Adequate' : 'Too little personal time');
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