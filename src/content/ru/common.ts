import type { CommonContent, FormContent, NotFoundContent } from "../types";

export const common: CommonContent = {
  brand: "Codixa Technologies",
  tagline: "Разработка сайтов, программного обеспечения и CRM",
  skipToContent: "Перейти к содержанию",
  nav: {
    services: "Услуги",
    process: "Процесс",
    about: "О компании",
    contact: "Контакты",
    cta: "Обсудить проект",
    mainLabel: "Основная навигация",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    language: "Язык",
    home: "Главная",
  },
  actions: {
    startProject: "Обсудить проект",
    exploreServices: "Смотреть услуги",
    learnMore: "Подробнее",
    allServices: "Все услуги",
    contactUs: "Связаться с нами",
    backToHome: "На главную",
    emailUs: "Написать нам",
  },
  ctaBlock: {
    label: "Следующий шаг",
    title: "Расскажите, что нужно создать.",
    text: "Опишите проект в нескольких предложениях. Мы зададим уточняющие вопросы, предложим подход и пришлём письменную оценку.",
  },
  footer: {
    statement:
      "Сайты, веб-приложения, CRM-системы и автоматизация для компаний, которым нужно программное обеспечение, работающее с полной отдачей.",
    servicesTitle: "Услуги",
    companyTitle: "Компания",
    contactTitle: "Контакты",
    location: "Ереван, Армения",
    privacy: "Политика конфиденциальности",
    rights: "Все права защищены.",
    backToTop: "Наверх",
  },
  servicePage: {
    problemsLabel: "Проблема",
    problemsTitle: "Что обычно мешает",
    benefitsLabel: "Результат",
    benefitsTitle: "Что вы получаете",
    capabilitiesLabel: "Объём работ",
    capabilitiesTitle: "Что мы можем для вас создать",
    useCasesLabel: "Сценарии",
    useCasesTitle: "Где это работает",
    processLabel: "Процесс",
    processTitle: "Как строится работа",
    faqLabel: "FAQ",
    faqTitle: "Частые вопросы",
    relatedLabel: "Смежные услуги",
    relatedTitle: "Услуги, которые хорошо дополняют друг друга",
  },
  visualAlt: "Схематичная иллюстрация услуги",
};

export const form: FormContent = {
  title: "Расскажите о своём проекте",
  intro: "Поля, отмеченные звёздочкой, обязательны. Чем больше деталей вы укажете, тем точнее будет наш первый ответ.",
  fields: {
    name: { label: "Ваше имя", placeholder: "Имя и фамилия" },
    email: { label: "Email", placeholder: "name@company.com" },
    company: { label: "Компания", placeholder: "Название компании или проекта" },
    service: { label: "Что вам нужно?", placeholder: "Выберите услугу" },
    message: {
      label: "Описание проекта",
      placeholder: "Что вы хотите создать, для кого и есть ли сроки?",
    },
  },
  optional: "(необязательно)",
  otherService: "Пока не уверен(а) / другое",
  validation: {
    nameRequired: "Пожалуйста, укажите ваше имя.",
    emailRequired: "Пожалуйста, укажите ваш email.",
    emailInvalid: "Пожалуйста, укажите корректный email, например name@company.com.",
    messageRequired: "Пожалуйста, опишите ваш проект.",
    messageTooShort: "Добавьте, пожалуйста, чуть больше деталей — не менее {min} символов.",
    summary: "Пожалуйста, исправьте отмеченные поля.",
  },
  submit: "Отправить заявку",
  sending: "Отправка…",
  successTitle: "Спасибо — ваша заявка отправлена.",
  successText: "Мы получили ваше сообщение и ответим на указанный вами email.",
  sendAnother: "Отправить ещё одно сообщение",
  errorTitle: "Не удалось отправить сообщение.",
  errorText: "Попробуйте ещё раз чуть позже или напишите нам напрямую на {email}.",
  notConfigured:
    "Онлайн-отправка временно недоступна. Пожалуйста, напишите нам напрямую на {email} — мы читаем каждое письмо.",
  consent: "Отправляя форму, вы соглашаетесь на обработку ваших данных для ответа на заявку, как описано в нашей {privacy}.",
  privacyLinkText: "политике конфиденциальности",
};

export const notFound: NotFoundContent = {
  title: "Такой страницы не существует.",
  text: "Возможно, ссылка устарела или адрес введён с ошибкой. Всё, что мы предлагаем, — в одном клике от главной страницы.",
};
