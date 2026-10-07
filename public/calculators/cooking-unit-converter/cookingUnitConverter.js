document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Cooking Unit Converter' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('from_unit').value;
    const to = document.getElementById('to_unit').value;
    if (!amount || amount <= 0) { err('Enter a valid amount.'); return; }
    const toMl = {cup:236.588, tbsp:14.787, tsp:4.929, fl_oz:29.574, ml:1, liter:1000, oz_weight:28.35, lb:453.592, gram:1, kg:1000};
    const fromMl = amount * (toMl[from] || 1);
    const result = fromMl / (toMl[to] || 1);
    const fromName = document.getElementById('from_unit').options[document.getElementById('from_unit').selectedIndex].text;
    const toName = document.getElementById('to_unit').options[document.getElementById('to_unit').selectedIndex].text;
    set('res-result', (Math.round(result*1000)/1000)+' '+toName);
    set('res-quick', amount+' '+fromName+' = '+(Math.round(result*1000)/1000)+' '+toName);
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