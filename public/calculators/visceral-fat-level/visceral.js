document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Visceral Fat Level' });

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
        document.getElementById('waist-unit').textContent = 'cm';
        
        const cw = parseFloat(document.getElementById('weight-input').value);
        if (!isNaN(cw)) document.getElementById('weight-input').value = (cw * 0.453592).toFixed(1);
        
        const cwaist = parseFloat(document.getElementById('waist-input').value);
        if (!isNaN(cwaist)) document.getElementById('waist-input').value = (cwaist * 2.54).toFixed(1);
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.getElementById('weight-unit').textContent = 'lbs';
        document.getElementById('waist-unit').textContent = 'in';

        const cw = parseFloat(document.getElementById('weight-input').value);
        if (!isNaN(cw)) document.getElementById('weight-input').value = (cw * 2.20462).toFixed(1);
        
        const cwaist = parseFloat(document.getElementById('waist-input').value);
        if (!isNaN(cwaist)) document.getElementById('waist-input').value = (cwaist / 2.54).toFixed(1);
      }
      document.getElementById('result-section').classList.remove('visible');
    });
  });

  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function calculate() {
    let heightM, weightKg, waistCm;
    const errEl = document.getElementById('calc-error');
    errEl.classList.remove('visible');
    document.getElementById('result-section').classList.remove('visible');

    const age = parseInt(document.getElementById('age-input').value);
    if (!age || age <= 0) {
      errEl.textContent = 'Please enter a valid age.';
      errEl.classList.add('visible');
      return;
    }

    if (unit === 'metric') {
      const hCm = parseFloat(document.getElementById('height-cm').value);
      const wKg = parseFloat(document.getElementById('weight-input').value);
      const wCm = parseFloat(document.getElementById('waist-input').value);
      if (!hCm || !wKg || !wCm) {
        errEl.textContent = 'Please fill out all fields.';
        errEl.classList.add('visible');
        return;
      }
      heightM = hCm / 100;
      weightKg = wKg;
      waistCm = wCm;
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      const wLbs = parseFloat(document.getElementById('weight-input').value);
      const wIn = parseFloat(document.getElementById('waist-input').value);
      
      const totalInches = ft * 12 + inches;
      if (!totalInches || !wLbs || !wIn) {
        errEl.textContent = 'Please fill out all fields.';
        errEl.classList.add('visible');
        return;
      }
      heightM = totalInches * 0.0254;
      weightKg = wLbs * 0.453592;
      waistCm = wIn * 2.54;
    }

    if (waistCm > 200 || waistCm < 40) {
      errEl.textContent = 'Warning: Waist circumference out of normal bounds. Formula may not be accurate.';
      errEl.classList.add('visible');
    }

    const BMI = weightKg / (heightM * heightM);

    const base_male = (waistCm - 80) / 2.5;
    const base_female = (waistCm - 70) / 2.5;
    const base = gender === 'male' ? base_male : base_female;

    const age_adj = 0.1 * Math.max(0, age - 30);
    const bmi_adj = BMI > 25 ? (BMI - 25) * 0.3 : 0;

    const raw = base + age_adj + bmi_adj;
    const score = Math.max(1, Math.min(59, Math.round(raw * 2) / 2));

    let cat = '', badgeClass = '';
    if (score <= 4) { cat = 'Excellent'; badgeClass = 'badge-green'; }
    else if (score <= 8) { cat = 'Good'; badgeClass = 'badge-green'; }
    else if (score <= 12) { cat = 'Borderline'; badgeClass = 'badge-yellow'; }
    else if (score <= 20) { cat = 'High'; badgeClass = 'badge-orange'; }
    else { cat = 'Very High'; badgeClass = 'badge-red'; }

    document.getElementById('score-val').textContent = score.toFixed(1);
    const badge = document.getElementById('result-badge');
    badge.textContent = cat;
    badge.className = 'result-badge ' + badgeClass;

    const pct = ((score - 1) / 58) * 100;
    document.getElementById('vf-marker').style.left = `${Math.min(100, Math.max(0, pct))}%`;

    document.getElementById('result-section').classList.add('visible');
  }
});