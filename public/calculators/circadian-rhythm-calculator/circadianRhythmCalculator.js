document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Circadian Rhythm Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const chronotype = document.getElementById('chronotype').value;
    const wake = parseInt(document.getElementById('wake_time').value)||7;
    const offsets = {morning:{bed:-8,peak_alert:2,exercise:2,meals:[2,6,12]}, intermediate:{bed:-8,peak_alert:3,exercise:3,meals:[2,6,13]}, evening:{bed:-7,peak_alert:4,exercise:5,meals:[3,7,14]}};
    const o = offsets[chronotype];
    const fmt = (h) => { const hour = ((h + wake) + 24) % 24; const h12 = hour > 12 ? hour-12 : (hour===0?12:hour); return h12+':00 '+(hour>=12?'PM':'AM'); };
    const el = document.getElementById('res-schedule');
    el.innerHTML = '<div style="display:grid;gap:0.5rem">';
    const items = [
      {label:'Optimal Bedtime', value: fmt(o.bed), desc:'For full sleep cycles'},
      {label:'Natural Wake Time', value: fmt(0), desc:'Your chronotype anchor'},
      {label:'Peak Alertness', value: fmt(o.peak_alert)+' – '+fmt(o.peak_alert+2), desc:'Best for focused work'},
      {label:'Best Exercise Window', value: fmt(o.exercise)+' – '+fmt(o.exercise+3), desc:'Peak physical performance'},
      {label:'Breakfast', value: fmt(o.meals[0]), desc:'First meal of day'},
      {label:'Lunch', value: fmt(o.meals[1]), desc:'Main meal'},
      {label:'Dinner', value: fmt(o.meals[2]), desc:'Allow 3h before bed'},
    ];
    el.innerHTML += items.map(i => `<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:0.75rem;font-weight:600;color:#64748b">${i.label}</div><div style="font-size:0.75rem;color:#94a3b8">${i.desc}</div></div><strong>${i.value}</strong></div>`).join('');
    el.innerHTML += '</div>';
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