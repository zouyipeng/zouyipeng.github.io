document.addEventListener('DOMContentLoaded', function() {
  const projectsSection = document.querySelector('.projects-section');
  
  if (!projectsSection) return;

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

  observer.observe(projectsSection);
  
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
  
  // Initial trigger
  triggerProjectAnimation();
});
