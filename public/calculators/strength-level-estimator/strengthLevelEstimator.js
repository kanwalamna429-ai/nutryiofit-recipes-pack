document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Strength Level Estimator' });

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
    const lift = document.getElementById('lift').value;
    const lifted = parseFloat(document.getElementById('lifted').value);
    const bw = parseFloat(document.getElementById('bw').value);
    if (!lifted || !bw || lifted <= 0 || bw <= 0) { err('Enter valid weights.'); return; }
    const ratio = lifted / bw;
    const standards = {
      squat: { male: [0.75,1.25,1.75,2.25,2.75], female: [0.5,0.75,1.25,1.75,2.0] },
      bench: { male: [0.5,0.75,1.25,1.5,2.0], female: [0.35,0.5,0.75,1.0,1.25] },
      deadlift: { male: [1.0,1.5,2.0,2.5,3.0], female: [0.75,1.0,1.5,2.0,2.5] },
      ohp: { male: [0.35,0.5,0.75,1.0,1.25], female: [0.2,0.35,0.5,0.65,0.8] },
    };
    const s = standards[lift][gender] || standards[lift].male;
    const levels = ['Beginner','Novice','Intermediate','Advanced','Elite'];
    let lvlIdx = 0;
    for (let i = 0; i < s.length; i++) { if (ratio >= s[i]) lvlIdx = i+1; }
    if (lvlIdx > 4) lvlIdx = 4;
    set('res-level', levels[lvlIdx] || levels[0]);
    set('res-ratio', ratio.toFixed(2)+'×');
    const nextTarget = lvlIdx < s.length ? Math.round(s[lvlIdx] * bw) : 'Elite achieved';
    set('res-next', typeof nextTarget === 'number' ? nextTarget+'kg' : 'Elite!');
    set('res-detail', 'Standard ratios for '+lift+': Beginner='+s[0]+'× | Novice='+s[1]+'× | Intermediate='+s[2]+'× | Advanced='+s[3]+'× | Elite='+s[4]+'×');
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