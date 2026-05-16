document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') {
    initTemplate({ title: 'Body Fat Percentage' });
  }

  let gender = 'male';
  let unit = 'metric';
  let method = 'navy';

  const warningEl = document.getElementById('calc-warning');
  const resultSec = document.getElementById('result-section');

  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('hip-group').style.display = gender === 'female' ? '' : 'none';
      resultSec.classList.remove('visible');
    });
  });

  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.length-unit').forEach(el => el.textContent = unit === 'metric' ? 'cm' : 'in');
      document.querySelectorAll('.weight-unit').forEach(el => el.textContent = unit === 'metric' ? 'kg' : 'lbs');
      resultSec.classList.remove('visible');
    });
  });

  document.querySelectorAll('.method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      method = btn.dataset.method;
      document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('inputs-navy').style.display = method === 'navy' ? '' : 'none';
      document.getElementById('inputs-bmi').style.display = method === 'bmi' ? '' : 'none';
      resultSec.classList.remove('visible');
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function showError(msg) {
    warningEl.textContent = msg;
    warningEl.classList.add('visible');
    resultSec.classList.remove('visible');
  }

  function calculate() {
    warningEl.classList.remove('visible');

    let bfNavy = null;
    let bfBmi = null;
    let weightKg = null;

    const toCm = val => unit === 'metric' ? val : val * 2.54;
    const toKg = val => unit === 'metric' ? val : val * 0.453592;

    if (method === 'navy') {
      const h = parseFloat(document.getElementById('navy-height').value);
      const n = parseFloat(document.getElementById('navy-neck').value);
      const w = parseFloat(document.getElementById('navy-waist').value);
      const wt = parseFloat(document.getElementById('navy-weight').value);
      
      if (!h || !n || !w) return showError('Please fill in all required Navy method fields.');
      
      const hCm = toCm(h);
      const nCm = toCm(n);
      const wCm = toCm(w);

      if (wt) weightKg = toKg(wt);

      if (gender === 'male') {
        if (nCm >= wCm) return showError('Neck must be smaller than waist.');
        bfNavy = 86.01 * Math.log10(wCm - nCm) - 70.041 * Math.log10(hCm) + 36.76;
      } else {
        const hip = parseFloat(document.getElementById('navy-hip').value);
        if (!hip) return showError('Hip circumference is required for females.');
        const hipCm = toCm(hip);
        if (wCm + hipCm - nCm <= 0) return showError('Invalid measurements.');
        bfNavy = 163.205 * Math.log10(wCm + hipCm - nCm) - 97.684 * Math.log10(hCm) - 78.387;
      }
    } else {
      const h = parseFloat(document.getElementById('bmi-height').value);
      const w = parseFloat(document.getElementById('bmi-weight').value);
      const age = parseFloat(document.getElementById('bmi-age').value);

      if (!h || !w || !age) return showError('Please fill in all required BMI method fields.');

      const hM = toCm(h) / 100;
      weightKg = toKg(w);

      const bmi = weightKg / (hM * hM);
      const genFactor = gender === 'male' ? 1 : 0;
      bfBmi = (1.20 * bmi) + (0.23 * age) - (10.8 * genFactor) - 5.4;
    }

    let primaryBf = method === 'navy' ? bfNavy : bfBmi;

    if (primaryBf < 2 || primaryBf > 70) {
      return showError('Calculated Body Fat % is outside the physiologically realistic range.');
    }

    document.getElementById('bf-value').textContent = primaryBf.toFixed(1);
    document.getElementById('res-navy').textContent = bfNavy ? bfNavy.toFixed(1) + '%' : '--';
    document.getElementById('res-bmi').textContent = bfBmi ? bfBmi.toFixed(1) + '%' : '--';

    let cat = '', badgeClass = '';
    if (gender === 'male') {
      if (primaryBf < 6) { cat = 'Essential'; badgeClass = 'badge-blue'; }
      else if (primaryBf <= 13) { cat = 'Athletic'; badgeClass = 'badge-green'; }
      else if (primaryBf <= 17) { cat = 'Fitness'; badgeClass = 'badge-green'; }
      else if (primaryBf <= 24) { cat = 'Average'; badgeClass = 'badge-yellow'; }
      else { cat = 'Obese'; badgeClass = 'badge-red'; }
    } else {
      if (primaryBf < 14) { cat = 'Essential'; badgeClass = 'badge-blue'; }
      else if (primaryBf <= 20) { cat = 'Athletic'; badgeClass = 'badge-green'; }
      else if (primaryBf <= 24) { cat = 'Fitness'; badgeClass = 'badge-green'; }
      else if (primaryBf <= 31) { cat = 'Average'; badgeClass = 'badge-yellow'; }
      else { cat = 'Obese'; badgeClass = 'badge-red'; }
    }

    const badge = document.getElementById('result-badge');
    badge.textContent = cat;
    badge.className = 'result-badge ' + badgeClass;

    const massSec = document.getElementById('mass-results');
    if (weightKg) {
      const fatMassKg = weightKg * (primaryBf / 100);
      const leanMassKg = weightKg - fatMassKg;
      
      const formatMass = kg => {
        if (unit === 'metric') return kg.toFixed(1) + ' kg';
        return (kg * 2.20462).toFixed(1) + ' lbs';
      };

      document.getElementById('res-fat-mass').textContent = formatMass(fatMassKg);
      document.getElementById('res-lean-mass').textContent = formatMass(leanMassKg);
      massSec.style.display = 'flex';
    } else {
      massSec.style.display = 'none';
    }

    resultSec.classList.add('visible');
  }
});