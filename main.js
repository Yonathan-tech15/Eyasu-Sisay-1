// Add subtle animation to values on scroll
document.addEventListener('DOMContentLoaded', function() {
    const values = document.querySelectorAll('.value-pill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    values.forEach(value => {
        value.style.opacity = 0;
        value.style.transform = 'translateY(20px)';
        value.style.transition = 'all 0.5s ease';
        observer.observe(value);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });

  // Scroll animation using Intersection Observer
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('[data-scroll]');
    
    if (!elements.length) return;
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    elements.forEach(element => {
      observer.observe(element);
    });
  };

  // Initialize on load
  animateOnScroll();
  
  // Re-run when dynamic content loads
  document.addEventListener('ajaxComplete', animateOnScroll);
});