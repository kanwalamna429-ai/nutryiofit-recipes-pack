document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Longevity Score Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const vals = {
      diet:{western:-3, mixed:0, mediterranean:3, plant_based:4},
      exercise:{sedentary:-4, light:1, moderate:4, intense:3},
      social:{isolated:-3, some:0, strong:3},
      purpose:{low:-1, moderate:1, high:3},
      stress:{poor:-3, fair:0, good:3},
      sleep:{poor:-3, ok:0, good:3},
      smoking:{current:-8, former:-2, never:2},
    };
    let total = 0;
    const factors = {};
    for (const [k, v] of Object.entries(vals)) {
      const val = vals[k][document.getElementById(k).value] || 0;
      total += val;
      factors[k] = val;
    }
    const score = Math.min(100, Math.max(0, 50 + total * 2.5));
    const worst = Object.entries(factors).sort((a,b)=>a[1]-b[1])[0];
    const factorNames = {diet:'Diet quality',exercise:'Physical activity',social:'Social connections',purpose:'Sense of purpose',stress:'Stress management',sleep:'Sleep quality',smoking:'Tobacco use'};
    set('res-years', (total > 0 ? '+'+total : total)+' years');
    set('res-score', Math.round(score)+'/100');
    const cat = score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : score >= 50 ? 'Average' : 'Below Average';
    set('res-category', cat);
    set('res-top_factor', factorNames[worst[0]]+' ('+worst[1]+' years)');
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