document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Kitchen Measurement Converter' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const cups = parseFloat(document.getElementById('cups').value)||0;
    const tbsp = parseFloat(document.getElementById('tbsp').value)||0;
    const tsp = parseFloat(document.getElementById('tsp').value)||0;
    if (cups === 0 && tbsp === 0 && tsp === 0) { err('Enter at least one measurement.'); return; }
    const totalTsp = cups*48 + tbsp*3 + tsp;
    const totalTbsp = totalTsp / 3;
    const totalCups = totalTsp / 48;
    const totalMl = totalTsp * 4.929;
    const totalFloz = totalTsp * 4.929 / 29.574;
    set('res-ml', Math.round(totalMl*10)/10+'');
    set('res-floz', Math.round(totalFloz*100)/100+'');
    set('res-tsp_total', Math.round(totalTsp*100)/100+'');
    set('res-tbsp_total', Math.round(totalTbsp*100)/100+'');
    set('res-cup_total', Math.round(totalCups*1000)/1000+'');
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