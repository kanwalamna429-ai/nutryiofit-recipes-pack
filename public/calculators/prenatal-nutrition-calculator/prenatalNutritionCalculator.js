document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Prenatal Nutrition Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const tri = document.getElementById('trimester').value;
    const baseCals = parseFloat(document.getElementById('pre_calories').value);
    const twins = document.getElementById('twins').value === 'twins';
    if (!baseCals) { err('Enter your pre-pregnancy calorie intake.'); return; }
    let calAdd = tri === '1' ? 0 : tri === '2' ? 340 : 450;
    if (twins) calAdd += 300;
    const totalCals = Math.round(baseCals + calAdd);
    const protein = tri === '1' ? 71 : tri === '2' ? 80 : 100;
    const folate = 600;
    const iron = 27;
    const calcium = 1000;
    const dha = 200;
    set('res-calories', totalCals.toLocaleString());
    set('res-protein', (twins ? protein+25 : protein)+'g');
    set('res-folate', folate+'mcg');
    set('res-iron', iron+'mg');
    set('res-calcium', calcium+'mg');
    set('res-dha', dha+'mg');
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