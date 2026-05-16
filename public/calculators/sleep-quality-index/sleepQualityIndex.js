document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Sleep Quality Index' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const duration = parseFloat(document.getElementById('duration').value)||0;
    const latency = parseInt(document.getElementById('latency').value)||0;
    const wakeups = parseInt(document.getElementById('wakeups').value)||0;
    const feeling = document.getElementById('feeling').value;
    const consistency = document.getElementById('consistency').value;
    const dScore = Math.min(25, Math.max(0, duration < 6 ? duration*2 : duration <= 9 ? 25 : 20));
    const oScore = latency <= 15 ? 25 : latency <= 30 ? 20 : latency <= 45 ? 12 : 5;
    const cScore = wakeups === 0 ? 25 : wakeups === 1 ? 20 : wakeups === 2 ? 12 : 5;
    const fScores = {great:25, good:20, fair:12, poor:5};
    const fScore = fScores[feeling]||15;
    const consBonus = {very:5, mostly:3, variable:0, irregular:-5}[consistency]||0;
    const total = Math.min(100, Math.max(0, dScore + oScore + cScore + fScore + consBonus));
    set('res-score', total);
    set('res-duration_score', dScore+'');
    set('res-onset_score', oScore+'');
    set('res-continuity_score', cScore+'');
    set('res-quality_score', fScore+'');
    let lowest = 'duration';
    if (oScore <= dScore && oScore <= cScore && oScore <= fScore) lowest = 'sleep onset';
    else if (cScore <= dScore && cScore <= oScore && cScore <= fScore) lowest = 'sleep continuity (wakeups)';
    const tip = lowest === 'duration' ? 'Your biggest opportunity is sleep duration. Try moving bedtime 30-60 min earlier.' : lowest === 'sleep onset' ? 'You take too long to fall asleep. Practice a wind-down routine: dim lights, avoid screens 1hr before bed, try deep breathing.' : 'Frequent wakeups may indicate sleep apnea, light sensitivity, or bathroom trips. Consider blackout curtains and limiting fluids before bed.';
    set('res-tip', tip);
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