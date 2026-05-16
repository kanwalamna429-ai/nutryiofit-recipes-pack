document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Menopause Symptom Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value)||50;
    const hotFlash = parseInt(document.getElementById('hot_flashes').value)||0;
    const sleep = parseInt(document.getElementById('sleep').value)||0;
    const mood = parseInt(document.getElementById('mood').value)||0;
    const cognitive = parseInt(document.getElementById('cognitive').value)||0;
    const joint = parseInt(document.getElementById('joint').value)||0;
    const total = hotFlash + sleep + mood + cognitive + joint;
    const severity = total <= 10 ? 'Mild' : total <= 25 ? 'Moderate' : total <= 35 ? 'Significant' : 'Severe';
    const scores = {hotFlash,sleep,mood,cognitive,joint};
    const labels = {hotFlash:'Vasomotor (hot flashes)',sleep:'Sleep disturbance',mood:'Psychological',cognitive:'Cognitive',joint:'Physical/Joint'};
    const dominant = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0];
    set('res-total', total+'');
    set('res-severity', severity);
    set('res-dominant', labels[dominant[0]]);
    const guidance = total <= 10 ? 'Mild symptoms. Lifestyle modifications (cool environment, stress reduction, regular exercise) may be sufficient.' : total <= 25 ? 'Moderate symptoms. Consider seeing your GP or gynecologist. Lifestyle changes plus possible HRT discussion.' : 'Significant symptoms impacting quality of life. Speak with a menopause specialist about HRT and other treatment options.';
    set('res-guidance', guidance);
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