document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'PCOS Risk Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const irreg = parseInt(document.getElementById('irregular').value)||0;
    const acne = parseInt(document.getElementById('acne').value)||0;
    const hairGrowth = parseInt(document.getElementById('hair_growth').value)||0;
    const hairLoss = parseInt(document.getElementById('hair_loss').value)||0;
    const weight = parseInt(document.getElementById('weight').value)||0;
    const infertility = parseInt(document.getElementById('infertility').value)||0;
    const family = document.getElementById('family').value;
    const androgen = (acne*1.5 + hairGrowth*2 + hairLoss) / 45 * 100;
    const cycle = irreg * 10;
    const metabolic = (weight + infertility) / 20 * 100;
    let criteria = 0;
    if (cycle >= 60) criteria++;
    if (androgen >= 50) criteria++;
    if (metabolic >= 40) criteria++;
    const baseRisk = (cycle * 0.35 + androgen * 0.35 + metabolic * 0.30);
    const risk = Math.min(95, Math.round(baseRisk + (family === 'yes' ? 15 : 0)));
    set('res-risk', risk+'%');
    set('res-rotterdam', criteria+'/3');
    let action;
    if (risk < 25) action = 'Low indicators. Maintain healthy lifestyle.';
    else if (risk < 50) action = 'Moderate indicators. Discuss with your GP.';
    else action = 'High indicators. Blood tests: LH, FSH, testosterone, insulin, ultrasound.';
    set('res-next', action);
    set('res-detail', 'Rotterdam criteria: (1) Irregular/absent ovulation, (2) Elevated androgens (symptoms or blood test), (3) Polycystic ovaries on ultrasound. PCOS is diagnosed when 2 of 3 criteria are met, other causes excluded. This tool is for educational purposes only.');
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