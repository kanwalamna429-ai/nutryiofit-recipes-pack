document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Bench Press Ratio Calculator' });

  let gender = 'male';
  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
    });
  });
  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const bench = parseFloat(document.getElementById('bench').value);
    const bw = parseFloat(document.getElementById('bw').value);
    if (!bench || !bw || bench <= 0 || bw <= 0) { err('Enter valid bench and bodyweight.'); return; }
    const ratio = bench / bw;
    const mStd = [0.5,0.75,1.0,1.25,1.5,2.0];
    const fStd = [0.3,0.5,0.75,1.0,1.25,1.5];
    const std = gender === 'male' ? mStd : fStd;
    const labels = ['Below Beginner','Beginner','Novice','Intermediate','Advanced','Elite'];
    let lvl = 0;
    for (let i = 0; i < std.length; i++) { if (ratio >= std[i]) lvl = i+1; }
    set('res-ratio', ratio.toFixed(2)+'×');
    set('res-level', labels[Math.min(lvl, labels.length-1)]);
    const nextRatio = std[lvl] || std[std.length-1];
    set('res-next_level', Math.round(nextRatio*bw)+'kg');
    set('res-next_ratio', nextRatio+'×');
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