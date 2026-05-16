document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Waist-to-Height Ratio Calculator' });

  let unit = 'cm';

  const errEl = document.getElementById('err-msg');
  const extWarn = document.getElementById('extreme-warning');
  const resultEl = document.getElementById('result');

  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.unit) {
        unit = btn.dataset.unit;
        document.querySelectorAll('[data-unit]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (unit === 'cm') {
          document.getElementById('height-metric').style.display = '';
          document.getElementById('height-imperial').style.display = 'none';
          document.querySelector('label[for="waist-input"] + .input-row .input-unit').textContent = 'cm';
          const w = parseFloat(document.getElementById('waist-input').value);
          if (!isNaN(w)) document.getElementById('waist-input').value = (w * 2.54).toFixed(1);
        } else {
          document.getElementById('height-metric').style.display = 'none';
          document.getElementById('height-imperial').style.display = '';
          document.querySelector('label[for="waist-input"] + .input-row .input-unit').textContent = 'in';
          const w = parseFloat(document.getElementById('waist-input').value);
          if (!isNaN(w)) document.getElementById('waist-input').value = (w / 2.54).toFixed(1);
        }
        
        resultEl.classList.remove('visible');
      }
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); }));

  function calculate() {
    errEl.classList.remove('visible');
    extWarn.style.display = 'none';
    resultEl.classList.remove('visible');

    const waist = parseFloat(document.getElementById('waist-input').value);
    let height = 0;

    if (unit === 'cm') {
      height = parseFloat(document.getElementById('height-cm').value);
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inc = parseFloat(document.getElementById('height-in').value) || 0;
      height = ft * 12 + inc;
    }

    if (!waist || !height || waist <= 0 || height <= 0) {
      errEl.textContent = 'Please enter valid measurements.';
      errEl.classList.add('visible');
      return;
    }

    const whtr = waist / height;
    document.getElementById('whtr-val').textContent = whtr.toFixed(3);

    let risk = '';
    let badgeClass = '';

    if (whtr < 0.40) { risk = 'Take action — too slim'; badgeClass = 'badge-blue'; }
    else if (whtr < 0.50) { risk = 'Healthy'; badgeClass = 'badge-green'; }
    else if (whtr < 0.60) { risk = 'Take action — overweight'; badgeClass = 'badge-yellow'; }
    else if (whtr < 0.70) { risk = 'Take action — obese'; badgeClass = 'badge-orange'; }
    else { 
      risk = 'Extreme risk'; 
      badgeClass = 'badge-red'; 
      if(whtr > 0.75) extWarn.style.display = 'block';
    }

    const badge = document.getElementById('risk-badge');
    badge.textContent = risk;
    badge.className = 'result-badge ' + badgeClass;

    const markerPct = Math.max(0, Math.min(100, ((whtr - 0.3) / 0.5) * 100));
    document.getElementById('whtr-marker').style.left = markerPct + '%';

    resultEl.classList.add('visible');
  }
});