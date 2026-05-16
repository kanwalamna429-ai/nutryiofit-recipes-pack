document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'TDEE Calculator' });

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

    const activitySel = document.getElementById('activity');
    const activityMult = parseFloat(activitySel.value);
    const activityLabel = activitySel.options[activitySel.selectedIndex].text.split('—')[0].trim();

    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    const tdee = bmr * activityMult;

    const targets = {
      lose_agg: Math.round(tdee - 500),
      lose_mod: Math.round(tdee - 250),
      maintain: Math.round(tdee),
      gain_lean: Math.round(tdee + 300),
      gain_agg: Math.round(tdee + 500)
    };

    document.getElementById('tdee-val').textContent = Math.round(tdee).toLocaleString();
    document.getElementById('bmr-val').textContent = Math.round(bmr).toLocaleString();
    document.getElementById('activity-label').textContent = activityLabel;
    document.getElementById('activity-mult').textContent = activityMult;

    setTarget('lose-agg', targets.lose_agg, 0.35, 0.35, 0.30);
    setTarget('lose-mod', targets.lose_mod, 0.35, 0.35, 0.30);
    setTarget('maintain', targets.maintain, 0.30, 0.40, 0.30);
    setTarget('gain-lean', targets.gain_lean, 0.30, 0.45, 0.25);
    setTarget('gain-agg', targets.gain_agg, 0.30, 0.45, 0.25);

    document.getElementById('result-section').classList.add('visible');
  }

  function setTarget(id, cals, pPct, cPct, fPct) {
    document.getElementById(`cal-${id}`).textContent = cals.toLocaleString();
    document.getElementById(`p-${id}`).textContent = Math.round((cals * pPct) / 4);
    document.getElementById(`c-${id}`).textContent = Math.round((cals * cPct) / 4);
    document.getElementById(`f-${id}`).textContent = Math.round((cals * fPct) / 9);
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});