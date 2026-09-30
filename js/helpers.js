// ===== SHARED HELPERS =====

// Site-wide configuration. Customise before launch:
var SITE_CONFIG = {
  // Leave empty to route contact form messages to WhatsApp.
  // Set to a Formspree endpoint (e.g. 'https://formspree.io/f/yourformid') to deliver via email.
  FORMSPREE_ENDPOINT: '',
  WHATSAPP_NUMBER: '2348121966147',
  SUPPORT_EMAIL: 'kaykeys864@gmail.com'
};

function initBackgroundCarousel() {
  const bgImages = [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1920&q=80',
  ];

  const carousel = document.getElementById('bgCarousel');
  if (!carousel) return;

  bgImages.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'bg-carousel-slide' + (i === 0 ? ' active' : '');
    slide.style.backgroundImage = `url('${src}')`;
    carousel.appendChild(slide);
  });

  let current = 0;
  const slides = carousel.querySelectorAll('.bg-carousel-slide');
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
}

function initCarFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterCars(btn.dataset.filter || 'all', btn));
  });
}

function filterCars(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.car-card').forEach(card => {
    const cats = card.dataset.category || '';
    card.style.display = (category === 'all' || cats.includes(category)) ? '' : 'none';
  });
}

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initDynamicYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
}

function initHeroShowcase() {
  const root = document.getElementById('heroShowcase');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('.hero-slide'));
  const dots = Array.from(root.querySelectorAll('.hero-dot'));
  if (slides.length < 2) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  };

  const stop = () => {
    if (timer) { clearInterval(timer); timer = null; }
  };

  const play = () => {
    stop();
    if (reduced || document.hidden) return;
    timer = setInterval(() => show(index + 1), 6000);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      play();
    });
  });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', play);
  document.addEventListener('visibilitychange', play);

  show(0);
  play();
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

  items.forEach((el) => observer.observe(el));
}

// Initialize shared widgets on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCarousel();
  initCarFilters();
  initMobileNav();
  initDynamicYear();
  initHeroShowcase();
  initReveal();
});
