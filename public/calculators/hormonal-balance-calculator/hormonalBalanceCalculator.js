document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Hormonal Balance Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const s = {
      irregular: parseInt(document.getElementById('irregular_periods').value)||0,
      fatigue: parseInt(document.getElementById('fatigue').value)||0,
      weightGain: parseInt(document.getElementById('weight_gain').value)||0,
      acne: parseInt(document.getElementById('acne').value)||0,
      hairLoss: parseInt(document.getElementById('hair_loss').value)||0,
      mood: parseInt(document.getElementById('mood_swings').value)||0,
      libido: parseInt(document.getElementById('libido').value)||0,
      hot: parseInt(document.getElementById('hot_flashes').value)||0,
    };
    const patterns = [
      {name:'Estrogen Imbalance', score: Math.round((s.irregular*2+s.mood+s.hot*2+s.fatigue)/6*10), symptoms:'Irregular periods, hot flashes, mood changes'},
      {name:'Androgen Excess (PCOS-related)', score: Math.round((s.acne*2+s.hairLoss+s.irregular*2+s.weightGain)/6*10), symptoms:'Acne, hair loss, irregular periods, weight gain'},
      {name:'Thyroid Dysfunction', score: Math.round((s.fatigue*2+s.weightGain*2+s.hairLoss+s.mood)/6*10), symptoms:'Fatigue, weight changes, hair thinning, mood issues'},
      {name:'Cortisol (Stress) Imbalance', score: Math.round((s.fatigue+s.weightGain+s.mood*2+s.irregular)/4*10), symptoms:'Fatigue, weight gain, mood instability, cycle disruption'},
      {name:'Low Progesterone / Estrogen (Perimenopause)', score: Math.round((s.hot*2+s.mood+s.libido+s.irregular)/4*10), symptoms:'Hot flashes, low libido, mood changes'},
    ];
    patterns.sort((a,b)=>b.score-a.score);
    const el = document.getElementById('res-hormonal-info');
    el.innerHTML = '<p style="font-size:0.75rem;color:#64748b;margin-bottom:0.75rem">⚠️ This tool identifies PATTERNS only — not diagnoses. Please consult your healthcare provider for testing and diagnosis.</p>';
    el.innerHTML += '<div style="display:grid;gap:0.5rem">' + patterns.slice(0,3).map((p,i) => {
      const color = i === 0 ? '#22c55e' : i === 1 ? '#f97316' : '#64748b';
      return `<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0"><div style="display:flex;justify-content:space-between"><span style="font-weight:600;font-size:0.875rem">${p.name}</span><span style="font-weight:700;color:${color}">${p.score}%</span></div><div style="font-size:0.75rem;color:#64748b;margin-top:0.25rem">${p.symptoms}</div></div>`;
    }).join('') + '</div>';
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
  
});