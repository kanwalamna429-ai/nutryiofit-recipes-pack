document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Screen Time Impact Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const work = parseFloat(document.getElementById('work_screens').value)||0;
    const social = parseFloat(document.getElementById('social_screens').value)||0;
    const entertainment = parseFloat(document.getElementById('entertainment').value)||0;
    const pickups = parseInt(document.getElementById('phone_pickups').value)||0;
    const strain = document.getElementById('eye_strain').value;
    const sleep = document.getElementById('sleep_screens').value;
    const total = work + social + entertainment;
    const annualDays = Math.round(total * 365 / 24);
    let impact = 0;
    if (social > 3) impact += (social - 3) * 10;
    if (entertainment > 3) impact += (entertainment - 3) * 5;
    if (pickups > 100) impact += 20; else if (pickups > 60) impact += 10;
    if (strain === 'frequent') impact += 15; else if (strain === 'constant') impact += 25;
    if (sleep === 'always') impact += 20; else if (sleep === 'sometimes') impact += 8;
    impact = Math.min(100, impact);
    const blueRisk = total > 10 ? 'High' : total > 6 ? 'Moderate' : 'Low';
    set('res-total', total.toFixed(1)+'h/day');
    set('res-annual', annualDays+' days');
    set('res-impact', impact);
    set('res-blue_light', blueRisk);
    const recs = [];
    if (social > 2) recs.push('Set app time limits for social media to 30-60 min/day');
    if (sleep === 'always' || sleep === 'sometimes') recs.push('Use blue-light glasses and stop screens 1 hour before bed');
    if (pickups > 80) recs.push('Turn off non-essential notifications to reduce constant checking');
    if (strain !== 'none') recs.push('Follow the 20-20-20 rule: every 20 min, look at something 20 feet away for 20 seconds');
    set('res-rec', recs[0] || 'Maintain current screen time habits');
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