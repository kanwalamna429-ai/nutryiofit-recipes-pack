document.addEventListener('DOMContentLoaded', () => {
  // Call shared template to inject header + footer
  if (typeof initTemplate === 'function') {
    initTemplate({ title: 'BMI Calculator' });
  }

  let unit = 'metric'; // 'metric' | 'imperial'

  // --- Unit toggle ---
  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      unit = btn.dataset.unit;
      document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unit === 'metric') {
        document.getElementById('height-metric').style.display = '';
        document.getElementById('height-imperial').style.display = 'none';
        document.getElementById('weight-unit').textContent = 'kg';
        document.getElementById('weight-label').textContent = 'Weight';
        
        // Convert current values if present (lbs to kg)
        const currentWeight = parseFloat(document.getElementById('weight-kg').value);
        if (!isNaN(currentWeight) && currentWeight > 0) {
          document.getElementById('weight-kg').value = (currentWeight * 0.453592).toFixed(1);
        }
      } else {
        document.getElementById('height-metric').style.display = 'none';
        document.getElementById('height-imperial').style.display = '';
        document.getElementById('weight-unit').textContent = 'lbs';
        document.getElementById('weight-label').textContent = 'Weight';

        // Convert current values if present (kg to lbs)
        const currentWeight = parseFloat(document.getElementById('weight-kg').value);
        if (!isNaN(currentWeight) && currentWeight > 0) {
          document.getElementById('weight-kg').value = (currentWeight * 2.20462).toFixed(1);
        }
      }
      // Hide result on unit switch
      document.getElementById('result-section').classList.remove('visible');
    });
  });

  // --- Calculate button ---
  document.getElementById('calc-btn').addEventListener('click', calculate);

  // Also calculate on Enter key
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  function calculate() {
    let heightM, weightKg;

    if (unit === 'metric') {
      const hCm = parseFloat(document.getElementById('height-cm').value);
      const wKg = parseFloat(document.getElementById('weight-kg').value);
      if (!hCm || !wKg || hCm <= 0 || wKg <= 0) {
        showError('Please enter valid height and weight values.');
        return;
      }
      heightM = hCm / 100;
      weightKg = wKg;
    } else {
      const ft = parseFloat(document.getElementById('height-ft').value) || 0;
      const inches = parseFloat(document.getElementById('height-in').value) || 0;
      const wLbs = parseFloat(document.getElementById('weight-kg').value);
      const totalInches = ft * 12 + inches;
      if (!totalInches || totalInches <= 0 || !wLbs || wLbs <= 0) {
        showError('Please enter valid height and weight values.');
        return;
      }
      heightM = totalInches * 0.0254;
      weightKg = wLbs * 0.453592;
    }

    if (heightM <= 0) {
      showError('Height cannot be zero.');
      return;
    }

    const bmi = weightKg / (heightM * heightM);
    displayResult(bmi);
  }

  function displayResult(bmi) {
    const rounded = Math.round(bmi * 10) / 10;
    document.getElementById('bmi-value').textContent = rounded.toFixed(1);

    // Determine category
    let category, badgeClass, tipText, markerPct, highlightRow;
    if (bmi < 18.5) {
      category = 'Underweight'; badgeClass = 'badge-blue'; highlightRow = 'underweight';
      tipText = 'Your BMI suggests you are underweight. Consider speaking to a healthcare provider about a healthy weight gain plan and ensuring adequate nutrition.';
      markerPct = Math.max(2, ((bmi - 15) / (18.5 - 15)) * 20);
    } else if (bmi < 25) {
      category = 'Normal Weight'; badgeClass = 'badge-green'; highlightRow = 'normal';
      tipText = 'Great! Your BMI is in the healthy range. Maintaining a balanced diet and regular physical activity will help you stay here.';
      markerPct = 20 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    } else if (bmi < 30) {
      category = 'Overweight'; badgeClass = 'badge-yellow'; highlightRow = 'overweight';
      tipText = 'Your BMI indicates you are overweight. Small changes in diet and adding regular exercise can make a significant impact over time.';
      markerPct = 45 + ((bmi - 25) / (30 - 25)) * 20;
    } else if (bmi < 35) {
      category = 'Obese (Class I)'; badgeClass = 'badge-orange'; highlightRow = 'obese1';
      tipText = 'Your BMI falls in the Obese Class I range. Speaking with a healthcare professional about a structured plan can help you move toward a healthier weight.';
      markerPct = 65 + ((bmi - 30) / (35 - 30)) * 12;
    } else if (bmi < 40) {
      category = 'Obese (Class II)'; badgeClass = 'badge-orange'; highlightRow = 'obese2';
      tipText = 'Your BMI falls in the Obese Class II range. Medical guidance is recommended for a safe and effective weight management approach.';
      markerPct = 77 + ((bmi - 35) / (40 - 35)) * 11;
    } else {
      category = 'Obese (Class III)'; badgeClass = 'badge-red'; highlightRow = 'obese3';
      tipText = 'Your BMI is in the Obese Class III (Severe Obesity) range. Please consult a healthcare provider for personalized medical advice and support.';
      markerPct = Math.min(97, 88 + (bmi - 40) / 5 * 5);
    }

    const badge = document.getElementById('result-badge');
    badge.textContent = category;
    badge.className = 'result-badge ' + badgeClass;

    // Marker position (clamped)
    document.getElementById('bmi-marker').style.left = Math.min(97, Math.max(2, markerPct)) + '%';

    // Warning for BMI > 60
    const warning = document.getElementById('bmi-warning');
    if (bmi > 60) {
      warning.classList.add('visible');
    } else {
      warning.classList.remove('visible');
    }

    // Tip text
    document.getElementById('bmi-tip-text').textContent = tipText;

    // Highlight classification table row
    document.querySelectorAll('#bmi-table tbody tr').forEach(tr => {
      tr.classList.toggle('highlight', tr.dataset.range === highlightRow);
    });

    // Show result
    const cw = document.getElementById('calc-warning');
    if (cw) cw.classList.remove('visible');
    document.getElementById('result-section').classList.add('visible');
  }

  function showError(msg) {
    const w = document.getElementById('calc-warning');
    if (w) {
      w.textContent = '⚠️ ' + msg;
      w.classList.add('visible');
    }
    document.getElementById('result-section').classList.remove('visible');
  }
});
