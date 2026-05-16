document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'BMR Calculator — Mifflin-St Jeor' });

  let unit = 'metric';
  let gender = 'male';

  const avg_BMR = {
    male:   { "20s": 1900, "30s": 1850, "40s": 1800, "50s": 1750, "60s+": 1650 },
    female: { "20s": 1500, "30s": 1450, "40s": 1400, "50s": 1350, "60s+": 1280 }
  };

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

    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    document.getElementById('bmr-val').textContent = Math.round(bmr).toLocaleString();

    let decade = "60s+";
    if (age >= 20 && age < 30) decade = "20s";
    else if (age >= 30 && age < 40) decade = "30s";
    else if (age >= 40 && age < 50) decade = "40s";
    else if (age >= 50 && age < 60) decade = "50s";
    
    const avg = age < 20 ? null : avg_BMR[gender][decade];
    
    if (avg) {
      const diff = ((bmr - avg) / avg * 100).toFixed(1);
      const dir = bmr > avg ? "above" : "below";
      document.getElementById('comparison-text').innerHTML = `
        Average BMR for <strong>${gender}s in their ${decade}</strong>: <strong>${avg}</strong> cal/day
        <br>Your BMR is <strong>${Math.abs(diff)}% ${dir}</strong> average.
      `;
      document.getElementById('comparison-text').parentElement.style.display = 'block';
    } else {
      document.getElementById('comparison-text').parentElement.style.display = 'none';
    }

    const tdees = [
      { name: "Sedentary", mult: 1.2 },
      { name: "Lightly Active", mult: 1.375 },
      { name: "Moderately Active", mult: 1.55 },
      { name: "Very Active", mult: 1.725 },
      { name: "Extremely Active", mult: 1.9 }
    ];

    const tbody = document.getElementById('tdee-tbody');
    tbody.innerHTML = '';
    tdees.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${t.name}</td><td>×${t.mult}</td><td><strong>${Math.round(bmr * t.mult).toLocaleString()}</strong></td>`;
      tbody.appendChild(tr);
    });

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});