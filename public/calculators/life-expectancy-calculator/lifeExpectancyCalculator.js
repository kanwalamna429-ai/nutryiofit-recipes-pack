document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Life Expectancy Calculator' });

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
    const age = parseInt(document.getElementById('age').value);
    if (!age || age < 18) { err('Enter a valid age.'); return; }
    const base = gender === 'male' ? 76 : 81;
    const adj = {
      smoking:{never:2, former:-2, quit_long:-1, current_light:-6, current_heavy:-10},
      bmi_range:{underweight:-2, normal:2, overweight:-1, obese1:-3, obese2:-7},
      exercise:{none:-3, light:0, moderate:3, intense:2},
      alcohol:{none:0, moderate:1, heavy:-4},
      chronic:{none:2, one:-2, multiple:-5, severe:-8},
    };
    let totalAdj = 0;
    for (const [k, v] of Object.entries(adj)) {
      totalAdj += v[document.getElementById(k).value] || 0;
    }
    const expected = Math.max(age+1, base + totalAdj);
    const remaining = expected - age;
    set('res-expected', Math.round(expected)+'');
    set('res-remaining', Math.max(0, Math.round(remaining))+' years');
    set('res-base', base+' years ('+gender+', '+new Date().getFullYear()+')');
    set('res-adj', (totalAdj >= 0 ? '+' : '')+totalAdj+' years from lifestyle');
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