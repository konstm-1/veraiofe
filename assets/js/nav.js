/* Общий хедer/футер, инжектируются на каждой странице.
   Два разных сайта используют этот файл: сайт Веры Иофе (корень проекта)
   и сайт трио (/knushevitsky/, позже — отдельный поддомен
   knushevitsky.veraiofe.ru). Сайт помечается атрибутом data-site на <body>
   ("trio" или отсутствует/что угодно ещё = сайт Веры), активная страница —
   атрибутом data-page, язык — атрибутом lang на <html>.

   Внутри сайта трио ссылки на его же страницы — относительные (recordings.html,
   не /recordings.html), потому что сегодня это подпапка на том же домене.
   Ссылки, ведущие на сайт Веры Иофе (и наоборот, ссылка с сайта Веры на трио) —
   абсолютные с ведущим "/", поскольку это разные разделы уже сейчас и будут
   разными доменами после переезда трио на поддомен. */

(function () {
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'ru';
  var SITE = document.body.getAttribute('data-site') === 'trio' ? 'trio' : 'vera';
  var PAGE = document.body.getAttribute('data-page') || 'index';

  var NAV_ORDER = {
    vera: ['index', 'bio', 'trio', 'concerts', 'pedagogy', 'contacts'],
    trio: ['index', 'recordings', 'concerts', 'contacts', 'vera']
  }[SITE];

  var T = {
    vera: {
      ru: {
        name: 'Вера Иофе',
        tagline: '',
        nav: {
          index: 'Главная',
          bio: 'Био',
          trio: 'Трио имени С. Н. Кнушевицкого',
          concerts: 'Концерты',
          pedagogy: 'Педагогика',
          contacts: 'Контакты'
        },
        footTitle: 'Вера Иофе',
        footLede: 'Пианистка, преподаватель кафедры камерного ансамбля и квартета Московской государственной консерватории им. П. И. Чайковского.',
        colNav: 'Разделы',
        colContact: 'Контакты',
        email: 'info@veraiofe.ru',
        place: '',
        rights: '© ' + new Date().getFullYear() + ' Вера Иофе. Все права защищены.'
      },
      en: {
        name: 'Vera Iofe',
        tagline: '',
        nav: {
          index: 'Home',
          bio: 'Biography',
          trio: 'Knushevitsky Trio',
          concerts: 'Concerts',
          pedagogy: 'Teaching',
          contacts: 'Contact'
        },
        footTitle: 'Vera Iofe',
        footLede: 'Pianist, professor of the Chamber Ensemble and Quartet Department at the Moscow Tchaikovsky Conservatory.',
        colNav: 'Sections',
        colContact: 'Contact',
        email: 'info@veraiofe.ru',
        place: '',
        rights: '© ' + new Date().getFullYear() + ' Vera Iofe. All rights reserved.'
      }
    },
    trio: {
      ru: {
        name: 'Фортепианное трио имени С. Н. Кнушевицкого',
        tagline: '',
        nav: {
          index: 'Главная',
          recordings: 'Записи',
          concerts: 'Концерты',
          contacts: 'Контакты',
          vera: '← Обратно к Вера Иофе'
        },
        footTitle: 'Трио имени С. Н. Кнушевицкого',
        footLede: 'Фортепианное трио, созданное на базе Московской государственной консерватории им. П. И. Чайковского.',
        colNav: 'Разделы',
        colContact: 'Контакты',
        email: 'info@veraiofe.ru',
        place: '',
        rights: '© ' + new Date().getFullYear() + ' Трио имени С. Н. Кнушевицкого. Все права защищены.'
      },
      en: {
        name: 'Knushevitsky Piano Trio',
        tagline: '',
        nav: {
          index: 'Home',
          recordings: 'Recordings',
          concerts: 'Concerts',
          contacts: 'Contact',
          vera: '← Back to Vera Iofe'
        },
        footTitle: 'Knushevitsky Piano Trio',
        footLede: 'A piano trio formed at the Moscow Conservatory.',
        colNav: 'Sections',
        colContact: 'Contact',
        email: 'info@veraiofe.ru',
        place: '',
        rights: '© ' + new Date().getFullYear() + ' Knushevitsky Piano Trio. All rights reserved.'
      }
    }
  };

  var t = T[SITE][LANG];

  function href(page, forOtherLang) {
    var lang = forOtherLang ? (LANG === 'en' ? 'ru' : 'en') : LANG;

    if (SITE === 'vera') {
      if (page === 'trio') return lang === 'en' ? 'https://knushevitsky.veraiofe.ru/en/index.html' : 'https://knushevitsky.veraiofe.ru/index.html';
      var veraBase = lang === 'en' ? '/en/' : '/';
      return veraBase + page + '.html';
    }

    // SITE === 'trio' — a genuinely separate domain/repo now, so the link
    // back to Vera's own site has to be a full cross-origin URL too.
    if (page === 'vera') return lang === 'en' ? 'https://veraiofe.ru/en/index.html' : 'https://veraiofe.ru/index.html';
    var trioBase = lang === 'en' ? 'en/' : '';
    return trioBase + page + '.html';
  }

  function navLinks(mobile) {
    return NAV_ORDER.map(function (p) {
      var active = p === PAGE ? ' is-active' : '';
      return '<a href="' + href(p) + '" class="' + (mobile ? '' : 'is-active-slot') + active + '">' + t.nav[p] + '</a>';
    }).join('');
  }

  var headerHTML =
    '<header class="site-header" id="siteHeader">' +
      '<a href="' + href('index') + '" class="brand' + (SITE === 'trio' ? ' is-long' : '') + '">' + t.name + (t.tagline ? '<small>' + t.tagline + '</small>' : '') + '</a>' +
      '<nav class="nav-desktop" aria-label="Главная навигация">' +
        navLinks(false) +
        '<div class="lang-switch">' +
          '<a href="' + href(PAGE, false) + '" class="' + (LANG === 'ru' ? 'is-active' : '') + '">RU</a>' +
          '<span>/</span>' +
          '<a href="' + href(PAGE, true) + '" class="' + (LANG === 'en' ? 'is-active' : '') + '">EN</a>' +
        '</div>' +
      '</nav>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Меню"><span></span></button>' +
    '</header>' +
    '<div class="nav-mobile" id="navMobile">' +
      navLinks(true) +
      '<div class="lang-switch" style="margin-top:1rem;font-size:0.9rem;">' +
        '<a href="' + href(PAGE, false) + '" class="' + (LANG === 'ru' ? 'is-active' : '') + '">RU</a>' +
        '<span>/</span>' +
        '<a href="' + href(PAGE, true) + '" class="' + (LANG === 'en' ? 'is-active' : '') + '">EN</a>' +
      '</div>' +
    '</div>';

  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-col">' +
            '<h4>' + t.footTitle + '</h4>' +
            '<p style="max-width:32ch;opacity:0.8;font-size:0.92rem;">' + t.footLede + '</p>' +
          '</div>' +
          '<div class="footer-col">' +
            '<span class="foot-label">' + t.colNav + '</span>' +
            navLinks(true) +
          '</div>' +
          '<div class="footer-col">' +
            '<span class="foot-label">' + t.colContact + '</span>' +
            '<a href="mailto:' + t.email + '">' + t.email + '</a>' +
            (t.place ? '<p style="white-space:pre-line;opacity:0.75;font-size:0.88rem;margin-top:0.6rem;">' + t.place + '</p>' : '') +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>' + t.rights + '</span>' +
        '</div>' +
      '</div>' +
    '</footer>';

  document.addEventListener('DOMContentLoaded', function () {
    var headerMount = document.getElementById('site-header');
    var footerMount = document.getElementById('site-footer');
    if (headerMount) headerMount.outerHTML = headerHTML;
    if (footerMount) footerMount.outerHTML = footerHTML;

    var header = document.getElementById('siteHeader');
    var toggle = document.getElementById('navToggle');
    var mobile = document.getElementById('navMobile');

    // The header can be transparent over the hero photo, but never while
    // the mobile menu is open or while the big hero name/role text is
    // tall enough to reach up behind it — a transparent bar over white
    // display type is unreadable either way.
    var menuOpen = false;
    var nameOverlap = false;
    function updateForceSolid() {
      header.classList.toggle('force-solid', menuOpen || nameOverlap);
    }

    var heroName = document.querySelector('.hero-content h1, .hero-content .hero-role');
    function checkNameOverlap() {
      if (!heroName) return;
      var h = header.getBoundingClientRect();
      var n = heroName.getBoundingClientRect();
      nameOverlap = n.top < h.bottom && n.bottom > h.top;
      updateForceSolid();
    }

    if (toggle && mobile) {
      toggle.addEventListener('click', function () {
        var open = toggle.classList.toggle('is-open');
        mobile.classList.toggle('is-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        menuOpen = open;
        updateForceSolid();
      });
      mobile.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          toggle.classList.remove('is-open');
          mobile.classList.remove('is-open');
          document.body.style.overflow = '';
          menuOpen = false;
          updateForceSolid();
        });
      });
    }

    if (header) {
      var hero = document.querySelector('.hero');
      var solidThreshold = function () {
        return hero ? Math.max(hero.offsetHeight - 140, 200) : 10;
      };
      var lastY = window.scrollY;
      window.addEventListener('scroll', function () {
        var y = window.scrollY;
        header.classList.toggle('is-scrolled', y > solidThreshold());
        if (y > lastY && y > 120) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
        lastY = y;
        checkNameOverlap();
      }, { passive: true });

      window.addEventListener('resize', checkNameOverlap);
      checkNameOverlap();
    }
  });
})();
