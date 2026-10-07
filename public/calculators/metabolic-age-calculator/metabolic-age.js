document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Metabolic Age Calculator' });

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

  const avgBMR = {
    male:   [
      { decade: '18-24', bmr: 1950 },
      { decade: '25-34', bmr: 1900 },
      { decade: '35-44', bmr: 1830 },
      { decade: '45-54', bmr: 1760 },
      { decade: '55-64', bmr: 1680 },
      { decade: '65+',   bmr: 1580 }
    ],
    female: [
      { decade: '18-24', bmr: 1550 },
      { decade: '25-34', bmr: 1490 },
      { decade: '35-44', bmr: 1430 },
      { decade: '45-54', bmr: 1370 },
      { decade: '55-64', bmr: 1290 },
      { decade: '65+',   bmr: 1210 }
    ]
  };
  const decadeMidpoints = [21, 30, 40, 50, 60, 70];

  function getMetabolicAge(bmr, gen) {
    const data = avgBMR[gen];
    if (bmr >= data[0].bmr) return Math.max(15, decadeMidpoints[0] - Math.round((bmr - data[0].bmr) / 30));
    if (bmr <= data[data.length-1].bmr) return Math.min(80, decadeMidpoints[data.length-1] + Math.round((data[data.length-1].bmr - bmr) / 30));
    
    for (let i = 0; i < data.length - 1; i++) {
      if (bmr <= data[i].bmr && bmr >= data[i+1].bmr) {
        const t = (data[i].bmr - bmr) / (data[i].bmr - data[i+1].bmr);
        return Math.round(decadeMidpoints[i] + t * (decadeMidpoints[i+1] - decadeMidpoints[i]));
      }
    }
    // fallback
    let bestIdx = 0, bestDiff = Infinity;
    data.forEach((entry, i) => {
      const diff = Math.abs(entry.bmr - bmr);
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i; }
    });
    return decadeMidpoints[bestIdx];
  }

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

    const activityLevel = parseFloat(document.getElementById('activity').value);
    const bodyFat = parseFloat(document.getElementById('bodyfat').value) || null;

    let BMR = 0;
    if (gender === 'male') {
      BMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      BMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    if (bodyFat && bodyFat > 0 && bodyFat < 80) {
      const lbm = weightKg * (1 - bodyFat / 100);
      const BMR_katch = 370 + (21.6 * lbm);
      BMR = (BMR + BMR_katch) / 2;
    }

    const metabolicAge = getMetabolicAge(BMR, gender);
    
    document.getElementById('met-age').textContent = metabolicAge;
    document.getElementById('actual-age-display').textContent = age;
    document.getElementById('bmr-display').textContent = Math.round(BMR).toLocaleString();

    const diff = metabolicAge - age;
    const diffTextEl = document.getElementById('age-diff-text');
    const container = document.getElementById('met-age-container');
    
    if (diff < -2) {
      diffTextEl.textContent = `${Math.abs(diff)} years younger than your age`;
      diffTextEl.style.color = '#15803d';
      container.style.backgroundColor = '#dcfce7';
    } else if (diff > 2) {
      diffTextEl.textContent = `${diff} years older than your age`;
      diffTextEl.style.color = '#b91c1c';
      container.style.backgroundColor = '#fee2e2';
    } else {
      diffTextEl.textContent = `Matches your actual age`;
      diffTextEl.style.color = '#0f172a';
      container.style.backgroundColor = '#f1f5f9';
    }

    // Factors
    const factors = [];
    if (activityLevel >= 1.55) factors.push({ text: 'Regular exercise is boosting your metabolism', pos: true });
    if (activityLevel < 1.375) factors.push({ text: 'Low activity level may be aging your metabolism', pos: false });
    if (bodyFat && gender === 'male' && bodyFat > 25) factors.push({ text: 'High body fat % reduces metabolic rate', pos: false });
    if (bodyFat && gender === 'female' && bodyFat > 35) factors.push({ text: 'High body fat % reduces metabolic rate', pos: false });
    if (bodyFat && gender === 'male' && bodyFat < 15) factors.push({ text: 'Low body fat % helps metabolic efficiency', pos: true });
    if (age > 40 && metabolicAge < age) factors.push({ text: 'Your BMR is higher than average for your age', pos: true });

    const factorsDiv = document.getElementById('factors-list');
    factorsDiv.innerHTML = '';
    if (factors.length === 0) {
      factorsDiv.innerHTML = '<div style="color:#64748b">Add body fat percentage for more insights.</div>';
    } else {
      factors.forEach(f => {
        const d = document.createElement('div');
        d.style.display = 'flex';
        d.style.alignItems = 'flex-start';
        d.style.gap = '0.5rem';
        const icon = f.pos ? '' : '';
        d.innerHTML = `<span>${icon}</span><span style="color:#334155">${f.text}</span>`;
        factorsDiv.appendChild(d);
      });
    }

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});