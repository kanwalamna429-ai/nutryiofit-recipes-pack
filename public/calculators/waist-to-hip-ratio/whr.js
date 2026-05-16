document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Waist-to-Hip Ratio Calculator' });

  let unit = 'cm';
  let gender = 'male';

  const errEl = document.getElementById('err-msg');
  const resultEl = document.getElementById('result');

  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.id === 'gender-male' || btn.id === 'gender-female') {
        gender = btn.id === 'gender-male' ? 'male' : 'female';
        document.getElementById('gender-male').classList.toggle('active', gender === 'male');
        document.getElementById('gender-female').classList.toggle('active', gender === 'female');
        return;
      }

      if (btn.dataset.unit) {
        unit = btn.dataset.unit;
        document.querySelectorAll('[data-unit]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.u-lbl').forEach(el => el.textContent = unit === 'cm' ? 'cm' : 'in');
        
        const w = parseFloat(document.getElementById('waist-input').value);
        const h = parseFloat(document.getElementById('hip-input').value);
        if (!isNaN(w)) document.getElementById('waist-input').value = unit === 'cm' ? (w * 2.54).toFixed(1) : (w / 2.54).toFixed(1);
        if (!isNaN(h)) document.getElementById('hip-input').value = unit === 'cm' ? (h * 2.54).toFixed(1) : (h / 2.54).toFixed(1);
        
        resultEl.classList.remove('visible');
      }
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); }));

  function calculate() {
    errEl.classList.remove('visible');
    resultEl.classList.remove('visible');

    const waist = parseFloat(document.getElementById('waist-input').value);
    const hip = parseFloat(document.getElementById('hip-input').value);

    if (!waist || !hip || waist <= 0 || hip <= 0) {
      errEl.textContent = 'Please enter valid measurements.';
      errEl.classList.add('visible');
      return;
    }

    if (waist > hip * 1.5) {
      errEl.textContent = 'Unusual measurement — please double-check. (Waist is significantly larger than hip)';
      errEl.classList.add('visible');
      // allow calculation anyway, just warn
    }

    const whr = waist / hip;
    document.getElementById('whr-val').textContent = whr.toFixed(3);

    let risk = '';
    let badgeClass = '';

    if (gender === 'male') {
      if (whr < 0.90) { risk = 'Low Risk'; badgeClass = 'badge-green'; }
      else if (whr < 1.00) { risk = 'Moderate Risk'; badgeClass = 'badge-yellow'; }
      else { risk = 'High Risk'; badgeClass = 'badge-red'; }
    } else {
      if (whr < 0.80) { risk = 'Low Risk'; badgeClass = 'badge-green'; }
      else if (whr < 0.90) { risk = 'Moderate Risk'; badgeClass = 'badge-yellow'; }
      else { risk = 'High Risk'; badgeClass = 'badge-red'; }
    }

    const badge = document.getElementById('risk-badge');
    badge.textContent = risk;
    badge.className = 'result-badge ' + badgeClass;

    const markerPct = Math.max(0, Math.min(100, ((whr - 0.6) / 0.6) * 100));
    document.getElementById('whr-marker').style.left = markerPct + '%';

    let wCm, wIn, hCm, hIn;
    if (unit === 'cm') {
      wCm = waist; hCm = hip;
      wIn = waist / 2.54; hIn = hip / 2.54;
    } else {
      wIn = waist; hIn = hip;
      wCm = waist * 2.54; hCm = hip * 2.54;
    }

    document.getElementById('out-waist').textContent = `${wCm.toFixed(1)} cm (${wIn.toFixed(1)} in)`;
    document.getElementById('out-hip').textContent = `${hCm.toFixed(1)} cm (${hIn.toFixed(1)} in)`;

    resultEl.classList.add('visible');
  }
});