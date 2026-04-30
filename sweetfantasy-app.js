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
    menuSlidePct() {
      const m = { drinks: 0, cakes: 33.333333, pastries: 66.666667 };
      return m[this.menuTab] ?? 0;
    },
    cakeGuestStar(slug) {
      return ["napoleon", "brownie", "cheesecake", "klassik"].includes(slug);
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
            item("coffee-richard", "Coffee Richard", "Florio · Moka · Ethiopia."),
            item("tea-richard", "Richard Tea", "Gardens of Darjeeling · Earl Grey — loose-leaf service with marina light."),
            item("bubble-tea", "Bubble tea", "Blueberry · Strawberry."),
            item("milkshakes", "Milkshakes", "Thick, chilled blends — ask the bar for today's flavours."),
            item("lemonades", "Lemonades", "Fresh-pressed citrus, crushed ice · rotating fruit infusions."),
          ],
          cakes: [
            item(
              "napoleon",
              "Napoleon cake",
              "Layered mille-feuille brilliance — softly named in every five-star shoreline note.",
            ),
            item("brownie", "Brownie", "Dense cocoa crumb with a tempered gloss — perennial guest favourite."),
            item("cheesecake", "Cheesecake", "Silky set against lemon zest — luminous on the passe-plat."),
            item("klassik", "Klassik", "The house timeless slice — uncomplicated, flawlessly executed."),
          ],
          pastries: [
            item("zaharo-tray", "Zaharo morning ribbons", "Flaky courier arrivals before promenade brunch begins."),
            item("layers", "Layer pastry cuts", "Raspberry custard, hazelnut dacquoise — sweetness kept editorial."),
            item("coffee-pair", "Bar pairings", "Sized for Richard pours from open to close."),
          ],
        },
        BG: {
          drinks: [
            item("coffee-richard", "Кафе Richard", "Florio · Moka · Ethiopia."),
            item("tea-richard", "Чай Richard", "Градините на Дарджилинг · Earl Grey."),
            item("bubble-tea", "Бабл ти", "Боровинка · Ягода."),
            item("milkshakes", "Млекшейкове", "Гъсти, охладени вкусове — попитайте бара за деня."),
            item("lemonades", "Лимонади", "Ръчен цитрус, лёд · сезонни плодови нотки."),
          ],
          cakes: [
            item(
              "napoleon",
              "Торт Наполеон",
              "Слоеста класика — топ избор сред гости край морето.",
            ),
            item("brownie", "Брауни", "Плътна какаена текстура — често споменаван с възторг."),
            item("cheesecake", "Чизкейк", "Кремообразен финал с цитрусова нотка."),
            item("klassik", "Классик", "Вечно актуалният домашен фаворит."),
          ],
          pastries: [
            item("zaharo-tray", "Zaharo сутрешни ленти", "Фини пластове и медени нотки до Richard."),
            item("layers", "Нарязани Zaharo десерти", "Композирани към следобеда."),
            item("coffee-pair", "Към espresso бара", "Под колектора на променадата."),
          ],
        },
        UA: {
          drinks: [
            item("coffee-richard", "Кава Richard", "Florio · Moka · Ethiopia."),
            item("tea-richard", "Чай Richard", "Сади Дарджилінгу · Earl Grey."),
            item("bubble-tea", "Баббл-ті", "Чорниця · Полуниця."),
            item("milkshakes", "Мілкшейки", "Густі холодні суміші — запитайте бармена про смаки дня."),
            item("lemonades", "Лимонади", "Свіжовичавлені цитруси, лід · сезонні настої."),
          ],
          cakes: [
            item(
              "napoleon",
              "Торт «Наполеон»",
              "Шарувата класика для відгуків із високими оцінками.",
            ),
            item("brownie", "Брауні", "Насичені какаові нотки — улюбленець гостей."),
            item("cheesecake", "Чізкейк", "Шовковистий текстурний фокус."),
            item("klassik", "Класик", "Авторська класика Zaharo-бару."),
          ],
          pastries: [
            item("zaharo-tray", "Стрічки Zaharo", "Ранкова випічка перед прогулянкою."),
            item("layers", "Пластові десерти", "Збалансована солодкість Zaharo."),
            item("coffee-pair", "Пара під Richard", "До останнього еспресо дня."),
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
          nav: { about: "За нас", menu: "Меню", guests: "Отзиви", pastries: "Подборки", visit: "Контакти", catering: "Кетъринг", orderCake: "Поръчай торта" },
          tabs: {
            drinks: "☕ Напитки",
            cakes: "🍰 Торти",
            pastries: "🥐 Zaharo",
          },
          carouselKicker: "Подборки",
          carouselHeading: "Signature Selection",
          navLangLabel: "Език",
          kicker: "Свети Влас · Sweet Fantasy",
          menuGuestPick: "Отзивите",
          headline: "Sweet Fantasy:<br />украински вкус в Свети Влас",
          lede: "Синият таван с птици се пренесе в нашия екран заедно с топлото услужливо обслужване, което гостите описват в отзивите — Richard кафета, Zaharo качество и променада на крачка.",
          ctaPrimary: "Посетете ни",
          ctaSecondary: "Меню",
          heroCaption: "Интериор Sweet Fantasy · сини птици към морето.",
          footerFine: "Sweet Fantasy · Украйна среща Балканите.",
          altInterior: "Детайл от залата Sweet Fantasy.",
          altDrinksBoard: "Табличка напитки Café Richard.",
          altPastries: "Signature pastry избор Sweet Fantasy.",
          altCarousel: "Signature Selection — twocackes.png",
          about: {
            kicker: "За нас",
            heading: "Украино-българско гостоприемство с душа",
            paragraphHtml:
              "Sweet Fantasy е мястото, където украинското майсторство среща спокойствието на Черноморието. Стените и таванът със сини птици припомнят салона в Свети Влас — същата атмосфера, която гостите наричат приятелска и уютна. Говорят за най-доброто кафе в града и премиум торти Zaharo; ние отговаряме с отворен щанд, лично внимание и чаши Richard до залез.",
          },
          vibe: {
            kicker: "Напитки и настроение",
            heading: "Син акцент към синьото меню",
            sub: "Напивайте се към променада с табелата ни и Richard зад бара.",
            caption: "Напитков акцент · twjcupsofcoffe.png",
          },
          testimonialsSection: {
            kicker: "Доверие",
            heading: "Какво казват гостите",
            items: [
              {
                quote:
                  "Най-високото качество на торти и сладкиши. Кафето също е вкусно. Приятелски персонал, което е рядкост.",
                author: "Местен експерт",
              },
              {
                quote:
                  "Отличен избор! Брауните, чизкейкът и торта Наполеон са най-деликатните. Най-доброто кафе в Свети Влас.",
                author: "Надежда К.",
              },
              {
                quote: "Уютно кафе, поръчах рождена торта и беше вкусна. Силно препоръчвам от сърце.",
                author: "Мария З.",
              },
            ],
          },
          menuSection: {
            kicker: "Меню",
            heading: "Премиум табове с плъзгащ преглед",
            photoCaption: "Стенна акцентна зона · twjcupsofcoffe.png",
          },
          pastrySection: {
            kicker: "Витрина",
            heading: "Signature Selection",
            sub: "Карусел с фон twocackes.png — Zaharo, Гараш, Dubai и рождени торти.",
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
            phNotes: "Например: Наполеон, брауни, безглутенов блат, палитра",
            servingsPh: "Например: 22 см · 24 филийки",
            submit: "Заяви авторско изпълнение",
            note: "Данните се изпращат по имейл (mailto) към нашия салон.",
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
          nav: { about: "About", menu: "Menu", guests: "Guests", pastries: "Pastry picks", visit: "Visit", catering: "Catering", orderCake: "Order a cake" },
          tabs: {
            drinks: "☕ Drinks",
            cakes: "🍰 Cakes",
            pastries: "🥐 Pastries",
          },
          carouselKicker: "Curated bites",
          carouselHeading: "Signature Selection",
          navLangLabel: "Language",
          kicker: "Sveti Vlas waterfront",
          menuGuestPick: "Loved in reviews",
          headline: "Sweet Fantasy:<br />Where blue birds drift above Café Richard steam",
          lede: "The blue birds from our ceiling reappear beside your scroll — paired with the warm, unmistakably Ukrainian-Bulgarian welcome guests praise in reviews. Richard brews · Zaharo standards · marina steps away.",
          ctaPrimary: "Visit the salon",
          ctaSecondary: "Explore menu tabs",
          heroCaption: "Interior hero · cobalt birds above the banquettes.",
          footerFine: "Ukrainian craft · Bulgarian tides.",
          altInterior: "Sweet Fantasy café interior depth shot.",
          altDrinksBoard: "Menu board chilled drinks collage.",
          altPastries: "Signature pastries hero frame.",
          altCarousel: "Signature carousel photography — twocackes.png",
          about: {
            kicker: "Soul of the salon",
            heading: "Ukrainian-Bulgarian heart, atmosphere you can linger in",
            paragraphHtml:
              "Sweet Fantasy is where Ukrainian artistry meets Bulgarian seaside calm. The cobalt birds drifting across our ceiling are the same soul guests mention when they describe our friendly, unrushed salon service. Visitors call out the finest coffee on the Sveti Vlas shoreline and Zaharo pastries worth the pilgrimage — our team meets that love with curated Richard menus, Zaharo trays, and a counter that remembers your name.",
          },
          vibe: {
            kicker: "Blue board ambience",
            heading: "Santorini blue meets oak millwork",
            sub: "The chalkboard echoes the airborne flock — sapphire ink on chalk dust.",
            caption: "Chilled wall · twjcupsofcoffe.png",
          },
          testimonialsSection: {
            kicker: "Guest voices",
            heading: "What our guests say",
            items: [
              {
                quote:
                  "The highest quality cakes and pastries. The coffee is delicious too. Friendly staff, which is a rarity.",
                author: "Local Expert",
              },
              {
                quote:
                  "Excellent selection! Brownies, Cheesecake, and Napoleon are the most delicate. Best coffee in Sveti Vlas.",
                author: "Nadezhda K.",
              },
              {
                quote:
                  "Atmospheric cafe, ordered a birthday cake and it was delicious. Highly recommended from the heart.",
                author: "Maria Z.",
              },
            ],
          },
          menuSection: {
            kicker: "Chef's boards",
            heading: "Premium tab menu · glide between categories",
            photoCaption: "Service mosaic · twjcupsofcoffe.png",
          },
          pastrySection: {
            kicker: "Pastry carousel",
            heading: "Signature Selection",
            sub: "Hero frame locked to twocackes.png with rotating Zaharo / Garash / Dubai / birthday stories.",
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
            submit: "Request Bespoke Creation",
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
            guests: "Відгуки",
            pastries: "Жанри",
            visit: "Візит",
            catering: "Кейтерінг",
            orderCake: "Торт замовлення",
          },
          tabs: {
            drinks: "☕ Напої",
            cakes: "🍰 Торти",
            pastries: "🥐 Випічка",
          },
          carouselKicker: "Підборка",
          carouselHeading: "Signature Selection",
          navLangLabel: "Мова",
          kicker: "Святий Влас",
          menuGuestPick: "У відгуках",
          headline: "Sweet Fantasy:<br />смак птахів блакиті над кавоваркою Richard",
          lede: "Стеля з блакитними птахами переходить у наш скрол так само, як атмосфера в залі — теплий українсько-болгарський сервіс із відгуків про найкращу каву у Святому Власі та Zaharo.",
          ctaPrimary: "Запланувати візит",
          ctaSecondary: "Табова меню",
          heroCaption: "Інтер’єр · небесний стельєр із пташками.",
          footerFine: "Українське рукоділля поруч із болгарським морем.",
          altInterior: "Глибина зал Sweet Fantasy.",
          altDrinksBoard: "Blueprint напої Richard.",
          altPastries: "Signature випіка.",
          altCarousel: "Карусель Signature Selection — twocackes.png",
          about: {
            kicker: "Концепція",
            heading: "Українсько-болгарське серце та гостинність з відгуків",
            paragraphHtml:
              "Sweet Fantasy — точка, де рукоділля з України відчувається поруч із морським спокоєм Болгарії. Блакитні птахи стелі повторюють наш фірмовий код тепла, який гості описують як дружнє та затишне обслуговування. У відгуках — найкраща кава в Святому Власі та торти Zaharo високої якості; ми відповідаємо програмою Richard, Zaharo-вітриною та персональним прийомом біля променаду.",
          },
          vibe: {
            kicker: "Синя шкала напоїв",
            heading: "Меню-борд у ритмі променада",
            sub: "Син акцент веде очі до холодної зони сервісу.",
            caption: "Стінний акцент напоїв · twjcupsofcoffe.png",
          },
          testimonialsSection: {
            kicker: "Соцдоказ",
            heading: "Що кажуть гості",
            items: [
              {
                quote:
                  "Найвища якість тортів і випічки. Кава також дуже смачна. Привітний персонал — таке трапляється нечасто.",
                author: "Місцевий експерт",
              },
              {
                quote:
                  "Чудовий вибір! Брауні, чізкейк і Наполеон — найніжніші смаки. Найкраща кава в Святому Власі.",
                author: "Надія К.",
              },
              {
                quote: "Атмосферна кавʼярня — замовила торт на день народження, був смачним. Щиро рекомендую.",
                author: "Марія З.",
              },
            ],
          },
          menuSection: {
            kicker: "Меню",
            heading: "Таби преміум-класу з горизонтальним переходом",
            photoCaption: "Стіна сервісу · twjcupsofcoffe.png",
          },
          pastrySection: {
            kicker: "Галерея",
            heading: "Signature Selection",
            sub: "Той самий кадр twocackes.png із чотирма нашаруваннями Zaharo, Гараш, Dubai та святкові торти.",
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
            phNotes: "Наприклад Наполеон, брауні, веган-шар, напис",
            servingsPh: "Наприклад 26 см для 26 гостей",
            submit: "Запит на авторську творчість",
            note: "Дані не зберігаються — відкривається поштовий клієнт (mailto).",
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
