document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Body Shape Index' });

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
    if (!age || age < 18) {
      errEl.textContent = 'Please enter a valid age (18 or older).';
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

    const waistM = waistCm / 100;
    const BMI = weightKg / (heightM * heightM);
    const ABSI = waistM / (Math.pow(BMI, 2/3) * Math.sqrt(heightM));

    const ref = {
      male: { mean: 0.0771, sd: 0.0049 },
      female: { mean: 0.0756, sd: 0.0049 }
    };
    const z = (ABSI - ref[gender].mean) / ref[gender].sd;

    let cat = '', badgeClass = '', riskMult = '';
    if (z < -0.868) { cat = 'Very Low Risk (Bottom 20%)'; badgeClass = 'badge-green'; riskMult = '0.77'; }
    else if (z <= -0.274) { cat = 'Low Risk'; badgeClass = 'badge-green'; riskMult = '0.88'; }
    else if (z <= 0.274) { cat = 'Average Risk'; badgeClass = 'badge-yellow'; riskMult = '1.00'; }
    else if (z <= 0.868) { cat = 'Above Average Risk'; badgeClass = 'badge-orange'; riskMult = '1.20'; }
    else { cat = 'High Risk (Top 20%)'; badgeClass = 'badge-red'; riskMult = '1.43'; }

    document.getElementById('absi-val').textContent = ABSI.toFixed(6);
    document.getElementById('bmi-val').textContent = BMI.toFixed(1);
    document.getElementById('zscore-val').textContent = z > 0 ? '+' + z.toFixed(2) : z.toFixed(2);
    
    const badge = document.getElementById('result-badge');
    badge.textContent = cat;
    badge.className = 'result-badge ' + badgeClass;

    document.getElementById('mortality-risk').textContent = `~${riskMult}× the average mortality risk`;

    document.getElementById('result-section').classList.add('visible');
  }
});