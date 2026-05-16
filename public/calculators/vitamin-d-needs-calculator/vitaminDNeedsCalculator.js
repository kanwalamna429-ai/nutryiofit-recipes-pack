document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Vitamin D Needs Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    if (!age || age <= 0) { err('Enter a valid age.'); return; }
    const sun = document.getElementById('sun').value;
    const skin = document.getElementById('skin').value;
    const cond = document.getElementById('condition').value;
    let base = age >= 70 ? 800 : age >= 51 ? 600 : 600;
    let extra = 0;
    if (sun === 'low') extra += 400; if (sun === 'minimal') extra += 800;
    if (skin === 'dark') extra += 400;
    if (cond === 'obese') extra += 600; if (cond === 'malabsorption') extra += 800; if (cond === 'osteoporosis') extra += 400;
    const total = Math.min(base + extra, 4000);
    set('res-iu', total.toLocaleString()+' IU');
    set('res-mcg', Math.round(total/40)+' mcg');
    const risk = extra >= 1000 ? 'High' : extra >= 400 ? 'Moderate' : 'Low';
    set('res-risk', risk);
    set('res-info', 'The tolerable upper limit is 4,000 IU/day for most adults. Blood testing (25-hydroxyvitamin D) is the most accurate way to determine your actual status. Levels of 30–50 ng/mL are considered optimal.');
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