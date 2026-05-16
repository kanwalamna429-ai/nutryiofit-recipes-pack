/* Nutryio recipe page enhancements:
   - Working "Copy as Plain Text" button (DOM-based, override broken inline)
   - "Print Recipe" opens a clean print-ready table view (no images / site styles)
   Loaded automatically by /shared/template.js on every page; no-ops if not a recipe.
*/
(function () {
  function init() {
    var card = document.querySelector('.recipe-card-main');
    if (!card) return;

    var titleEl = document.querySelector('.post-title');
    var title = titleEl ? titleEl.textContent.trim() : document.title;

    var descEl = card.querySelector('.recipe-card-main-body > p');
    var description = descEl ? descEl.textContent.trim() : '';

    function collectMeta() {
      var out = {};
      card.querySelectorAll('.recipe-meta-item').forEach(function (it) {
        var lbl = it.querySelector('.recipe-meta-label');
        var val = it.querySelector('.recipe-meta-value');
        if (!lbl || !val) return;
        // For servings, prefer the count span if injected
        var cnt = val.querySelector('#servings-count');
        var v = cnt ? cnt.textContent.trim() : val.textContent.trim();
        out[lbl.textContent.trim()] = v;
      });
      return out;
    }

    function collectIngredients() {
      return Array.from(card.querySelectorAll('.recipe-ingredients-list li'))
        .map(function (li) { return li.textContent.trim(); });
    }

    function collectInstructions() {
      return Array.from(card.querySelectorAll('.recipe-steps-list .recipe-step')).map(function (li) {
        var t = li.querySelector('.recipe-step-text');
        return t ? t.textContent.trim() : li.textContent.trim();
      });
    }

    function collectNutrition() {
      var table = card.querySelector('.recipe-nutrition-table');
      if (!table) return null;
      var headers = Array.from(table.querySelectorAll('thead th')).map(function (th) { return th.textContent.trim(); });
      var values  = Array.from(table.querySelectorAll('tbody td')).map(function (td) { return td.textContent.trim(); });
      return { headers: headers, values: values };
    }

    /* ---------- COPY ---------- */
    function buildPlainText() {
      var meta = collectMeta();
      var ing = collectIngredients();
      var ins = collectInstructions();
      var nut = collectNutrition();
      var lines = [];
      lines.push(title);
      lines.push(window.location.origin + window.location.pathname);
      lines.push('');
      if (description) { lines.push(description); lines.push(''); }
      var metaLine = Object.keys(meta).map(function (k) { return k + ': ' + meta[k]; }).join(' | ');
      if (metaLine) { lines.push(metaLine); lines.push(''); }
      if (nut) {
        lines.push('NUTRITION PER SERVING');
        lines.push(nut.headers.map(function (h, i) { return h + ': ' + (nut.values[i] || ''); }).join(' | '));
        lines.push('');
      }
      lines.push('INGREDIENTS');
      ing.forEach(function (i) { lines.push('- ' + i); });
      lines.push('');
      lines.push('INSTRUCTIONS');
      ins.forEach(function (s, i) { lines.push((i + 1) + '. ' + s); });
      return lines.join('\n');
    }

    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
    }

    function flashCopied(btn) {
      var orig = btn.innerHTML;
      btn.innerHTML = 'Copied!';
      btn.classList.add('recipe-btn-primary');
      setTimeout(function () {
        btn.innerHTML = orig;
        btn.classList.remove('recipe-btn-primary');
      }, 2200);
    }

    var copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
      copyBtn.onclick = null;
      copyBtn.removeAttribute('onclick');
      copyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var text = buildPlainText();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { flashCopied(copyBtn); }, function () {
            fallbackCopy(text); flashCopied(copyBtn);
          });
        } else {
          fallbackCopy(text); flashCopied(copyBtn);
        }
      });
    }

    /* ---------- PRINT ---------- */
    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
      });
    }

    function buildPrintHtml() {
      var meta = collectMeta();
      var ing = collectIngredients();
      var ins = collectInstructions();
      var nut = collectNutrition();

      var metaLine = Object.keys(meta).map(function (k) {
        return escapeHtml(k) + ': ' + escapeHtml(meta[k]);
      }).join(' | ');

      var ingRows = ing.map(function (i, idx) {
        return '<tr><td style="width:2.5em;text-align:right;">' + (idx + 1) + '.</td><td>' + escapeHtml(i) + '</td></tr>';
      }).join('');

      var insRows = ins.map(function (s, idx) {
        return '<tr><td style="width:2.5em;text-align:right;vertical-align:top;font-weight:bold;">' + (idx + 1) + '.</td><td>' + escapeHtml(s) + '</td></tr>';
      }).join('');

      var nutHtml = '';
      if (nut) {
        nutHtml =
          '<h2>Nutrition Per Serving</h2>' +
          '<table><thead><tr>' +
            nut.headers.map(function (h) { return '<th>' + escapeHtml(h) + '</th>'; }).join('') +
          '</tr></thead><tbody><tr>' +
            nut.values.map(function (v) { return '<td>' + escapeHtml(v) + '</td>'; }).join('') +
          '</tr></tbody></table>';
      }

      return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + escapeHtml(title) + '</title>' +
        '<style>' +
          '*{box-sizing:border-box;}' +
          'body{font-family:Georgia,"Times New Roman",serif;color:#000;background:#fff;margin:24px;line-height:1.5;font-size:12pt;}' +
          'h1{font-size:20pt;margin:0 0 8px;}' +
          'h2{font-size:13pt;margin:18px 0 6px;border-bottom:1px solid #000;padding-bottom:3px;}' +
          'p.desc{margin:0 0 10px;font-style:italic;}' +
          'p.meta{margin:0 0 16px;font-size:11pt;line-height:1.5;}' +
          'table{width:100%;border-collapse:collapse;margin:0 0 8px;}' +
          'th,td{border:1px solid #555;padding:5px 8px;text-align:left;font-size:11pt;}' +
          'th{background:#eee;}' +
          '.meta th{width:30%;}' +
          '.no-border, .no-border td{border:none;padding:2px 6px;}' +
          '@media print{body{margin:0.4in;}}' +
        '</style></head><body>' +
        '<h1>' + escapeHtml(title) + '</h1>' +
        (description ? '<p class="desc">' + escapeHtml(description) + '</p>' : '') +
        (metaLine ? '<p class="meta">' + metaLine + '</p>' : '') +
        nutHtml +
        '<h2>Ingredients</h2>' +
        '<table class="no-border"><tbody>' + ingRows + '</tbody></table>' +
        '<h2>Instructions</h2>' +
        '<table class="no-border"><tbody>' + insRows + '</tbody></table>' +
        '<script>window.onload=function(){setTimeout(function(){window.print();},250);};<\/script>' +
        '</body></html>';
    }

    var printBtns = card.querySelectorAll('.recipe-action-btns .recipe-btn-primary');
    printBtns.forEach(function (btn) {
      // Heuristic: it's the print button (calls window.print or contains "Print")
      if (!/print/i.test(btn.textContent)) return;
      btn.onclick = null;
      btn.removeAttribute('onclick');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var w = window.open('', '_blank', 'width=820,height=900');
        if (!w) { window.print(); return; }
        w.document.open();
        w.document.write(buildPrintHtml());
        w.document.close();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
