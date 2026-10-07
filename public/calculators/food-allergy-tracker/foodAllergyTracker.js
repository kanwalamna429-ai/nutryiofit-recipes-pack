document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Food Sensitivity Tracker' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const symptom=document.getElementById('symptom').value;
    const timing=parseFloat(document.getElementById('timing').value)||2;
    const dairy=document.getElementById('dairy').value;
    const gluten=document.getElementById('gluten').value;
    const fodmaps=document.getElementById('fodmaps').value;
    const eggs=document.getElementById('eggs').value;
    const nuts=document.getElementById('nuts').value;
    const suspects=[];
    if(dairy==='yes')suspects.push({food:'Dairy / Lactose',likelihood:'High',action:'Try eliminating dairy for 2-4 weeks, then reintroduce'});
    else if(dairy==='sometimes')suspects.push({food:'Dairy / Lactose',likelihood:'Moderate',action:'Consider lactase enzyme trial or reducing dairy intake'});
    if(gluten==='yes')suspects.push({food:'Gluten (wheat/rye/barley)',likelihood:'High',action:'Consult doctor for celiac blood test before eliminating gluten'});
    else if(gluten==='sometimes')suspects.push({food:'Gluten / Wheat',likelihood:'Moderate',action:'Track symptoms carefully after each wheat-containing meal'});
    if(fodmaps==='yes'&&symptom==='digestive')suspects.push({food:'FODMAPs (fermentable carbs)',likelihood:'High',action:'Consider low-FODMAP diet trial under dietitian supervision'});
    if(eggs==='yes')suspects.push({food:'Eggs',likelihood:'High',action:'Eliminate eggs for 3 weeks, then reintroduce'});
    if(nuts==='yes')suspects.push({food:'Nuts / Tree nuts',likelihood:'High',action:'Note which specific nuts trigger symptoms — reactions vary'});
    const el=document.getElementById('res-sensitivity-info');
    const timingNote=timing<=2?'Rapid onset (within 2h) suggests IgE-mediated allergy or strong sensitivity.':timing<=24?'Delayed reaction suggests food intolerance rather than allergy.':'Very delayed reaction (24-48h) is common in non-celiac gluten sensitivity and FODMAPs.';
    el.innerHTML='<p style="font-size:0.8rem;color:#64748b;margin-bottom:0.75rem"> Educational tool only. Always consult a healthcare provider for proper allergy testing and diagnosis. Never self-diagnose a food allergy.</p>';
    el.innerHTML+='<div class="info-card" style="margin-bottom:0.75rem"><h3>Symptom Timing</h3><p>'+timingNote+'</p></div>';
    if(suspects.length>0){
      el.innerHTML+=suspects.map(s=>'<div style="padding:0.75rem;border-radius:0.75rem;border:1px solid #e2e8f0;margin-bottom:0.5rem"><div style="display:flex;justify-content:space-between"><span style="font-weight:600">'+s.food+'</span><span style="color:'+(s.likelihood==='High'?'#ef4444':'#f97316')+';font-weight:600">'+s.likelihood+' likelihood</span></div><div style="font-size:0.8rem;color:#64748b;margin-top:0.25rem">Next step: '+s.action+'</div></div>').join('');
    } else {
      el.innerHTML+='<div class="info-card"><h3>No Strong Pattern Detected</h3><p>Keep a detailed food and symptom diary for 2 weeks. Note the time of eating, exact foods, portion sizes, and all symptoms.</p></div>';
    }
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