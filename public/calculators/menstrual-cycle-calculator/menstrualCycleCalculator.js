document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Menstrual Cycle Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const daysAgo = parseInt(document.getElementById('last_period').value)||0;
    const cycleLen = parseInt(document.getElementById('cycle_length').value)||28;
    const periodDur = parseInt(document.getElementById('period_duration').value)||5;
    const today = 0;
    const nextPeriodIn = cycleLen - daysAgo;
    const ovulationIn = (cycleLen - 14) - daysAgo;
    const fertileWindowStart = ovulationIn - 5;
    const fertileWindowEnd = ovulationIn + 1;
    const el = document.getElementById('res-cycle-info');
    const dayLabel = (d) => d === 0 ? 'Today' : d < 0 ? Math.abs(d)+' days ago' : 'In '+d+' days';
    const phase = daysAgo <= periodDur ? 'Menstrual Phase' : daysAgo <= 13 ? 'Follicular Phase' : daysAgo <= 15 ? 'Ovulation Phase' : 'Luteal Phase';
    const items = [
      {label:'Current Phase', value:phase, desc:'Day '+daysAgo+' of your cycle'},
      {label:'Next Period', value:dayLabel(nextPeriodIn), desc:'Cycle day 1'},
      {label:'Estimated Ovulation', value:dayLabel(ovulationIn), desc:'Peak fertility'},
      {label:'Fertile Window', value:dayLabel(fertileWindowStart)+' to '+dayLabel(fertileWindowEnd), desc:'Best chance of conception'},
    ];
    el.innerHTML = '<div style="display:grid;gap:0.5rem">' + items.map(i => `<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:0.75rem;font-weight:600;color:#64748b">${i.label}</div><div style="font-size:0.75rem;color:#94a3b8">${i.desc}</div></div><strong style="text-align:right;font-size:0.875rem">${i.value}</strong></div>`).join('') + '</div><div class="info-card" style="margin-top:1rem"><p style="font-size:0.8rem;color:#64748b">⚠️ These are estimates based on average cycles. Individual cycles vary. For family planning purposes, consult a healthcare provider.</p></div>';
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