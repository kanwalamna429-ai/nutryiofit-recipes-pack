document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calories Burned Swimming Calculator' });

  let unit = 'metric';

  document.querySelectorAll('#unit-toggle .unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('#unit-toggle .unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const weightInput = document.getElementById('weight-input');
      const val = parseFloat(weightInput.value);

      if (unit === 'metric') {
        document.getElementById('weight-unit').textContent = 'kg';
        if (!isNaN(val) && val > 0) weightInput.value = (val * 0.453592).toFixed(1);
      } else {
        document.getElementById('weight-unit').textContent = 'lbs';
        if (!isNaN(val) && val > 0) weightInput.value = (val / 0.453592).toFixed(1);
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
    const weightVal = parseFloat(document.getElementById('weight-input').value);
    const durationMin = parseFloat(document.getElementById('duration').value);
    const strokeSel = document.getElementById('stroke');
    const strokeVal = parseFloat(strokeSel.value);
    const poolLength = parseFloat(document.getElementById('pool-length').value);

    if (!weightVal || weightVal <= 0 || !durationMin || durationMin <= 0) {
      showError('Please enter valid weight and duration.');
      return;
    }
    document.getElementById('calc-warning').classList.remove('visible');

    const weightKg = unit === 'metric' ? weightVal : weightVal * 0.453592;
    const hours = durationMin / 60;
    
    const MET = { 6: 6, 8.3: 8.3, 4.8: 4.8, 10.3: 10.3, 13.8: 13.8 };
    const speeds = { 6: 1.5, 8.3: 2.5, 4.8: 1.8, 10.3: 1.6, 13.8: 2.0 };
    
    const selectedMET = MET[strokeVal];
    const calories = selectedMET * weightKg * hours;
    
    const distM = speeds[strokeVal] * hours * 1000;
    const laps = Math.round(distM / poolLength);

    document.getElementById('cal-burned').textContent = Math.round(calories).toLocaleString();
    document.getElementById('stat-laps').textContent = laps;
    document.getElementById('stat-distance').textContent = Math.round(distM) + 'm';
    document.getElementById('stat-calhour').textContent = Math.round(selectedMET * weightKg);

    document.querySelectorAll('#stroke-table tbody tr').forEach(tr => {
      const v = parseFloat(tr.dataset.val);
      tr.querySelector('.td-cal').textContent = Math.round(MET[v] * weightKg);
      tr.querySelector('.td-laps').textContent = Math.round((speeds[v] * hours * 1000) / poolLength);
      tr.classList.toggle('highlight', v === strokeVal);
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