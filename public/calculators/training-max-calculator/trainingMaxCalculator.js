document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Training Max Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const orm = parseFloat(document.getElementById('orm').value);
    const program = document.getElementById('program').value;
    const cp = parseFloat(document.getElementById('custom_pct').value);
    if (!orm || orm <= 0) { err('Enter a valid 1RM.'); return; }
    const pcts = {531:0.90, starting:1.00, cube:0.85, westside:0.90, custom: (cp||90)/100};
    const pct = pcts[program] || 0.90;
    const tm = Math.round(orm * pct / 2.5) * 2.5;
    set('res-tm', tm+'kg');
    set('res-wk1', Math.round(tm*0.65)+'/'+Math.round(tm*0.75)+'/'+Math.round(tm*0.85)+'kg');
    set('res-wk2', Math.round(tm*0.70)+'/'+Math.round(tm*0.80)+'/'+Math.round(tm*0.90)+'kg');
    set('res-wk3', Math.round(tm*0.75)+'/'+Math.round(tm*0.85)+'/'+Math.round(tm*0.95)+'kg');
    set('res-wk4', Math.round(tm*0.40)+'/'+Math.round(tm*0.50)+'/'+Math.round(tm*0.60)+'kg');
    set('res-detail', 'Training Max = '+Math.round(pct*100)+'% of your 1RM ('+orm+'kg). Increase your TM by 2.5kg (upper body) or 5kg (lower body) each training cycle when you hit all prescribed reps.');
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