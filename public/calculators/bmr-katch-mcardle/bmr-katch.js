document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'BMR Calculator — Katch-McArdle' });

  let unit = 'metric';
  let gender = 'male';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('lbm-unit').textContent = 'kg';
        document.getElementById('weight-unit').textContent = 'kg';
        document.getElementById('height-metric').style.display = '';
        document.getElementById('height-imperial').style.display = 'none';
        
        convertInput('lbm-direct', 0.453592);
        convertInput('weight-input', 0.453592);
      } else {
        document.getElementById('lbm-unit').textContent = 'lbs';
        document.getElementById('weight-unit').textContent = 'lbs';
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';

        convertInput('lbm-direct', 1/0.453592);
        convertInput('weight-input', 1/0.453592);
      }
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  function convertInput(id, factor) {
    const val = parseFloat(document.getElementById(id).value);
    if (!isNaN(val) && val > 0) document.getElementById(id).value = (val * factor).toFixed(1);
  }

  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.getElementById('compare-btn').addEventListener('click', calculateComparison);
  document.querySelectorAll('.input-field').forEach(input => {
    if(input.id !== 'age' && !input.id.startsWith('height')) {
      input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
    }
  });

  function calculate() {
    const lbmDirect = parseFloat(document.getElementById('lbm-direct').value);
    const weight = parseFloat(document.getElementById('weight-input').value);
    const bfPct = parseFloat(document.getElementById('bf-pct').value);

    let lbmKg = 0;
    let lbmLbs = 0;

    if (!isNaN(lbmDirect) && lbmDirect > 0) {
      if (unit === 'metric') {
        lbmKg = lbmDirect;
        lbmLbs = lbmDirect / 0.453592;
      } else {
        lbmKg = lbmDirect * 0.453592;
        lbmLbs = lbmDirect;
      }
    } else if (!isNaN(weight) && weight > 0 && !isNaN(bfPct) && bfPct >= 3 && bfPct <= 70) {
      const weightKg = unit === 'metric' ? weight : weight * 0.453592;
      lbmKg = weightKg * (1 - bfPct / 100);
      lbmLbs = lbmKg / 0.453592;
    } else {
      showError('Please enter either LBM directly OR valid Weight and Body Fat % (3-70%).');
      return;
    }

    document.getElementById('calc-warning').classList.remove('visible');

    const bmr = 370 + (21.6 * lbmKg);

    document.getElementById('lbm-used-note').innerHTML = `LBM used: <strong>${lbmKg.toFixed(1)} kg</strong> (${lbmLbs.toFixed(1)} lbs)`;
    document.getElementById('bmr-val').textContent = Math.round(bmr).toLocaleString();
    document.getElementById('formula-used').innerHTML = `BMR = 370 + (21.6 × ${lbmKg.toFixed(1)} kg) = <strong>${Math.round(bmr)}</strong>`;

    document.getElementById('result-section').classList.add('visible');
  }

  function calculateComparison() {
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight-input').value);
    let heightCm;

    if (unit === 'metric') {
      heightCm = parseFloat(document.getElementById('height-cm').value);
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      heightCm = (ft * 12 + inches) * 2.54;
    }

    const weightKg = unit === 'metric' ? weight : weight * 0.453592;

    if (!age || age <= 0 || !heightCm || heightCm <= 0 || !weightKg || weightKg <= 0) {
      showError('Please enter weight (in main form), age, and height to compare.');
      return;
    }

    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    document.getElementById('mifflin-val').textContent = Math.round(bmr).toLocaleString();
    document.getElementById('mifflin-result').style.display = 'block';
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});