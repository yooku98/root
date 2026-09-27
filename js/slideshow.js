(function () {
  function fullSrc(img) {
    return img.src.replace('-600.webp', '-1200.webp');
  }

  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Photo viewer');
    overlay.hidden = true;
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
      '<figure class="lightbox-figure">' +
        '<img class="lightbox-img" alt="">' +
        '<figcaption class="lightbox-counter"></figcaption>' +
      '</figure>' +
      '<button type="button" class="lightbox-next" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(overlay);
    return overlay;
  }

  var overlay = buildOverlay();
  var imgEl = overlay.querySelector('.lightbox-img');
  var counterEl = overlay.querySelector('.lightbox-counter');
  var prevBtn = overlay.querySelector('.lightbox-prev');
  var nextBtn = overlay.querySelector('.lightbox-next');
  var closeBtn = overlay.querySelector('.lightbox-close');

  var slides = [];
  var index = 0;
  var lastFocused = null;

  function show(i) {
    index = (i + slides.length) % slides.length;
    var slide = slides[index];
    imgEl.src = slide.src;
    imgEl.alt = slide.alt || '';
    var multiple = slides.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
    counterEl.hidden = !multiple;
    counterEl.textContent = (index + 1) + ' / ' + slides.length;
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'ArrowLeft') show(index - 1);
  }

  function open(newSlides, startIndex) {
    slides = newSlides;
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.documentElement.classList.add('lightbox-open');
    show(startIndex || 0);
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    overlay.hidden = true;
    document.documentElement.classList.remove('lightbox-open');
    document.removeEventListener('keydown', onKeydown);
    imgEl.src = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  prevBtn.addEventListener('click', function () { show(index - 1); });
  nextBtn.addEventListener('click', function () { show(index + 1); });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  // Design cards + Lookbook tiles: every <img> inside is one angle of that item.
  document.querySelectorAll('.design-photo, .lookbook-item').forEach(function (photoEl) {
    var imgs = Array.prototype.slice.call(photoEl.querySelectorAll('img'));
    if (!imgs.length) return;
    var slideList = imgs.map(function (img) {
      return { src: fullSrc(img), alt: img.alt };
    });

    if (slideList.length > 1) {
      var badge = document.createElement('span');
      badge.className = 'photo-count';
      badge.textContent = slideList.length + ' photos';
      photoEl.appendChild(badge);
    }

    photoEl.setAttribute('role', 'button');
    photoEl.setAttribute('tabindex', '0');
    photoEl.setAttribute('aria-label', slideList.length > 1 ? 'View photos' : 'View photo');

    function activate() { open(slideList, 0); }
    photoEl.addEventListener('click', activate);
    photoEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });
})();
