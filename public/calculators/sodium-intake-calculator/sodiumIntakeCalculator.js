document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Sodium Intake Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    const cond = document.getElementById('condition').value;
    const act = document.getElementById('activity').value;
    if (!age || age <= 0) { err('Enter a valid age.'); return; }
    let limit = 2300;
    if (cond === 'hypertension' || cond === 'kidney') limit = 1500;
    else if (cond === 'heart') limit = 2000;
    else if (age >= 51) limit = 1500;
    if (act === 'intense') limit += 500;
    set('res-mg', limit.toLocaleString()+'mg');
    set('res-tsp', (limit/2300*0.94).toFixed(1)+' tsp');
    const level = limit <= 1500 ? 'Restricted' : limit <= 2000 ? 'Moderate Restriction' : 'Standard';
    set('res-teaspoons', level);
    const tips = {healthy:'Aim for less than 2,300mg/day. Read food labels — processed foods, canned goods, and restaurant meals are the biggest sources.',hypertension:'Limit to 1,500mg/day. Avoid cured meats, canned soups, and processed cheeses. Choose low-sodium alternatives.',kidney:'Work with your healthcare provider. Both sodium and potassium may need to be restricted.',heart:'Follow your cardiologist's advice. Daily weighing can help detect fluid retention early.'};
    set('res-info', tips[cond] || tips.healthy);
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