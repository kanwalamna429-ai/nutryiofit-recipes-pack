document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Optimal Wake Time Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const wh = parseInt(document.getElementById('wake_hour').value)||7;
    const wm = parseInt(document.getElementById('wake_min').value)||0;
    const onset = parseInt(document.getElementById('sleep_onset').value)||14;
    const wakeMin = wh*60 + wm;
    const el = document.getElementById('res-bedtimes');
    el.innerHTML = '<h3 style="font-size:1rem;font-weight:700;margin-bottom:0.75rem">Recommended Bedtimes</h3>';
    for (let cycles = 6; cycles >= 4; cycles--) {
      const bedMin = ((wakeMin - cycles*90 - onset) + 1440) % 1440;
      const bh = Math.floor(bedMin/60);
      const bm = bedMin%60;
      const h12 = bh > 12 ? bh-12 : (bh === 0 ? 12 : bh);
      const ampm = bh >= 12 ? 'PM' : 'AM';
      const time = h12+':'+(bm<10?'0':'')+bm+' '+ampm;
      const quality = cycles === 6 ? '✓ Ideal (9h)' : cycles === 5 ? '✓ Optimal (7.5h)' : 'Minimum (6h)';
      const color = cycles >= 5 ? '#22c55e' : '#f97316';
      el.innerHTML += `<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0;margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:1.125rem">${time}</strong><br><span style="font-size:0.75rem;color:#64748b">${cycles} cycles — ${cycles*1.5} hours sleep</span></div><span style="color:${color};font-weight:600;font-size:0.875rem">${quality}</span></div>`;
    }
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