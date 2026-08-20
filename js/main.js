/**
 * SYSTEME COUTURE - Interactive Script
 * Maison de Couture par Deborah Enemeri
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation & Header Scroll State
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Collection Category Filters
  const filterButtons = document.querySelectorAll('.filter-tab');
  const collectionCards = document.querySelectorAll('.collection-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      collectionCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Active Link Spy on Scroll
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 5. Contact / Bespoke Consultation Form Validation & Toast Notification
  const form = document.getElementById('bespoke-consultation-form');
  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const emailInput = document.getElementById('client-email');
      const phoneInput = document.getElementById('client-phone');
      const serviceSelect = document.getElementById('service-interest');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'name-error');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'email-error');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validate Phone
      if (!phoneInput.value.trim()) {
        showError(phoneInput, 'phone-error');
        isValid = false;
      } else {
        clearError(phoneInput, 'phone-error');
      }

      // Validate Service
      if (!serviceSelect.value) {
        showError(serviceSelect, 'service-error');
        isValid = false;
      } else {
        clearError(serviceSelect, 'service-error');
      }

      if (isValid) {
        const clientName = nameInput.value.trim();
        const submitBtn = document.getElementById('form-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="material-symbols-outlined icon-sm">sync</span> Transmitting Consultation Request...`;

        setTimeout(() => {
          showToast(`Consultation Requested, ${clientName}!`, 'Our atelier manager will reach out via WhatsApp & email within 24 hours.');
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span class="material-symbols-outlined">send</span> Submit Consultation Request`;
        }, 800);
      }
    });

    // Real-time input listeners to remove error
    ['client-name', 'client-email', 'client-phone', 'service-interest'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.closest('.form-group').classList.remove('has-error');
        });
        el.addEventListener('change', () => {
          el.closest('.form-group').classList.remove('has-error');
        });
      }
    });
  }

  function showError(inputElement, errorId) {
    const group = inputElement.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
    }
  }

  function clearError(inputElement, errorId) {
    const group = inputElement.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
    }
  }

  function showToast(title, message) {
    if (!toast) return;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

  // Update Copyright Year dynamically
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
