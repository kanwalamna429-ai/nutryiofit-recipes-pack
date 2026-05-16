document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'FFMI Calculator' });

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
        document.getElementById('lbm-unit').textContent = 'kg';
        document.getElementById('fm-unit').textContent = 'kg';
        
        const cw = parseFloat(document.getElementById('weight-input').value);
        if (!isNaN(cw)) document.getElementById('weight-input').value = (cw * 0.453592).toFixed(1);
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.getElementById('weight-unit').textContent = 'lbs';
        document.getElementById('lbm-unit').textContent = 'lbs';
        document.getElementById('fm-unit').textContent = 'lbs';

        const cw = parseFloat(document.getElementById('weight-input').value);
        if (!isNaN(cw)) document.getElementById('weight-input').value = (cw * 2.20462).toFixed(1);
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
    let heightM, weightKg, weightDisplay;
    const errEl = document.getElementById('calc-error');
    errEl.classList.remove('visible');
    document.getElementById('result-section').classList.remove('visible');

    const bf = parseFloat(document.getElementById('bf-input').value);
    if (isNaN(bf) || bf < 3 || bf > 70) {
      errEl.textContent = 'Please enter a valid Body Fat % (between 3 and 70).';
      errEl.classList.add('visible');
      return;
    }

    if (unit === 'metric') {
      const hCm = parseFloat(document.getElementById('height-cm').value);
      const wKg = parseFloat(document.getElementById('weight-input').value);
      if (!hCm || !wKg || hCm <= 0) {
        errEl.textContent = 'Please fill out all fields correctly.';
        errEl.classList.add('visible');
        return;
      }
      heightM = hCm / 100;
      weightKg = wKg;
      weightDisplay = wKg;
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      const wLbs = parseFloat(document.getElementById('weight-input').value);
      
      const totalInches = ft * 12 + inches;
      if (!totalInches || !wLbs || totalInches <= 0) {
        errEl.textContent = 'Please fill out all fields correctly.';
        errEl.classList.add('visible');
        return;
      }
      heightM = totalInches * 0.0254;
      weightKg = wLbs * 0.453592;
      weightDisplay = wLbs;
    }

    const LBM_kg = weightKg * (1 - bf/100);
    const FatMass_kg = weightKg - LBM_kg;
    
    if (LBM_kg <= 0 || LBM_kg > weightKg) {
      errEl.textContent = 'Invalid Lean Body Mass calculated. Check your inputs.';
      errEl.classList.add('visible');
      return;
    }

    const FFMI = LBM_kg / (heightM * heightM);
    const nFFMI = FFMI + 6.1 * (1.8 - heightM);

    let cat = '', badgeClass = '';
    if (gender === 'male') {
      if (nFFMI < 18) { cat = 'Below Average'; badgeClass = 'badge-blue'; }
      else if (nFFMI < 20) { cat = 'Average'; badgeClass = 'badge-green'; }
      else if (nFFMI < 22) { cat = 'Above Average'; badgeClass = 'badge-green'; }
      else if (nFFMI < 23) { cat = 'Excellent'; badgeClass = 'badge-yellow'; }
      else if (nFFMI < 25) { cat = 'Superior'; badgeClass = 'badge-orange'; }
      else if (nFFMI < 26) { cat = 'Borderline'; badgeClass = 'badge-red'; }
      else { cat = 'Likely Enhanced'; badgeClass = 'badge-red'; }
    } else {
      if (nFFMI < 14) { cat = 'Below Average'; badgeClass = 'badge-blue'; }
      else if (nFFMI < 17) { cat = 'Average'; badgeClass = 'badge-green'; }
      else if (nFFMI < 19) { cat = 'Above Average'; badgeClass = 'badge-green'; }
      else if (nFFMI < 21) { cat = 'Excellent'; badgeClass = 'badge-yellow'; }
      else if (nFFMI < 23) { cat = 'Superior'; badgeClass = 'badge-orange'; }
      else { cat = 'Suspicious / Likely Enhanced'; badgeClass = 'badge-red'; }
    }

    document.getElementById('ffmi-val').textContent = FFMI.toFixed(1);
    document.getElementById('nffmi-val').textContent = nFFMI.toFixed(1);
    
    const displayLBM = unit === 'metric' ? LBM_kg : LBM_kg * 2.20462;
    const displayFM = unit === 'metric' ? FatMass_kg : FatMass_kg * 2.20462;
    
    document.getElementById('lbm-val').textContent = displayLBM.toFixed(1);
    document.getElementById('fat-mass-val').textContent = displayFM.toFixed(1);

    const badge = document.getElementById('result-badge');
    badge.textContent = cat;
    badge.className = 'result-badge ' + badgeClass;

    document.getElementById('result-section').classList.add('visible');
  }
});