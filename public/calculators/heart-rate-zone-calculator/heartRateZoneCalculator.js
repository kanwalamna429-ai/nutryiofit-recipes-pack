document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Heart Rate Zone Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const age = parseInt(document.getElementById('age').value);
    let mhr = parseFloat(document.getElementById('mhr').value);
    const formula = document.getElementById('formula').value;
    if (!age && !mhr) { err('Enter your age or max heart rate.'); return; }
    if (!mhr) {
      if (formula === 'gellish') mhr = Math.round(206.9 - 0.67*age);
      else if (formula === 'tanaka') mhr = Math.round(208 - 0.7*age);
      else mhr = 220 - age;
    }
    const zones = [
      {name:'Zone 1 — Recovery',pct:[50,60],color:'#3b82f6',purpose:'Active recovery, very light effort'},
      {name:'Zone 2 — Aerobic Base',pct:[60,70],color:'#22c55e',purpose:'Fat burning, endurance base building'},
      {name:'Zone 3 — Aerobic',pct:[70,80],color:'#eab308',purpose:'Aerobic capacity, moderate effort'},
      {name:'Zone 4 — Threshold',pct:[80,90],color:'#f97316',purpose:'Lactate threshold, race pace'},
      {name:'Zone 5 — Max',pct:[90,100],color:'#ef4444',purpose:'Maximum effort, speed work'},
    ];
    const el = document.getElementById('zone-table');
    el.innerHTML = '<table class="class-table" style="width:100%"><thead><tr><th>Zone</th><th>HR Range</th><th>% MHR</th><th>Purpose</th></tr></thead><tbody>' +
      zones.map(z => {
        const lo = Math.round(mhr*z.pct[0]/100);
        const hi = Math.round(mhr*z.pct[1]/100);
        return `<tr><td style="font-weight:600;color:${z.color}">${z.name}</td><td style="font-weight:700">${lo}–${hi} bpm</td><td>${z.pct[0]}–${z.pct[1]}%</td><td style="font-size:0.8rem">${z.purpose}</td></tr>`;
      }).join('') + '</tbody></table><div style="margin-top:0.5rem;font-size:0.875rem;color:#64748b">Based on MHR: '+mhr+' bpm</div>';
    ok();
  }
  function err(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = ' ' + msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
  function ok() {
    document.getElementById('calc-warning').classList.remove('visible');
    document.getElementById('result-section').classList.add('visible');
  }
  function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
  
});