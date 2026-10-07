document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'IPF Points Calculator' });

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
    const eq = document.getElementById('equipment').value;
    if (!bw || !tot || bw <= 0 || tot <= 0) { err('Enter valid body weight and total.'); return; }
    const rawM = [1236.25115, 1449.21864, 0.01644];
    const rawF = [758.63878, 949.31382, 0.02435];
    const eqM = [1734.77721, 2041.97596, 0.01636];
    const eqF = [1.04783E3, 1.23340E3, 0.02249];
    const c = eq === 'equipped' ? (gender === 'male' ? eqM : eqF) : (gender === 'male' ? rawM : rawF);
    const denom = c[0] - c[1] * Math.exp(-c[2] * bw);
    const ipf = 100 / denom * tot;
    set('res-ipf', ipf.toFixed(2));
    const dots_approx = tot / bw * 100;
    set('res-dots', (dots_approx*0.8).toFixed(1));
    set('res-ratio', (tot/bw).toFixed(2));
    let level = ipf < 50 ? 'Beginner' : ipf < 70 ? 'Intermediate' : ipf < 90 ? 'Advanced' : ipf < 100 ? 'Elite' : 'World Class';
    set('res-level', level);
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