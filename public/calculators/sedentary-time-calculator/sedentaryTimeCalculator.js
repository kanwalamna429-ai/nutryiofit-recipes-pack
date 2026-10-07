document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Sedentary Time Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const workSit = parseFloat(document.getElementById('work_sitting').value)||0;
    const commute = parseFloat(document.getElementById('commute').value)||0;
    const leisure = parseFloat(document.getElementById('leisure_sitting').value)||0;
    const exercise = parseFloat(document.getElementById('exercise').value)||0;
    const walking = parseFloat(document.getElementById('walking').value)||0;
    const totalSitting = workSit + commute + leisure;
    const totalActive = exercise + walking;
    const risk = totalSitting >= 10 ? 'High' : totalSitting >= 7 ? 'Moderate' : totalSitting >= 4 ? 'Low-Moderate' : 'Low';
    const breakFreq = totalSitting >= 8 ? 'Every 30 min' : 'Every 45–60 min';
    set('res-sitting', totalSitting.toFixed(1)+'h/day');
    set('res-active', totalActive.toFixed(1)+'h/day');
    set('res-risk', risk+' ('+Math.round(totalSitting)+'h sitting)');
    set('res-breaks', breakFreq);
    const tip = totalSitting > 10 ? 'Sitting > 10h/day carries significant health risks even with exercise. Consider a standing desk, walking meetings, or every-30-min movement alarms. "Exercise can't undo prolonged sitting."' : 'Take 2-minute movement breaks every 30-45 minutes: stand, stretch, walk to the water cooler. Even light activity during breaks significantly reduces metabolic risk.';
    set('res-tip', tip);
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