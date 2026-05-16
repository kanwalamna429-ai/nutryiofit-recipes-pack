(function () {
  var UNICODE_FRACS = {
    '\u00BD': 0.5, '\u00BC': 0.25, '\u00BE': 0.75,
    '\u2153': 1/3, '\u2154': 2/3,
    '\u215B': 0.125, '\u215C': 0.375, '\u215D': 0.625, '\u215E': 0.875
  };

  var FRAC_TABLE = [
    [0.125, '\u215B'], [0.25, '\u00BC'], [1/3, '\u2153'],
    [0.375, '\u215C'], [0.5, '\u00BD'], [0.625, '\u215D'],
    [2/3, '\u2154'],  [0.75, '\u00BE'], [0.875, '\u215E']
  ];

  function toNumber(str) {
    if (UNICODE_FRACS[str] !== undefined) return UNICODE_FRACS[str];
    if (str.indexOf('/') !== -1) {
      var p = str.split('/');
      return parseInt(p[0]) / parseInt(p[1]);
    }
    return parseFloat(str);
  }

  function formatNum(val) {
    if (val <= 0) return '0';
    var whole = Math.floor(val);
    var frac  = val - whole;
    if (frac < 0.05) return String(whole);
    for (var i = 0; i < FRAC_TABLE.length; i++) {
      if (Math.abs(frac - FRAC_TABLE[i][0]) < 0.05) {
        return whole > 0 ? whole + ' ' + FRAC_TABLE[i][1] : FRAC_TABLE[i][1];
      }
    }
    var rounded = parseFloat(val.toFixed(1));
    return String(rounded);
  }

  var PATTERN = /([\u00BC\u00BD\u00BE\u2153\u2154\u215B\u215C\u215D\u215E]|\d+(?:\/\d+)?(?:\.\d+)?)/g;

  function scaleText(text, ratio) {
    return text.replace(PATTERN, function (match) {
      var val = toNumber(match);
      if (isNaN(val) || val === 0) return match;
      return formatNum(val * ratio);
    });
  }

  var style = document.createElement('style');
  style.textContent = [
    '.srv-adjuster{display:inline-flex;align-items:center;gap:6px;background:#f3f4f6;border-radius:8px;padding:2px 4px;}',
    '.srv-btn{background:#fff;border:1.5px solid #d1d5db;border-radius:6px;width:24px;height:24px;font-size:1rem;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#374151;font-weight:700;transition:border-color .15s,background .15s;}',
    '.srv-btn:hover:not(:disabled){border-color:#16a34a;color:#16a34a;background:#f0fdf4;}',
    '.srv-btn:disabled{opacity:.35;cursor:default;}',
    '#servings-count{font-weight:700;font-size:1rem;min-width:1.5ch;text-align:center;color:#111827;}'
  ].join('');
  document.head.appendChild(style);

  document.addEventListener('DOMContentLoaded', function () {
    var metaItems = document.querySelectorAll('.recipe-meta-item');
    var servingsItem = null;
    for (var i = 0; i < metaItems.length; i++) {
      var lbl = metaItems[i].querySelector('.recipe-meta-label');
      if (lbl && lbl.textContent.trim() === 'Servings') {
        servingsItem = metaItems[i];
        break;
      }
    }
    if (!servingsItem) return;

    var valueEl = servingsItem.querySelector('.recipe-meta-value');
    if (!valueEl) return;
    var baseServings = parseInt(valueEl.textContent) || 4;
    var currentServings = baseServings;

    var ingredientItems = document.querySelectorAll('.recipe-ingredients-list li');
    var origTexts = [];
    for (var j = 0; j < ingredientItems.length; j++) {
      origTexts.push(ingredientItems[j].textContent);
    }

    valueEl.innerHTML =
      '<div class="srv-adjuster">' +
        '<button class="srv-btn" id="srv-minus" onclick="window._srvChange(-1)" aria-label="Fewer servings">\u2212</button>' +
        '<span id="servings-count">' + baseServings + '</span>' +
        '<button class="srv-btn" id="srv-plus"  onclick="window._srvChange(1)"  aria-label="More servings">+</button>' +
      '</div>';

    window._srvChange = function (delta) {
      var next = currentServings + delta;
      if (next < 1 || next > 24) return;
      currentServings = next;
      var ratio = currentServings / baseServings;
      document.getElementById('servings-count').textContent = currentServings;
      document.getElementById('srv-minus').disabled = (currentServings === 1);
      document.getElementById('srv-plus').disabled  = (currentServings === 24);
      for (var k = 0; k < ingredientItems.length; k++) {
        ingredientItems[k].textContent = ratio === 1
          ? origTexts[k]
          : scaleText(origTexts[k], ratio);
      }
    };
  });
})();
