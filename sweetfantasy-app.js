/** Sweet Fantasy landing — Alpine component + i18n. Update phoneTel / contactEmail below. */
function sweetFantasy() {
  return {
    cakeModalOpen: false,
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
    languages: ["BG", "EN", "UA"],
    lang: "EN",
    drinksMenu() {
      const L = this.lang;
      const M = {
        EN: [
          { slug: "richard", title: "Café Richard", detail: "Our house brewing program behind the counter.", flavors: null },
          { slug: "milkshakes", title: "Milkshakes", detail: "Thick and smooth, shaken to order.", flavors: ["Strawberry", "Caramel", "Honey"] },
          { slug: "lemonades", title: "Lemonades", detail: "Bright citrus coolers.", flavors: null },
        ],
        BG: [
          { slug: "richard", title: "Café Richard", detail: "Нашият основен блок за кафе до бара.", flavors: null },
          { slug: "milkshakes", title: "Млечни шейкове", detail: "Гъсти, на поръчка.", flavors: ["Ягода", "Карамел", "Мед"] },
          { slug: "lemonades", title: "Лимонади", detail: "Свежи цитрусови напитки.", flavors: null },
        ],
        UA: [
          { slug: "richard", title: "Café Richard", detail: "Основна кава за бариста.", flavors: null },
          { slug: "milkshakes", title: "Мілкшейки", detail: "Густі напої до замовлення.", flavors: ["Полуниця", "Карамель", "Мед"] },
          { slug: "lemonades", title: "Лимонади", detail: "Освіжні напої.", flavors: null },
        ],
      };
      return M[L] || M.EN;
    },
    pastriesMenu() {
      const L = this.lang;
      const M = {
        EN: [
          { slug: "zaharo", title: "Fresh Zaharo Desserts", note: "Daily Zaharo pastries — flaky layers." },
          { slug: "garash", title: "Garash Cake", note: "Chocolate–walnut classic with glossy ganache." },
          { slug: "cakes", title: "Custom Whole Cakes", note: "Birthdays & events — order ahead." },
        ],
        BG: [
          { slug: "zaharo", title: "Свежи десерти Zaharo", note: "Редовни доставки Zaharo за витрина." },
          { slug: "garash", title: "Торта Гараш", note: "Шоколад, орех, гланцова ганаж." },
          { slug: "cakes", title: "Цели торти по поръчка", note: "Рожденни дни край морето." },
        ],
        UA: [
          { slug: "zaharo", title: "Свіжі десерти Zaharo", note: "Щотижнева палітра Zaharo." },
          { slug: "garash", title: "Торт «Гараш»", note: "Шоколад, горіх, ганаш." },
          { slug: "cakes", title: "Торт під замовлення", note: "Свята й події поруч із мариною." },
        ],
      };
      return M[L] || M.EN;
    },
    get t() {
      const L = this.lang;
      const copy = {
        BG: {
          nav: { about: "За нас", menu: "Меню", pastries: "Сладкиши", visit: "Контакти", catering: "Кетъринг", orderCake: "Поръчай торта" },
          navLangLabel: "Език",
          kicker: "Свети Влас · Sweet Fantasy",
          headline: "Sweet Fantasy:<br />украински вкус в Свети Влас",
          lede: "Café Richard, шейкове, лимонади и Zaharo торти — спокойна зала край променада.",
          ctaPrimary: "Посетете ни",
          ctaSecondary: "Меню",
          figureCaption: "Днес от фурна",
          imageAlt: "Торта — Sweet Fantasy hero.",
          footerFine: "Sweet Fantasy · Споделени моменти между Украйна и България.",
          altInterior: "Интериор Sweet Fantasy, Свети Влас.",
          altDrinksBoard: "Синя напиткова табела Café Richard.",
          altPastries: "Витрина с Zaharo десерти.",
          about: {
            kicker: "За нас",
            heading: "Украино-българското ни сърце 🇺🇦🇧🇬",
            paragraphHtml:
              "Sweet Fantasy смесва украинска випечка и гостоприемство на черноморския променад. Zaharo е ежедневна радост, Café Richard пази чашите ароматни, а шейковете носят ягода, карамел и мед.",
          },
          vibe: {
            kicker: "Интериор",
            heading: "Пространство от бели повърхности",
            sub: "Син акцент от менуто допълва светлината към променада.",
            caption: "Интериор ./unnamed.webp",
          },
          menuSection: { kicker: "Меню", heading: "Café Richard · шейкове · лимонади", photoCredit: "./unnamed (1).webp" },
          pastrySection: {
            kicker: "Витрина",
            heading: "Zaharo, Гараш и торти под поръчка",
            sub: "Подчертаваме свеж Zaharo всеки сезон.",
            galleryCaption: "Галерия ./unnamed (2).webp",
          },
          visitSection: {
            kicker: "Посещение",
            heading: "Къде ни намерите",
            lead: "Обади се или отвори карта към крайбрежното Sweet Fantasy.",
            callCta: "Обади се",
            mapsCta: "Маршрут",
            hoursLabel: "Часове",
            hours: "пон – нед · 9:00 – 22:00",
            locationLabel: "Адрес",
            location: "Свети Влас, България · край променада Sweet Fantasy",
          },
          touristBar: { ariaLabel: "Бързи действия", call: "Телефон", map: "Карта", order: "Торта" },
          cakeModal: {
            kicker: "Поръчка",
            title: "Торта по заявка",
            lede: "Пълнене → вашият имейл се отваря готов към Sweet Fantasy.",
            closeAria: "Затвори",
            labelName: "Име",
            labelEmail: "Имейл",
            labelPhone: "Телефон",
            labelDate: "Дата",
            labelServings: "Порции",
            servingsPh: "напр. 12",
            labelNotes: "Бележки",
            submit: "Изпращане",
            note: "Не съхраняваме данни на сайта — отваря се пощенски клиент.",
            mailSubject: "Sweet Fantasy · Торта",
            mailIntro: "Sweet Fantasy · заявка за торта:",
          },
          catering: {
            kicker: "Събития",
            heading: "Кетъринг",
            body: "Zaharo бюфет, Garash торти и lemonade за хотели край Св. Влас.",
            cta: "Оферта",
            hint: "Дата, гости и място.",
          },
        },
        EN: {
          nav: { about: "About", menu: "Menu", pastries: "Pastry", visit: "Visit", catering: "Catering", orderCake: "Order a cake" },
          navLangLabel: "Language",
          kicker: "Sveti Vlas · Sweet Fantasy",
          headline: "Sweet Fantasy:<br />A Taste of Ukraine in Sveti Vlas",
          lede: "Café Richard, milkshakes, lemonades & Zaharo pastries by the marina.",
          ctaPrimary: "Plan a visit",
          ctaSecondary: "View menu",
          figureCaption: "Signature layers",
          imageAlt: "Layer cake hero at Sweet Fantasy.",
          footerFine: "Ukrainian-Bulgarian seaside community.",
          altInterior: "Interior lounge Sweet Fantasy.",
          altDrinksBoard: "Blue menu board Café Richard drinks.",
          altPastries: "Zaharo dessert counter.",
          about: {
            kicker: "About us",
            heading: "The Ukrainian-Bulgarian heart of the café 🇺🇦🇧🇬",
            paragraphHtml:
              "Sweet Fantasy blends Ukrainian craft with Bulgarian hospitality on the Black Sea. Zaharo daily, Café Richard pours, strawberry–caramel–honey shakes, lemonade for sunset walks.",
          },
          vibe: {
            kicker: "Interior & vibe",
            heading: "White space, sapphire accents",
            sub: "Menu-board blues soften into oak and daylight.",
            caption: "./unnamed.webp",
          },
          menuSection: {
            kicker: "Digital menu",
            heading: "Café Richard · Milkshakes · Lemonades",
            photoCredit: "./unnamed (1).webp",
          },
          pastrySection: {
            kicker: "Pastry showcase",
            heading: "Zaharo, Garash, custom cakes",
            sub: "Fresh Zaharo arrivals plus bespoke orders.",
            galleryCaption: "./unnamed (2).webp gallery",
          },
          visitSection: {
            kicker: "Visit us",
            heading: "We await you in Sveti Vlas",
            lead: "Call for confirmation or jump to Google Maps waterfront directions.",
            callCta: "Call café",
            mapsCta: "Open route",
            hoursLabel: "Hours",
            hours: "Mon – Sun · 9:00 – 22:00",
            locationLabel: "Where",
            location: "Sveti Vlas, Bulgaria · marina promenade Sweet Fantasy",
          },
          touristBar: {
            ariaLabel: "Sweet Fantasy quick actions",
            call: "Call",
            map: "Map",
            order: "Cake",
          },
          cakeModal: {
            kicker: "Commission",
            title: "Compose your cake enquiry",
            lede: "We pre-fill a draft email you can tweak before sending.",
            closeAria: "Close form",
            labelName: "Name",
            labelEmail: "Email",
            labelPhone: "Phone",
            labelDate: "Pickup date",
            labelServings: "Servings / size",
            servingsPh: "e.g. 24 guests",
            labelNotes: "Notes",
            submit: "Open email draft",
            note: "Opens your mail app — nothing stored here.",
            mailSubject: "Sweet Fantasy · Custom cake enquiry",
            mailIntro: "Sweet Fantasy · cake order:",
          },
          catering: {
            kicker: "Catering",
            heading: "Events at the shoreline",
            body: "Zaharo platters, Garash tiers, lemonade toasts.",
            cta: "Request quote",
            hint: "Date, guests, venue.",
          },
        },
        UA: {
          nav: {
            about: "Про нас",
            menu: "Меню",
            pastries: "Випічка",
            visit: "Візит",
            catering: "Кейтерінг",
            orderCake: "Замовити торт",
          },
          navLangLabel: "Мова",
          kicker: "Святий Влас · Sweet Fantasy",
          headline: "Sweet Fantasy:<br />смак України у Святому Власі",
          lede: "Richard, мілкшейки, лимонади та Zaharo біля марини.",
          ctaPrimary: "Завітати",
          ctaSecondary: "Меню",
          figureCaption: "Багатошарові смаки",
          imageAlt: "Торт Sweet Fantasy.",
          footerFine: "Українсько-болгарська громада моря.",
          altInterior: "Інтер'єр Sweet Fantasy.",
          altDrinksBoard: "Табличка напоїв.",
          altPastries: "Вітрина Zaharo.",
          about: {
            kicker: "Про нас",
            heading: "🇺🇦🇧🇬 серце нашого простору",
            paragraphHtml:
              "Українська техніка та болгарське серце променаду. Zaharo щодня, café Richard тримає каву, мілкшейки тримають солодкість меду та карамелі.",
          },
          vibe: {
            kicker: "Вайб",
            heading: "Світло й синій акцент",
            sub: "Меню-борд задає охолоджену палітру простору.",
            caption: "./unnamed.webp",
          },
          menuSection: {
            kicker: "Меню",
            heading: "Café Richard · мілкшейки · лимонади",
            photoCredit: "./unnamed (1).webp",
          },
          pastrySection: {
            kicker: "Вітрина",
            heading: "Zaharo, Гараш, торти на замовлення",
            sub: "Щоденні десерти й персональні торти для свят.",
            galleryCaption: "./unnamed (2).webp",
          },
          visitSection: {
            kicker: "Відвідай",
            heading: "Святий Влас",
            lead: "Дзвінок або маршрут у Картах до Sweet Fantasy.",
            callCta: "Зателефонувати",
            mapsCta: "Маршрут",
            hoursLabel: "Графік",
            hours: "пн – нд · 9:00 – 22:00",
            locationLabel: "Локація",
            location: "Святий Влас · Sweet Fantasy поруч із мариною",
          },
          touristBar: { ariaLabel: "Швидкі дії Sweet Fantasy", call: "Телефон", map: "Карта", order: "Торт" },
          cakeModal: {
            kicker: "Замовлення",
            title: "Попередній запит торта",
            lede: "Дані переходять у чернетку листа для Sweet Fantasy.",
            closeAria: "Закрити",
            labelName: "Ім’я",
            labelEmail: "Email",
            labelPhone: "Телефон",
            labelDate: "Дата",
            labelServings: "Гості / діаметр",
            servingsPh: "наприклад 20 гостей",
            labelNotes: "Нотатки",
            submit: "Відкрити пошту",
            note: "Дані локально відкривають поштовий клієнт.",
            mailSubject: "Sweet Fantasy · Торт замовлення",
            mailIntro: "Sweet Fantasy · торт:",
          },
          catering: {
            kicker: "Події",
            heading: "Кейтерінг морем",
            body: "Банкетні Zaharo, Garash, welcome lemonades.",
            cta: "Запросити оферту",
            hint: "Дата й гості.",
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
