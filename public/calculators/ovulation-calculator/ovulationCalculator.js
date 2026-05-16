document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Ovulation Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const daysAgo = parseInt(document.getElementById('last_period').value)||0;
    const cycleLen = parseInt(document.getElementById('cycle_length').value)||28;
    const ovulationDay = cycleLen - 14;
    const ovulationIn = ovulationDay - daysAgo;
    const dayLabel = (d) => d === 0 ? 'Today' : d < 0 ? Math.abs(d)+' days ago' : 'In '+d+' day'+(Math.abs(d)!==1?'s':'');
    const fertile = [-5,-4,-3,-2,-1,0,1].map(d => ovulationIn+d);
    const fertileStr = dayLabel(fertile[0])+' through '+dayLabel(fertile[5]);
    const items = [
      {label:'Estimated Ovulation', value:dayLabel(ovulationIn), desc:'Cycle day '+ovulationDay, color:'#22c55e'},
      {label:'Peak Fertility Window', value:fertileStr, desc:'5 days before + day of ovulation', color:'#3b82f6'},
      {label:'Best Conception Days', value:dayLabel(ovulationIn-2)+' to '+dayLabel(ovulationIn), desc:'Sperm survives 3–5 days', color:'#f97316'},
    ];
    const el = document.getElementById('res-ovulation-info');
    el.innerHTML = '<div style="display:grid;gap:0.5rem">' + items.map(i => `<div style="padding:1rem;border-radius:0.75rem;border:2px solid ${i.color+'33'};background:${i.color+'08'}"><div style="font-size:0.75rem;font-weight:600;color:${i.color};text-transform:uppercase;margin-bottom:0.25rem">${i.label}</div><div style="font-size:1rem;font-weight:700">${i.value}</div><div style="font-size:0.75rem;color:#64748b">${i.desc}</div></div>`).join('') + '</div><div class="info-card" style="margin-top:1rem"><p style="font-size:0.8rem;color:#64748b">ℹ️ Ovulation timing varies. Track BBT (basal body temperature), cervical mucus changes, and use LH predictor strips for more accurate results.</p></div>';
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