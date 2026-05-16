document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Body Surface Area Calculator' });

  let unit = 'metric';

  const errEl = document.getElementById('err-msg');
  const resultEl = document.getElementById('result');

  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
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

    let htCm = 0, wtKg = 0;

    if (unit === 'metric') {
      htCm = parseFloat(document.getElementById('height-cm').value);
      wtKg = parseFloat(document.getElementById('weight-input').value);
    } else {
      const inch = parseFloat(document.getElementById('height-in').value) || 0;
      const lbs = parseFloat(document.getElementById('weight-input').value) || 0;
      htCm = inch * 2.54;
      wtKg = lbs * 0.453592;
    }

    if (!htCm || !wtKg || htCm <= 0 || wtKg <= 0) {
      errEl.textContent = 'Please enter valid height and weight.';
      errEl.classList.add('visible');
      return;
    }

    const mosteller = Math.sqrt((htCm * wtKg) / 3600);
    const dubois = 0.007184 * Math.pow(htCm, 0.725) * Math.pow(wtKg, 0.425);
    const haycock = 0.024265 * Math.pow(htCm, 0.3964) * Math.pow(wtKg, 0.5378);
    const avg = (mosteller + dubois + haycock) / 3;

    document.getElementById('bsa-avg').textContent = avg.toFixed(2);
    document.getElementById('r-mosteller').textContent = mosteller.toFixed(3);
    document.getElementById('r-dubois').textContent = dubois.toFixed(3);
    document.getElementById('r-haycock').textContent = haycock.toFixed(3);
    document.getElementById('r-average').textContent = avg.toFixed(3);

    const devM = ((avg - 1.9) / 1.9) * 100;
    const devF = ((avg - 1.6) / 1.6) * 100;
    
    document.getElementById('bsa-dev').innerHTML = `
      Deviation from adult male avg (1.9 m²): <span style="color:${devM > 0 ? '#ef4444' : '#22c55e'}">${devM > 0 ? '+' : ''}${devM.toFixed(1)}%</span><br>
      Deviation from adult female avg (1.6 m²): <span style="color:${devF > 0 ? '#ef4444' : '#22c55e'}">${devF > 0 ? '+' : ''}${devF.toFixed(1)}%</span>
    `;

    resultEl.classList.add('visible');
  }
});