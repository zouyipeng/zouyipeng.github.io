document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('section');
  const zhElements = document.querySelectorAll('.lang-zh');
  const enElements = document.querySelectorAll('.lang-en');
  const zhLabel = document.querySelector('.zh-label');
  const enLabel = document.querySelector('.en-label');

  console.log('Language switch initialized');
  console.log('ZH elements:', zhElements.length);
  console.log('EN elements:', enElements.length);

  if (!section || !zhElements.length || !enElements.length) {
    console.error('Missing required elements');
    return;
  }

  let isDragging = false;
  let startX = 0;
  let isEnglish = true;

  function updateLanguage(english) {
    console.log('Switching to:', english ? 'English' : 'Chinese');
    isEnglish = english;
    
    if (english) {
      zhElements.forEach(el => el.style.display = 'none');
      enElements.forEach(el => el.style.display = 'block');
      if (zhLabel) zhLabel.classList.remove('active');
      if (enLabel) enLabel.classList.add('active');
    } else {
      zhElements.forEach(el => el.style.display = 'block');
      enElements.forEach(el => el.style.display = 'none');
      if (zhLabel) zhLabel.classList.add('active');
      if (enLabel) enLabel.classList.remove('active');
    }
    
    // Trigger project animation
    setTimeout(() => {
      if (typeof triggerProjectAnimation === 'function') {
        triggerProjectAnimation();
      }
    }, 50);
  }

  // Mouse events on section
  section.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    console.log('Mouse down at:', startX);
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const threshold = 50;
    
    if (deltaX > threshold) {
      console.log('Swipe right detected');
      updateLanguage(true);
      isDragging = false;
      startX = e.clientX;
    } else if (deltaX < -threshold) {
      console.log('Swipe left detected');
      updateLanguage(false);
      isDragging = false;
      startX = e.clientX;
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });

  // Touch events on section
  section.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    console.log('Touch start at:', startX);
  });

  section.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = e.touches[0].clientX - startX;
    const threshold = 50;
    
    if (deltaX > threshold) {
      console.log('Touch swipe right detected');
      updateLanguage(true);
      isDragging = false;
      startX = e.touches[0].clientX;
    } else if (deltaX < -threshold) {
      console.log('Touch swipe left detected');
      updateLanguage(false);
      isDragging = false;
      startX = e.touches[0].clientX;
    }
  });

  section.addEventListener('touchend', function() {
    isDragging = false;
  });

  // Click on labels
  if (zhLabel) {
    zhLabel.addEventListener('click', function() {
      console.log('ZH label clicked');
      updateLanguage(false);
    });
  }
  
  if (enLabel) {
    enLabel.addEventListener('click', function() {
      console.log('EN label clicked');
      updateLanguage(true);
    });
  }

  // Initialize with English
  console.log('Initializing with English');
  setTimeout(function() {
    updateLanguage(true);
  }, 100);
});