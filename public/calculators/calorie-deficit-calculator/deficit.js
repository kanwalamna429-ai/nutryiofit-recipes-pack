document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calorie Deficit Calculator' });

  let mode = 'tdee'; // 'tdee' | 'calculate'
  let unit = 'metric';
  let gender = 'male';

  document.querySelectorAll('#mode-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      document.querySelectorAll('#mode-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mode === 'tdee') {
        document.getElementById('mode-tdee').style.display = 'block';
        document.getElementById('mode-calculate').style.display = 'none';
      } else {
        document.getElementById('mode-tdee').style.display = 'none';
        document.getElementById('mode-calculate').style.display = 'block';
      }
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.querySelectorAll('#unit-toggle-b .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle-b .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('height-metric').style.display = '';
        document.getElementById('height-imperial').style.display = 'none';
        document.querySelectorAll('.weight-unit-label').forEach(el => el.textContent = 'kg');
        convertInput('current-weight', 0.453592);
        convertInput('goal-weight', 0.453592);
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.querySelectorAll('.weight-unit-label').forEach(el => el.textContent = 'lbs');
        convertInput('current-weight', 1/0.453592);
        convertInput('goal-weight', 1/0.453592);
      }
      updateSelectOptions();
    });
  });

  function convertInput(id, factor) {
    const val = parseFloat(document.getElementById(id).value);
    if (!isNaN(val) && val > 0) document.getElementById(id).value = (val * factor).toFixed(1);
  }

  function updateSelectOptions() {
    const sel = document.getElementById('loss-rate');
    const u = unit === 'metric' ? 'kg' : 'lbs';
    const f = unit === 'metric' ? 1 : 2.20462;
    sel.options[0].text = `${(0.25 * f).toFixed(2)} ${u} per week — very gradual`;
    sel.options[1].text = `${(0.5 * f).toFixed(1)} ${u} per week — moderate`;
    sel.options[2].text = `${(0.75 * f).toFixed(2)} ${u} per week — fast`;
    sel.options[3].text = `${(1.0 * f).toFixed(1)} ${u} per week — aggressive`;
  }

  document.querySelectorAll('#gender-toggle-a .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle-a .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // sync with B
      document.querySelectorAll('#gender-toggle-b .unit-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.gender === gender);
      });
    });
  });

  document.querySelectorAll('#gender-toggle-b .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle-b .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // sync with A
      document.querySelectorAll('#gender-toggle-a .unit-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.gender === gender);
      });
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function calculate() {
    let tdee = 0;
    let weightKg = 0;
    
    const currW = parseFloat(document.getElementById('current-weight').value);
    const goalW = parseFloat(document.getElementById('goal-weight').value);
    
    if (mode === 'tdee') {
      tdee = parseFloat(document.getElementById('tdee-input').value);
      if (!tdee || tdee < 500) {
        showError("Please enter a valid TDEE (at least 500).");
        return;
      }
      weightKg = unit === 'metric' ? currW : currW * 0.453592;
    } else {
      const age = parseFloat(document.getElementById('age').value);
      let heightCm;

      if (unit === 'metric') {
        heightCm = parseFloat(document.getElementById('height-cm').value);
        weightKg = currW;
      } else {
        const ft = parseFloat(document.getElementById('height-ft').value) || 0;
        const inches = parseFloat(document.getElementById('height-in').value) || 0;
        heightCm = (ft * 12 + inches) * 2.54;
        weightKg = currW * 0.453592;
      }

      if (!age || age <= 0 || !heightCm || heightCm <= 0 || !weightKg || weightKg <= 0) {
        showError('Please enter valid age, height, and current weight to calculate TDEE.');
        return;
      }

      let bmr = 0;
      if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
      } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
      }

      const activityMult = parseFloat(document.getElementById('activity').value);
      tdee = bmr * activityMult;
    }

    document.getElementById('calc-warning').classList.remove('visible');

    const lossRateKg = parseFloat(document.getElementById('loss-rate').value);
    const dailyDeficit = (lossRateKg * 7700) / 7;
    let target = Math.round(tdee - dailyDeficit);
    const floor = gender === 'male' ? 1500 : 1200;

    let warningMsg = "";
    if (target < floor) {
      const actualDeficit = tdee - floor;
      const actualLossRateKg = (actualDeficit * 7) / 7700;
      const actualLossRateLbs = actualLossRateKg * 2.20462;
      const u = unit === 'metric' ? 'kg' : 'lbs';
      const r = unit === 'metric' ? actualLossRateKg : actualLossRateLbs;
      
      warningMsg = ` Your selected rate requires eating below the safe minimum of ${floor} cal/day. Target adjusted to ${floor} cal/day, which supports approximately ${r.toFixed(2)} ${u}/week loss.`;
      target = floor;
    } else if (dailyDeficit > 1000) {
      warningMsg = " A deficit over 1,000 cal/day is generally considered unsafe and may cause muscle loss and nutrient deficiencies.";
    }

    if (warningMsg) {
      const w = document.getElementById('calc-warning');
      w.innerHTML = warningMsg;
      w.classList.add('visible');
    }

    document.getElementById('tdee-display').textContent = Math.round(tdee).toLocaleString();
    document.getElementById('deficit-display').textContent = Math.round(tdee - target).toLocaleString();
    document.getElementById('target-display').textContent = target.toLocaleString();

    const projBox = document.getElementById('projection-box');
    if (currW && goalW && currW > goalW) {
      const weightToLoseKg = (currW - goalW) * (unit === 'imperial' ? 0.453592 : 1);
      
      const effectiveDeficit = tdee - target;
      const effectiveLossRateKg = (effectiveDeficit * 7) / 7700;
      
      const weeks = weightToLoseKg / effectiveLossRateKg;
      
      const goalDate = new Date();
      goalDate.setDate(goalDate.getDate() + Math.round(weeks * 7));
      
      const u = unit === 'metric' ? 'kg' : 'lbs';
      const wl = (currW - goalW).toFixed(1);
      const rate = unit === 'metric' ? effectiveLossRateKg.toFixed(2) : (effectiveLossRateKg * 2.20462).toFixed(2);

      document.getElementById('weight-to-lose').textContent = `${wl} ${u}`;
      document.getElementById('loss-rate-display').textContent = `${rate} ${u}/week`;
      document.getElementById('weeks-display').textContent = weeks.toFixed(1);
      document.getElementById('goal-date-display').textContent = goalDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      
      projBox.style.display = 'block';
    } else {
      projBox.style.display = 'none';
      if (currW && goalW && currW <= goalW) {
         const w = document.getElementById('calc-warning');
         w.innerHTML = (w.innerHTML ? w.innerHTML + '<br>' : '') + "Note: Your goal weight is higher than or equal to your current weight. A calorie deficit is for weight loss.";
         w.classList.add('visible');
      }
    }

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});