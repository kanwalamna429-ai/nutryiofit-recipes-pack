document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Plate Loading Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const target = parseFloat(document.getElementById('target').value);
    const barSel = document.getElementById('bar').value;
    const customBar = parseFloat(document.getElementById('custom_bar').value)||20;
    let barWeight = barSel === 'custom' ? customBar : parseFloat(barSel);
    if (!target || target <= 0) { err('Enter a valid target weight.'); return; }
    if (target < barWeight) { err('Target weight is less than the bar weight.'); return; }
    const perSide = (target - barWeight) / 2;
    set('res-side', perSide.toFixed(1));
    const plates = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25];
    const used = [];
    let remaining = perSide;
    plates.forEach(p => {
      const count = Math.floor(remaining / p + 0.001);
      if (count > 0) { used.push({p, count}); remaining -= count*p; remaining = Math.round(remaining*1000)/1000; }
    });
    const el = document.getElementById('res-plates-list');
    if (used.length === 0 && perSide === 0) {
      el.innerHTML = 'No plates needed — just the bar.';
    } else {
      el.innerHTML = '<strong>Plates per side:</strong><br>' + used.map(u => u.count+'× '+u.p+'kg').join(' + ') + (remaining > 0.01 ? '<br><span style="color:#ef4444">⚠️ '+remaining.toFixed(2)+'kg cannot be loaded exactly</span>' : '<br><span style="color:#22c55e">✓ Exact match</span>');
    }
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