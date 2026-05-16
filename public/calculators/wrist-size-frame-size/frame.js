document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Wrist Size & Frame Size Calculator' });

  let unit = 'cm';
  let gender = 'male';

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

      if (btn.dataset.unit) {
        unit = btn.dataset.unit;
        document.querySelectorAll('[data-unit]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.u-lbl').forEach(l => l.textContent = unit === 'cm' ? 'cm' : 'in');

        if (unit === 'cm') {
          document.getElementById('height-metric').style.display = '';
          document.getElementById('height-imperial').style.display = 'none';
        } else {
          document.getElementById('height-metric').style.display = 'none';
          document.getElementById('height-imperial').style.display = '';
        }

        const convert = (id) => {
          const v = parseFloat(document.getElementById(id).value);
          if (!isNaN(v)) document.getElementById(id).value = unit === 'cm' ? (v * 2.54).toFixed(1) : (v / 2.54).toFixed(1);
        };
        convert('wrist-input');
        convert('elbow-input');

        resultEl.classList.remove('visible');
      }
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); }));

  function calculate() {
    errEl.classList.remove('visible');
    resultEl.classList.remove('visible');
    document.getElementById('agree-badge').style.display = 'none';

    let wristCm = parseFloat(document.getElementById('wrist-input').value);
    if (!wristCm || wristCm <= 0) {
      errEl.textContent = 'Please enter wrist circumference.';
      errEl.classList.add('visible');
      return;
    }
    if (unit === 'inch') wristCm *= 2.54;

    if (wristCm < 5 || wristCm > 40) {
      errEl.textContent = 'Wrist value seems outside normal range. Please check.';
      errEl.classList.add('visible');
    }

    let htCm = 0;
    if (unit === 'cm') {
      htCm = parseFloat(document.getElementById('height-cm').value);
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inc = parseFloat(document.getElementById('height-in').value) || 0;
      htCm = (ft * 12 + inc) * 2.54;
    }

    let elbowCm = parseFloat(document.getElementById('elbow-input').value);
    if (!isNaN(elbowCm) && unit === 'inch') elbowCm *= 2.54;

    const methods = [];
    
    // Method 1: Ratio
    if (htCm > 0) {
      const r = htCm / wristCm;
      let res = '';
      if (gender === 'male') {
        if (r > 10.4) res = 'Small';
        else if (r < 9.6) res = 'Large';
        else res = 'Medium';
      } else {
        if (r > 11.0) res = 'Small';
        else if (r < 10.1) res = 'Large';
        else res = 'Medium';
      }
      methods.push({ name: 'Height/Wrist Ratio', result: res });
    }

    // Method 2: Wrist alone
    let res2 = '';
    if (gender === 'male') {
      if (wristCm < 15.5) res2 = 'Small';
      else if (wristCm > 17.5) res2 = 'Large';
      else res2 = 'Medium';
    } else {
      if (wristCm < 14) res2 = 'Small';
      else if (wristCm > 15.5) res2 = 'Large';
      else res2 = 'Medium';
    }
    methods.push({ name: 'Wrist Absolute', result: res2 });

    // Method 3: Elbow
    if (!isNaN(elbowCm) && elbowCm > 0) {
      let res3 = '';
      if (gender === 'male') {
        if (elbowCm < 6.4) res3 = 'Small';
        else if (elbowCm > 7.2) res3 = 'Large';
        else res3 = 'Medium';
      } else {
        if (elbowCm < 5.6) res3 = 'Small';
        else if (elbowCm > 6.4) res3 = 'Large';
        else res3 = 'Medium';
      }
      methods.push({ name: 'Elbow Breadth', result: res3 });
    }

    const tbody = document.getElementById('methods-tbody');
    tbody.innerHTML = '';
    
    const resultsMap = { 'Small': 0, 'Medium': 0, 'Large': 0 };
    methods.forEach(m => {
      resultsMap[m.result]++;
      tbody.innerHTML += `<tr><td>${m.name}</td><td style="font-weight:600;">${m.result}</td></tr>`;
    });

    let finalFrame = 'Medium';
    let max = 0;
    Object.keys(resultsMap).forEach(k => {
      if (resultsMap[k] > max) { max = resultsMap[k]; finalFrame = k; }
    });

    if (max === methods.length && methods.length > 1) {
      document.getElementById('agree-badge').style.display = 'inline-block';
    }

    const frameRes = document.getElementById('frame-res');
    frameRes.textContent = finalFrame;
    if (finalFrame === 'Small') frameRes.style.color = '#3b82f6';
    else if (finalFrame === 'Medium') frameRes.style.color = '#22c55e';
    else frameRes.style.color = '#f97316';

    let adjTxt = '';
    if (finalFrame === 'Small') adjTxt = 'For a Small frame, consider adjusting ideal weight by <strong>-10%</strong>.';
    else if (finalFrame === 'Large') adjTxt = 'For a Large frame, consider adjusting ideal weight by <strong>+10%</strong>.';
    else adjTxt = 'For a Medium frame, no adjustment to ideal weight formulas is needed.';

    document.getElementById('ibw-adj').innerHTML = `<p>${adjTxt}</p>`;

    resultEl.classList.add('visible');
  }
});