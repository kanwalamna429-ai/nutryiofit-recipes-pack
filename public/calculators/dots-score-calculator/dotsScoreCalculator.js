document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'DOTS Score Calculator' });

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
    const bw = parseFloat(document.getElementById('bw').value);
    const tot = parseFloat(document.getElementById('total').value);
    if (!bw || !tot || bw <= 0 || tot <= 0) { err('Enter valid body weight and total.'); return; }
    const mc = [47.46178854,8.472061379,0.07369410,0.001395833,7.07665E-6,1.620285E-8];
    const fc = [-125.4255398,13.71219419,-0.03307250,-0.001050400,9.38773E-6,-4.9257E-8];
    const c = gender === 'male' ? mc : fc;
    const d = c[0]+c[1]*bw+c[2]*bw**2+c[3]*bw**3+c[4]*bw**4+c[5]*bw**5;
    const dots = tot * (500/d);
    set('res-dots', Math.round(dots));
    set('res-wilks', Math.round(dots * 0.95));
    set('res-perkilo', (500/d).toFixed(3));
    let level = dots < 200 ? 'Beginner' : dots < 300 ? 'Intermediate' : dots < 400 ? 'Advanced' : dots < 500 ? 'Elite' : 'World Class';
    set('res-level', level+' ('+Math.round(dots)+' pts)');
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