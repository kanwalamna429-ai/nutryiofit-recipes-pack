document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Oven Temperature Converter' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const c = parseFloat(document.getElementById('conventional_c').value);
    if (!c || c < 50) { err('Enter a valid oven temperature.'); return; }
    const fanC = c - 20;
    const convF = Math.round(c * 9/5 + 32);
    const fanF = Math.round(fanC * 9/5 + 32);
    const gasTable = [[107,0.25],[121,0.5],[135,1],[149,2],[163,3],[177,4],[191,5],[204,6],[218,7],[232,8],[246,9],[260,10]];
    let gasM = 10;
    for (const [temp, mark] of gasTable) { if (c <= temp + 7) { gasM = mark; break; } }
    const agaTable = [[120,'Simmering Oven'],[160,'Baking Oven'],[200,'Roasting Oven'],[240,'Top of Roasting Oven']];
    let aga = 'Top Oven / Hottest';
    for (const [temp, setting] of agaTable) { if (c <= temp) { aga = setting; break; } }
    set('res-conventional_f', convF+'°F');
    set('res-fan_c', fanC+'°C');
    set('res-fan_f', fanF+'°F');
    set('res-gas_mark', gasM !== Math.floor(gasM) ? 'Gas Mark '+gasM : 'Gas Mark '+gasM);
    set('res-aga', aga);
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