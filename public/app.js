(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const qs = (selector, context = document) => context.querySelector(selector);
  const qsa = (selector, context = document) => [...context.querySelectorAll(selector)];

  const year = qs("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Header */
  const header = qs("[data-header]");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Accessible mobile navigation */
  const menuToggle = qs("[data-menu-toggle]");
  const menu = qs("[data-menu]");
  let previousFocus = null;

  const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

  const setMenuState = (open) => {
    if (!menu || !menuToggle) return;
    menu.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    const label = qs(".sr-only", menuToggle);
    if (label) label.textContent = open ? "Cerrar menú" : "Abrir menú";
    document.body.classList.toggle("menu-open", open);

    if (open) {
      previousFocus = document.activeElement;
      window.requestAnimationFrame(() => qs(focusableSelector, menu)?.focus());
    } else if (previousFocus instanceof HTMLElement) {
      previousFocus.focus({ preventScroll: true });
    }
  };

  menuToggle?.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  qsa("a", menu).forEach((link) => link.addEventListener("click", () => setMenuState(false)));

  document.addEventListener("keydown", (event) => {
    const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setMenuState(false);
      return;
    }

    if (event.key !== "Tab" || !menu) return;
    const focusable = qsa(focusableSelector, menu);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (menuToggle?.getAttribute("aria-expanded") !== "true") return;
    if (!menu?.contains(event.target) && !menuToggle?.contains(event.target)) setMenuState(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1040 && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
    }
  });

  /* Adaptive hero video: desktop only, no data saver, no reduced motion */
  const video = qs("[data-hero-video]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const shouldLoadVideo = video && window.innerWidth >= 760 && !reducedMotion.matches && !connection?.saveData;

  if (shouldLoadVideo) {
    const webm = document.createElement("source");
    webm.src = "/hero-optimized.webm";
    webm.type = "video/webm";
    const mp4 = document.createElement("source");
    mp4.src = "/hero-optimized.mp4";
    mp4.type = "video/mp4";
    video.append(webm, mp4);
    video.load();
    video.play().catch(() => {
      video.remove();
    });
  }

  /* Reveal elements without penalizing no-JS users */
  const reveals = qsa(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }

  /* Service selection */
  const serviceSelect = qs("[data-service-select]");
  qsa("[data-service]").forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.getAttribute("data-service") || "";
      if (serviceSelect) serviceSelect.value = service;
      qs("#contacto")?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
      window.setTimeout(() => serviceSelect?.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 650);
      track("service_select", { service_name: service });
    });
  });

  /* Form integrity and submission feedback */
  const form = qs("form[name='contact']");
  const startedAt = qs("[data-form-start]", form || document);
  if (startedAt) startedAt.value = String(Date.now());

  form?.addEventListener("submit", () => {
    const submit = qs("[data-submit]", form);
    if (submit) {
      submit.disabled = true;
      const label = qs("span", submit);
      if (label) label.textContent = "Enviando solicitud…";
    }
    track("form_submit", { form_name: "contact" });
  });

  /* Consent-based analytics */
  const analyticsId = "G-E9V1Y5PFKK";
  const storageKey = "rm_analytics_consent";
  const banner = qs("[data-consent-banner]");
  const accept = qs("[data-consent-accept]");
  const reject = qs("[data-consent-reject]");
  const settings = qs("[data-cookie-settings]");
  let analyticsLoaded = false;

  const readConsent = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const writeConsent = (value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      /* Storage can be unavailable in strict privacy modes. */
    }
  };

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", analyticsId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_flags: "SameSite=Lax;Secure"
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
    document.head.appendChild(script);
  }

  function track(eventName, parameters = {}) {
    if (readConsent() !== "accepted") return;
    if (!analyticsLoaded) loadAnalytics();
    window.gtag?.("event", eventName, parameters);
  }

  const setConsent = (value) => {
    writeConsent(value);
    if (banner) banner.hidden = true;
    if (value === "accepted") loadAnalytics();
  };

  const consent = readConsent();
  if (consent === "accepted") loadAnalytics();
  else if (!consent && banner) banner.hidden = false;

  accept?.addEventListener("click", () => setConsent("accepted"));
  reject?.addEventListener("click", () => setConsent("rejected"));
  settings?.addEventListener("click", () => {
    if (banner) {
      banner.hidden = false;
      qs("button", banner)?.focus();
    }
  });

  qsa("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      track(element.getAttribute("data-track") || "interaction", {
        link_url: element instanceof HTMLAnchorElement ? element.href : undefined
      });
    });
  });
})();
