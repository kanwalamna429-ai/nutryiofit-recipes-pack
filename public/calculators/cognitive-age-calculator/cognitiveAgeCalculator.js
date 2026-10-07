document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Cognitive Age Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const chrono = parseInt(document.getElementById('chrono_age').value);
    if (!chrono) { err('Enter your chronological age.'); return; }
    const adj = {
      education:{less12:3, '12-15':0, '16+': -2, postgrad:-3},
      exercise:{none:4, occasional:1, regular:-3, daily:-4},
      learning:{low:3, moderate:0, high:-4},
      social:{isolated:3, some:0, active:-3},
      sleep_quality:{poor:3, fair:0, good:-3},
      diet:{poor:3, fair:0, mediterranean:-3},
    };
    let total = 0;
    for (const [k, v] of Object.entries(adj)) {
      total += v[document.getElementById(k).value] || 0;
    }
    const cogAge = Math.max(18, Math.min(100, chrono + total));
    const score = Math.min(100, Math.max(0, 70 - total * 2));
    const diff = chrono - cogAge;
    set('res-cog_age', Math.round(cogAge)+'');
    set('res-score', Math.round(score)+'/100');
    set('res-diff', diff > 0 ? diff+' years younger' : Math.abs(diff)+' years older');
    const tips = {exercise:'Add 150+ min/week aerobic exercise (best evidence-based brain protector)',learning:'Daily mental stimulation: reading, puzzles, learning a new skill or language',social:'Increase social engagement — it's one of the strongest cognitive reserve builders',sleep_quality:'Improve sleep quality — poor sleep accelerates brain aging (Alzheimer's risk)',diet:'Adopt Mediterranean or MIND diet — associated with slower cognitive decline'};
    const worst = {exercise: adj.exercise[document.getElementById('exercise').value]||0, learning: adj.learning[document.getElementById('learning').value]||0, social: adj.social[document.getElementById('social').value]||0, sleep_quality: adj.sleep_quality[document.getElementById('sleep_quality').value]||0, diet: adj.diet[document.getElementById('diet').value]||0};
    const top = Object.entries(worst).sort((a,b)=>b[1]-a[1])[0][0];
    set('res-top_tip', tips[top] || 'Maintain your healthy habits');
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