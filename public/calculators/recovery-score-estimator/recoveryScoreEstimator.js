document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Recovery Score Estimator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const sleep = parseFloat(document.getElementById('sleep').value)||0;
    const quality = document.getElementById('sleep_quality').value;
    const soreness = parseInt(document.getElementById('soreness').value)||5;
    const stress = parseInt(document.getElementById('stress').value)||5;
    const rhrToday = parseFloat(document.getElementById('rhr_today').value)||0;
    const rhrNormal = parseFloat(document.getElementById('rhr_normal').value)||0;
    const sleepQualityPts = {great:25, good:20, fair:12, poor:5}[quality]||15;
    const sleepDurationPts = Math.min(25, Math.max(0, (sleep - 4) / 5 * 25));
    const sleepScore = Math.round(sleepQualityPts + sleepDurationPts);
    const sorenessPts = Math.max(0, 30 - soreness * 3);
    let hrPts = 20;
    if (rhrToday && rhrNormal) {
      const hrDiff = rhrToday - rhrNormal;
      hrPts = hrDiff > 8 ? 5 : hrDiff > 4 ? 12 : hrDiff > 0 ? 18 : 20;
    }
    const physicalScore = Math.round(sorenessPts + hrPts);
    const mentalPts = Math.max(0, 30 - stress * 3);
    const mentalScore = Math.round(mentalPts * (10/3));
    const total = Math.min(100, Math.round((sleepScore * 0.5 + physicalScore * 0.35 + mentalScore * 0.15)));
    set('res-score', total);
    set('res-sleep_score', sleepScore+'');
    set('res-physical_score', physicalScore+'');
    set('res-mental_score', mentalScore+'');
    let rec;
    if (total >= 80) rec = 'Excellent recovery. Good day for high-intensity training, personal records, or race efforts.';
    else if (total >= 65) rec = 'Good recovery. Full training session fine. Avoid maximal efforts.';
    else if (total >= 50) rec = 'Moderate recovery. Consider reducing intensity by 20%. Focus on technique.';
    else if (total >= 35) rec = 'Poor recovery. Active recovery or light aerobic work only. Prioritize sleep tonight.';
    else rec = 'Very poor recovery. Rest day recommended. Address sleep and stress factors.';
    set('res-recommendation', rec);
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