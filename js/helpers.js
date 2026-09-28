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
    'Images/IMG-20241225-WA0039.jpg',
    'Images/IMG-20241229-WA0017.jpg',
    'Images/IMG-20241230-WA0052.jpg',
    'Images/IMG-20241230-WA0054.jpg',
    'Images/IMG-20240723-WA0062.jpg',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=80',
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

// Initialize shared widgets on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCarousel();
  initCarFilters();
  initMobileNav();
  initDynamicYear();
});
