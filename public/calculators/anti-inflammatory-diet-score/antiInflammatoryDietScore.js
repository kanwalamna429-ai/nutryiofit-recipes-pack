document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Anti-Inflammatory Diet Score' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const fish = parseFloat(document.getElementById('fatty_fish').value)||0;
    const veg = parseFloat(document.getElementById('vegetables').value)||0;
    const fruit = parseFloat(document.getElementById('fruits').value)||0;
    const nuts = parseFloat(document.getElementById('nuts').value)||0;
    const oil = parseFloat(document.getElementById('olive_oil').value)||0;
    const processed = parseFloat(document.getElementById('processed').value)||0;
    const sugar = parseFloat(document.getElementById('sugar').value)||0;
    const meat = parseFloat(document.getElementById('red_meat').value)||0;
    const antiScore = Math.min(50, Math.round(fish*4 + veg*3 + fruit*3 + nuts*2 + oil*2));
    const proScore = Math.min(50, Math.round(processed*5 + sugar*6 + meat*3));
    const total = Math.min(100, Math.max(0, 50 + antiScore - proScore));
    const assessment = total >= 75 ? 'Strongly Anti-Inflammatory — excellent dietary pattern.' : total >= 55 ? 'Moderately Anti-Inflammatory — good habits with room to improve.' : total >= 40 ? 'Neutral — mixed signals. Increase plant foods and reduce processed foods.' : 'Pro-Inflammatory — dietary changes could significantly reduce chronic inflammation.';
    set('res-score', total);
    set('res-anti', antiScore+'');
    set('res-pro', proScore+'');
    set('res-assessment', assessment);
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