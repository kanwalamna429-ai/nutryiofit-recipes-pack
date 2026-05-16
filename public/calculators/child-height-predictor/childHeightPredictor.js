document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Child Height Predictor' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const father = parseFloat(document.getElementById('father_height').value);
    const mother = parseFloat(document.getElementById('mother_height').value);
    const sex = document.getElementById('child_sex').value;
    if (!father || !mother) { err('Enter both parent heights.'); return; }
    let midParental;
    if (sex === 'male') midParental = (father + mother + 13) / 2;
    else midParental = (father + mother - 13) / 2;
    const low = Math.round((midParental - 8.5) * 10) / 10;
    const high = Math.round((midParental + 8.5) * 10) / 10;
    set('res-predicted', Math.round(midParental * 10)/10+'cm');
    set('res-low', low+'cm');
    set('res-high', high+'cm');
    set('res-note', 'This mid-parental height formula predicts adult height within ±8.5cm (2 standard deviations) for 95% of children. Genetics accounts for ~60-80% of height. Nutrition, sleep quality, and overall health also significantly influence final height, especially during growth spurts.');
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