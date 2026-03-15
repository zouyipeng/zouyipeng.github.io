document.addEventListener('DOMContentLoaded', function() {
  const projectsSection = document.querySelector('.projects-section');
  
  if (!projectsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
          const delay = parseInt(card.getAttribute('data-delay')) || 0;
          setTimeout(() => {
            card.classList.add('visible');
          }, delay);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(projectsSection);
});
