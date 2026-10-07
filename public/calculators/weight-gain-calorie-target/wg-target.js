document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Weight Gain Calorie Target Calculator' });

  let unit = 'metric';
  let gender = 'male';
  let experience = 'beginner';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('height-metric').style.display = '';
        document.getElementById('height-imperial').style.display = 'none';
        document.querySelectorAll('.weight-unit-label').forEach(el => el.textContent = 'kg');
        
        ['current-weight', 'goal-weight'].forEach(id => {
          const wLbs = parseFloat(document.getElementById(id).value);
          if (!isNaN(wLbs) && wLbs > 0) document.getElementById(id).value = (wLbs * 0.453592).toFixed(1);
        });
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.querySelectorAll('.weight-unit-label').forEach(el => el.textContent = 'lbs');

        ['current-weight', 'goal-weight'].forEach(id => {
          const wKg = parseFloat(document.getElementById(id).value);
          if (!isNaN(wKg) && wKg > 0) document.getElementById(id).value = (wKg / 0.453592).toFixed(1);
        });
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

  document.querySelectorAll('#exp-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      experience = btn.dataset.exp;
      document.querySelectorAll('#exp-toggle .unit-btn').forEach(b => b.classList.remove('active'));
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
    const timeline = parseFloat(document.getElementById('timeline').value);
    let heightCm, currentKg, goalKg;

    if (unit === 'metric') {
      heightCm = parseFloat(document.getElementById('height-cm').value);
      currentKg = parseFloat(document.getElementById('current-weight').value);
      goalKg = parseFloat(document.getElementById('goal-weight').value);
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      heightCm = (ft * 12 + inches) * 2.54;
      currentKg = parseFloat(document.getElementById('current-weight').value) * 0.453592;
      goalKg = parseFloat(document.getElementById('goal-weight').value) * 0.453592;
    }

    if (!age || age <= 0 || !heightCm || heightCm <= 0 || !currentKg || currentKg <= 0 || !goalKg || goalKg <= 0 || !timeline || timeline <= 0) {
      showError('Please enter valid values for all fields.');
      return;
    }

    if (goalKg <= currentKg) {
      showError('Goal weight must be greater than current weight for weight gain.');
      return;
    }
    
    document.getElementById('calc-warning').classList.remove('visible');

    const activity = parseFloat(document.getElementById('activity').value);

    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * currentKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * currentKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
    const tdee = bmr * activity;

    const kgToGain = goalKg - currentKg;
    const totalCalSurplus = kgToGain * 7700;
    const dailySurplus = totalCalSurplus / (timeline * 7);
    const dailyTarget = Math.round(tdee + dailySurplus);

    const maxMuscleGain = {
      male:   { beginner: 1.5, intermediate: 0.75, advanced: 0.35 },
      female: { beginner: 0.75, intermediate: 0.35, advanced: 0.15 }
    };
    const maxMuscleMonthly = maxMuscleGain[gender][experience];
    const maxMuscleTotal = maxMuscleMonthly * (timeline / 4.33);

    let assessment, assessColor, assessBg;
    if (kgToGain <= maxMuscleTotal) {
      assessment = ' Realistic — mostly muscle gain is possible';
      assessColor = '#15803d';
      assessBg = '#f0fdf4';
    } else if (kgToGain <= maxMuscleTotal * 2) {
      assessment = ' Moderate — expect a mix of muscle and fat gain';
      assessColor = '#c2410c';
      assessBg = '#fff7ed';
    } else {
      assessment = ' Aggressive — most of the weight gained will be fat';
      assessColor = '#b91c1c';
      assessBg = '#fef2f2';
    }

    document.getElementById('daily-target').textContent = dailyTarget.toLocaleString();
    document.getElementById('surplus-amt').textContent = Math.round(dailySurplus).toLocaleString();

    const badge = document.getElementById('assessment-badge');
    badge.textContent = assessment;
    badge.style.color = assessColor;
    badge.style.backgroundColor = assessBg;
    badge.style.border = `1px solid ${assessColor}33`;

    document.getElementById('lean-val').textContent = Math.round(tdee + 250).toLocaleString();
    document.getElementById('dirty-val').textContent = Math.round(tdee + 750).toLocaleString();

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});