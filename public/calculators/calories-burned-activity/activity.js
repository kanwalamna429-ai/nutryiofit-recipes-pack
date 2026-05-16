document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calories Burned by Activity Calculator' });

  const activities = [
    { name: 'Basketball (game)', met: 8.0, category: 'Sports' },
    { name: 'Basketball (shooting hoops)', met: 4.5, category: 'Sports' },
    { name: 'Soccer (competitive)', met: 10.0, category: 'Sports' },
    { name: 'Soccer (recreational)', met: 7.0, category: 'Sports' },
    { name: 'Tennis (singles)', met: 8.0, category: 'Sports' },
    { name: 'Tennis (doubles)', met: 6.0, category: 'Sports' },
    { name: 'Volleyball (recreational)', met: 3.0, category: 'Sports' },
    { name: 'Volleyball (competitive)', met: 8.0, category: 'Sports' },
    { name: 'Badminton (recreational)', met: 4.5, category: 'Sports' },
    { name: 'Badminton (competitive)', met: 7.0, category: 'Sports' },
    { name: 'Table Tennis (Ping Pong)', met: 4.0, category: 'Sports' },
    { name: 'Golf (walking, carrying clubs)', met: 4.8, category: 'Sports' },
    { name: 'Golf (riding cart)', met: 3.5, category: 'Sports' },
    { name: 'Boxing (sparring)', met: 9.0, category: 'Sports' },
    { name: 'Martial Arts (karate, judo)', met: 10.3, category: 'Sports' },
    { name: 'Rock Climbing', met: 8.0, category: 'Sports' },
    { name: 'Skiing (downhill)', met: 6.8, category: 'Sports' },
    { name: 'Swimming (freestyle, moderate)', met: 8.3, category: 'Water' },
    { name: 'Swimming (breaststroke)', met: 10.3, category: 'Water' },
    { name: 'Swimming (leisure)', met: 6.0, category: 'Water' },
    { name: 'Kayaking', met: 5.0, category: 'Water' },
    { name: 'Surfing', met: 3.0, category: 'Water' },
    { name: 'Rowing (vigorous)', met: 12.0, category: 'Water' },
    { name: 'Weight Training (vigorous)', met: 6.0, category: 'Gym' },
    { name: 'Weight Training (moderate)', met: 3.5, category: 'Gym' },
    { name: 'Circuit Training', met: 8.0, category: 'Gym' },
    { name: 'Yoga', met: 2.5, category: 'Gym' },
    { name: 'Pilates', met: 3.0, category: 'Gym' },
    { name: 'Stretching', met: 2.3, category: 'Gym' },
    { name: 'Aerobics (high impact)', met: 7.3, category: 'Gym' },
    { name: 'Aerobics (low impact)', met: 5.0, category: 'Gym' },
    { name: 'Jumping Rope (fast)', met: 12.3, category: 'Gym' },
    { name: 'Jumping Rope (moderate)', met: 8.8, category: 'Gym' },
    { name: 'Elliptical Trainer (moderate)', met: 5.0, category: 'Gym' },
    { name: 'Stair Climbing Machine', met: 9.0, category: 'Gym' },
    { name: 'Stationary Bike (moderate)', met: 5.5, category: 'Gym' },
    { name: 'Stationary Bike (vigorous)', met: 10.0, category: 'Gym' },
    { name: 'HIIT / Interval Training', met: 8.0, category: 'Gym' },
    { name: 'CrossFit', met: 8.5, category: 'Gym' },
    { name: 'Running (8 km/h jogging)', met: 8.3, category: 'Cardio' },
    { name: 'Running (10 km/h)', met: 9.8, category: 'Cardio' },
    { name: 'Running (12 km/h)', met: 11.0, category: 'Cardio' },
    { name: 'Walking (5 km/h)', met: 3.5, category: 'Cardio' },
    { name: 'Walking (brisk, 6.5 km/h)', met: 4.3, category: 'Cardio' },
    { name: 'Hiking (general)', met: 6.0, category: 'Cardio' },
    { name: 'Cycling (leisure, < 16 km/h)', met: 4.0, category: 'Cardio' },
    { name: 'Cycling (moderate, 16-19 km/h)', met: 8.0, category: 'Cardio' },
    { name: 'Cycling (vigorous, 19-22 km/h)', met: 10.0, category: 'Cardio' },
    { name: 'Dancing (ballroom)', met: 4.5, category: 'Cardio' },
    { name: 'Dancing (aerobic/Zumba)', met: 6.5, category: 'Cardio' },
    { name: 'Cleaning (general)', met: 3.5, category: 'Household' },
    { name: 'Vacuuming', met: 3.5, category: 'Household' },
    { name: 'Mopping / Scrubbing', met: 4.5, category: 'Household' },
    { name: 'Gardening (general)', met: 4.0, category: 'Household' },
    { name: 'Mowing Lawn (push mower)', met: 5.5, category: 'Household' },
    { name: 'Shoveling Snow', met: 6.0, category: 'Household' },
    { name: 'Moving / Carrying Boxes', met: 5.0, category: 'Household' },
    { name: 'Cooking', met: 2.5, category: 'Household' },
    { name: 'Sitting (rest)', met: 1.3, category: 'Household' },
    { name: 'Standing (light activity)', met: 2.0, category: 'Household' },
    { name: 'Sleeping', met: 0.95, category: 'Household' },
  ].sort((a, b) => a.name.localeCompare(b.name));

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

  const searchInput = document.getElementById('activity-search');
  const dropdown = document.getElementById('activity-dropdown');
  const selectedMetInput = document.getElementById('selected-met');
  const selectedActivityInput = document.getElementById('selected-activity');
  const selDisplay = document.getElementById('selected-display');
  const selName = document.getElementById('sel-name');
  const selMet = document.getElementById('sel-met');

  function renderDropdown(items) {
    dropdown.innerHTML = '';
    if (items.length === 0) {
      dropdown.innerHTML = '<div style="padding:0.75rem;color:#64748b;font-size:0.875rem">No activities found</div>';
    } else {
      items.forEach(a => {
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
          <span class="activity-name">${a.name}</span>
          <span class="activity-meta">MET: ${a.met} &middot; ${a.category}</span>
        `;
        div.addEventListener('click', () => {
          selectedMetInput.value = a.met;
          selectedActivityInput.value = a.name;
          selName.textContent = a.name;
          selMet.textContent = a.met;
          selDisplay.style.display = 'block';
          searchInput.value = '';
          dropdown.style.display = 'none';
        });
        dropdown.appendChild(div);
      });
    }
  }

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    if (!q) {
      dropdown.style.display = 'none';
      return;
    }
    const filtered = activities.filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    renderDropdown(filtered);
    dropdown.style.display = 'block';
  });

  // Hide dropdown on click outside
  document.addEventListener('click', e => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  document.getElementById('calc-btn').addEventListener('click', calculate);

  function calculate() {
    const weightVal = parseFloat(document.getElementById('weight-input').value);
    const durationMin = parseFloat(document.getElementById('duration').value);
    const selectedMET = parseFloat(selectedMetInput.value);
    
    if (!weightVal || weightVal <= 0 || !durationMin || durationMin <= 0) {
      showError('Please enter valid weight and duration.');
      return;
    }
    if (!selectedMET) {
      showError('Please search and select an activity.');
      return;
    }
    document.getElementById('calc-warning').classList.remove('visible');

    const weightKg = unit === 'metric' ? weightVal : weightVal * 0.453592;
    const hours = durationMin / 60;
    
    const calories = selectedMET * weightKg * hours;
    const intensityStr = selectedMET < 3 ? 'Light' : selectedMET < 6 ? 'Moderate' : selectedMET < 9 ? 'Vigorous' : 'Very Vigorous';
    
    document.getElementById('cal-burned').textContent = Math.round(calories).toLocaleString();
    document.getElementById('stat-calhour').textContent = Math.round(selectedMET * weightKg);
    document.getElementById('stat-met').textContent = selectedMET;
    document.getElementById('stat-intensity').textContent = intensityStr;

    // Top 5 activities
    const top = [...activities].sort((a, b) => b.met - a.met).slice(0, 5);
    const tbody = document.querySelector('#top-table tbody');
    tbody.innerHTML = '';
    top.forEach(a => {
      const cals = Math.round(a.met * weightKg * hours);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${a.name}</td><td>${a.met}</td><td><strong>${cals}</strong></td>`;
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