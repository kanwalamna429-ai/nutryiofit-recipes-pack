document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Neck Circumference Calculator' });

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
        document.querySelectorAll('.u-lbl').forEach(l => l.textContent = unit === 'cm' ? 'cm' : 'in');

        const v = parseFloat(document.getElementById('neck-input').value);
        if (!isNaN(v)) {
          document.getElementById('neck-input').value = unit === 'cm' ? (v * 2.54).toFixed(1) : (v / 2.54).toFixed(1);
        }
        resultEl.classList.remove('visible');
      }
    });
  });

  function erf(x) {
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); }));

  function calculate() {
    errEl.classList.remove('visible');
    resultEl.classList.remove('visible');
    document.getElementById('apnea-warning').style.display = 'none';

    let neckCm = parseFloat(document.getElementById('neck-input').value);
    if (!neckCm || neckCm <= 0) {
      errEl.textContent = 'Please enter a valid measurement.';
      errEl.classList.add('visible');
      return;
    }

    if (unit === 'inch') neckCm *= 2.54;

    if (neckCm < 20 || neckCm > 70) {
      errEl.textContent = 'Value seems outside normal range, please double check.';
      errEl.classList.add('visible');
    }

    let risk = '';
    let badgeClass = '';
    let isApneaHigh = false;

    if (gender === 'male') {
      if (neckCm < 37) { risk = 'Low Risk'; badgeClass = 'badge-green'; }
      else if (neckCm <= 43) { risk = 'Moderate Risk'; badgeClass = 'badge-yellow'; }
      else { risk = 'High Risk'; badgeClass = 'badge-red'; isApneaHigh = true; }
    } else {
      if (neckCm < 34) { risk = 'Low Risk'; badgeClass = 'badge-green'; }
      else if (neckCm <= 41) { risk = 'Moderate Risk'; badgeClass = 'badge-yellow'; }
      else { risk = 'High Risk'; badgeClass = 'badge-red'; isApneaHigh = true; }
    }

    const nIn = neckCm / 2.54;
    document.getElementById('neck-val').textContent = `${neckCm.toFixed(1)} cm (${nIn.toFixed(1)} in)`;

    const badge = document.getElementById('risk-badge');
    badge.textContent = risk;
    badge.className = 'result-badge ' + badgeClass;

    if (isApneaHigh) document.getElementById('apnea-warning').style.display = 'block';

    const mean = gender === 'male' ? 38 : 33;
    const sd = gender === 'male' ? 3 : 2.5;
    const z = (neckCm - mean) / sd;
    const pct = Math.max(1, Math.min(99, Math.round((0.5 * (1 + erf(z / Math.sqrt(2)))) * 100)));
    document.getElementById('percentile-text').innerHTML = `Larger than approx. <strong>${pct}%</strong> of ${gender === 'male' ? 'men' : 'women'}`;

    const minScale = gender === 'male' ? 30 : 25;
    const maxScale = gender === 'male' ? 55 : 50;
    const markerPct = Math.max(0, Math.min(100, ((neckCm - minScale) / (maxScale - minScale)) * 100));
    document.getElementById('neck-marker').style.left = markerPct + '%';

    const labels = document.getElementById('bar-labels');
    labels.innerHTML = `<span>${minScale}cm</span><span>${mean}cm</span><span>${maxScale}cm</span>`;

    resultEl.classList.add('visible');
  }
});