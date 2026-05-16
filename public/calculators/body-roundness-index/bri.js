document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Body Roundness Index' });

  let unit = 'metric';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('height-metric').style.display = '';
        document.getElementById('height-imperial').style.display = 'none';
        document.getElementById('waist-unit').textContent = 'cm';
        
        const cwaist = parseFloat(document.getElementById('waist-input').value);
        if (!isNaN(cwaist)) document.getElementById('waist-input').value = (cwaist * 2.54).toFixed(1);
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.getElementById('waist-unit').textContent = 'in';
        
        const cwaist = parseFloat(document.getElementById('waist-input').value);
        if (!isNaN(cwaist)) document.getElementById('waist-input').value = (cwaist / 2.54).toFixed(1);
      }
      document.getElementById('result-section').classList.remove('visible');
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function calculate() {
    let heightM, waistM;
    const errEl = document.getElementById('calc-error');
    errEl.classList.remove('visible');
    document.getElementById('result-section').classList.remove('visible');

    if (unit === 'metric') {
      const hCm = parseFloat(document.getElementById('height-cm').value);
      const wCm = parseFloat(document.getElementById('waist-input').value);
      if (!hCm || !wCm || hCm <= 0) {
        errEl.textContent = 'Please fill out all fields correctly.';
        errEl.classList.add('visible');
        return;
      }
      heightM = hCm / 100;
      waistM = wCm / 100;
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      const wIn = parseFloat(document.getElementById('waist-input').value);
      
      const totalInches = ft * 12 + inches;
      if (!totalInches || !wIn || totalInches <= 0) {
        errEl.textContent = 'Please fill out all fields correctly.';
        errEl.classList.add('visible');
        return;
      }
      heightM = totalInches * 0.0254;
      waistM = wIn * 0.0254;
    }

    const a = waistM / (2 * Math.PI);
    const b = 0.5 * heightM;

    if (a >= b) {
      errEl.textContent = 'Waist measurement is too large relative to height for this formula.';
      errEl.classList.add('visible');
      return;
    }

    const BRI = 364.2 - 365.5 * Math.sqrt(1 - (a*a)/(b*b));

    let cat = '', badgeClass = '';
    if (BRI < 2.0) { cat = 'Very Lean'; badgeClass = 'badge-blue'; }
    else if (BRI < 3.5) { cat = 'Lean / Normal'; badgeClass = 'badge-green'; }
    else if (BRI < 5.0) { cat = 'Average'; badgeClass = 'badge-yellow'; }
    else if (BRI < 7.0) { cat = 'High Body Fat'; badgeClass = 'badge-orange'; }
    else { cat = 'Very High / Obesity'; badgeClass = 'badge-red'; }

    document.getElementById('bri-val').textContent = BRI.toFixed(2);
    
    const badge = document.getElementById('result-badge');
    badge.textContent = cat;
    badge.className = 'result-badge ' + badgeClass;

    const markerVal = Math.max(1, Math.min(10, BRI));
    const pct = ((markerVal - 1) / (10 - 1)) * 100;
    document.getElementById('bri-marker').style.left = `${pct}%`;

    document.getElementById('result-section').classList.add('visible');
  }
});