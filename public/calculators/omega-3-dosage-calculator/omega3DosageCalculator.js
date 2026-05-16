document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Omega-3 Dosage Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const goal = document.getElementById('goal').value;
    const diet = document.getElementById('diet').value;
    const form = document.getElementById('form').value;
    let target;
    if (goal === 'general') target = 500;
    else if (goal === 'heart') target = 1000;
    else if (goal === 'triglycerides') target = 4000;
    else if (goal === 'inflammation') target = 2000;
    else if (goal === 'brain') target = 1000;
    else if (goal === 'prenatal') target = 600;
    if (diet === 'low') target = Math.round(target * 1.3);
    if (diet === 'none') target = Math.round(target * 1.5);
    if (form === 'krill') target = Math.round(target * 0.7);
    const softgels = Math.ceil(target / 500);
    const salmonServings = Math.ceil(target / 1500 * 3);
    set('res-epadha', target.toLocaleString()+'mg');
    set('res-softgels', softgels+'');
    set('res-food_servings', salmonServings+'');
    const notes = {general:'500mg/day is the minimum for general health benefit. Take with a meal to improve absorption and reduce fishy burps.',heart:'1,000mg/day is the AHA recommendation for those with heart disease. Higher doses require physician oversight.',triglycerides:'4,000mg/day Rx-grade EPA+DHA (Vascepa, Lovaza) reduces triglycerides by 20-30%. Requires medical supervision.',inflammation:'2,000-3,000mg/day may reduce inflammation markers. Effects seen after 3+ months of consistent use.',brain:'DHA is the most abundant omega-3 in the brain. Consistent supplementation supports mood and cognitive function.'};
    set('res-note', notes[goal] || notes.general);
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