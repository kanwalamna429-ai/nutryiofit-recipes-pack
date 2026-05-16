document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Ideal Body Weight Calculator' });

  let unit = 'metric';
  let gender = 'male';
  let frame = 'medium';

  const errEl = document.getElementById('err-msg');
  const resultEl = document.getElementById('result');

  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.id === 'gender-male' || btn.id === 'gender-female') {
        gender = btn.id === 'gender-male' ? 'male' : 'female';
        document.getElementById('gender-male').classList.toggle('active', gender === 'male');
        document.getElementById('gender-female').classList.toggle('active', gender === 'female');
        return;
      }

      if (btn.dataset.frame) {
        frame = btn.dataset.frame;
        document.querySelectorAll('[data-frame]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        return;
      }

      if (btn.dataset.unit) {
        unit = btn.dataset.unit;
        document.querySelectorAll('[data-unit]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (unit === 'metric') {
          document.getElementById('height-metric').style.display = '';
          document.getElementById('height-imperial').style.display = 'none';
        } else {
          document.getElementById('height-metric').style.display = 'none';
          document.getElementById('height-imperial').style.display = '';
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

    let heightCm = 0;
    if (unit === 'metric') {
      heightCm = parseFloat(document.getElementById('height-cm').value);
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inc = parseFloat(document.getElementById('height-in').value) || 0;
      heightCm = (ft * 12 + inc) * 2.54;
    }

    if (!heightCm || heightCm <= 0) {
      errEl.textContent = 'Please enter a valid height.';
      errEl.classList.add('visible');
      return;
    }

    if (heightCm < 122) {
      errEl.textContent = 'These formulas may be less accurate for heights below 4 feet (122 cm).';
      errEl.classList.add('visible');
    }

    const hIn = heightCm / 2.54;
    let devine, robinson, miller, hamwi;

    if (gender === 'male') {
      devine = 50 + 2.3 * (hIn - 60);
      robinson = 52 + 1.9 * (hIn - 60);
      miller = 56.2 + 1.41 * (hIn - 60);
      hamwi = 48 + 2.7 * (hIn - 60);
    } else {
      devine = 45.5 + 2.3 * (hIn - 60);
      robinson = 49 + 1.7 * (hIn - 60);
      miller = 53.1 + 1.36 * (hIn - 60);
      hamwi = 45.5 + 2.2 * (hIn - 60);
    }

    let modifier = 1;
    if (frame === 'small') modifier = 0.9;
    if (frame === 'large') modifier = 1.1;

    const values = [devine, robinson, miller, hamwi].map(v => v * modifier);
    const avgKg = values.reduce((a,b) => a+b, 0) / 4;
    
    const validValues = values.filter(v => v > 0);
    let minKg = 0, maxKg = 0;
    if (validValues.length > 0) {
      minKg = Math.min(...validValues);
      maxKg = Math.max(...validValues);
    }

    const hm = heightCm / 100;
    const bmiMin = 18.5 * (hm * hm);
    const bmiMax = 24.9 * (hm * hm);

    if (unit === 'metric') {
      document.getElementById('ibw-range').textContent = validValues.length > 0 ? `${minKg.toFixed(1)} – ${maxKg.toFixed(1)} kg` : '--';
    } else {
      const minLbs = minKg * 2.20462;
      const maxLbs = maxKg * 2.20462;
      document.getElementById('ibw-range').textContent = validValues.length > 0 ? `${minLbs.toFixed(1)} – ${maxLbs.toFixed(1)} lbs` : '--';
    }

    const fills = [
      ['r-devine-kg', 'r-devine-lbs', values[0]],
      ['r-robinson-kg', 'r-robinson-lbs', values[1]],
      ['r-miller-kg', 'r-miller-lbs', values[2]],
      ['r-hamwi-kg', 'r-hamwi-lbs', values[3]],
      ['r-avg-kg', 'r-avg-lbs', avgKg]
    ];

    for (const [idKg, idLbs, val] of fills) {
      if (val > 0) {
        document.getElementById(idKg).textContent = val.toFixed(1);
        document.getElementById(idLbs).textContent = (val * 2.20462).toFixed(1);
      } else {
        document.getElementById(idKg).textContent = '--';
        document.getElementById(idLbs).textContent = '--';
      }
    }

    if (unit === 'metric') {
      document.getElementById('r-bmi-range').textContent = `${bmiMin.toFixed(1)} – ${bmiMax.toFixed(1)} kg`;
    } else {
      document.getElementById('r-bmi-range').textContent = `${(bmiMin * 2.20462).toFixed(1)} – ${(bmiMax * 2.20462).toFixed(1)} lbs`;
    }

    resultEl.classList.add('visible');
  }
});