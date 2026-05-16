document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Cholesterol Intake Guide' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const risk = document.getElementById('risk').value;
    const diet = document.getElementById('diet').value;
    let limit;
    if (diet === 'vegan') { limit = 0; set('res-mg','~0mg (plant-based)'); set('res-eggs','N/A'); set('res-sat','13g'); set('res-info','A vegan diet contains no dietary cholesterol. Focus on plant-based saturated fat limits from coconut oil and palm oil.'); ok(); return; }
    if (risk === 'high') limit = 200;
    else if (risk === 'moderate') limit = 200;
    else limit = 300;
    set('res-mg', limit+'mg');
    set('res-eggs', (limit / 186).toFixed(1));
    set('res-sat', risk === 'high' ? '13g' : '22g');
    const info = risk === 'high' ? 'With high cardiovascular risk, limit dietary cholesterol to under 200mg/day and focus on reducing saturated and trans fats, which raise LDL more significantly.' : 'Current research shows dietary cholesterol has a smaller impact on blood cholesterol than saturated fats for most people. Focus primarily on limiting saturated and trans fats.';
    set('res-info', info);
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