document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Postpartum Recovery Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const type = document.getElementById('birth_type').value;
    const weeks = parseInt(document.getElementById('weeks_pp').value)||0;
    const el = document.getElementById('res-recovery-info');
    const isCS = type === 'csection';
    let phase, guidance;
    if (weeks <= 1) { phase = 'Immediate Recovery (0-1 week)'; guidance = isCS ? 'Hospital recovery, pain management, limited movement. Focus on rest, hydration, and wound care.' : 'Uterine contractions, perineal healing. Rest, ice packs, sitz baths. Light walking only.'; }
    else if (weeks <= 6) { phase = 'Early Recovery (1-6 weeks)'; guidance = isCS ? 'Avoid lifting >7kg, no driving for 4-6 weeks, no abdominal exercise. Wound healing ongoing.' : 'Gradual increase in activity. No vigorous exercise until 6-week check. Pelvic floor exercises can begin.'; }
    else if (weeks <= 12) { phase = 'Active Recovery (6-12 weeks)'; guidance = 'After 6-week clearance: gentle walking, swimming, light strength training. Begin core and pelvic floor rehab. '+(isCS?'Scar tissue mobilization can begin.':''); }
    else if (weeks <= 26) { phase = 'Rebuilding Phase (3-6 months)'; guidance = 'Progressive return to exercise. Gradual running return (C25K style). Strength training with pelvic floor awareness. Monitor prolapse symptoms.'; }
    else { phase = 'Full Recovery (6+ months)'; guidance = 'Most women return to full activity by 6-12 months. ' + (isCS ? 'C-section scar fully healed.' : '') + ' Body changes may continue for up to 18 months, especially with breastfeeding.'; }
    const flags = isCS && weeks <= 6 ? ['⚠️ No abdominal exercises','⚠️ No lifting > 7kg','⚠️ Avoid driving','⚠️ Watch for infection signs'] : weeks <= 6 ? ['⚠️ No high-impact exercise','⚠️ No heavy lifting','✓ Pelvic floor exercises OK','✓ Walking encouraged'] : ['✓ Progressive exercise OK','✓ Core rehab appropriate','✓ Running return program','✓ See physio for guidance'];
    el.innerHTML = `<div style="padding:1rem;border-radius:0.75rem;background:#f0fdf4;border:1px solid #bbf7d0;margin-bottom:1rem"><div style="font-weight:700;color:#16a34a">${phase}</div><p style="margin-top:0.5rem;font-size:0.875rem;color:#374151">${guidance}</p></div>` + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">' + flags.map(f => `<div style="font-size:0.8rem;padding:0.5rem;border-radius:0.5rem;background:${f.startsWith('✓')?'#f0fdf4':'#fef2f2'};color:${f.startsWith('✓')?'#16a34a':'#dc2626'}">${f}</div>`).join('') + '</div>';
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