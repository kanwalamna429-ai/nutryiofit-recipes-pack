document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Food Budget Calculator' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const income=parseFloat(document.getElementById('monthly_income').value);
    const size=parseInt(document.getElementById('household_size').value)||1;
    const plan=document.getElementById('budget_plan').value;
    if(!income||income<=0){err('Enter your monthly income.');return;}
    const ppd={thrifty:7.5,low_cost:9.5,moderate:12.5,liberal:16.5}[plan]||9.5;
    const monthly=Math.round(ppd*size*30);
    const weekly=Math.round(monthly/4.33);
    const pct=Math.round(monthly/income*100);
    set('res-monthly','$'+monthly.toLocaleString());
    set('res-weekly','$'+weekly.toLocaleString());
    set('res-per_person','$'+ppd.toFixed(2));
    set('res-pct_income',pct+'%');
    set('res-breakdown','Suggested split: Grocery store $'+Math.round(monthly*0.80)+' (80%) + Dining out $'+Math.round(monthly*0.20)+' (20%). If budget is tight, prioritize protein, vegetables, whole grains, and eggs.');
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