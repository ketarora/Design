/* ============================================================
   VIDEO-MAKING LAB — INTERACTIONS
   Scroll reveals, nav behavior, cursor glow, mobile menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- CURSOR GLOW ----------
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ---------- NAVBAR SCROLL ----------
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });

  // ---------- MOBILE MENU ----------
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- SCROLL REVEAL ----------
  const reveals = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings a bit
        const delay = Array.from(entry.target.parentElement.children)
          .filter(c => c.hasAttribute('data-reveal'))
          .indexOf(entry.target) * 80;

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));

  // ---------- SMOOTH SCROLL FOR NAV LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- PARALLAX BG TEXT ----------
  const bgText = document.querySelector('.hero-bg-text');
  if (bgText) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        bgText.style.transform = `translate(-50%, calc(-50% + ${y * 0.15}px))`;
        bgText.style.opacity = 1 - (y / (window.innerHeight * 0.8));
      }
    }, { passive: true });
  }

  // ---------- TIMELINE LINE ANIMATION ----------
  const timelineLine = document.querySelector('.timeline::before');
  // Enhanced via CSS – no JS needed

  // ---------- WORK CARD TILT EFFECT ----------
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.work-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-4px) perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---------- PRICING CARD SHIMMER ON HOVER ----------
  const pricingCard = document.querySelector('.pricing-card');
  if (pricingCard && window.matchMedia('(pointer: fine)').matches) {
    pricingCard.addEventListener('mousemove', (e) => {
      const rect = pricingCard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      pricingCard.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 50%, transparent 80%)`;
    });

    pricingCard.addEventListener('mouseleave', () => {
      pricingCard.style.background = 'rgba(255,255,255,0.02)';
    });
  }

  // ---------- PILLAR HOVER GLOW ----------
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.pillar').forEach(pillar => {
      pillar.addEventListener('mousemove', (e) => {
        const rect = pillar.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        pillar.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.03) 0%, transparent 60%)`;
      });

      pillar.addEventListener('mouseleave', () => {
        pillar.style.background = '';
      });
    });
  }

});
