document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Calorie Source Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const p=parseFloat(document.getElementById('protein_g').value)||0;
    const c=parseFloat(document.getElementById('carbs_g').value)||0;
    const f=parseFloat(document.getElementById('fat_g').value)||0;
    const a=parseFloat(document.getElementById('alcohol_g').value)||0;
    const pCal=p*4,cCal=c*4,fCal=f*9,aCal=a*7;
    const total=pCal+cCal+fCal+aCal;
    if(total<100){err('Enter your macronutrient intakes.');return;}
    const pPct=Math.round(pCal/total*100);
    const cPct=Math.round(cCal/total*100);
    const fPct=Math.round(fCal/total*100);
    set('res-total',total+' kcal');
    set('res-prot_pct',pPct+'% ('+Math.round(pCal)+' kcal)');
    set('res-carb_pct',cPct+'% ('+Math.round(cCal)+' kcal)');
    set('res-fat_pct',fPct+'% ('+Math.round(fCal)+' kcal)');
    const assessment=pPct>=25&&fPct>=20&&fPct<=40?'Well-balanced macro distribution.':pPct<15?'Protein is low — aim for 20–35% for muscle maintenance.':fPct<15?'Fat is very low — ensure adequate intake for hormones and fat-soluble vitamins.':'Review your macro split against your specific health goals.';
    set('res-assessment',assessment);
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