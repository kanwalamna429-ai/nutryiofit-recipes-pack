document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calories Burned Cycling Calculator' });

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
    const intensitySel = document.getElementById('intensity');
    const intensityVal = parseFloat(intensitySel.value);
    const intensityText = intensitySel.options[intensitySel.selectedIndex].text.split('—')[0].trim();

    if (!weightVal || weightVal <= 0 || !durationMin || durationMin <= 0) {
      showError('Please enter valid weight and duration.');
      return;
    }
    document.getElementById('calc-warning').classList.remove('visible');

    const weightKg = unit === 'metric' ? weightVal : weightVal * 0.453592;
    const hours = durationMin / 60;
    
    const MET = { 4: 4, 8: 8, 10: 10, 16: 16 };
    const selectedMET = MET[intensityVal];

    const calories = selectedMET * weightKg * hours;
    
    document.getElementById('cal-burned').textContent = Math.round(calories).toLocaleString();
    document.getElementById('stat-duration').textContent = durationMin + ' min';
    document.getElementById('stat-intensity').textContent = intensityText;
    document.getElementById('stat-calhour').textContent = Math.round(selectedMET * weightKg);

    document.querySelectorAll('#intensity-table tbody tr').forEach(tr => {
      const v = parseFloat(tr.dataset.val);
      tr.querySelector('.td-cal').textContent = Math.round(MET[v] * weightKg);
      tr.classList.toggle('highlight', v === intensityVal);
    });

    document.getElementById('comp-cycle').textContent = Math.round(calories);
    document.getElementById('comp-walk').textContent = Math.round(3.5 * weightKg * hours);
    document.getElementById('comp-run').textContent = Math.round(9.8 * weightKg * hours);

    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
});