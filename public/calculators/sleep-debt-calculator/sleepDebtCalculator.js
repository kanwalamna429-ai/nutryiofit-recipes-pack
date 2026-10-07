document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Sleep Debt Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const actual = parseFloat(document.getElementById('actual').value);
    const needed = parseFloat(document.getElementById('needed').value);
    const days = parseInt(document.getElementById('days').value);
    if (!actual || !needed || !days) { err('Enter valid sleep data.'); return; }
    if (actual >= needed) { set('res-debt','No debt'); set('res-nights','0'); set('res-extra','N/A'); set('res-level','Well Rested'); set('res-strategy','Great! You are getting enough sleep. Maintain your schedule and avoid cutting sleep on weekends.'); ok(); return; }
    const debtPerDay = needed - actual;
    const totalDebt = debtPerDay * days;
    const extraPerNight = Math.min(2, totalDebt / 7);
    const nightsToRecover = Math.ceil(totalDebt / extraPerNight);
    set('res-debt', totalDebt.toFixed(1)+'h');
    set('res-nights', nightsToRecover+'');
    set('res-extra', '+'+extraPerNight.toFixed(1)+'h/night');
    const level = totalDebt < 5 ? 'Mild' : totalDebt < 15 ? 'Moderate' : totalDebt < 30 ? 'Significant' : 'Severe';
    set('res-level', level+' debt');
    set('res-strategy', 'Recover gradually by adding '+extraPerNight.toFixed(1)+' hours per night for ~'+nightsToRecover+' nights. Avoid marathon sleep sessions which disrupt circadian rhythm. Prioritize consistent bedtimes over sleeping in.');
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