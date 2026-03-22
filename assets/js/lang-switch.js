document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('lang-slider');
  const sliderText = document.getElementById('slider-text');
  const zhElements = document.querySelectorAll('.lang-zh');
  const enElements = document.querySelectorAll('.lang-en');
  const zhIndicator = document.querySelector('.zh-indicator');
  const enIndicator = document.querySelector('.en-indicator');

  if (!slider) return;

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let isEnglish = true;
  const trackWidth = 80;
  const sliderWidth = 76;
  const maxDrag = trackWidth - sliderWidth;

  function updateLanguage(english) {
    isEnglish = english;
    
    if (english) {
      // English state - slider on right
      currentX = maxDrag;
      slider.style.transform = `translateX(${currentX}px)`;
      sliderText.textContent = 'EN';
      
      zhElements.forEach(el => el.style.display = 'none');
      enElements.forEach(el => el.style.display = 'block');
      
      if (zhIndicator) zhIndicator.classList.remove('active');
      if (enIndicator) enIndicator.classList.add('active');
    } else {
      // Chinese state - slider on left
      currentX = 0;
      slider.style.transform = `translateX(${currentX}px)`;
      sliderText.textContent = '中';
      
      zhElements.forEach(el => el.style.display = 'block');
      enElements.forEach(el => el.style.display = 'none');
      
      if (zhIndicator) zhIndicator.classList.add('active');
      if (enIndicator) enIndicator.classList.remove('active');
    }
    
    // Trigger project animation
    setTimeout(() => {
      if (typeof triggerProjectAnimation === 'function') {
        triggerProjectAnimation();
      }
    }, 50);
  }

  // Mouse events
  slider.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX - currentX;
    slider.classList.add('dragging');
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    let newX = e.clientX - startX;
    newX = Math.max(0, Math.min(newX, maxDrag));
    
    currentX = newX;
    slider.style.transform = `translateX(${currentX}px)`;
  });

  document.addEventListener('mouseup', function() {
    if (!isDragging) return;
    isDragging = false;
    slider.classList.remove('dragging');
    
    // Snap to nearest position
    const midpoint = maxDrag / 2;
    if (currentX > midpoint) {
      updateLanguage(true);
    } else {
      updateLanguage(false);
    }
  });

  // Touch events
  slider.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX - currentX;
    slider.classList.add('dragging');
  });

  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    let newX = e.touches[0].clientX - startX;
    newX = Math.max(0, Math.min(newX, maxDrag));
    
    currentX = newX;
    slider.style.transform = `translateX(${currentX}px)`;
  });

  document.addEventListener('touchend', function() {
    if (!isDragging) return;
    isDragging = false;
    slider.classList.remove('dragging');
    
    // Snap to nearest position
    const midpoint = maxDrag / 2;
    if (currentX > midpoint) {
      updateLanguage(true);
    } else {
      updateLanguage(false);
    }
  });

  // Click on indicators
  if (zhIndicator) {
    zhIndicator.addEventListener('click', function() {
      updateLanguage(false);
    });
  }
  
  if (enIndicator) {
    enIndicator.addEventListener('click', function() {
      updateLanguage(true);
    });
  }

  // Initialize with English
  setTimeout(function() {
    updateLanguage(true);
  }, 100);
});