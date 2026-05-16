document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calories Burned Running Calculator' });

  let unit = 'metric';
  let speedMode = 'speed';
  let distMode = 'distance';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('weight-unit').textContent = 'kg';
        document.getElementById('dist-unit').textContent = 'km';
        document.getElementById('speed-unit').textContent = 'km/h';
        document.getElementById('pace-label').textContent = 'min/km';
        
        const wLbs = parseFloat(document.getElementById('weight').value);
        if (!isNaN(wLbs) && wLbs > 0) document.getElementById('weight').value = (wLbs * 0.453592).toFixed(1);
        
        const dMi = parseFloat(document.getElementById('distance').value);
        if (!isNaN(dMi) && dMi > 0) document.getElementById('distance').value = (dMi * 1.60934).toFixed(2);
        
        const presets = document.getElementById('speed-preset');
        presets.innerHTML = `
          <option value="8">8 km/h — Jogging</option>
          <option value="10" selected>10 km/h — Moderate Run</option>
          <option value="12">12 km/h — Tempo Run</option>
          <option value="14">14 km/h — Fast Run</option>
          <option value="16">16 km/h — Sprint Pace</option>
          <option value="custom">Custom speed</option>
        `;
      } else {
        document.getElementById('weight-unit').textContent = 'lbs';
        document.getElementById('dist-unit').textContent = 'miles';
        document.getElementById('speed-unit').textContent = 'mph';
        document.getElementById('pace-label').textContent = 'min/mi';

        const wKg = parseFloat(document.getElementById('weight').value);
        if (!isNaN(wKg) && wKg > 0) document.getElementById('weight').value = (wKg / 0.453592).toFixed(1);
        
        const dKm = parseFloat(document.getElementById('distance').value);
        if (!isNaN(dKm) && dKm > 0) document.getElementById('distance').value = (dKm / 1.60934).toFixed(2);
        
        const presets = document.getElementById('speed-preset');
        presets.innerHTML = `
          <option value="5">5 mph — Jogging</option>
          <option value="6.2" selected>6.2 mph — Moderate Run</option>
          <option value="7.5">7.5 mph — Tempo Run</option>
          <option value="8.7">8.7 mph — Fast Run</option>
          <option value="10">10 mph — Sprint Pace</option>
          <option value="custom">Custom speed</option>
        `;
      }
      checkCustomSpeed();
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.querySelectorAll('#speed-mode-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      speedMode = btn.dataset.smode;
      document.querySelectorAll('#speed-mode-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (speedMode === 'speed') {
        document.getElementById('speed-group').style.display = '';
        document.getElementById('pace-group').style.display = 'none';
      } else {
        document.getElementById('speed-group').style.display = 'none';
        document.getElementById('pace-group').style.display = '';
      }
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.querySelectorAll('#dist-mode-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      distMode = btn.dataset.dmode;
      document.querySelectorAll('#dist-mode-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (distMode === 'distance') {
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

  const speedPreset = document.getElementById('speed-preset');
  speedPreset.addEventListener('change', checkCustomSpeed);

  function checkCustomSpeed() {
    if (speedPreset.value === 'custom') {
      document.getElementById('custom-speed-row').style.display = '';
    } else {
      document.getElementById('custom-speed-row').style.display = 'none';
    }
  }

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function getMET(spdKm) {
    const presets = [[6, 6.0], [8, 8.3], [10, 9.8], [12, 11.0], [14, 12.8], [16, 14.5], [18, 16.0], [20, 19.0]];
    if (spdKm <= 6) return 6.0;
    if (spdKm >= 20) return 19.0;
    
    for (let i = 0; i < presets.length - 1; i++) {
      if (spdKm >= presets[i][0] && spdKm <= presets[i+1][0]) {
        const t = (spdKm - presets[i][0]) / (presets[i+1][0] - presets[i][0]);
        return presets[i][1] + t * (presets[i+1][1] - presets[i][1]);
      }
    }
    return 9.8;
  }

  function formatPace(minDecimal) {
    const m = Math.floor(minDecimal);
    const s = Math.round((minDecimal - m) * 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function calculate() {
    let weightKg = parseFloat(document.getElementById('weight').value);
    if (unit === 'imperial') weightKg *= 0.453592;

    if (!weightKg || weightKg <= 0) {
      showError('Please enter a valid weight.');
      return;
    }

    let speedKmh = 0;

    if (speedMode === 'speed') {
      const preset = document.getElementById('speed-preset').value;
      if (preset === 'custom') {
        let s = parseFloat(document.getElementById('custom-speed').value);
        if (!s || s <= 0) {
          showError('Please enter a valid custom speed.');
          return;
        }
        speedKmh = unit === 'imperial' ? s * 1.60934 : s;
      } else {
        speedKmh = unit === 'imperial' ? parseFloat(preset) * 1.60934 : parseFloat(preset);
      }
    } else {
      const pMin = parseFloat(document.getElementById('pace-min').value) || 0;
      const pSec = parseFloat(document.getElementById('pace-sec').value) || 0;
      const paceDecimal = pMin + (pSec / 60);
      if (paceDecimal <= 0) {
        showError('Please enter a valid pace.');
        return;
      }
      const pKmDecimal = unit === 'imperial' ? paceDecimal / 1.60934 : paceDecimal;
      speedKmh = 60 / pKmDecimal;
    }

    let distKm = 0;
    let hours = 0;
    
    if (distMode === 'distance') {
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

    const met = getMET(speedKmh);
    const calories = Math.round(met * weightKg * hours);

    const paceKm = 60 / speedKmh;
    const paceMi = paceKm * 1.60934;

    document.getElementById('calories-val').textContent = calories.toLocaleString();
    document.getElementById('pace-km-val').textContent = formatPace(paceKm);
    document.getElementById('pace-mi-val').textContent = formatPace(paceMi);
    
    const distDisp = unit === 'imperial' ? (distKm / 1.60934).toFixed(2) : distKm.toFixed(2);
    document.getElementById('dist-val').textContent = distDisp;
    document.getElementById('dist-label-res').textContent = unit === 'imperial' ? 'mi' : 'km';

    const m = Math.round(hours * 60);
    const hDisp = Math.floor(m / 60);
    const mDisp = m % 60;
    document.getElementById('time-val').textContent = hDisp > 0 ? `${hDisp}h ${mDisp}m` : `${mDisp}m`;

    const foods = [
      { name: 'Apple', cal: 95 },
      { name: 'Banana', cal: 105 },
      { name: 'Slice of Pizza', cal: 285 },
      { name: 'Chocolate Bar', cal: 230 },
      { name: 'Can of Soda', cal: 150 },
      { name: 'Cheeseburger', cal: 540 }
    ];

    const foodsGrid = document.getElementById('foods-grid');
    foodsGrid.innerHTML = '';
    foods.forEach(f => {
      const amount = (calories / f.cal).toFixed(1);
      const div = document.createElement('div');
      div.style = "padding:0.75rem;border-radius:0.5rem;background:#f8fafc;border:1px solid var(--border);text-align:center";
      div.innerHTML = `
        <div style="font-size:1.1rem;font-weight:700;color:var(--foreground)">${amount}</div>
        <div style="font-size:0.75rem;font-weight:600;color:var(--muted-foreground)">${f.name}</div>
      `;
      foodsGrid.appendChild(div);
    });

    const walkHours = distKm / 5; // 5 km/h
    const walkCal = Math.round(3.5 * weightKg * walkHours);
    const walkM = Math.round(walkHours * 60);
    
    document.getElementById('run-comp-cal').textContent = `${calories} cal`;
    document.getElementById('run-comp-time').textContent = hDisp > 0 ? `${hDisp}h ${mDisp}m` : `${mDisp}m`;
    
    document.getElementById('walk-comp-cal').textContent = `${walkCal} cal`;
    document.getElementById('walk-comp-time').textContent = Math.floor(walkM/60) > 0 ? `${Math.floor(walkM/60)}h ${walkM%60}m` : `${walkM%60}m`;

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});