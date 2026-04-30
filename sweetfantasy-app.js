/** Sweet Fantasy — Alpine data, i18n, tab menus, carousel */
function sweetFantasy() {
  return {
    cakeModalOpen: false,
    menuTab: "drinks",
    carouselIndex: 0,
    cakeForm: { name: "", email: "", phone: "", pickupDate: "", servings: "", notes: "" },
    phoneTel: "+359888123456",
    phoneDisplay: "+359 888 123 456",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sweet%20Fantasy%20Sveti%20Vlas%20Bulgaria",
    contactEmail: "hello@sweetfantasy.sv",
    openCake() {
      this.cakeModalOpen = true;
    },
    closeCake() {
      this.cakeModalOpen = false;
      this.cakeForm = { name: "", email: "", phone: "", pickupDate: "", servings: "", notes: "" };
    },
    setMenuTab(tab) {
      this.menuTab = tab;
    },
    submitCakeOrder(e) {
      e.preventDefault();
      const f = this.cakeForm;
      const lines = [
        this.t.cakeModal.mailIntro,
        "",
        this.t.cakeModal.labelName + ": " + (f.name || "—"),
        this.t.cakeModal.labelEmail + ": " + (f.email || "—"),
        this.t.cakeModal.labelPhone + ": " + (f.phone || "—"),
        this.t.cakeModal.labelDate + ": " + (f.pickupDate || "—"),
        this.t.cakeModal.labelServings + ": " + (f.servings || "—"),
        this.t.cakeModal.labelNotes + ": " + (f.notes || "—"),
      ];
      window.location.href =
        "mailto:" +
        this.contactEmail +
        "?subject=" +
        encodeURIComponent(this.t.cakeModal.mailSubject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      this.closeCake();
    },
    menuDrinks() {
      const b = this._menuBundles()[this.lang] || this._menuBundles().EN;
      return b.drinks;
    },
    menuCakes() {
      const b = this._menuBundles()[this.lang] || this._menuBundles().EN;
      return b.cakes;
    },
    menuPastriesTab() {
      const b = this._menuBundles()[this.lang] || this._menuBundles().EN;
      return b.pastries;
    },
    pastryCarouselSlides() {
      const L = this.lang;
      const slides = {
        EN: [
          { key: "zaharo", title: "Fresh Zaharo desserts", caption: "Arrivals crafted for the vitrine daily." },
          { key: "garash", title: "Garash Cake", caption: "Walnut sponge, silky ganache, timeless finish." },
          { key: "dubai", title: "Pistachio Dubai cake", caption: "Kunafa crunch, pistachio cream, sea‑salted honey." },
          { key: "custom", title: "Custom birthdays", caption: "Layers sized to candlelight dinners on the promenade." },
        ],
        BG: [
          { key: "zaharo", title: "Свежи Zaharo изкушения", caption: "Палитри за щандовата витрина всеки ден." },
          { key: "garash", title: "Торта Гараш", caption: "Орехов блат, мек ганаж, класика за подноса." },
          { key: "dubai", title: "„Дубай“ торта фисташ", caption: "Кадаиф, арабски аромати, фино подсоляван мед." },
          { key: "custom", title: "Рожденни поръчки", caption: "Подходящи за вечери със свещи над марината." },
        ],
        UA: [
          { key: "zaharo", title: "Свіжий Zaharo", caption: "Щотижнева палітра для нашої шоукейси." },
          { key: "garash", title: "Гараш", caption: "Горіх, темний шоколад, гланц без зайвого блиску." },
          { key: "dubai", title: "Фісташковий Dubai", caption: "Хрускіт кадаїфу, крем із фісташки, медова сіль." },
          { key: "custom", title: "Індивідуальні свята", caption: "Нарядні яруси для вечері біля марини." },
        ],
      };
      return slides[L] || slides.EN;
    },
    carouselNext() {
      const s = this.pastryCarouselSlides();
      this.carouselIndex = (this.carouselIndex + 1) % s.length;
    },
    carouselPrev() {
      const s = this.pastryCarouselSlides();
      this.carouselIndex = (this.carouselIndex - 1 + s.length) % s.length;
    },
    _menuBundles() {
      const item = (slug, title, detail) => ({ slug, title, detail });
      return {
        EN: {
          drinks: [
            item("richard", "Café Richard", "Espresso‑forward house program — cappuccinos, flat whites · pulled long on our bar."),
            item("shake-straw", "Strawberry Milkshake", "Seasonal berry compote layered over vanilla gelato swirl."),
            item("shake-caramel", "Caramel Milkshake", "Salted bourbon caramel ribbons folded into thick dairy."),
            item("lem", "Fresh Lemonades", "Hand‑pressed citrus, crushed ice · rotating melon & blackberry infusions."),
          ],
          cakes: [
            item("garash", "Garash Cake", "Chocolate walnut sponge, tempered ganache, mirror‑light finish."),
            item("dubai", "Pistachio Dubai Cake", "Golden kunafa crumble, silky pistachio crémeux, clarified honey drizzle."),
            item("birth", "Custom Birthday Cakes", "Celebrate dockside · tiers, palettes, handwritten chocolate plaques."),
          ],
          pastries: [
            item("zaharo-tray", "Zaharo morning tray", "Flaky turnovers, viennoiserie & honey laminations air‑freighted fresh."),
            item("layers", "Layered Zaharo pastries", "Raspberry custard slices, hazelnut dacquoise, restrained sweetness."),
            item("coffee-pair", "Counter pairings", "Designed to match Café Richard service — viennoiserie until close."),
          ],
        },
        BG: {
          drinks: [
            item("richard", "Café Richard", "Домашен еспресо блок — капучино, lat art, дълги шотове."),
            item("shake-straw", "Ягодов млекшейк", "Свежа ягода, сметанена основа."),
            item("shake-caramel", "Карамелов млекшейк", "Солен карамел и гъста сметана."),
            item("lem", "Свежи лимонади", "Ръчен цитрус, лёд · сезонен пъпеш и малина."),
          ],
          cakes: [
            item("garash", "Торта Гараш", "Орехова основа и гланцов ганаж."),
            item("dubai", "„Дubai“ торта лешник/фъстък", "Хрупкава кадаифна коричка и фъстъчен крем."),
            item("birth", "Години и юбилей", "Персонализирани етажи за рождени дни."),
          ],
          pastries: [
            item("zaharo-tray", "Zaharo сутрешен щанд", "Хрупкава випека и медени пластове."),
            item("layers", "Подредени Zaharo пайове", "Минималистични мусови нотки."),
            item("coffee-pair", "Петифури към Café Richard", "Идеално за следобеден еспресо."),
          ],
        },
        UA: {
          drinks: [
            item("richard", "Café Richard", "Домашня кава: еспресо, капучино, екстракт із зерен Richard."),
            item("shake-straw", "Полуничний мілкшейк", "Ягідне пюре й густа текстура."),
            item("shake-caramel", "Карамельний мілкшейк", "З бурбон-солоною лінійкою."),
            item("lem", "Свіжі лимонади", "Ручний цитрус, лід, сезонні ягоди."),
          ],
          cakes: [
            item("garash", "Торт Гараш", "Горіх, темний шоколад."),
            item("dubai", "Фісташковий Dubai cake", "Кадаїфний хрускіт і фісташковий вершковий центр."),
            item("birth", "Індивідуальні дні народження", "Яруси з декором під ваш променад."),
          ],
          pastries: [
            item("zaharo-tray", "Тарілка Zaharo зранку", "Круасани, mille‑feuille, медові шари."),
            item("layers", "Zaharo пластові десерти", "Ягоди, горіх без надмірної солодощі."),
            item("coffee-pair", "Пара до еспресо", "Дібрано під Richard."),
          ],
        },
      };
    },
    languages: ["BG", "EN", "UA"],
    lang: "EN",
    get t() {
      const L = this.lang;
      const copy = {
        BG: {
          nav: { about: "За нас", menu: "Меню", pastries: "Подборки", visit: "Контакти", catering: "Кетъринг", orderCake: "Поръчай торта" },
          tabs: {
            drinks: "☕ Кафета и напитки",
            cakes: "🍰 Торти",
            pastries: "🥐 Zaharo и випечка",
          },
          carouselKicker: "Подборки",
          carouselHeading: "Signature Selection",
          navLangLabel: "Език",
          kicker: "Свети Влас · Sweet Fantasy",
          headline: "Sweet Fantasy:<br />украински вкус в Свети Влас",
          lede: "Интериор с сините птици над чашата ни — Café Richard, шейкове и Zaharo торти към променада.",
          ctaPrimary: "Посетете ни",
          ctaSecondary: "Меню",
          heroCaption: "Интериор Sweet Fantasy · сини птици към морето.",
          footerFine: "Sweet Fantasy · Украйна среща Балканите.",
          altInterior: "Детайл от залата Sweet Fantasy.",
          altDrinksBoard: "Табличка напитки Café Richard.",
          altPastries: "Signature pastry избор Sweet Fantasy.",
          altCarousel: "Signature Selection галерия — unnamed (2).webp",
          about: {
            kicker: "За нас",
            heading: "Украино-българско сърце 🇺🇦🇧🇬",
            paragraphHtml:
              "Sweet Fantasy съединява украинско майсторство и гостоприемство на променада. Нашият таван чертае синьо небе с птици — същите мотиви отпечатваме в дигиталното изживяване.",
          },
          vibe: {
            kicker: "Напитки и настроение",
            heading: "Син акцент към синьото меню",
            sub: "Напивайте се към променада с табелата ни и Richard зад бара.",
            caption: "Напитков акцент · ./unnamed%20(1).webp",
          },
          menuSection: {
            kicker: "Разделено меню",
            heading: "Три вкладки като нашия реален щанд",
            photoCaption: "Стенна акцентна зона · ./unnamed%20(1).webp",
          },
          pastrySection: {
            kicker: "Витрина",
            heading: "Signature Selection",
            sub: "Карусела използва ./unnamed%20(2).webp за фон с четири наративни акцента Zaharo/Garash/Dubai и персонализирани рождени дни.",
          },
          visitSection: {
            kicker: "Посещение",
            heading: "Sweet Fantasy край морето",
            lead: "Телефон за резервация или навигирай директно.",
            callCta: "Обади се",
            mapsCta: "Маршрут",
            hoursLabel: "Часове",
            hours: "пон – нед · 9:00 – 22:00",
            locationLabel: "Локация",
            location: "Свети Влас · Sweet Fantasy променада",
          },
          touristBar: { ariaLabel: "Бързи действия", call: "Телефон", map: "Карта", order: "Торта" },
          cakeModal: {
            kicker: "Заявка",
            title: "Поръчай торта",
            lede: "Пълните полета с висок контраст; изпращане отваря имейла ви.",
            closeAria: "Затвори",
            labelName: "Име · задължително",
            labelEmail: "Имейл",
            labelPhone: "Телефон",
            labelDate: "Дата на взимане",
            labelServings: "Размер · порции",
            labelNotes: "Вкусове и декорация",
            phName: "Пълно име",
            phEmail: "име@пример.bg",
            phPhone: "+359 … вашият номер",
            phNotes: "Например: Pistachio Dubai, торта без глутен, цветова палитра",
            servingsPh: "Например: 22 см · 24 филийки",
            submit: "Изпрати заявка (имейл)",
            note: "Създаваме mailto към нашия Salon — променете contactEmail в sweetfantasy-app.js.",
            mailSubject: "Sweet Fantasy · торта по заявка",
            mailIntro: "Sweet Fantasy · торта:",
          },
          catering: {
            kicker: "Кетъринг",
            heading: "Подайте палитри за хотели",
            body: "Zaharo плато · Garash · lemonades към хотели Св. Влас.",
            cta: "Ценова оферта",
            hint: "Гости · дата · локация",
          },
        },
        EN: {
          nav: { about: "About", menu: "Menu", pastries: "Pastry picks", visit: "Visit", catering: "Catering", orderCake: "Order a cake" },
          tabs: {
            drinks: "☕ Coffee & Drinks",
            cakes: "🍰 Signature Cakes",
            pastries: "🥐 Pastries & Zaharo",
          },
          carouselKicker: "Curated bites",
          carouselHeading: "Signature Selection",
          navLangLabel: "Language",
          kicker: "Sveti Vlas waterfront",
          headline: "Sweet Fantasy:<br />Where blue birds drift above Café Richard steam",
          lede: "We translated the sapphire ceiling mobiles into drifting digital motifs — Zaharo pastries, Pistachio Dubai layers, salted milkshakes at dusk.",
          ctaPrimary: "Visit the salon",
          ctaSecondary: "Explore menu tabs",
          heroCaption: "Interior hero · cobalt birds above the banquettes.",
          footerFine: "Ukrainian craft · Bulgarian tides.",
          altInterior: "Sweet Fantasy café interior depth shot.",
          altDrinksBoard: "Menu board chilled drinks collage.",
          altPastries: "Signature pastries hero frame.",
          altCarousel: "Signature Selection dessert photography.",
          about: {
            kicker: "Soul of the salon",
            heading: "Ukrainian-Bulgarian hospitality with wings",
            paragraphHtml:
              "The cobalt birds suspended above Sweet Fantasy whisper between coastlines — Kiev techniques, Varna sunsets. Zaharo ovens hum while Richard pulls shots for promenade pilgrims.",
          },
          vibe: {
            kicker: "Blue board ambience",
            heading: "Santorini blue meets oak millwork",
            sub: "The chalkboard echoes the airborne flock — sapphire ink on chalk dust.",
            caption: "Chilled wall · unnamed (1).webp",
          },
          menuSection: {
            kicker: "Tabbed menu",
            heading: "Cross-faded categories tuned for thumb traffic",
            photoCaption: "Service mosaic · ./unnamed%20(1).webp",
          },
          pastrySection: {
            kicker: "Pastry carousel",
            heading: "Signature Selection",
            sub: "The frame stays anchored to ./unnamed%20(2).webp while overlays shift Zaharo/Garash/Dubai/birthday copy.",
          },
          visitSection: {
            kicker: "Plan a pilgrimage",
            heading: "Sveti Vlas pier walk",
            lead: "Call ahead for lagoon tables or pivot straight into Google Maps mooring cues.",
            callCta: "Call salon",
            mapsCta: "Pin location",
            hoursLabel: "Hours",
            hours: "Daily · 9a – 10p",
            locationLabel: "Drop pin",
            location: "Sveti Vlas marina · Sweet Fantasy terrace",
          },
          touristBar: { ariaLabel: "Concierge shortcuts", call: "Call", map: "Map", order: "Cake" },
          cakeModal: {
            kicker: "Commission",
            title: "Order a bespoke cake",
            lede: "Every label uses deep ink contrast; placeholders echo concierge parlance.",
            closeAria: "Close cake order",
            labelName: "Full name · required",
            labelEmail: "Email address",
            labelPhone: "Phone / WhatsApp",
            labelDate: "Perfect pickup evening",
            labelServings: "Guests & diameter",
            labelNotes: "Flavour · décor briefing",
            phName: "Full name",
            phEmail: "name@yourmail.com",
            phPhone: "Your phone number",
            phNotes: "e.g., Pistachio Dubai, gluten tiers, handwritten plaque",
            servingsPh: "e.g., 26 cm · feeds 28",
            submit: "Compose mail · Santorini send",
            note: "We never stash form data locally — launches your composer with sf-blue cues.",
            mailSubject: "Sweet Fantasy · Custom cake dossier",
            mailIntro: "Sweet Fantasy concierge · cake order:",
          },
          catering: {
            kicker: "Event studio",
            heading: "Tray service for Riviera nights",
            body: "Zaharo viennoiserie flights, Pistachio Dubai centrepieces, lemonades keyed to Bulgarian rosé.",
            cta: "Book tasting",
            hint: "Headcount · pier access · plating moodboard",
          },
        },
        UA: {
          nav: {
            about: "Про нас",
            menu: "Меню",
            pastries: "Жанри",
            visit: "Візит",
            catering: "Кейтерінг",
            orderCake: "Торт замовлення",
          },
          tabs: {
            drinks: "☕ Кава напої",
            cakes: "🍰 Торти",
            pastries: "🥐 Випічка Zaharo",
          },
          carouselKicker: "Підборка",
          carouselHeading: "Signature Selection",
          navLangLabel: "Мова",
          kicker: "Святий Влас",
          headline: "Sweet Fantasy:<br />смак птахів блакиті над кавоваркою Richard",
          lede: "Інтер’єр з блакитими пташками переходить у наш цифровий фон; Zaharo щодня, Dubai торти на замовлення.",
          ctaPrimary: "Запланувати візит",
          ctaSecondary: "Табова меню",
          heroCaption: "Інтер’єр · небесний стельєр із пташками.",
          footerFine: "Українське рукоділля поруч із болгарським морем.",
          altInterior: "Глибина зал Sweet Fantasy.",
          altDrinksBoard: "Blueprint напої Richard.",
          altPastries: "Signature випіка.",
          altCarousel: "Карусель Signature Selection.",
          about: {
            kicker: "Концепція",
            heading: "Подвійний паспорт ресторанної душі",
            paragraphHtml:
              "Наш стеля з блакитними птахами натхнув цифрові силуети парallax. Zaharo торти летять на щоденній хвилі між Richard та мариною.",
          },
          vibe: {
            kicker: "Синя шкала напоїв",
            heading: "Меню-борд у ритмі променада",
            sub: "Син акцент веде очі до холодної зони сервісу.",
            caption: "Стінна акцентна зона.",
          },
          menuSection: {
            kicker: "Таб-система",
            heading: "Плавний crossfade між вкладинами",
            photoCaption: "Стіна сервісу · ./unnamed%20(1).webp",
          },
          pastrySection: {
            kicker: "Галерея",
            heading: "Signature Selection",
            sub: "Той самий кадр ./unnamed%20(2).webp з чотирма смисловими нашаруваннями Zaharo та Dubai.",
          },
          visitSection: {
            kicker: "Консьєрж візит",
            heading: "Святий Влас променада",
            lead: "Дзвони для лока столиків або мапа.",
            callCta: "Телефон",
            mapsCta: "Маршрут",
            hoursLabel: "Графік",
            hours: "пн–нд · 9:00–22:00",
            locationLabel: "Точка",
            location: "Sweet Fantasy марина променада",
          },
          touristBar: { ariaLabel: "Швидкі дії Sweet Fantasy", call: "Дзвінок", map: "Карта", order: "Торт" },
          cakeModal: {
            kicker: "Замовлення",
            title: "Торт із консьєржем тексту",
            lede: "Поля з контрастними етикетами; кнопка Santorini blue.",
            closeAria: "Закрити",
            labelName: "Імʼя повністю",
            labelEmail: "Email для відповіді",
            labelPhone: "Телефон або WA",
            labelDate: "Дата видачі",
            labelServings: "Яруси / гості",
            labelNotes: "Смаки та декорації",
            phName: "Повне імʼя гостя",
            phEmail: "email@gmail.com",
            phPhone: "Ваш телефон",
            phNotes: "Наприклад Dubai cake, Vegan шарів, напис із шоколаду",
            servingsPh: "Наприклад 26 см для 26 гостей",
            submit: "Відкрити чорновик пошти",
            note: "Дані не зберігаються — відбувається mailto.",
            mailSubject: "Sweet Fantasy · торти",
            mailIntro: "Sweet Fantasy · торти:",
          },
          catering: {
            kicker: "Події",
            heading: "Кейтерінг променада",
            body: "Zaharo плато, Dubai торти до welcome drinks.",
            cta: "Звернутись",
            hint: "Кількість гостей та дата",
          },
        },
      };
      return copy[L] || copy.EN;
    },
    altLang(code) {
      const names = { BG: "Български", EN: "English", UA: "Українська" };
      return "Switch language to " + (names[code] || code);
    },
  };
}
