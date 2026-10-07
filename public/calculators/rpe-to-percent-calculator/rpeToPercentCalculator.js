document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'RPE to Percent of 1RM' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const rpe = parseFloat(document.getElementById('rpe').value);
    const reps = parseInt(document.getElementById('reps').value);
    const orm = parseFloat(document.getElementById('orm').value)||0;
    const table = {
      1:{10:100,9.5:98,9:96,8.5:94,8:92,7.5:90,7:88,6.5:86,6:84},
      2:{10:97,9.5:95,9:93,8.5:91,8:89,7.5:87,7:85,6.5:83,6:81},
      3:{10:94,9.5:92,9:90,8.5:88,8:86,7.5:84,7:82,6.5:80,6:78},
      4:{10:91,9.5:89,9:87,8.5:85,8:83,7.5:81,7:79,6.5:77,6:75},
      5:{10:89,9.5:87,9:85,8.5:83,8:81,7.5:79,7:77,6.5:75,6:73},
      6:{10:86,9.5:84,9:82,8.5:80,8:78,7.5:76,7:74,6.5:72,6:70},
      7:{10:83,9.5:81,9:79,8.5:77,8:75,7.5:73,7:71,6.5:69,6:67},
      8:{10:81,9.5:79,9:77,8.5:75,8:73,7.5:71,7:69,6.5:67,6:65},
      10:{10:75,9.5:73,9:71,8.5:69,8:67,7.5:65,7:63,6.5:61,6:59}
    };
    const pct = (table[reps] && table[reps][rpe]) ? table[reps][rpe] : null;
    if (!pct) { err('Combination not found. Try a different RPE or rep count.'); return; }
    set('res-pct', pct+'%');
    set('res-kg', orm > 0 ? Math.round(orm * pct/100)+'kg' : 'Enter 1RM above');
    const rir = Math.round(10 - rpe);
    set('res-reps_left', rir+' RIR');
    set('res-detail', 'RPE '+rpe+' at '+reps+' reps = '+pct+'% of 1RM. Reps in Reserve (RIR) = '+rir+'. Use RPE-based training to autoregulate intensity based on daily readiness.');
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