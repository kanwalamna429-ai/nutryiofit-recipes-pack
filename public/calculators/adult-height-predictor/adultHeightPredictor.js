document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Adult Height Predictor' });

  let gender = 'male';
  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
    });
  });
  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseFloat(document.getElementById('current_age').value);
    const height = parseFloat(document.getElementById('current_height').value);
    const father = parseFloat(document.getElementById('father_height').value);
    const mother = parseFloat(document.getElementById('mother_height').value);
    if (!age || !height || !father || !mother) { err('Enter all values.'); return; }
    const midParental = gender === 'male' ? (father + mother + 13) / 2 : (father + mother - 13) / 2;
    const low = midParental - 8.5;
    const high = midParental + 8.5;
    const expectedFinal = (midParental + (gender === 'male' ? 0.5 : -0.5));
    const stillGrowing = Math.max(0, expectedFinal - height);
    set('res-mid_parental', Math.round(midParental)+'cm');
    set('res-predicted_low', Math.round(low)+'cm');
    set('res-predicted_high', Math.round(high)+'cm');
    set('res-still_growing', Math.round(stillGrowing)+'cm (estimate)');
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