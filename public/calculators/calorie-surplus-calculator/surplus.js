document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calorie Surplus Calculator' });

  let goal = 'lean';
  let gender = 'male';

  document.querySelectorAll('#bulk-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      goal = btn.dataset.bulk;
      document.querySelectorAll('#bulk-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.querySelectorAll('#gender-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gender = btn.dataset.gender;
      document.querySelectorAll('#gender-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('result-section').classList.remove('visible');
      document.getElementById('calc-warning').classList.remove('visible');
    });
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function calculate() {
    const tdee = parseFloat(document.getElementById('tdee').value);

    if (!tdee || tdee <= 0) {
      showError('Please enter a valid TDEE.');
      return;
    }
    document.getElementById('calc-warning').classList.remove('visible');

    const surplusRanges = {
      lean:       { min: 200, max: 300, label: 'Lean Bulk',       musclePerMonth: { male: [0.5, 1.0], female: [0.25, 0.5] } },
      standard:   { min: 400, max: 500, label: 'Standard Bulk',   musclePerMonth: { male: [0.75, 1.25], female: [0.35, 0.65] } },
      aggressive: { min: 700, max: 1000,label: 'Aggressive Bulk', musclePerMonth: { male: [1.0, 1.5], female: [0.5, 0.75] } }
    };
    const fatGainRatio = { lean: 0.2, standard: 0.35, aggressive: 0.6 };

    const surplus = (surplusRanges[goal].min + surplusRanges[goal].max) / 2;
    const dailyTarget = tdee + surplus;

    const monthlyMuscleLow = surplusRanges[goal].musclePerMonth[gender][0];
    const monthlyMuscleHigh = surplusRanges[goal].musclePerMonth[gender][1];
    
    const monthlySurplusCal = surplus * 30;
    const fatCalStored = monthlySurplusCal * fatGainRatio[goal];
    const monthlyFatGain = (fatCalStored / 7700).toFixed(2);

    document.getElementById('daily-target').textContent = Math.round(dailyTarget).toLocaleString();
    document.getElementById('surplus-amt').textContent = Math.round(surplus);

    document.getElementById('muscle-est').textContent = `${monthlyMuscleLow}–${monthlyMuscleHigh}`;
    document.getElementById('fat-est').textContent = `~${monthlyFatGain}`;
    document.getElementById('total-surplus-est').textContent = Math.round(monthlySurplusCal).toLocaleString();

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});