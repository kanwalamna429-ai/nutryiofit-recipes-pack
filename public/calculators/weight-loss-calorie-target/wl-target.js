document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Weight Loss Calorie Target Calculator' });

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
      document.getElementById('floor-warning').classList.remove('visible');
    });
  });

  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
      document.getElementById('floor-warning').classList.remove('visible');
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

    if (goalKg >= currentKg) {
      showError('Goal weight must be less than current weight for weight loss.');
      return;
    }
    
    document.getElementById('calc-warning').classList.remove('visible');
    document.getElementById('floor-warning').classList.remove('visible');

    const activity = parseFloat(document.getElementById('activity').value);

    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * currentKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * currentKg) + (6.25 * heightCm) - (5 * age) - 161;
    }
    const tdee = bmr * activity;

    const kgToLose = currentKg - goalKg;
    const totalCalDeficit = kgToLose * 7700;
    const dailyDeficit = totalCalDeficit / (timeline * 7);
    const dailyTarget = Math.round(tdee - dailyDeficit);

    const floor = gender === 'male' ? 1500 : 1200;

    const pctBwPerWeek = (kgToLose / timeline) / currentKg * 100;
    
    let zone, zoneColor, zoneMsg = '';
    if (pctBwPerWeek <= 0.5) { 
      zone = 'Safe'; zoneColor = '#22c55e'; 
    } else if (pctBwPerWeek <= 1.0) { 
      zone = 'Moderate'; zoneColor = '#f97316'; 
    } else { 
      zone = 'Aggressive'; zoneColor = '#ef4444'; 
      zoneMsg = 'Warning: losing more than 1% of bodyweight per week risks muscle loss and is not recommended.'; 
    }

    const healthyWeeksModerate = Math.ceil(kgToLose / 0.5);
    const healthyWeeksConservative = Math.ceil(kgToLose / 0.25);

    document.getElementById('tdee-val').textContent = Math.round(tdee).toLocaleString();
    document.getElementById('deficit-val').textContent = `-${Math.round(dailyDeficit).toLocaleString()}`;
    document.getElementById('target-val').textContent = dailyTarget.toLocaleString();

    const targetCard = document.getElementById('target-card');
    if (dailyTarget < floor) {
      targetCard.style.borderColor = 'rgba(239, 68, 68, 0.2)';
      targetCard.style.background = '#fef2f2';
      targetCard.querySelector('div:first-child').style.color = '#b91c1c';
      targetCard.querySelector('div:nth-child(2)').style.color = '#991b1b';
      targetCard.querySelector('div:last-child').style.color = '#991b1b';
      
      const floorWarn = document.getElementById('floor-warning');
      floorWarn.textContent = `Your timeline requires eating below ${floor} cal/day (the safe minimum for your gender). Eating ${dailyTarget} cal/day is not recommended.`;
      floorWarn.classList.add('visible');
    } else {
      targetCard.style.borderColor = 'rgba(34, 197, 94, 0.2)';
      targetCard.style.background = '#f0fdf4';
      targetCard.querySelector('div:first-child').style.color = '#15803d';
      targetCard.querySelector('div:nth-child(2)').style.color = '#166534';
      targetCard.querySelector('div:last-child').style.color = '#166534';
    }

    const fb = document.getElementById('feasibility-badge');
    fb.style.borderColor = zoneColor;
    
    const ft = document.getElementById('feasibility-title');
    ft.textContent = `⚡ ${zone} Rate`;
    ft.style.color = zoneColor;

    document.getElementById('pct-val').textContent = pctBwPerWeek.toFixed(2);
    document.getElementById('feasibility-msg').textContent = zoneMsg;

    document.getElementById('kg-lose-val').textContent = `${kgToLose.toFixed(1)} kg${unit === 'imperial' ? ` (${(kgToLose / 0.453592).toFixed(1)} lbs)` : ''}`;
    document.getElementById('weeks-conservative').textContent = healthyWeeksConservative;
    document.getElementById('weeks-moderate').textContent = healthyWeeksModerate;

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});