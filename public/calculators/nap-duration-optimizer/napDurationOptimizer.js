document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Nap Duration Optimizer' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const goal = document.getElementById('goal').value;
    const avail = parseInt(document.getElementById('time_available').value);
    const pressure = document.getElementById('sleep_pressure').value;
    let duration;
    if (goal === 'alert') duration = 20;
    else if (goal === 'creative') duration = 20;
    else if (goal === 'memory') duration = 60;
    else duration = 90;
    if (pressure === 'mild' && duration > 20) duration = Math.min(duration, 30);
    duration = Math.min(duration, avail - 5);
    let type;
    if (duration <= 20) type = 'Power Nap (Stage 1–2 sleep)';
    else if (duration <= 30) type = 'Enhanced Nap (light sleep)';
    else if (duration <= 60) type = 'Memory Nap (includes deep sleep)';
    else type = 'Full Cycle Nap (90-min cycle)';
    set('res-duration', duration+'');
    set('res-type', type);
    set('res-set_alarm', (duration+5)+'');
    const tips = {alert:'A 20-min power nap boosts alertness, mood, and reaction time without grogginess. Add a caffeine nap (coffee then nap) for extra effect — caffeine kicks in as you wake.',creative:'Hypnagogic state at sleep onset can enhance creative thinking. Salvador Dalí famously napped with a key in his hand.',memory:'60-minute naps include slow wave sleep which consolidates factual memory. Expect 15–30 min of grogginess on waking.',recovery:'90 minutes = 1 full sleep cycle. Wake at the end of REM for minimal grogginess.'};
    set('res-tip', tips[goal]);
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