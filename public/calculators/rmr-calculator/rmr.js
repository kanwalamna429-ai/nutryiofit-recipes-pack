document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'RMR Calculator' });

  let unit = 'metric';
  let gender = 'male';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const weightInput = document.getElementById('weight-input');
      const val = parseFloat(weightInput.value);

      if (unit === 'metric') {
        document.getElementById('height-metric').style.display = '';
        document.getElementById('height-imperial').style.display = 'none';
        document.getElementById('weight-unit').textContent = 'kg';
        if (!isNaN(val) && val > 0) weightInput.value = (val * 0.453592).toFixed(1);
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.getElementById('weight-unit').textContent = 'lbs';
        if (!isNaN(val) && val > 0) weightInput.value = (val / 0.453592).toFixed(1);
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

    const activityMult = parseFloat(document.getElementById('activity').value);

    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    const rmr = Math.round(bmr * 1.1);
    const tdee = Math.round(rmr * activityMult);

    const bmrPct = Math.round(bmr / tdee * 100);
    const tefPct = 10;
    const neatPct = 15;
    const eeePct = 100 - bmrPct - tefPct - neatPct;

    document.getElementById('rmr-val').textContent = rmr.toLocaleString();
    document.getElementById('bmr-val').textContent = Math.round(bmr).toLocaleString();

    document.getElementById('bar-bmr').style.width = `${bmrPct}%`;
    document.getElementById('bar-tef').style.width = `10%`;
    document.getElementById('bar-neat').style.width = `15%`;
    document.getElementById('bar-eee').style.width = `${eeePct}%`;

    document.getElementById('tbl-bmr-cal').textContent = Math.round(bmr).toLocaleString();
    document.getElementById('tbl-bmr-pct').textContent = `${bmrPct}%`;

    document.getElementById('tbl-tef-cal').textContent = Math.round(tdee * 0.1).toLocaleString();
    
    document.getElementById('tbl-neat-cal').textContent = Math.round(tdee * 0.15).toLocaleString();
    document.getElementById('tbl-neat-pct').textContent = '15%';

    document.getElementById('tbl-eee-cal').textContent = Math.round(tdee * (eeePct/100)).toLocaleString();
    document.getElementById('tbl-eee-pct').textContent = `${eeePct}%`;

    document.getElementById('tbl-tdee-cal').innerHTML = `<strong>${tdee.toLocaleString()}</strong>`;

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});