document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Wilks Score Calculator' });

  let unit = 'metric';
  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });
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
    let bw = parseFloat(document.getElementById('bw').value);
    let tot = parseFloat(document.getElementById('total').value);
    if (!bw || !tot || bw <= 0 || tot <= 0) { err('Enter valid body weight and total.'); return; }
    if (unit === 'imperial') { bw *= 0.453592; tot *= 0.453592; }
    const mCoef = [-216.0475144,16.2606339,-0.002388645,-0.00113732,7.01863E-6,-1.291E-8];
    const fCoef = [594.31747775582,-27.23842536447,0.82112226871,-0.00930733913,4.731582E-5,-9.054E-8];
    const coef = gender === 'male' ? mCoef : fCoef;
    const denom = coef[0]+coef[1]*bw+coef[2]*bw**2+coef[3]*bw**3+coef[4]*bw**4+coef[5]*bw**5;
    const wilks = tot * (500 / denom);
    set('res-wilks', Math.round(wilks));
    set('res-total', Math.round(tot)+'kg');
    set('res-ratio', (tot/bw).toFixed(2)+'x');
    let level = wilks < 200 ? 'Beginner' : wilks < 300 ? 'Intermediate' : wilks < 400 ? 'Advanced' : wilks < 500 ? 'Elite' : 'World Class';
    set('res-level', level+' ('+Math.round(wilks)+' pts)');
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