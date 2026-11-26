// Accordion for the Experience section: all jobs closed by default, toggled by clicking the h2  
document.querySelectorAll('.experience .job').forEach(function (job, i) {
    var title = job.querySelector('h2');
    var parts = job.querySelectorAll('.desc, ul');
    if (!title || !parts.length) return;
 
    var body = document.createElement('div');
    var inner = document.createElement('div');
    body.className = 'job-body';
    inner.className = 'job-inner';
    body.id = 'job-body-' + i;
    body.appendChild(inner);
    parts[0].parentNode.insertBefore(body, parts[0]);
    parts.forEach(function (el) { inner.appendChild(el); });
 
    title.setAttribute('role', 'button');
    title.setAttribute('tabindex', '0');
    // first job (Technical Writer) is open by default, the rest are closed
    if (i === 0) job.classList.add('open');
    title.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
    title.setAttribute('aria-controls', body.id);
 
    function toggle() {
      var open = job.classList.toggle('open');
      title.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    title.addEventListener('click', toggle);
    title.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // Modal windows for Selected Works: open on thumbnail click, close via X, Esc or click outside
  document.querySelectorAll('[data-modal]').forEach(function (thumb) {
    var dlg = document.getElementById(thumb.dataset.modal);
    if (!dlg) return;
    thumb.addEventListener('click', function () {
      dlg.showModal();
      document.body.classList.add('modal-open');
      dlg.querySelector('.modal-body').scrollTop = 0;
    });
    dlg.querySelector('.modal-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { document.body.classList.remove('modal-open'); });
  });

  // Language switcher (EN default, RU on demand). English text is read from the page itself;
  // Russian strings live in the RU dictionary below. Selected Works content is intentionally not translated.
  (function () {
    var RU = {
      brand: 'Анастасия Куляшова<br>Технический писатель',
      nav_cv: 'Резюме', nav_works: 'Примеры работ', nav_contacts: 'Контакты',
      hero: 'Живу в Португалии, работаю удаленно.<br><br>Технический писатель в финтех с 13-летним опытом перевода RU-EN. Описываю сложные концепции и продукты в понятных руководствах и инструкциях.',
      experience: 'Опыт работы', skills: 'Навыки', languages: 'Языки', works: 'Примеры',
      skills_list: ['Создание пользовательской документации и руководств','Docs-as-code','Подготовка инструкций','Сбор и структурирование технической информации','DITA','Анализ данных','Работа с AI','Confluence','Редактирование и актуализация контента','HTML, CSS, Markdown, Git/GitHub','Перевод и локализация'],
      langs_list: ['Русский: родной','Английский: C1','Испанский: B1','Португальский: A2'],
      p1: 'Удалённо. Октябрь 2025 – настоящее время',
      p2: 'Екатеринбург. 2019 – 2021',
      p3: 'Екатеринбург. 2015 – 2019',
      p4: '2013 – настоящее время',
      p5: 'Екатеринбург. 2013 – 2014',
      j1_t: 'Технический писатель', j1_c: 'Tools for Brokers',
      j1_d: 'Компания создает технологии для брокеров, хедж-фондов и проп-трейдинговых фирм.',
      j1_l: ['Писала и переводила документацию по установке программ и руководства пользователя;',
             'Собирала и систематизировала данные для руководств пользователя;',
             'Использовала AI-инструменты для создания, проверки и оптимизации технической документации;',
             'Обновляла документацию в соответствии с новыми рекомендациями по продукту;',
             'Обновляла и поддерживала внутреннюю базу знаний в Confluence.'],
      j2_t: 'Менеджер проектов интернет-маркетинга', j2_c: 'Медиахолдинг АБАК-Пресс',
      j2_d: 'Мой отдел разрабатывал сайты для других компаний.',
      j2_l: ['Координировала работу между аккаунт-менеджерами, графическими дизайнерами и фронтенд-разработчиками из разных городов;',
             'Проверяла сайты на соответствие ТЗ;',
             'Контролировала сроки исполнения работ.'],
      j3_t: 'Ведущий контент-менеджер', j3_c: 'ТД Сималенд',
      j3_d: 'Международная оптовая компания с офисами в России и Китае.',
      j3_l: ['Вела карточки товара: согласовывала фотографии, проверяла наличие характеристик, заполняла фильтры;',
             'Писала и верстала новости о товарах на сайте компании;',
             'Составляла ТЗ для отделов SMM и email-рассылок, фотографов, видеооператоров и дизайнеров;',
             'Организовывала выездные сезонные фотосессии;',
             'Обучила 15 новых сотрудников;',
             'Получила базовые знания 1С-Торговля.'],
      j4_t: 'Переводчик-фрилансер', j4_c: 'Фриланс (RU-EN; EN-RU)',
      j4_l: ['Переводила научно-экономические статьи для сотрудников Института экономики УрО РАН и УрФУ;',
             'Осуществляла устный последовательный перевод на международных выставках и конференциях: международный фестиваль-практикум киношкол «Кинопроба», международная выставка собак, саммит итальянских и испанских вин, Южно-Американский форум торгово-промышленной палаты, международный фестиваль клоунов, конференция по экономике EBES.'],
      j5_t: 'Переводчик на английский язык', j5_c: 'ЮэЛСи.ком',
      j5_d: 'Стартап, продвигавший туризм и русскую культуру среди иностранцев.',
      j5_l: ['Писала информационно-развлекательные статьи о России, публиковала материалы на сайте;',
             'Редактировала переводы других сотрудников;',
             'Собирала и переводила информацию для печатного гида-путеводителя и событийного календаря по Екатеринбургу и Свердловской области на русском и английском языках;',
             'Работала с контрагентами, контролировала своевременное исполнение задач.'],
      more: 'Все работы в PDF',
             email: 'Написать мне'
    };
    var EN_TITLE = document.title, RU_TITLE = 'Анастасия Куляшова. Технический писатель';
 
    function apply(lang) {
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        if (!('en' in el.dataset)) el.dataset.en = el.innerHTML;   // cache English once
        var v = RU[el.dataset.i18n];
        if (lang === 'ru' && v != null) {
          el.innerHTML = Array.isArray(v) ? v.map(function (x) { return '<li>' + x + '</li>'; }).join('') : v;
        } else {
          el.innerHTML = el.dataset.en;
        }
      });
      document.querySelectorAll('[data-lang-only]').forEach(function (el) { el.hidden = el.dataset.langOnly !== lang; });
      document.querySelectorAll('.lang a').forEach(function (a) { a.classList.toggle('active', a.dataset.lang === lang); });
      document.documentElement.lang = lang;
      document.title = lang === 'ru' ? RU_TITLE : EN_TITLE;
    }
 
    // Language in the URL: ?lang=ru or ?lang=en (the #anchor is preserved)

     var langLinks = document.querySelectorAll('.lang a');

    function getUrlLang() {
      var lang = new URLSearchParams(location.search).get('lang');
      return lang === 'ru' || lang === 'en' ? lang : null;
    }

    function urlFor(lang) {
      var url = new URL(location.href);
      url.searchParams.set('lang', lang);
      return url.href;
    }

    function save(lang) {
      try { localStorage.setItem('lang', lang); } catch (err) {}
    }

    // keep real addresses on the links, so "open in new tab" and "copy link" work
    function updateLinks() {
      langLinks.forEach(function (a) { a.href = urlFor(a.dataset.lang); });
    }

    langLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // let the browser handle it
        e.preventDefault();
        var lang = a.dataset.lang;
        if (lang !== document.documentElement.lang) {
          history.pushState(null, '', urlFor(lang));
          apply(lang);
          updateLinks();
        }
        save(lang);
      });
    });

    // Back / Forward buttons
    window.addEventListener('popstate', function () {
      var lang = getUrlLang() || 'en';
      if (lang !== document.documentElement.lang) {
        apply(lang);
        save(lang);
      }
      updateLinks();
    });

    window.addEventListener('hashchange', updateLinks);

    // On page load: URL first, then the saved choice, then English
    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch (err) {}
    var fromUrl = getUrlLang();
    var initial = fromUrl || (saved === 'ru' ? 'ru' : 'en');

    if (initial === 'ru') apply('ru');
    if (fromUrl) save(fromUrl);
    else if (initial === 'ru') history.replaceState(null, '', urlFor('ru'));
    updateLinks();
  })();
