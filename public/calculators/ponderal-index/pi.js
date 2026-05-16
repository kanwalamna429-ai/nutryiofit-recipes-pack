document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Ponderal Index' });

  let unit = 'metric';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('height-metric').style.display = '';
        document.getElementById('height-imperial').style.display = 'none';
        document.getElementById('weight-unit').textContent = 'kg';
        
        const cw = parseFloat(document.getElementById('weight-input').value);
        if (!isNaN(cw)) document.getElementById('weight-input').value = (cw * 0.453592).toFixed(1);
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.getElementById('weight-unit').textContent = 'lbs';

        const cw = parseFloat(document.getElementById('weight-input').value);
        if (!isNaN(cw)) document.getElementById('weight-input').value = (cw * 2.20462).toFixed(1);
      }
      document.getElementById('result-section').classList.remove('visible');
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function calculate() {
    let heightM, weightKg;
    const errEl = document.getElementById('calc-error');
    errEl.classList.remove('visible');
    document.getElementById('result-section').classList.remove('visible');

    if (unit === 'metric') {
      const hCm = parseFloat(document.getElementById('height-cm').value);
      const wKg = parseFloat(document.getElementById('weight-input').value);
      if (!hCm || !wKg || hCm <= 0) {
        errEl.textContent = 'Please fill out all fields correctly.';
        errEl.classList.add('visible');
        return;
      }
      heightM = hCm / 100;
      weightKg = wKg;
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      const wLbs = parseFloat(document.getElementById('weight-input').value);
      
      const totalInches = ft * 12 + inches;
      if (!totalInches || !wLbs || totalInches <= 0) {
        errEl.textContent = 'Please fill out all fields correctly.';
        errEl.classList.add('visible');
        return;
      }
      heightM = totalInches * 0.0254;
      weightKg = wLbs * 0.453592;
    }

    const PI = weightKg / Math.pow(heightM, 3);
    const BMI = weightKg / Math.pow(heightM, 2);

    let cat = '', badgeClass = '';
    if (PI < 11) { cat = 'Underweight'; badgeClass = 'badge-blue'; }
    else if (PI < 14) { cat = 'Normal'; badgeClass = 'badge-green'; }
    else if (PI < 17) { cat = 'Overweight'; badgeClass = 'badge-yellow'; }
    else if (PI < 20) { cat = 'Obese'; badgeClass = 'badge-orange'; }
    else { cat = 'Severely Obese'; badgeClass = 'badge-red'; }

    document.getElementById('pi-cmp').textContent = PI.toFixed(1);
    document.getElementById('bmi-cmp').textContent = BMI.toFixed(1);
    
    const badge = document.getElementById('result-badge');
    badge.textContent = cat;
    badge.className = 'result-badge ' + badgeClass;

    const markerVal = Math.max(8, Math.min(22, PI));
    const pct = ((markerVal - 8) / (22 - 8)) * 100;
    document.getElementById('pi-marker').style.left = `${pct}%`;

    const warnEl = document.getElementById('extreme-warning');
    if (PI > 25) {
      warnEl.classList.add('visible');
    } else {
      warnEl.classList.remove('visible');
    }

    document.getElementById('result-section').classList.add('visible');
  }
});