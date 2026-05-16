document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'BMR Calculator — Harris-Benedict' });

  let unit = 'metric';
  let gender = 'male';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('height-metric').style.display = '';
        document.getElementById('height-imperial').style.display = 'none';
        document.getElementById('weight-unit').textContent = 'kg';
        
        const wLbs = parseFloat(document.getElementById('weight-input').value);
        if (!isNaN(wLbs) && wLbs > 0) document.getElementById('weight-input').value = (wLbs * 0.453592).toFixed(1);
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.getElementById('weight-unit').textContent = 'lbs';

        const wKg = parseFloat(document.getElementById('weight-input').value);
        if (!isNaN(wKg) && wKg > 0) document.getElementById('weight-input').value = (wKg / 0.453592).toFixed(1);
      }
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function calculate() {
    const age = parseFloat(document.getElementById('age').value);
    let heightCm, weightKg;

    if (unit === 'metric') {
      heightCm = parseFloat(document.getElementById('height-cm').value);
      weightKg = parseFloat(document.getElementById('weight-input').value);
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      heightCm = (ft * 12 + inches) * 2.54;
      weightKg = parseFloat(document.getElementById('weight-input').value) * 0.453592;
    }

    if (!age || age <= 0 || !heightCm || heightCm <= 0 || !weightKg || weightKg <= 0) {
      showError('Please enter valid age, height, and weight.');
      return;
    }
    document.getElementById('calc-warning').classList.remove('visible');

    let bmr_hb = 0;
    let bmr_m = 0;

    if (gender === 'male') {
      bmr_hb = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
      bmr_m = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr_hb = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
      bmr_m = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    const hb = Math.round(bmr_hb);
    const m = Math.round(bmr_m);

    document.getElementById('hb-val').textContent = hb.toLocaleString();
    document.getElementById('mifflin-val').textContent = m.toLocaleString();

    const diff = Math.abs(hb - m);
    const pct = ((diff / ((hb + m) / 2)) * 100).toFixed(1);

    document.getElementById('diff-note').innerHTML = `These formulas differ by <strong>${diff}</strong> calories/day (${pct}%)`;

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});