document.addEventListener('DOMContentLoaded', () => {
  if (typeof initTemplate === 'function') initTemplate({ title: 'Financial Wellness Score' });

  document.getElementById('calc-btn').addEventListener('click', calculate);
  document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
  function calculate() {
    const savingsVal = {none:0, low:8, moderate:15, good:20, excellent:25};
    const emergencyVal = {none:0, one:8, three:15, six:20};
    const debtVal = {significant:0, some:8, none:15};
    const retireVal = {none:0, started:8, on_track:15, ahead:20};
    const budgetVal = {none:0, loose:8, strict:12, zero_based:15};
    const stressVal = {high:0, moderate:2, low:4, none:5};
    const savings = document.getElementById('savings_rate').value;
    const emergency = document.getElementById('emergency_fund').value;
    const debt = document.getElementById('high_interest_debt').value;
    const retire = document.getElementById('retirement').value;
    const budget = document.getElementById('budget').value;
    const stress = document.getElementById('financial_stress').value;
    const total = savingsVal[savings] + emergencyVal[emergency] + debtVal[debt] + retireVal[retire] + budgetVal[budget] + stressVal[stress];
    const score = Math.min(100, total);
    const level = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Attention';
    const strengths = {savings:'Savings rate',emergency:'Emergency fund',debt:'Debt management',retire:'Retirement savings',budget:'Budget tracking'};
    const bestScore = Math.max(savingsVal[savings],emergencyVal[emergency],debtVal[debt],retireVal[retire],budgetVal[budget]);
    const bestKey = Object.entries({savings:savingsVal[savings],emergency:emergencyVal[emergency],debt:debtVal[debt],retire:retireVal[retire],budget:budgetVal[budget]}).sort((a,b)=>b[1]-a[1])[0][0];
    const worstKey = Object.entries({savings:savingsVal[savings],emergency:emergencyVal[emergency],debt:debtVal[debt],retire:retireVal[retire],budget:budgetVal[budget]}).sort((a,b)=>a[1]-b[1])[0][0];
    const actions = {savings:'Aim to save 20%+ of income',emergency:'Build 3-6 month emergency fund first',debt:'Pay off high-interest debt aggressively (avalanche method)',retire:'Start retirement contributions — even 1% helps',budget:'Track spending for 30 days to understand your money'};
    set('res-score', score);
    set('res-level', level);
    set('res-strength', strengths[bestKey]);
    set('res-priority', actions[worstKey]);
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