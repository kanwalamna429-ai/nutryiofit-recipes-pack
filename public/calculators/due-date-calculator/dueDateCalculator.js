document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Due Date Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const lmpWeeks = parseFloat(document.getElementById('lmp_weeks').value);
    const cycleLen = parseInt(document.getElementById('cycle_length').value)||28;
    if (!lmpWeeks || lmpWeeks < 0) { err('Enter weeks since your last period.'); return; }
    const totalPregnancyDays = 280 + (cycleLen - 28);
    const daysLeft = Math.round(totalPregnancyDays - lmpWeeks * 7);
    const weeksLeft = Math.floor(daysLeft / 7);
    const currentWeek = Math.floor(lmpWeeks);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysLeft);
    const options = {year:'numeric', month:'long', day:'numeric'};
    const dueDateStr = dueDate.toLocaleDateString('en-US', options);
    const trimester = currentWeek <= 13 ? '1st Trimester' : currentWeek <= 26 ? '2nd Trimester' : '3rd Trimester';
    const items = [
      {label:'Estimated Due Date', value:dueDateStr, desc:'Naegele's rule'},
      {label:'Current Week', value:'Week '+currentWeek, desc:trimester},
      {label:'Weeks Remaining', value:weeksLeft+' weeks', desc:daysLeft+' days to go'},
      {label:'Trimester', value:trimester, desc:'Based on gestational age'},
    ];
    const el = document.getElementById('res-due-info');
    el.innerHTML = '<div style="display:grid;gap:0.5rem">' + items.map(i => `<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:0.75rem;font-weight:600;color:#64748b">${i.label}</div><div style="font-size:0.75rem;color:#94a3b8">${i.desc}</div></div><strong style="text-align:right">${i.value}</strong></div>`).join('') + '</div>';
    el.innerHTML += '<div class="info-card" style="margin-top:1rem"><p style="font-size:0.8rem;color:#64748b">Only 5% of babies are born exactly on their due date. The normal range is 37–42 weeks. Your OB will confirm dates via ultrasound.</p></div>';
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