document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Omega-3 Needs Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const goal = document.getElementById('goal').value;
    const diet = document.getElementById('diet').value;
    let target;
    if (goal === 'general') target = 500;
    else if (goal === 'heart') target = 1000;
    else if (goal === 'triglycerides') target = 4000;
    else if (goal === 'inflammation') target = 2000;
    else if (goal === 'brain') target = 1000;
    else if (goal === 'pregnancy') target = 600;
    if (diet === 'low') target = Math.round(target * 1.2);
    set('res-epadha', target.toLocaleString()+'mg');
    set('res-fish', Math.ceil(target / 1200 * 3));
    const sources = diet === 'vegan' ? 'Algae-based DHA/EPA supplements' : 'Salmon, mackerel, sardines, supplements';
    set('res-source', sources);
    const goalTips = {general:'500mg/day is adequate for general health. Aim for 2 servings of fatty fish per week.',heart:'The American Heart Association recommends 1,000mg/day for those with heart disease.',triglycerides:'High-dose EPA+DHA (2,000–4,000mg) can lower triglycerides by 20–30%. Consult your doctor.',inflammation:'2,000–3,000mg/day may help reduce joint inflammation and pain.',brain:'DHA is critical for brain structure. Adequate levels support mood and cognitive function.',pregnancy:'DHA is vital for fetal brain and eye development. Consult your OB before supplementing.'};
    set('res-info', goalTips[goal] || goalTips.general);
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