document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calories Burned Walking Calculator' });

  let unit = 'metric';
  let mode = 'distance';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('weight-unit').textContent = 'kg';
        document.getElementById('dist-unit').textContent = 'km';
        
        const wLbs = parseFloat(document.getElementById('weight').value);
        if (!isNaN(wLbs) && wLbs > 0) document.getElementById('weight').value = (wLbs * 0.453592).toFixed(1);
        
        const dMi = parseFloat(document.getElementById('distance').value);
        if (!isNaN(dMi) && dMi > 0) document.getElementById('distance').value = (dMi * 1.60934).toFixed(2);
      } else {
        document.getElementById('weight-unit').textContent = 'lbs';
        document.getElementById('dist-unit').textContent = 'miles';

        const wKg = parseFloat(document.getElementById('weight').value);
        if (!isNaN(wKg) && wKg > 0) document.getElementById('weight').value = (wKg / 0.453592).toFixed(1);
        
        const dKm = parseFloat(document.getElementById('distance').value);
        if (!isNaN(dKm) && dKm > 0) document.getElementById('distance').value = (dKm / 1.60934).toFixed(2);
      }
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.querySelectorAll('#mode-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      document.querySelectorAll('#mode-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (mode === 'distance') {
        document.getElementById('distance-group').style.display = '';
        document.getElementById('duration-group').style.display = 'none';
      } else {
        document.getElementById('distance-group').style.display = 'none';
        document.getElementById('duration-group').style.display = '';
      }
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function calculate() {
    let weightKg = parseFloat(document.getElementById('weight').value);
    if (unit === 'imperial') weightKg *= 0.453592;

    const speedKmh = parseFloat(document.getElementById('speed').value);
    
    if (!weightKg || weightKg <= 0) {
      showError('Please enter a valid weight.');
      return;
    }

    let distKm = 0;
    let hours = 0;
    
    if (mode === 'distance') {
      const dist = parseFloat(document.getElementById('distance').value);
      if (!dist || dist <= 0) {
        showError('Please enter a valid distance.');
        return;
      }
      distKm = unit === 'imperial' ? dist * 1.60934 : dist;
      hours = distKm / speedKmh;
    } else {
      const durationMin = parseFloat(document.getElementById('duration').value);
      if (!durationMin || durationMin <= 0) {
        showError('Please enter a valid duration.');
        return;
      }
      hours = durationMin / 60;
      distKm = speedKmh * hours;
    }

    document.getElementById('calc-warning').classList.remove('visible');

    const MET = { '3': 2.8, '5': 3.5, '6.5': 4.3, '8': 5.0 };
    const calories = MET[speedKmh] * weightKg * hours;

    const stepsPerKm = { '3': 1300, '5': 1250, '6.5': 1200, '8': 1150 };
    const steps = Math.round(distKm * stepsPerKm[speedKmh]);

    document.getElementById('calories-val').textContent = Math.round(calories).toLocaleString();
    document.getElementById('steps-val').textContent = steps.toLocaleString();
    
    const distDisp = unit === 'imperial' ? (distKm / 1.60934).toFixed(2) : distKm.toFixed(2);
    document.getElementById('dist-val').textContent = distDisp;
    document.getElementById('dist-label').textContent = unit === 'imperial' ? 'miles' : 'km';

    const m = Math.round(hours * 60);
    const hDisp = Math.floor(m / 60);
    const mDisp = m % 60;
    document.getElementById('time-val').textContent = hDisp > 0 ? `${hDisp}h ${mDisp}m` : `${mDisp}m`;

    const comps = [
      { name: 'Sitting', met: 1.3 },
      { name: 'Slow Walking (3 km/h)', met: 2.8 },
      { name: 'Moderate Walking (5 km/h)', met: 3.5 },
      { name: 'Brisk Walking (6.5 km/h)', met: 4.3 },
      { name: 'Running (10 km/h)', met: 9.8 },
      { name: 'Cycling (Moderate)', met: 8.0 }
    ];

    const tbody = document.getElementById('comp-table-body');
    tbody.innerHTML = '';
    comps.forEach(c => {
      const tr = document.createElement('tr');
      if (c.met === MET[speedKmh] && c.name.includes(speedKmh)) {
        tr.classList.add('highlight');
      }
      const cal = Math.round(c.met * weightKg * hours);
      tr.innerHTML = `<td>${c.name}</td><td>${c.met.toFixed(1)}</td><td>${cal}</td>`;
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