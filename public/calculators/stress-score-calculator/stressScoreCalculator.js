document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Stress Score Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const work = parseInt(document.getElementById('work').value)||0;
    const financial = parseInt(document.getElementById('financial').value)||0;
    const relationships = parseInt(document.getElementById('relationships').value)||0;
    const health = parseInt(document.getElementById('health').value)||0;
    const time = parseInt(document.getElementById('time').value)||0;
    const sleep = parseInt(document.getElementById('sleep_impact').value)||0;
    const coping = parseInt(document.getElementById('coping').value)||0;
    const total = work + financial + relationships + health + time + sleep + coping;
    const score = Math.round(total / 70 * 100);
    const level = score < 25 ? 'Low' : score < 50 ? 'Moderate' : score < 75 ? 'High' : 'Severe';
    const phys = score < 25 ? 'Low' : score < 50 ? 'Moderate' : 'High';
    const vals = {work, financial, relationships, health, time, sleep, coping};
    const names = {work:'Work stress',financial:'Financial stress',relationships:'Relationship stress',health:'Health concerns',time:'Time pressure',sleep:'Sleep disruption',coping:'Coping skills'};
    const priority = Object.entries(vals).sort((a,b)=>b[1]-a[1])[0][0];
    const tips = {work:'Set clear work boundaries. Use time-blocking and the Pomodoro technique. Discuss workload with your manager.',financial:'Create a simple budget. Identify one expense to cut. Consider speaking with a financial advisor.',relationships:'Schedule quality time. Practice active listening. Consider couples or family counseling if needed.',health:'Book a doctor's appointment. Small daily habits (walking, sleep) often reduce health anxiety significantly.',time:'Time audit: track how you spend 24 hours. Identify low-value activities. Learn to say no.',sleep:'Establish a consistent bedtime routine. No screens 1h before bed. Keep your room cool and dark.',coping:'Practice box breathing (4-4-4-4). Start with 5-min daily mindfulness. Exercise is the most evidence-based stress reducer.'};
    set('res-score', score);
    set('res-level', level+' Stress');
    set('res-physical', phys+' health risk');
    set('res-priority', names[priority]);
    set('res-tip', tips[priority] || 'Focus on sleep and exercise first');
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