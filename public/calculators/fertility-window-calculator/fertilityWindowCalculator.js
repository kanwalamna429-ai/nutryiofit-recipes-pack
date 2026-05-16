document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Fertility Window Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cycle = parseInt(document.getElementById('cycle_length').value)||28;
    const daysSince = parseInt(document.getElementById('last_period_days').value)||0;
    const ovDay = cycle - 14;
    const dayOfCycle = daysSince + 1;
    const fertileStart = ovDay - 5;
    const fertileEnd = ovDay + 1;
    const inFertile = dayOfCycle >= fertileStart && dayOfCycle <= fertileEnd;
    const daysToFertile = fertileStart - dayOfCycle;
    const daysToOv = ovDay - dayOfCycle;
    const el = document.getElementById('res-fertile-info');
    const phases = [
      {label:'Menstrual Phase', days:'Days 1–5', active: dayOfCycle <= 5, color:'#3b82f6'},
      {label:'Pre-Fertile Phase', days:'Days 6–'+(fertileStart-1), active: dayOfCycle > 5 && dayOfCycle < fertileStart, color:'#64748b'},
      {label:'Fertile Window', days:'Days '+fertileStart+'–'+fertileEnd+' (Peak fertility)', active: inFertile, color:'#22c55e'},
      {label:'Ovulation', days:'Day '+ovDay+' ('+( daysToOv === 0 ? 'Today!' : daysToOv > 0 ? 'In '+daysToOv+' days' : Math.abs(daysToOv)+' days ago')+')', active: Math.abs(dayOfCycle - ovDay) <= 1, color:'#f97316'},
      {label:'Post-Ovulation / Luteal', days:'Days '+(ovDay+2)+'–'+cycle, active: dayOfCycle > fertileEnd && dayOfCycle <= cycle, color:'#8b5cf6'},
    ];
    el.innerHTML = '<div style="display:grid;gap:0.5rem">' + phases.map(p => `<div style="padding:0.75rem;border-radius:0.75rem;border:2px solid ${p.active ? p.color : '#e2e8f0'};background:${p.active ? p.color+'11' : '#fff'};display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:0.75rem;font-weight:600;color:${p.active ? p.color : '#64748b'}">${p.label}</div><div style="font-size:0.75rem;color:#94a3b8">${p.days}</div></div>${p.active ? '<span style="font-size:0.75rem;font-weight:700;color:'+p.color+'">← You are here</span>' : ''}</div>`).join('') + '</div>';
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