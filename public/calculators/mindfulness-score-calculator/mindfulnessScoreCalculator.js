document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Mindfulness Score Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const freqVals = {daily:25, frequent:20, occasional:10, rarely:4, never:0};
    const freq = freqVals[document.getElementById('meditation_freq').value]||0;
    const mins = parseInt(document.getElementById('meditation_min').value)||0;
    const minScore = Math.min(15, mins > 20 ? 15 : mins > 10 ? 10 : mins > 5 ? 6 : 0);
    const breathVals = {daily:15, sometimes:8, rarely:3, never:0};
    const breath = breathVals[document.getElementById('breathing').value]||0;
    const presentVals = {high:20, moderate:12, low:5, very_low:0};
    const present = presentVals[document.getElementById('present_moment').value]||0;
    const natureVals = {daily:10, frequent:7, weekly:4, rarely:1};
    const nature = natureVals[document.getElementById('nature').value]||0;
    const detoxVals = {yes:10, sometimes:6, rarely:2, never:0};
    const detox = detoxVals[document.getElementById('digital_detox').value]||0;
    const total = Math.min(100, freq + minScore + breath + present + nature + detox);
    const level = total >= 80 ? 'Highly Mindful' : total >= 60 ? 'Practicing Mindfulness' : total >= 40 ? 'Developing' : total >= 20 ? 'Beginner' : 'Not Yet Practicing';
    const depth = mins >= 20 ? 'Deep practice' : mins >= 10 ? 'Moderate practice' : mins > 0 ? 'Short sessions' : 'No formal practice';
    const freqNum = document.getElementById('meditation_freq').value;
    const sessPerWeek = {daily:7, frequent:5, occasional:2, rarely:0.5, never:0}[freqNum]||0;
    const weeklyMins = Math.round(sessPerWeek * mins);
    const nextSteps = {
      never:'Start with 5-minute guided meditation using apps like Headspace, Calm, or Insight Timer. Commit to 7 days.',
      rarely:'Establish a consistent daily trigger: meditate after morning coffee or before bed for 5-10 minutes.',
      occasional:'Increase to daily practice. A brief 10-minute daily session is more beneficial than occasional longer ones.',
      frequent:'Deepen your practice with body scan, loving-kindness, or open monitoring meditation styles.',
      daily:'Maintain your practice and explore retreats or courses to deepen understanding.',
    };
    set('res-score', total);
    set('res-level', level);
    set('res-practice', depth);
    set('res-weekly_mins', weeklyMins+'min');
    set('res-next_step', nextSteps[freqNum] || 'Start small — 5 minutes daily beats 30 minutes occasionally');
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