document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Happiness Index Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const lifesat = parseInt(document.getElementById('life_sat').value)||0;
    const pos = parseInt(document.getElementById('positive_emotions').value)||0;
    const rel = parseInt(document.getElementById('relationships').value)||0;
    const meaning = parseInt(document.getElementById('meaning').value)||0;
    const achieve = parseInt(document.getElementById('achievement').value)||0;
    const engage = parseInt(document.getElementById('engagement').value)||0;
    const autonomy = parseInt(document.getElementById('autonomy').value)||0;
    const score = Math.round((lifesat + pos + rel + meaning + achieve + engage + autonomy) / 70 * 100);
    const level = score < 40 ? 'Low Wellbeing' : score < 60 ? 'Moderate Wellbeing' : score < 80 ? 'High Wellbeing' : 'Flourishing';
    set('res-score', score);
    set('res-level', level);
    set('res-perma_p', pos);
    set('res-perma_e', engage);
    set('res-perma_r', rel);
    set('res-perma_m', meaning);
    set('res-perma_a', achieve);
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