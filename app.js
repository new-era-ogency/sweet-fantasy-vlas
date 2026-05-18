(function () {
  'use strict';

  /**
   * @typedef {'EN' | 'BG' | 'UA'} LangCode
   */

  /** Prices in EUR (placeholder rates — adjust to match your printed menu). */
  const menuPricesEUR = Object.freeze({
    coffee: [2.9, 3.2, 4.6, 4.8, 5.0, 3.8, 5.4, 5.6, 5.2, 5.0],
    tea: [3.6, 3.6, 3.9, 4.2, 5.8, 5.5],
    bubble: [6.2, 6.5, 6.9, 6.8, 6.9, 7.2],
    lemonade: [4.9, 5.3, 5.5, 5.6, 5.2, 5.8],
    desserts: [15.9, 12.9, 7.9, 6.9, 5.9, 6.4, 7.5, 7.9, 8.2],
  });

  /** Simple PIN — change before launch (client-side only, not cryptographic security). */
  const GALLERY_ADMIN_PIN = '3333';
  /** Session flag so the PIN is not requested again until the browser tab closes. */
  const GALLERY_SESSION_KEY = 'sf_gallery_publish_ok';

  function sanitizeGalleryBasename(original) {
    var base = String(original || '').replace(/\.[^.]+$/, '').trim();
    base = base.replace(/\s+/g, '-').replace(/[^a-zA-Zа-яА-ЯІіЇїЄєҐґ0-9._\-]/g, '_');
    return base || 'photo';
  }

  const i18n = {
    EN: {
      langLabel: 'Language',
      navMenu: 'Menu',
      navGallery: 'Gallery',
      navAbout: 'About',
      navContacts: 'Contacts',
      heroKicker: 'Boutique café',
      heroTitle: 'Sweet Fantasy',
      heroLead:
        'Richard coffee, scented tea, bubble tea, and sunlit lemonades — with desserts that feel like home.',
      heroCtaMenu: 'Explore the menu',
      heroCtaContacts: 'Visit us',
      heroLocationLine: '41 Chaika Street · Sveti Vlas',
      heroHoursLine: 'Daily 9:00 – 22:00',
      heroFloatLine: 'Richard coffee · craft desserts',
      menuTitle: 'Our menu',
      menuIntro:
        'Craft drinks and pastries we genuinely love — for dine-in and takeaway only (no checkout on this page).',
      menuPriceLegend: 'All list prices in euros (EUR). Ask us for sizes, add-ons, and today’s specials.',
      menuPhotoCaption: 'Printed menu board — drop in or ask the barista for seasonal items.',
      menuBoardsTitle: 'Printed menu boards',
      galleryModalClose: 'Close',

      gallery: [
        { src: './images/chjcjcake.png', caption: 'Showcase cakes — layers, ganache, and seasonal slices.' },
        { src: './images/coolpic.png', caption: 'A calm table moment — espresso and sweets in soft café light.' },
        { src: './images/interier.png', caption: 'Our boutique space and chilled pastry display in Santorini blue.' },
        { src: './images/twjcupsofcoffe.png', caption: 'Two coffees, ready for the beach walk.' },
        { src: './images/twocackes.png', caption: 'Buttery viennoiserie rested on pastel linen.' },
        { src: './images/twocakes.png', caption: 'Cupcakes and details from the seaside table.' },
        { src: './images/Screenshot 2026-04-30 220450.png', caption: 'Hand-piped sweets — colourful macaron moments.' },
      ],

      menuImages: [
        { src: './images/menuCffes.png', caption: 'Coffee menu board — espresso, latte, cappuccino, and Raf.' },
        { src: './images/menuDrinks.png', caption: 'Drinks overview — lemonade, yoghurt series, iced tea.' },
        { src: './images/menuofdrinks.png', caption: 'More drinks — milkshakes, smoothies, iced matcha.' },
      ],

      secCoffee: 'Richard coffee',
      secTea: 'Richard tea',
      secBubble: 'Bubble tea',
      secLemonade: 'Signature lemonades',
      secDesserts: 'Desserts',
      capDrinks: 'Coffee rituals, softened light.',
      capCakes: 'A plate of sweetness for pausing.',
      aboutTitle: 'About us',
      aboutBody:
        'Sweet Fantasy began as a small wish for quieter cups and unhurried afternoons. Step inside—the room drapes itself in linen light, air hums softly, and on the ceiling, tiny bluebirds drift as though borrowed straight from summer sky.\n\nWe keep the hearth simple: precise Richard coffees and teas, playful bubble pearls, citrus lemonades, and pastries lifted from Zaharo counters alongside our homemade Napoleon layers, brownies, and cheesecakes. Sit awhile. Let the aroma fold around you.',
      contactsTitle: 'Contacts',
      contactsIntro:
        'Find us on Chaika street in Sveti Vlas — we are open seven days a week from light breakfast onward into the evening.',
      addrLabel: 'Address',
      address: '41 Chaika Street, Sveti Vlas 8256, Bulgaria',
      hoursLabel: 'Opening hours',
      hoursText: 'Daily 9:00 AM – 10:00 PM',
      phoneLabel: 'Phone',
      instagramLabel: 'Instagram',
      instagramCta: '@sweet_fantasy_sv_vlas',
      mapsLabel: 'Maps',
      mapsCta: 'Open in Google Maps',
      footerLine: '41 Chaika St., Sveti Vlas — coffee · desserts · instagram',
      footerMaps: 'Google Maps',
      footerInstagram: 'Instagram',
      orderCakeTitle: 'Order a Custom Cake',
      orderCakeIntro:
        'Planning a special day? Choose one of our signature desserts or order a custom cake. Fill out the form below, and we will get back to you to confirm details.',
      labelName: 'Your Name',
      labelPhone: 'Phone Number',
      labelCakeType: 'Select Cake / Dessert',
      labelQuantity: 'Quantity / Slices',
      labelDate: 'Preferred Pickup Date & Time',
      labelComment: 'Special Requests / Notes',
      btnOrderSubmit: 'Place Cake Order',
      orderSuccessMsg: '✨ Prototype Mode: Thank you! (This simulates a successful submission).',
      galleryTitle: 'Gallery',
      galleryIntro:
        'A soft grid of life at Sweet Fantasy — hover to peek, tap to savour full screen.',

      galleryLoading: 'Sharpening the prints…',
      galleryUnlockFailedMsg: 'That code does not match. Try again.',
      galleryAdminTitle: 'Publish gallery images',
      galleryAdminExplain:
        'This site is static: guests see photos that actually exist on your host. Unlock below to draft a manifest and map filenames.',
      galleryAdminPinLabel: 'Admin code',
      galleryAdminUnlock: 'Unlock',
      galleryAdminSteps:
        '1. Drop the originals into the `images/` folder on the server.\n2. Keep each filename identical to these entries.\n3. Save manifest as gallery-manifest.json next to index.html, then redeploy or refresh.',
      galleryAdminUploadLabel: 'Pick images → build manifest paths',
      galleryManifestTextareaLabel: 'gallery-manifest.json',
      galleryAdminDownload: 'Download JSON',
      galleryAdminCopy: 'Copy JSON',
      galleryAdminLogout: 'Lock session',
      galleryAdminCopied: 'JSON copied.',
      galleryAdminCopyFail: 'Could not reach the clipboard — select the text manually.',
      galleryAdminDownloaded: 'Download started.',
      galleryAdminReadyBanner: 'Rename your files exactly as listed, upload them to images/, deploy the manifest.',
      galleryAdminHashHint:
        'This panel stays hidden until visitors open `#gallery-admin` — for example Sweet Fantasy#gallery-admin (replace the PIN in app.js anytime).',
      menu: {
        coffee: [
          'Espresso',
          'Espresso macchiato',
          'Cappuccino',
          'Latte',
          'Flat white',
          'Americano',
          'Mocha',
          'Raf — classic or Madagascar vanilla',
          'Slow cold brew',
          'Iced latte',
        ],
        tea: [
          'Black tea — Assam, Earl Grey',
          'Green tea — jasmine ribbons, steamed sencha',
          'Herbal infusions — chamomile, peppermint, berry garden',
          'Fruit melange teas',
          'Stone-ground matcha latte',
          'London Fog',
        ],
        bubble: [
          'Classic milk tea with tapioca pearls',
          'Taro milk tea',
          'Brown sugar milk tea',
          'Fruit bubble tea with popping boba',
          'Yogurt / Yakult fresh series',
          'Cheese foam crowned tea',
        ],
        lemonade: [
          'Classic lemon & mint',
          'Strawberry & basil',
          'Passion fruit & citrus',
          'Lavender & lemon',
          'Ginger, honey & lime',
          "Seasonal chef's mix",
        ],
        desserts: [
          'Zaharo — éclair & choux selection',
          'Zaharo — mini cakes & petit fours',
          'Zaharo — signature cake slices (rotating daily)',
          'House Napoleon with vanilla cream',
          'Dark chocolate brownie',
          'Salted caramel brownie',
          'Classic vanilla cheesecake',
          'Berry ripple cheesecake',
          'Lemon & white chocolate cheesecake',
        ],
      },
    },
    BG: {
      langLabel: 'Език',
      navMenu: 'Меню',
      navGallery: 'Галерия',
      navAbout: 'За нас',
      navContacts: 'Контакти',
      heroKicker: 'Бутиково кафе',
      heroTitle: 'Sweet Fantasy',
      heroLead:
        'Кафе Richard, ароматен чай, bubble tea и лимонада с характер — с десерти, които ухаят като вкъщи.',
      heroCtaMenu: 'Вижте менюто',
      heroCtaContacts: 'Посетете ни',
      heroLocationLine: 'ул. Чайка 41 · Свети Влас',
      heroHoursLine: 'Всеки ден 9:00 – 22:00',
      heroFloatLine: 'Кафе Richard · изкушения Zaharo',
      menuTitle: 'Нашето меню',
      menuIntro:
        'Напитки и сладкиши, които обичаме истински — само за място и за вкъщи без онлайн поръчки на тази страница.',
      menuPriceLegend: 'Цените в листа са в евро (EUR). Питайте за обеми, добавки и днешните предложения.',
      menuPhotoCaption: 'Печатно меню — заповядайте на място или питайте за сезонни предложения.',
      menuBoardsTitle: 'Менюта в снимки',
      galleryModalClose: 'Затвори',

      gallery: [
        { src: './images/chjcjcake.png', caption: 'Изложени торти — слоеве, ганаш и сезонни резени.' },
        { src: './images/coolpic.png', caption: 'Тих момент около масата — еспресо и сладко в мека светлина.' },
        { src: './images/interier.png', caption: 'Интериор в небесносиньо и охладена витрина с десерти.' },
        { src: './images/twjcupsofcoffe.png', caption: 'Две кафета за път към плажа.' },
        { src: './images/twocackes.png', caption: 'Виенски сладки на пастелен плат.' },
        { src: './images/twocakes.png', caption: 'Къпкейкове и морски детайли от масата ни.' },
        { src: './images/Screenshot 2026-04-30 220450.png', caption: 'Ръчно украсени сладки — марички в редици.' },
      ],

      menuImages: [
        { src: './images/menuCffes.png', caption: 'Менюто на кафето — еспресо, лате, капучино и раф.' },
        { src: './images/menuDrinks.png', caption: 'Напитки — лимонади, студен чай и йогурт серии.' },
        { src: './images/menuofdrinks.png', caption: 'Допълнителни напитки — смутита, млека с плодове, леден матча.' },
      ],

      secCoffee: 'Кафе Richard',
      secTea: 'Чай Richard',
      secBubble: 'Bubble tea',
      secLemonade: 'Авторски лимонади',
      secDesserts: 'Десерти',
      capDrinks: 'Кафе ритуали в меката светлина.',
      capCakes: 'Сладка пауза за масата ви.',
      aboutTitle: 'За нас',
      aboutBody:
        'Sweet Fantasy започна като крехка мечта за по-леки чаши и следобед без бързане.\nВлезте вътрешно — помещението облича светлината в плат, въздухът тихо жужи, а по тавана сини птици се носят, сякаш откраднати от небе за лято.\n\nДържим всичко простичко: точни кафета и чай Richard, искрящи топчета bubble tea, цитрусови лимонади и сладки изкушения от пълната гама Zaharo до нашия домашен Наполеон, браунита и чийзкейкове.\nСеднете за миг. Задъхнете се. Това е вашата пауза.',
      contactsTitle: 'Контакти',
      contactsIntro:
        'При нас на ул. Чайка в Свети Влас — отваряме всеки ден от сутрешното кафе до вечерната сладка пауза.',
      addrLabel: 'Адрес',
      address: 'ул. Чайка 41, Свети Влас 8256, България',
      hoursLabel: 'Работно време',
      hoursText: 'Всеки ден 9:00 – 22:00',
      phoneLabel: 'Телефон',
      instagramLabel: 'Instagram',
      instagramCta: '@sweet_fantasy_sv_vlas',
      mapsLabel: 'Карта',
      mapsCta: 'Отвори в Google Maps',
      footerLine: 'ул. Чайка 41, Свети Влас — специално кафе · десерти',
      footerMaps: 'Google Maps',
      footerInstagram: 'Instagram',
      orderCakeTitle: 'Поръчка на торта',
      orderCakeIntro:
        'Планирате специален ден? Изберете един от нашите авторски десерти или поръчайте торта по ваш вкус. Попълнете формата по-долу и ще се свържем с вас.',
      labelName: 'Вашето име',
      labelPhone: 'Телефонен номер',
      labelCakeType: 'Изберете торта / десерт',
      labelQuantity: 'Количество / парчета',
      labelDate: 'Желани дата и час за вземане',
      labelComment: 'Специални изисквания / бележки',
      btnOrderSubmit: 'Направи поръчка',
      orderSuccessMsg: '✨ Прототип: Благодарим ви! (Това демонстрира успешно изпращане).',
      galleryTitle: 'Галерия',
      galleryIntro:
        'Мека мрежа от кадри — придвижете показалеца за увеличение, натиснете за цял екран.',

      galleryLoading: 'Проявяваме снимки…',
      galleryUnlockFailedMsg: 'Грешен код. Опитайте отново.',
      galleryAdminTitle: 'Публикуване на галерията',
      galleryAdminExplain:
        'Страницата е статична: гостите виждат файловете, качени изрично на сървъра ви. Отключете секцията, за да съберете име на файлове и JSON манифест.',
      galleryAdminPinLabel: 'Администраторски код',
      galleryAdminUnlock: 'Отключи',
      galleryAdminSteps:
        '1. Качете снимките в папка `images/`.\n2. Имената трябва да съвпадат с тези записи байт-до-байт.\n3. Запишете `gallery-manifest.json` до index.html и обновете сайта.',
      galleryAdminUploadLabel: 'Изберете файлове → генерирай пътища',
      galleryManifestTextareaLabel: 'gallery-manifest.json',
      galleryAdminDownload: 'Изтегли JSON',
      galleryAdminCopy: 'Копирай JSON',
      galleryAdminLogout: 'Заключи сесия',
      galleryAdminCopied: 'JSON е копиран.',
      galleryAdminCopyFail: 'Клипбордът е недостъпен — моля, маркирайте ръчно.',
      galleryAdminDownloaded: 'Изтеглянето започна.',
      galleryAdminReadyBanner: 'Преименувайте оригиналите точно като описаните имена ги качете под images/, после публикувайте манифеста.',
      galleryAdminHashHint:
        'Инструментите се показват само при `#gallery-admin` на адресната лента (сменете PIN константа в app.js навреме).',
      menu: {
        coffee: [
          'Еспресо',
          'Еспресо макиато',
          'Капучино',
          'Лате',
          'Флат уайт',
          'Американо',
          'Мока',
          'Раф — класически или с ванилия от Мадагаскар',
          'Студено кафе по бавен метод',
          'Ледено лате',
        ],
        tea: [
          'Черен чай — Асам, Ърл Грей',
          'Зелен чай — жасмин, парен сенча',
          'Билкови смеси — лайка, мента, горски плодове',
          'Плодови разновидности чай',
          'Мачa лате със смлян камък',
          'Лондонска мъгла',
        ],
        bubble: [
          'Класическо млечен чай с тапиока перли',
          'Таро млечен чай',
          'Млечен чай с кафява захар',
          'Плодов bubble tea с „пукнати“ топчета',
          'Серия с кисело мляко / Yakult',
          'Чай с капка сиренева пяна отгоре',
        ],
        lemonade: [
          'Класика лимон и мента',
          'Ягода и босилек',
          'Маракуя и цитрус',
          'Лавандула и лимон',
          'Джинджифил, мед и лайм',
          'Сезонна смес на готвача',
        ],
        desserts: [
          'Пълната гама Zaharo — еклери и шу плато',
          'Zaharo — мини торти и пти фур',
          'Zaharo — флагмански резани парчета торта (делник)',
          'Домашен Наполеон с богат ванилов крем',
          'Брауни с черен шоколад',
          'Брауни със солен карамел',
          'Класически чийзкейк с ванилия',
          'Чийзкейк с горски плодов мармор',
          'Чийзкейк лимон и бял шоколад',
        ],
      },
    },
    UA: {
      langLabel: 'Мова',
      navMenu: 'Меню',
      navGallery: 'Галерея',
      navAbout: 'Про нас',
      navContacts: 'Контакти',
      heroKicker: 'Бутикова кав’ярня',
      heroTitle: 'Sweet Fantasy',
      heroLead:
        'Кава Richard, ароматний чай, bubble tea й сонячні лимонади — і десерти з домашнім серцем.',
      heroCtaMenu: 'До меню',
      heroCtaContacts: 'Завітайте',
      heroLocationLine: 'вул. Чайка 41 · Святий Влас',
      heroHoursLine: 'Щодня 9:00 – 22:00',
      heroFloatLine: 'Кава Richard · десерти Zaharo',
      menuTitle: 'Наше меню',
      menuIntro:
        'Напої й випічка, які любимо самі — лише заклад і з собою, без замовлення на цій сторінці.',
      menuPriceLegend: 'Усі ціни в списку в євро (EUR). Уточнюйте об’єми, додатки та сьогоднішні спеціальні пропозиції.',
      menuPhotoCaption: 'Друковане меню — завітайте або запитайте бариста про сезонні позиції.',
      menuBoardsTitle: 'Фото меню на стіндах',
      galleryModalClose: 'Закрити',

      gallery: [
        { src: './images/chjcjcake.png', caption: 'Торти у вітрині — шари, ганаш і сезонні шматочки.' },
        { src: './images/coolpic.png', caption: 'Спокійна мить біля столу — еспресо й десерт у рівному світлі.' },
        { src: './images/interier.png', caption: 'Інтер’єр бутику та холодна вітрина в м’якому блакитному відтінку.' },
        { src: './images/twjcupsofcoffe.png', caption: 'Дві кави з собою — до променаду біля моря.' },
        { src: './images/twocackes.png', caption: 'Віденські здоби на пастельній скатертині.' },
        { src: './images/twocakes.png', caption: 'Капкейки та деталі столу у морському настрої.' },
        { src: './images/Screenshot 2026-04-30 220450.png', caption: 'Печиво й мигдалеві смаколики — палітра смаків.' },
      ],

      menuImages: [
        { src: './images/menuCffes.png', caption: 'Меню кави на дошці — еспресо, лате, капучіно й раф.' },
        { src: './images/menuDrinks.png', caption: 'Лінійка напоїв — лимонади, холодний чай, серія з йогуртом.' },
        { src: './images/menuofdrinks.png', caption: 'Ще напої — смузі, молочні коктейлі, льодяний матча.' },
      ],

      secCoffee: 'Кава Richard',
      secTea: 'Чай Richard',
      secBubble: 'Bubble tea',
      secLemonade: 'Авторські лимонади',
      secDesserts: 'Десерти',
      capDrinks: 'Кавові ритуали в м’якому світлі.',
      capCakes: 'Солодка перерва для вашого столу.',
      aboutTitle: 'Про нас',
      aboutBody:
        'Sweet Fantasy народилася з тихого бажання — спокійніших чашок і післяобідів без поспіху.\nЗайдіть всередину: зал огортає полотняне світло, повітря ледь дзижчить, а на стелі блакитні птахи ніби пливуть, ніби їх позичили з літнього неба.\n\nТримаємо все просто: ретельна кава й чай Richard, грайливі бульбашки bubble tea, цитрусові лимонади та солодощі — повна лінійка Zaharo, наш домашній Наполеон, брауні й чізкейки.\nПотримайте зупинку. Вдихніть. Це ваша мить.',
      contactsTitle: 'Контакти',
      contactsIntro:
        'Приходьте до нас на вул. Чайка у Святий Влас — щодня з ранішньої кави й до солодкого завершення вечора.',
      addrLabel: 'Адреса',
      address: 'вул. Чайка 41, Святий Влас 8256, Болгарія',
      hoursLabel: 'Години роботи',
      hoursText: 'Щодня 9:00 – 22:00',
      phoneLabel: 'Телефон',
      instagramLabel: 'Instagram',
      instagramCta: '@sweet_fantasy_sv_vlas',
      mapsLabel: 'Карта',
      mapsCta: 'Відкрити в Google Maps',
      footerLine: 'вул. Чайка 41, Святий Влас — кава · десерти',
      footerMaps: 'Google Maps',
      footerInstagram: 'Instagram',
      orderCakeTitle: 'Замовлення індивідуального торта',
      orderCakeIntro:
        'Плануєте особливе свято? Виберіть один із наших фірмових десертів або замовте торт за власним дизайном. Заповніть форму нижче, і ми зв’яжемося з вами.',
      labelName: 'Ваше ім’я',
      labelPhone: 'Номер телефону',
      labelCakeType: 'Оберіть торт / десерт',
      labelQuantity: 'Кількість / шматочки',
      labelDate: 'Бажана дата та час отримання',
      labelComment: 'Особливі побажання / нотатки',
      btnOrderSubmit: 'Замовити торт',
      orderSuccessMsg: '✨ Режим прототипу: Дякуємо! (Емуляція успішного надсилання заявки).',
      galleryTitle: 'Галерея',
      galleryIntro:
        'Сітка знімків Sweet Fantasy — наведіть курсор, щоб підсвітити; клік — на весь екран.',

      galleryLoading: 'Проявляємо кадри…',
      galleryUnlockFailedMsg: 'Невірний код. Спробуйте ще раз.',
      galleryAdminTitle: 'Публікація фото галереї',
      galleryAdminExplain:
        'Це статичний сайт: гості бачать зображення, які ви реально читаєте з сервера. Нижче — генератор файлу опису без бекенду.',
      galleryAdminPinLabel: 'Код адміністратора',
      galleryAdminUnlock: 'Відчинити',
      galleryAdminSteps:
        '1. Завантажте зображення в каталог images/.\n2. Назви зберігайте тотожними записам нижче.\n3. Збережіть gallery-manifest.json поруч із index.html і оновіть сайт.',
      galleryAdminUploadLabel: 'Обрати фото → зібрати манифест',
      galleryManifestTextareaLabel: 'gallery-manifest.json',
      galleryAdminDownload: 'Завантажити JSON',
      galleryAdminCopy: 'Скопіювати JSON',
      galleryAdminLogout: 'Закрити сесію',
      galleryAdminCopied: 'JSON скопійовано.',
      galleryAdminCopyFail: 'Немає доступу до буфера — виділіть текст вручну.',
      galleryAdminDownloaded: 'Завантаження розпочато.',
      galleryAdminReadyBanner: 'Збережіть файли точно під вказані імена в images/, додайте маніфест і синхронізуйте сайт.',
      galleryAdminHashHint:
        'Панель побачите лише з хешем #gallery-admin (PIN змінюйте в app.js перед відкриттям доступу волонтеру).',
      menu: {
        coffee: [
          'Еспресо',
          'Еспресо макіато',
          'Капучино',
          'Лате',
          'Флет вайт',
          'Американо',
          'Мокко',
          'Раф — класичний або з ваніллю з Мадагаскару',
          'Холодна варка cold brew',
          'Льодяне лате',
        ],
        tea: [
          'Чорний чай — Ассам, Ерл Грей',
          'Зелений чай — жасмин, парений сенча',
          'Трав’яні настої — ромашка, м’ята, ягідні збори',
          'Фруктові меланжі чаю',
          'Матча-лате на кам’яному жорні',
          'Лондонський туман',
        ],
        bubble: [
          'Класичне молочне чаювання з тапіокою',
          'Таро-молочний чай',
          'Молочний чай із карамеллю',
          'Фруктовий bubble tea з «лопаючою» бобою',
          'Серія з йогуртом / Yakult',
          'Чай із сирною пінкою зверху',
        ],
        lemonade: [
          'Класика: лимон і м’ята',
          'Полуниця і базилік',
          'Маракуйя і цитрус',
          'Лаванда і лимон',
          'Імбир, мед і лайм',
          'Сезонний мікс шефа',
        ],
        desserts: [
          'Повна лінійка Zaharo — еклери й шу',
          'Zaharo — міні-торти й петі-фур',
          'Zaharo — фірмові шматочки тортів (щодня)',
          'Домашній Наполеон із ванільним кремом',
          'Брауні з чорного шоколаду',
          'Брауні з солоною карамеллю',
          'Класичний ванільний чізкейк',
          'Чізкейк з ягідним мармуром',
          'Чізкейк лимон і білий шоколад',
        ],
      },
    },
  };

  /** @type {readonly LangCode[]} */
  const LANGUAGES = Object.freeze(['EN', 'BG', 'UA']);

  function docLang(code) {
    return { EN: 'en', BG: 'bg', UA: 'uk' }[code] || 'en';
  }

  function sweetFantasy() {
    return {
      lang: 'EN',
      languages: LANGUAGES,
      i18n: i18n,

      galleryModalOpen: false,
      galleryModalSrc: '',
      galleryModalCaption: '',

      galleryAdminPin: '',
      galleryUnlockFailed: false,
      galleryAdminAuthenticated: false,
      galleryManifestDraft: '',
      galleryAdminBanner: '',
      hashRouterTick: 0,

      showPrototypeSuccess: false,

      init() {
        var self = this;
        document.documentElement.setAttribute('lang', docLang(this.lang));

        window.addEventListener('hashchange', function () {
          self.hashRouterTick++;
          self.maybeScrollGalleryAdminAnchor();
        });

        try {
          if (sessionStorage.getItem(GALLERY_SESSION_KEY) === '1') this.galleryAdminAuthenticated = true;
        } catch (_) {}

        queueMicrotask(function () {
          self.maybeScrollGalleryAdminAnchor();
        });

        queueMicrotask(function () {
          if (typeof window.__sfRevealRefresh === 'function') window.__sfRevealRefresh();
        });
      },


      maybeScrollGalleryAdminAnchor() {
        if (typeof window === 'undefined' || window.location.hash !== '#gallery-admin') return;
        var el = document.getElementById('gallery-admin');
        if (!el) return;
        var header = document.querySelector('header');
        var offsetPx = header ? -(header.offsetHeight + 16) : -100;
        queueMicrotask(function () {
          var L = window.__sfLenis;
          if (L && typeof L.scrollTo === 'function') {
            try {
              L.scrollTo(el, { offset: offsetPx });
            } catch (_) {
              el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            return;
          }
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      },

      localeGalleryPhotos() {
        var pack = i18n[this.lang] || i18n.EN;
        var g = pack.gallery;
        return Array.isArray(g) && g.length ? g : i18n.EN.gallery;
      },

      localeMenuImages() {
        var pack = i18n[this.lang] || i18n.EN;
        var m = pack.menuImages;
        return Array.isArray(m) && m.length ? m : i18n.EN.menuImages;
      },

      openGalleryModal(item) {
        if (!item || !item.src) return;
        this.galleryModalSrc = item.src;
        this.galleryModalCaption = typeof item.caption === 'string' ? item.caption : '';
        this.galleryModalOpen = true;
        try {
          document.body.style.overflow = 'hidden';
        } catch (_) {}
      },

      closeGalleryModal() {
        this.galleryModalOpen = false;
        this.galleryModalSrc = '';
        this.galleryModalCaption = '';
        try {
          document.body.style.overflow = '';
        } catch (_) {}
      },

      galleryAdminPanelVisible() {
        var tick = this.hashRouterTick;
        void tick;
        return typeof window !== 'undefined' && window.location.hash === '#gallery-admin';
      },

      galleryAdminUnlock() {
        var pin = (this.galleryAdminPin || '').trim();
        this.galleryUnlockFailed = false;
        if (pin !== String(GALLERY_ADMIN_PIN)) {
          this.galleryUnlockFailed = true;
          return;
        }
        this.galleryAdminAuthenticated = true;
        try {
          sessionStorage.setItem(GALLERY_SESSION_KEY, '1');
        } catch (_) {}
      },

      galleryAdminLogout() {
        this.galleryAdminAuthenticated = false;
        this.galleryAdminPin = '';
        this.galleryUnlockFailed = false;
        this.galleryManifestDraft = '';
        this.galleryAdminBanner = '';
        try {
          sessionStorage.removeItem(GALLERY_SESSION_KEY);
        } catch (_) {}
      },

      galleryAdminOnFilesSelected(ev) {
        var input = ev.target;
        var files = input && input.files;
        this.galleryAdminBanner = '';
        if (!files || !files.length) return;
        var items = [];
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          if (!f.type || f.type.indexOf('image') !== 0) continue;
          var extMatch = f.name.match(/(\.[^.\\/]+)$/);
          var ext = extMatch ? extMatch[1].toLowerCase() : '.jpg';
          if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp' && ext !== '.gif') ext = '.jpg';
          var base = sanitizeGalleryBasename(f.name);
          var fname = base + ext;
          var lbl = base.replace(/[-_.]+/g, ' ').trim();
          items.push({
            src: 'images/' + fname,
            caption: { EN: lbl, BG: lbl, UA: lbl },
          });
        }
        if (!items.length) return;
        this.galleryManifestDraft = JSON.stringify({ items: items }, null, 2);
        this.galleryAdminBanner = this.t('galleryAdminReadyBanner');
        if (input) input.value = '';
      },

      galleryAdminDownloadManifest() {
        if (!this.galleryManifestDraft) return;
        try {
          var blob = new Blob([this.galleryManifestDraft], { type: 'application/json;charset=utf-8' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'gallery-manifest.json';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          this.galleryAdminBanner = this.t('galleryAdminDownloaded');
        } catch (_) {}
      },

      galleryAdminCopyManifest() {
        var self = this;
        var text = this.galleryManifestDraft;
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(text)
            .then(function () {
              self.galleryAdminBanner = self.t('galleryAdminCopied');
            })
            .catch(function () {
              self.galleryAdminBanner = self.t('galleryAdminCopyFail');
            });
        } else {
          this.galleryAdminBanner = this.t('galleryAdminCopyFail');
        }
      },

      setLang(code) {
        if (!LANGUAGES.includes(code)) return;
        this.lang = code;
        document.documentElement.setAttribute('lang', docLang(code));
      },
      /** @param {string} key */
      t(key) {
        var pack = i18n[this.lang] || i18n.EN;
        var resolved = pack[key];
        if (typeof resolved === 'string' || typeof resolved === 'number') return String(resolved);
        var fb = i18n.EN[key];
        if (typeof fb === 'string' || typeof fb === 'number') return String(fb);
        return key;
      },
      /** @param {keyof typeof i18n.EN.menu} section @param {number} index */
      m(section, index) {
        var pack = i18n[this.lang] || i18n.EN;
        var bucket = pack.menu && pack.menu[section];
        var primary = bucket && bucket[index];
        if (primary) return primary;
        var fallback = i18n.EN.menu[section];
        return (fallback && fallback[index]) || '';
      },
      /** @param {keyof typeof menuPricesEUR} section @param {number} index */
      eur(section, index) {
        var row = menuPricesEUR[section];
        var n = row && row[index];
        if (n === undefined || n === null) return '';
        return '€' + Number(n).toFixed(2);
      },
    };
  }

  var sfRevealObserver = null;

  function sfBindScrollReveal() {
    var mqR =
      typeof window.matchMedia !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    if (mqR && mqR.matches) {
      document.querySelectorAll('[data-reveal]').forEach(function (el) {
        el.classList.add('reveal-visible');
      });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(function (el) {
        el.classList.add('reveal-visible');
      });
      return;
    }
    if (!sfRevealObserver) {
      sfRevealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            sfRevealObserver.unobserve(el);
            var dRaw = parseFloat(String(el.getAttribute('data-reveal-delay') || '0'));
            var dly = !isFinite(dRaw) || isNaN(dRaw) ? 0 : dRaw;
            el.style.setProperty('--sf-reveal-delay', dly + 'ms');
            window.requestAnimationFrame(function () {
              el.classList.add('reveal-visible');
            });
          });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
      );
    }
    document.querySelectorAll('[data-reveal]:not(.reveal-visible)').forEach(function (el) {
      sfRevealObserver.observe(el);
    });
  }

  window.__sfRevealRefresh = sfBindScrollReveal;

  function sfScheduleRevealRefresh() {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(sfBindScrollReveal);
    });
  }

  function initSfSmoothScroll() {
    document.documentElement.style.scrollPaddingTop = '5.75rem';
    var mq =
      typeof window.matchMedia !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    if (mq && mq.matches) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    var Ctor = typeof window !== 'undefined' && window.Lenis ? window.Lenis : null;

    var lenis;
    try {
      lenis = Ctor
        ? new Ctor({
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.75,
          })
        : null;
    } catch (_) {
      lenis = null;
    }
    if (!lenis) {
      try {
        lenis = Ctor ? new Ctor() : null;
      } catch (_) {
        lenis = null;
      }
    }

    if (!lenis || typeof lenis.raf !== 'function' || typeof lenis.scrollTo !== 'function') {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    document.documentElement.classList.add('lenis-ready');
    window.__sfLenis = lenis;

    window.requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    });

    window.addEventListener('resize', function () {
      try {
        lenis.resize();
      } catch (_) {}
    });

    function headerScrollOffsetPx() {
      var headerEl = document.querySelector('header');
      return headerEl ? -(headerEl.offsetHeight + 16) : -100;
    }

    document.addEventListener(
      'click',
      function (ev) {
        var a = ev.target && ev.target.closest && ev.target.closest('a[href^="#"]');
        if (!a) return;
        var href = a.getAttribute('href');
        if (!href || href === '#') return;
        var target = href.length > 1 ? document.querySelector(href) : null;
        if (href !== '#top' && target == null) return;
        ev.preventDefault();
        if (href === '#top') {
          try {
            lenis.scrollTo(0);
          } catch (_) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          return;
        }
        try {
          lenis.scrollTo(target, { offset: headerScrollOffsetPx() });
        } catch (_) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      true
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSfSmoothScroll();
    sfScheduleRevealRefresh();
  });
  window.addEventListener('load', sfScheduleRevealRefresh);

  window.i18n = i18n;
  window.sweetFantasy = sweetFantasy;
})();
