document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Skeletal Muscle Mass' });

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
        document.getElementById('weight-label').textContent = 'Weight';
        
        const currentWeight = parseFloat(document.getElementById('weight-kg').value);
        if (!isNaN(currentWeight) && currentWeight > 0) {
          document.getElementById('weight-kg').value = (currentWeight * 0.453592).toFixed(1);
        }
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.getElementById('weight-unit').textContent = 'lbs';
        document.getElementById('weight-label').textContent = 'Weight';

        const currentWeight = parseFloat(document.getElementById('weight-kg').value);
        if (!isNaN(currentWeight) && currentWeight > 0) {
          document.getElementById('weight-kg').value = (currentWeight * 2.20462).toFixed(1);
        }
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
    let heightM, weightKg;
    const errEl = document.getElementById('calc-error');
    errEl.classList.remove('visible');
    document.getElementById('result-section').classList.remove('visible');

    if (unit === 'metric') {
      const hCm = parseFloat(document.getElementById('height-cm').value);
      const wKg = parseFloat(document.getElementById('weight-kg').value);
      if (!hCm || !wKg || hCm <= 0 || wKg <= 0) {
        errEl.textContent = 'Please enter valid height and weight values.';
        errEl.classList.add('visible');
        return;
      }
      heightM = hCm / 100;
      weightKg = wKg;
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      const wLbs = parseFloat(document.getElementById('weight-kg').value);
      const totalInches = ft * 12 + inches;
      if (!totalInches || totalInches <= 0 || !wLbs || wLbs <= 0) {
        errEl.textContent = 'Please enter valid height and weight values.';
        errEl.classList.add('visible');
        return;
      }
      heightM = totalInches * 0.0254;
      weightKg = wLbs * 0.453592;
    }

    const age = parseInt(document.getElementById('age-input').value);
    if (!age || age <= 0) {
      errEl.textContent = 'Please enter a valid age.';
      errEl.classList.add('visible');
      return;
    }

    let notes = [];
    if (age < 15 || age > 90) {
      notes.push("Formula may be less accurate outside age 15-90.");
    }
    if (age > 40) {
      notes.push("SMM typically declines ~1% per year after age 40 (sarcopenia). Resistance training can slow this.");
    }

    const genderFactor = gender === 'male' ? 2.45 : 0;
    const smmKg = (0.244 * weightKg) + (7.8 * heightM) - (0.098 * age) + genderFactor - 3.3;

    if (smmKg <= 0 || smmKg >= weightKg) {
      errEl.textContent = 'Invalid result calculated. Please check your inputs.';
      errEl.classList.add('visible');
      return;
    }

    const smmLbs = smmKg * 2.20462;
    const smmPct = (smmKg / weightKg) * 100;

    let cat = '', badgeClass = '';
    if (gender === 'male') {
      if (smmPct < 33) { cat = 'Low'; badgeClass = 'badge-orange'; }
      else if (smmPct <= 39) { cat = 'Normal'; badgeClass = 'badge-green'; }
      else { cat = 'High'; badgeClass = 'badge-blue'; }
    } else {
      if (smmPct < 25) { cat = 'Low'; badgeClass = 'badge-orange'; }
      else if (smmPct <= 30) { cat = 'Normal'; badgeClass = 'badge-green'; }
      else { cat = 'High'; badgeClass = 'badge-blue'; }
    }

    document.getElementById('smm-kg-val').textContent = smmKg.toFixed(1);
    document.getElementById('smm-lbs-val').textContent = smmLbs.toFixed(1);
    document.getElementById('smm-pct-val').textContent = smmPct.toFixed(1);
    
    const badge = document.getElementById('result-badge');
    badge.textContent = cat;
    badge.className = 'result-badge ' + badgeClass;

    const noteEl = document.getElementById('age-note');
    if (notes.length > 0) {
      noteEl.innerHTML = notes.map(n => `<div>${n}</div>`).join('');
      noteEl.style.display = 'block';
    } else {
      noteEl.style.display = 'none';
    }

    document.getElementById('result-section').classList.add('visible');
  }
});