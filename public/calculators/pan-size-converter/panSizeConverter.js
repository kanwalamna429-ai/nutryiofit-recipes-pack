document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Pan Size Converter' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const panAreas = {round_9:Math.PI*4.5**2, round_8:Math.PI*4**2, square_9:81, square_8:64, rect_9x13:117, rect_7x11:77, loaf_9x5:45, loaf_8x4:32, bundt:80, tube:90};
    const orig = document.getElementById('original_pan').value;
    const sub = document.getElementById('substitute_pan').value;
    const origArea = panAreas[orig];
    const subArea = panAreas[sub];
    if (!origArea || !subArea) { err('Select both pan sizes.'); return; }
    const ratio = subArea / origArea;
    set('res-orig_area', Math.round(origArea)+'');
    set('res-sub_area', Math.round(subArea)+'');
    set('res-size_ratio', (ratio*100).toFixed(0)+'%');
    let adjust, tip;
    if (Math.abs(ratio - 1) < 0.05) {
      adjust = 'Same size — no adjustment needed'; tip = 'Same baking time and temperature.';
    } else if (ratio < 0.85) {
      adjust = 'Pan is smaller — reduce recipe by '+(100-Math.round(ratio*100))+'%';
      tip = 'Reduce temperature by 25°F (15°C) and increase baking time 10-15%. Batter is deeper so it takes longer.';
    } else if (ratio > 1.15) {
      adjust = 'Pan is larger — increase recipe by '+(Math.round(ratio*100)-100)+'%';
      tip = 'Increase temperature by 25°F (15°C) and decrease baking time 10-15%. Batter is shallower so it cooks faster.';
    } else {
      adjust = 'Very similar size — minor adjustment or use as-is';
      tip = 'Minor adjustment: slight change in baking time (±5 minutes). Check doneness early.';
    }
    set('res-adjust', adjust);
    set('res-tip', tip);
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