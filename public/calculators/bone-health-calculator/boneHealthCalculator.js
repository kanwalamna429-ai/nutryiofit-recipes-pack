document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Bone Health Calculator' });

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
    const age = parseInt(document.getElementById('age').value);
    const calcium = parseInt(document.getElementById('calcium_intake').value)||0;
    const exercise = document.getElementById('exercise').value;
    const smoking = document.getElementById('smoking').value;
    const family = document.getElementById('family_hx').value;
    const menopause = document.getElementById('menopause').value;
    if (!age) { err('Enter a valid age.'); return; }
    let score = 70;
    if (age > 50) score -= (age - 50) * 0.8;
    if (gender === 'female' && age > 50) score -= 10;
    const calcTarget = gender === 'female' && age > 50 ? 1200 : 1000;
    const calcScore = Math.min(20, (calcium / calcTarget) * 20);
    score = score - 20 + calcScore;
    if (exercise === 'frequent') score += 15; else if (exercise === 'regular') score += 10; else if (exercise === 'occasional') score += 3;
    if (smoking === 'current') score -= 15; else if (smoking === 'former') score -= 5;
    if (family === 'yes') score -= 10;
    if (menopause === 'early_menopause') score -= 15; else if (menopause === 'postmenopausal') score -= 10;
    score = Math.min(100, Math.max(0, Math.round(score)));
    const risk = score >= 75 ? 'Low Risk' : score >= 55 ? 'Moderate Risk' : score >= 35 ? 'Elevated Risk' : 'High Risk';
    const action = score >= 75 ? 'Continue current habits' : score >= 55 ? 'Increase calcium and weight training' : 'See doctor, consider DXA scan';
    set('res-score', score);
    set('res-risk', risk);
    set('res-calcium_pct', Math.round(calcium/calcTarget*100)+'%');
    set('res-recommendation', action);
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