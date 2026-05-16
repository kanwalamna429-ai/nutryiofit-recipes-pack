document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Social Wellness Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const friends = Math.min(parseInt(document.getElementById('close_friends').value)||0, 8);
    const weekly = Math.min(parseInt(document.getElementById('weekly_social').value)||0, 20);
    const community = parseInt(document.getElementById('community').value)||0;
    const loneliness = document.getElementById('loneliness').value;
    const support = document.getElementById('support').value;
    const newConn = document.getElementById('new_connections').value;
    const friendScore = friends * 5;
    const weeklyScore = Math.min(weekly * 2, 20);
    const commScore = community * 1.5;
    const lonelyScores = {never:20, sometimes:12, often:5, always:0};
    const supportScores = {excellent:15, good:11, fair:6, poor:0};
    const newScores = {easy:10, ok:7, hard:3, very_hard:0};
    const total = Math.min(100, friendScore + weeklyScore + commScore + lonelyScores[loneliness] + supportScores[support] + newScores[newConn]);
    const level = total >= 80 ? 'Thriving' : total >= 60 ? 'Healthy' : total >= 40 ? 'At Risk' : 'Social Isolation Risk';
    const connQuality = friends >= 3 && support === 'excellent' ? 'Deep and supportive' : friends >= 2 ? 'Moderate depth' : 'Surface level — build deeper bonds';
    const lonely = loneliness === 'often' || loneliness === 'always' ? 'High — seek community' : loneliness === 'sometimes' ? 'Moderate' : 'Low';
    set('res-score', Math.round(total));
    set('res-level', level);
    set('res-connection', connQuality);
    set('res-loneliness', lonely);
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