document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Biological Age Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const chrono = parseInt(document.getElementById('chrono_age').value);
    const exercise = document.getElementById('exercise').value;
    const diet = document.getElementById('diet').value;
    const sleep = document.getElementById('sleep').value;
    const stress = document.getElementById('stress').value;
    const smoking = document.getElementById('smoking').value;
    const alcohol = document.getElementById('alcohol').value;
    if (!chrono) { err('Enter your chronological age.'); return; }
    const scores = {
      exercise:{none:-5, light:-1, moderate:2, daily:4, athlete:3},
      diet:{poor:-5, fair:-1, good:3, excellent:5},
      sleep:{poor:-5, fair:-1, good:3, excellent:5},
      stress:{high:-5, moderate:-1, low:3, minimal:5},
      smoking:{current:-8, former:-3, never:2},
      alcohol:{heavy:-6, moderate:-2, light:0, none:2},
    };
    const adj = scores.exercise[exercise] + scores.diet[diet] + scores.sleep[sleep] + scores.stress[stress] + scores.smoking[smoking] + scores.alcohol[alcohol];
    const bioAge = Math.max(18, Math.min(100, chrono - adj));
    const diff = chrono - bioAge;
    const lifestyleScore = Math.min(100, Math.max(0, 50 + adj * 3));
    set('res-bio_age', Math.round(bioAge)+'');
    set('res-lifestyle', Math.round(lifestyleScore)+'');
    set('res-vs_chrono', (diff > 0 ? diff+' years younger' : diff < 0 ? Math.abs(diff)+' years older' : 'Same as chronological')+'');
    set('res-diff', diff > 0 ? 'Your body is ~'+diff+' years younger than your calendar age' : diff < 0 ? 'Your body is ~'+Math.abs(diff)+' years older — focus on lifestyle improvements' : 'Biological age matches chronological age');
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