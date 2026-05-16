document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Mediterranean Diet Score' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const oil = parseFloat(document.getElementById('olive_oil').value)||0;
    const oilTbsp = parseFloat(document.getElementById('olive_oil_tbsp').value)||0;
    const veg = parseFloat(document.getElementById('vegetables').value)||0;
    const fruit = parseFloat(document.getElementById('fruits').value)||0;
    const legumes = parseFloat(document.getElementById('legumes').value)||0;
    const fish = parseFloat(document.getElementById('fish').value)||0;
    const redMeat = parseFloat(document.getElementById('red_meat').value)||0;
    const wine = parseFloat(document.getElementById('wine').value)||0;
    const nuts = parseFloat(document.getElementById('nuts').value)||0;
    const grains = parseFloat(document.getElementById('whole_grains').value)||0;
    const s1=oil>=7?1:0,s2=oilTbsp>=4?1:0,s3=veg>=2?1:0,s4=fruit>=3?1:0,s5=legumes>=3?1:0;
    const s6=fish>=3?1:0,s7=redMeat<=1?1:0,s8=(wine>=5&&wine<=14)?1:0,s9=nuts>=3?1:0,s10=grains>=3?1:0;
    const total=s1+s2+s3+s4+s5+s6+s7+s8+s9+s10;
    const level=total>=10?'High Adherence':total>=7?'Moderate Adherence':total>=4?'Low Adherence':'Very Low Adherence';
    set('res-score', total+'/14');
    set('res-level', level+' ('+total+'/10 key criteria met)');
    const missed=[];
    if(!s3)missed.push('Eat 2+ vegetable servings daily');
    if(!s4)missed.push('Eat 3+ fruit servings daily');
    if(!s5)missed.push('Include legumes 3+x/week');
    if(!s6)missed.push('Eat fish/seafood 3+x/week');
    if(!s7)missed.push('Limit red/processed meat to 1x/week');
    if(!s9)missed.push('Eat nuts 3+x/week (30g serving)');
    if(!s10)missed.push('Choose whole grains over refined (3+ servings/day)');
    set('res-priorities', missed.slice(0,3).join(' | ')||'Excellent adherence — maintain your Mediterranean lifestyle!');
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