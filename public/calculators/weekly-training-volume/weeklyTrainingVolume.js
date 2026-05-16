document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Weekly Training Volume Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const muscles = [
      {id:'chest',name:'Chest',mev:8,mav:[10,20],mrv:22},
      {id:'back',name:'Back',mev:10,mav:[14,22],mrv:25},
      {id:'shoulders',name:'Shoulders',mev:8,mav:[12,20],mrv:22},
      {id:'biceps',name:'Biceps',mev:6,mav:[10,15],mrv:20},
      {id:'triceps',name:'Triceps',mev:6,mav:[10,14],mrv:18},
      {id:'quads',name:'Quads',mev:8,mav:[12,18],mrv:20},
      {id:'hamstrings',name:'Hamstrings',mev:6,mav:[10,16],mrv:20},
      {id:'glutes',name:'Glutes',mev:4,mav:[8,16],mrv:20},
      {id:'calves',name:'Calves',mev:6,mav:[8,16],mrv:20},
    ];
    const tbody = document.getElementById('res-rows');
    tbody.innerHTML = '';
    muscles.forEach(m => {
      const sets = parseInt(document.getElementById(m.id).value)||0;
      let status, color;
      if (sets < m.mev) { status = 'Below MEV'; color = '#ef4444'; }
      else if (sets <= m.mav[1]) { status = 'Optimal'; color = '#22c55e'; }
      else if (sets <= m.mrv) { status = 'Near MRV'; color = '#f97316'; }
      else { status = 'Over MRV'; color = '#dc2626'; }
      tbody.innerHTML += `<tr><td>${m.name}</td><td style="font-weight:700">${sets}</td><td>${m.mev}</td><td>${m.mav[0]}–${m.mav[1]}</td><td>${m.mrv}</td><td style="color:${color};font-weight:600">${status}</td></tr>`;
    });
    ok();
  }
  function err(msg) {
    const w = document.getElementById('calc-warning');
    w.textContent = '⚠️ ' + msg;
    w.classList.add('visible');
    document.getElementById('result-section').classList.remove('visible');
  }
  function ok() {
    document.getElementById('calc-warning').classList.remove('visible');
    document.getElementById('result-section').classList.add('visible');
  }
  function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
  function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
});