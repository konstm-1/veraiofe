/* Скролл-эффекты: плавное появление блоков и масштабирование фото при
   попадании в область просмотра. Работает без сборки и внешних библиотек. */

document.addEventListener('DOMContentLoaded', function () {
  initHeroScrollZoom();
  initPosterCarousels();

  var observed = document.querySelectorAll('.reveal, .zoom-media');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    observed.forEach(function (el) { io.observe(el); });
  } else {
    observed.forEach(function (el) { el.classList.add('in-view'); });
  }
});

/* Каждая страница открывается большим фото (.hero), которое плавно
   увеличивается по мере прокрутки — эффект "видео", а не статичная картинка. */
function initHeroScrollZoom() {
  var media = Array.prototype.map.call(document.querySelectorAll('.hero'), function (container) {
    return { container: container, target: container.querySelector('.hero-media img, .hero-media .ph') };
  }).filter(function (m) { return m.target; });

  if (!media.length) return;

  var ZOOM = 0.3;
  var ticking = false;

  function update() {
    ticking = false;
    media.forEach(function (m) {
      var rect = m.container.getBoundingClientRect();
      var progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      m.target.style.transform = 'scale(' + (1 + progress * ZOOM).toFixed(4) + ')';
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* Prev/next buttons on a .poster-carousel just scroll its track by one
   card's width — the track itself is a native scroll-snap row, so this
   is purely a convenience for mouse/keyboard users (touch/trackpad
   already scrolls it directly). */
function initPosterCarousels() {
  document.querySelectorAll('.poster-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.poster-track');
    var prev = carousel.querySelector('[data-poster-prev]');
    var next = carousel.querySelector('[data-poster-next]');
    if (!track || !(prev || next)) return;

    function step(dir) {
      var card = track.querySelector('.poster-card');
      var amount = card ? card.getBoundingClientRect().width + 32 : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }

    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
  });
}
