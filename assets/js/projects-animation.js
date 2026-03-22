document.addEventListener('DOMContentLoaded', function() {
  
  // Function to manually trigger project animation
  window.triggerProjectAnimation = function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const delay = parseInt(card.getAttribute('data-delay')) || 0;
      setTimeout(() => {
        card.classList.add('visible');
      }, delay);
    });
  };
  
  // Initial trigger with delay to ensure content is rendered
  setTimeout(() => {
    triggerProjectAnimation();
  }, 300);
  
  // Also use IntersectionObserver as fallback
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerProjectAnimation();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  // Observe all potential project sections
  const observeProjects = setInterval(() => {
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
      observer.observe(projectsSection);
      clearInterval(observeProjects);
    }
  }, 100);
});
