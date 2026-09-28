// ===== MAIN JS =====

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
});

// Contact form handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm).entries());
    const btn = contactForm.querySelector('button[type="submit"]');

    if (SITE_CONFIG.FORMSPREE_ENDPOINT) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(SITE_CONFIG.FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((res) => {
          btn.textContent = res.ok ? 'Message Sent!' : 'Failed - Retry';
        })
        .catch(() => {
          btn.textContent = 'Failed - Retry';
        })
        .finally(() => {
          setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            if (data.name && data.email) contactForm.reset();
          }, 3000);
        });
      return;
    }

    const text =
      'Hello Everything Cruise!' +
      '\nName: ' + data.name +
      '\nEmail: ' + data.email +
      '\nSubject: ' + (data.subject || 'General enquiry') +
      '\n\nMessage:\n' + data.message;
    const url = 'https://wa.me/' + SITE_CONFIG.WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');
    btn.textContent = 'WhatsApp Opened - Send to Complete';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });
}
