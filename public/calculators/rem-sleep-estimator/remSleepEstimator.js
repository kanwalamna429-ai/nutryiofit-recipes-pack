document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'REM Sleep Estimator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const sleep = parseFloat(document.getElementById('sleep_hours').value);
    const age = parseInt(document.getElementById('age').value);
    const quality = document.getElementById('quality').value;
    if (!sleep || sleep < 3 || !age || age < 5) { err('Enter valid sleep hours and age.'); return; }
    let remPct = age < 20 ? 0.22 : age < 40 ? 0.20 : age < 60 ? 0.18 : 0.15;
    if (quality === 'poor') remPct *= 0.8;
    else if (quality === 'fair') remPct *= 0.9;
    const rem = Math.round(sleep * remPct * 10) / 10;
    const deep = Math.round(sleep * 0.20 * 10) / 10;
    const cycles = Math.floor(sleep / 1.5);
    set('res-rem', rem+'h');
    set('res-rem_pct', Math.round(remPct*100)+'%');
    set('res-deep', deep+'h');
    set('res-cycles', cycles+'');
    set('res-note', 'REM sleep is critical for memory consolidation, emotional processing, and creativity. Most REM occurs in the second half of the night — cutting sleep short disproportionately reduces REM. Adults need 20-25% of total sleep in REM (1.5–2h for 8h sleep).');
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