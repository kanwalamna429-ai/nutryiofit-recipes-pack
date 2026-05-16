document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Sleep Cycle Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const bh = parseInt(document.getElementById('bedtime_hour').value)||22;
    const bm = parseInt(document.getElementById('bedtime_min').value)||0;
    const onset = parseInt(document.getElementById('sleep_onset').value)||14;
    const bedtimeMin = bh*60 + bm + onset;
    const el = document.getElementById('res-wake-times');
    el.innerHTML = '<h3 style="font-size:1rem;font-weight:700;margin-bottom:0.75rem">Optimal Wake Times</h3>';
    for (let cycles = 4; cycles <= 6; cycles++) {
      const wakeMin = (bedtimeMin + cycles * 90) % 1440;
      const wh = Math.floor(wakeMin/60);
      const wm = wakeMin%60;
      const h12 = wh > 12 ? wh-12 : (wh === 0 ? 12 : wh);
      const ampm = wh >= 12 ? 'PM' : 'AM';
      const time = h12+':'+(wm<10?'0':'')+wm+' '+ampm;
      const quality = cycles === 5 ? '✓ Optimal' : cycles === 6 ? '✓ Ideal' : 'OK';
      const color = cycles >= 5 ? '#22c55e' : '#64748b';
      el.innerHTML += `<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0;margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center"><div><strong style="font-size:1.125rem">${time}</strong><br><span style="font-size:0.75rem;color:#64748b">${cycles} sleep cycles (${cycles*1.5} hours of sleep)</span></div><span style="color:${color};font-weight:600;font-size:0.875rem">${quality}</span></div>`;
    }
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