/**
 * Aykara4 Modern Theme JavaScript
 * Handles theme toggling, mobile navigation, and interactive elements
 */

(function() {
  'use strict';

  // ========================================
  // Theme Management
  // ========================================
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or default to 'auto'
  const currentTheme = localStorage.getItem('theme');
  
  // Apply saved theme on load
  if (currentTheme) {
    document.body.setAttribute('data-theme', currentTheme);
  }
  
  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      let theme;
      
      if (document.body.getAttribute('data-theme') === 'dark') {
        theme = 'light';
      } else if (document.body.getAttribute('data-theme') === 'light') {
        theme = 'dark';
      } else {
        // If no theme is set, check system preference
        theme = prefersDarkScheme.matches ? 'light' : 'dark';
      }
      
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  // ========================================
  // Mobile Navigation
  // ========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-mobile .nav-link');
  
  if (menuToggle && mobileNav) {
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      
      menuToggle.setAttribute('aria-expanded', !isOpen);
      mobileNav.setAttribute('aria-hidden', isOpen);
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mobileNav.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuToggle.focus();
      }
    });
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = 80; // Account for sticky header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Testimonial Slider
  // ========================================
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const testimonials = [
    {
      quote: "Aykara4 delivered ahead of schedule and exceeded expectations.",
      author: "Client Name, Role, Company"
    },
    {
      quote: "Their expertise in cloud architecture saved us significant costs while improving performance.",
      author: "Tech Lead, SaaS Startup"
    },
    {
      quote: "The AI automation solutions provided have transformed our workflow efficiency.",
      author: "Operations Manager, SMB"
    }
  ];
  
  let currentTestimonial = 0;
  
  function updateTestimonial() {
    const quoteElement = document.querySelector('.testimonial-quote p');
    const authorElement = document.querySelector('.testimonial-author');
    
    if (quoteElement && authorElement) {
      quoteElement.textContent = `"${testimonials[currentTestimonial].quote}"`;
      authorElement.textContent = `— ${testimonials[currentTestimonial].author}`;
    }
  }
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonial();
    });
    
    nextBtn.addEventListener('click', function() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial();
    });
    
    // Auto-advance testimonials (optional, disabled by default for accessibility)
    // setInterval(() => {
    //   currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    //   updateTestimonial();
    // }, 5000);
  }

  // ========================================
  // Header Scroll Effect
  // ========================================
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (header) {
      // Add shadow when scrolled
      if (currentScroll > 10) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'none';
      }
      
      // Hide/show header on scroll (optional)
      // if (currentScroll > lastScroll && currentScroll > 100) {
      //   header.style.transform = 'translateY(-100%)';
      // } else {
      //   header.style.transform = 'translateY(0)';
      // }
    }
    
    lastScroll = currentScroll;
  });

  // ========================================
  // Dynamic Copyright Year
  // ========================================
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================
  // Intersection Observer for Animations
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.card, .value-item, .insight-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Animation class
  const style = document.createElement('style');
  style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ========================================
  // Form Handling (Contact Form)
  // ========================================
  const contactForm = document.querySelector('form[action="#"]');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      console.log('Form submission:', data);
      
      // For demo purposes, show a success message
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // ========================================
  // Lazy Loading Images (Native)
  // ========================================
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // ========================================
  // Performance: Debounce Scroll Events
  // ========================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Apply debouncing to scroll events
  const debouncedScroll = debounce(() => {
    // Any scroll-based functionality here
  }, 10);
  
  window.addEventListener('scroll', debouncedScroll, { passive: true });

  // ========================================
  // Keyboard Navigation Enhancement
  // ========================================
  document.addEventListener('keydown', function(e) {
    // Skip to main content with '1' key
    if (e.key === '1' && e.altKey) {
      e.preventDefault();
      const main = document.getElementById('main');
      if (main) {
        main.focus();
        main.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Toggle theme with 'T' key
    if (e.key === 't' && e.altKey) {
      e.preventDefault();
      if (themeToggle) {
        themeToggle.click();
      }
    }
  });

  // ========================================
  // Initialize on DOM Content Loaded
  // ========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    // Any initialization code here
    console.log('Aykara4 website initialized');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduce-motion');
    }
  }

})();
