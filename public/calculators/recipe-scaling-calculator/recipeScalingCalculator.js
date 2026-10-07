document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Recipe Scaling Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const orig = parseFloat(document.getElementById('original_servings').value);
    const targ = parseFloat(document.getElementById('target_servings').value);
    if (!orig || !targ || orig <= 0) { err('Enter valid serving counts.'); return; }
    const f = targ / orig;
    set('res-factor', f.toFixed(3)+'×');
    const scale = (amt, name) => {
      if (!amt && !name) return '—';
      const scaled = Math.round(amt * f * 100) / 100;
      return scaled + (name ? ' '+name : '');
    };
    const a1 = parseFloat(document.getElementById('ing1_amount').value); const n1 = document.getElementById('ing1_name').value;
    const a2 = parseFloat(document.getElementById('ing2_amount').value); const n2 = document.getElementById('ing2_name').value;
    const a3 = parseFloat(document.getElementById('ing3_amount').value); const n3 = document.getElementById('ing3_name').value;
    if (!a1) { err('Enter at least one ingredient amount.'); return; }
    set('res-i1', scale(a1, n1));
    set('res-i2', a2 ? scale(a2, n2) : '—');
    set('res-i3', a3 ? scale(a3, n3) : '—');
    const tip = f > 2 ? 'For large batches: scale spices and salt slightly less than the ratio (taste and adjust). Cooking time usually needs only a 10-20% increase even for double batches. Use a larger pan to avoid overcrowding.' : f < 0.5 ? 'For small batches: leavening agents (baking powder, yeast) can be tricky — use exact measurements, not estimates.' : 'Straightforward scaling. Taste throughout cooking and adjust seasoning.';
    set('res-tip', tip);
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