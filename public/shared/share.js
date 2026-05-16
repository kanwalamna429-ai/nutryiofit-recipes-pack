/* =================================================================
   Nutryio Social Share Bar  ·  /shared/share.js
   Handles click events on all [data-share] buttons.
   ================================================================= */

(function () {

  function getPageMeta() {
    return {
      url:   window.location.href,
      title: document.querySelector('meta[property="og:title"]')?.content || document.title,
      image: document.querySelector('meta[property="og:image"]')?.content || ''
    };
  }

  function openPopup(url) {
    window.open(url, 'nutryio_share',
      'width=640,height=480,resizable=yes,scrollbars=yes,toolbar=no,menubar=no');
  }

  function handleShare(e) {
    e.preventDefault();
    const btn  = e.currentTarget;
    const type = btn.dataset.share;
    const { url, title, image } = getPageMeta();
    const enc = encodeURIComponent;

    switch (type) {
      case 'facebook':
        openPopup('https://www.facebook.com/sharer/sharer.php?u=' + enc(url));
        break;
      case 'x':
        openPopup('https://twitter.com/intent/tweet?text=' + enc(title) + '&url=' + enc(url));
        break;
      case 'pinterest':
        openPopup('https://pinterest.com/pin/create/button/?url=' + enc(url) +
          '&media=' + enc(image) + '&description=' + enc(title));
        break;
      case 'reddit':
        openPopup('https://www.reddit.com/submit?url=' + enc(url) + '&title=' + enc(title));
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(function () {
          var span = btn.querySelector('.share-btn-text');
          if (!span) return;
          var orig = span.textContent;
          span.textContent = 'Copied!';
          btn.classList.add('share-btn--copied');
          setTimeout(function () {
            span.textContent = orig;
            btn.classList.remove('share-btn--copied');
          }, 2200);
        }).catch(function () {
          /* fallback for older browsers */
          var ta = document.createElement('textarea');
          ta.value = url;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        });
        break;
    }
  }

  function init() {
    document.querySelectorAll('[data-share]').forEach(function (btn) {
      btn.addEventListener('click', handleShare);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
