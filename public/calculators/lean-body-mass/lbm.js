document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Lean Body Mass Calculator' });

  let unit = 'metric';
  let gender = 'male';

  const errEl = document.getElementById('err-msg');
  const resultEl = document.getElementById('result');

  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.id === 'gender-male' || btn.id === 'gender-female') {
        gender = btn.id === 'gender-male' ? 'male' : 'female';
        document.getElementById('gender-male').classList.toggle('active', gender === 'male');
        document.getElementById('gender-female').classList.toggle('active', gender === 'female');
        return;
      }

      if (btn.dataset.unit) {
        unit = btn.dataset.unit;
        document.querySelectorAll('[data-unit]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (unit === 'metric') {
          document.getElementById('height-metric').style.display = '';
          document.getElementById('height-imperial').style.display = 'none';
          document.getElementById('weight-unit').textContent = 'kg';
          
          const w = parseFloat(document.getElementById('weight-input').value);
          if (!isNaN(w)) document.getElementById('weight-input').value = (w * 0.453592).toFixed(1);
        } else {
          document.getElementById('height-metric').style.display = 'none';
          document.getElementById('height-imperial').style.display = '';
          document.getElementById('weight-unit').textContent = 'lbs';
          
          const w = parseFloat(document.getElementById('weight-input').value);
          if (!isNaN(w)) document.getElementById('weight-input').value = (w * 2.20462).toFixed(1);
        }
        resultEl.classList.remove('visible');
      }
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); }));

  function calculate() {
    errEl.classList.remove('visible');
    resultEl.classList.remove('visible');

    let wtKg = 0;
    let htCm = 0;

    if (unit === 'metric') {
      wtKg = parseFloat(document.getElementById('weight-input').value);
      htCm = parseFloat(document.getElementById('height-cm').value);
    } else {
      const wLbs = parseFloat(document.getElementById('weight-input').value);
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inch = parseFloat(document.getElementById('height-in').value) || 0;
      wtKg = wLbs * 0.453592;
      htCm = (ft * 12 + inch) * 2.54;
    }

    if (!wtKg || !htCm || wtKg <= 0 || htCm <= 0) {
      errEl.textContent = 'Please enter valid weight and height.';
      errEl.classList.add('visible');
      return;
    }

    const bfInput = document.getElementById('bf-input').value;
    let bfPct = null;
    if (bfInput !== '') {
      bfPct = parseFloat(bfInput);
      if (isNaN(bfPct) || bfPct < 3 || bfPct > 70) {
        errEl.textContent = 'Body Fat % must be between 3 and 70.';
        errEl.classList.add('visible');
        return;
      }
    }

    let boer, james, hume;
    if (gender === 'male') {
      boer = (0.407 * wtKg) + (0.267 * htCm) - 19.2;
      james = (1.1 * wtKg) - 128 * Math.pow(wtKg / htCm, 2);
      hume = (0.3281 * wtKg) + (0.3393 * htCm) - 29.5336;
    } else {
      boer = (0.252 * wtKg) + (0.473 * htCm) - 48.3;
      james = (1.07 * wtKg) - 148 * Math.pow(wtKg / htCm, 2);
      hume = (0.2969 * wtKg) + (0.4135 * htCm) - 43.2933;
    }

    const avgLbm = (boer + james + hume) / 3;
    let finalLbmKg = avgLbm;
    let bfMethodUsed = false;

    document.getElementById('row-bf').style.display = 'none';
    document.getElementById('lbm-badge').style.display = 'none';

    if (bfPct !== null) {
      const bfLbm = wtKg * (1 - bfPct / 100);
      finalLbmKg = bfLbm;
      bfMethodUsed = true;
      document.getElementById('row-bf').style.display = '';
      document.getElementById('bf-kg').textContent = bfLbm.toFixed(1);
      document.getElementById('bf-lbs').textContent = (bfLbm * 2.20462).toFixed(1);
      document.getElementById('lbm-badge').style.display = 'inline-block';
    }

    if (finalLbmKg < 0) {
      errEl.textContent = 'Please check your inputs, calculated LBM is below 0.';
      errEl.classList.add('visible');
      return;
    }

    const finalLbmLbs = finalLbmKg * 2.20462;
    const fatKg = wtKg - finalLbmKg;
    const fatLbs = fatKg * 2.20462;

    document.getElementById('lbm-primary').textContent = `${finalLbmKg.toFixed(1)} kg`;
    document.getElementById('lbm-primary-lbs').textContent = `${finalLbmLbs.toFixed(1)} lbs`;
    document.getElementById('fat-mass-primary').textContent = `${fatKg.toFixed(1)} kg (${fatLbs.toFixed(1)} lbs)`;

    const leanP = Math.max(0, Math.min(100, (finalLbmKg / wtKg) * 100));
    const fatP = 100 - leanP;
    
    document.getElementById('lean-bar').style.width = leanP + '%';
    document.getElementById('fat-bar').style.width = fatP + '%';
    document.getElementById('lean-pct').textContent = leanP.toFixed(1);
    document.getElementById('fat-pct').textContent = fatP.toFixed(1);

    document.getElementById('boer-kg').textContent = boer.toFixed(1);
    document.getElementById('boer-lbs').textContent = (boer * 2.20462).toFixed(1);
    document.getElementById('james-kg').textContent = james.toFixed(1);
    document.getElementById('james-lbs').textContent = (james * 2.20462).toFixed(1);
    document.getElementById('hume-kg').textContent = hume.toFixed(1);
    document.getElementById('hume-lbs').textContent = (hume * 2.20462).toFixed(1);
    document.getElementById('avg-kg').textContent = avgLbm.toFixed(1);
    document.getElementById('avg-lbs').textContent = (avgLbm * 2.20462).toFixed(1);

    resultEl.classList.add('visible');
  }
});