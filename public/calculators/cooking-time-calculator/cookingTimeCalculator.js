document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Cooking Time Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const meat = document.getElementById('meat').value;
    const weight = parseFloat(document.getElementById('weight_kg').value);
    const method = document.getElementById('method').value;
    if (!weight || weight <= 0) { err('Enter a valid weight.'); return; }
    const configs = {
      whole_chicken:{minPerKg:{roast:50, slow:180, pressure:12}, targetC:74, targetF:165, rest:10, tip:'Breast facing up. Baste every 30 min. Juices run clear when done.'},
      chicken_breast:{minPerKg:{roast:25, slow:90, pressure:8}, targetC:74, targetF:165, rest:5, tip:'Pound to even thickness for uniform cooking. Brine for juicier results.'},
      turkey:{minPerKg:{roast:45, slow:240, pressure:0}, targetC:74, targetF:165, rest:30, tip:'Stuff loosely or cook stuffing separately. Baste hourly. Tent with foil if browning too fast.'},
      beef_roast:{minPerKg:{roast:55, slow:210, pressure:20}, targetC:63, targetF:145, rest:15, tip:'Sear first for better crust. Rest covered with foil. Temperature rises 5°C during resting.'},
      beef_rare:{minPerKg:{roast:35, slow:0, pressure:0}, targetC:52, targetF:125, rest:10, tip:'For rare/medium-rare. Remove at 50°C and rest — carries over to 55-57°C.'},
      pork_roast:{minPerKg:{roast:55, slow:210, pressure:20}, targetC:63, targetF:145, rest:10, tip:'Score the skin for crackling. High heat (230°C) first 20 min, then lower heat.'},
      leg_lamb:{minPerKg:{roast:50, slow:210, pressure:20}, targetC:63, targetF:145, rest:15, tip:'Pink lamb is safe and delicious. Use a meat thermometer. Garlic + rosemary inserts enhance flavor.'},
      ham:{minPerKg:{roast:25, slow:120, pressure:10}, targetC:60, targetF:140, rest:10, tip:'Pre-cooked ham just needs reheating. Score diamond pattern and glaze with honey/mustard last 30 min.'},
      fish_fillet:{minPerKg:{roast:20, slow:0, pressure:0}, targetC:63, targetF:145, rest:2, tip:'Cook from room temperature. Fillets cook very quickly — check at minimum time.'},
    };
    const c = configs[meat];
    if (!c || !c.minPerKg[method]) { err('This cooking method is not available for the selected meat.'); return; }
    const totalMin = Math.round(c.minPerKg[method] * weight);
    const hours = Math.floor(totalMin/60);
    const mins = totalMin % 60;
    const timeStr = hours > 0 ? hours+'h '+(mins>0?mins+'min':'') : mins+'min';
    set('res-time', timeStr);
    set('res-temp_c', c.targetC+'°C');
    set('res-temp_f', c.targetF+'°F');
    set('res-rest', c.rest+' min');
    set('res-tip', c.tip);
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