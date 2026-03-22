// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  
  // Get elements
  const section = document.querySelector('section');
  const zhElements = document.querySelectorAll('.lang-zh');
  const enElements = document.querySelectorAll('.lang-en');
  const zhLabel = document.querySelector('.zh-label');
  const enLabel = document.querySelector('.en-label');

  console.log('Section found:', !!section);
  console.log('ZH elements found:', zhElements.length);
  console.log('EN elements found:', enElements.length);
  console.log('ZH label found:', !!zhLabel);
  console.log('EN label found:', !!enLabel);

  if (!section) {
    console.error('Missing required elements');
    return;
  }

  let isDragging = false;
  let startX = 0;
  let isEnglish = true;
  const threshold = 100;
  let lastSwitchTime = 0;
  const switchCooldown = 300;

  function switchToChinese() {
    const now = Date.now();
    if (now - lastSwitchTime < switchCooldown) {
      console.log('Switch cooldown active');
      return;
    }
    lastSwitchTime = now;
    
    console.log('Switching to Chinese');
    isEnglish = false;
    
    zhElements.forEach(el => {
      el.style.display = 'block';
      console.log('Showing ZH element');
    });
    
    enElements.forEach(el => {
      el.style.display = 'none';
      console.log('Hiding EN element');
    });
    
    if (zhLabel) zhLabel.classList.add('active');
    if (enLabel) enLabel.classList.remove('active');
    
    // Trigger project animation
    setTimeout(() => {
      if (typeof triggerProjectAnimation === 'function') {
        triggerProjectAnimation();
      }
    }, 50);
  }

  function switchToEnglish() {
    const now = Date.now();
    if (now - lastSwitchTime < switchCooldown) {
      console.log('Switch cooldown active');
      return;
    }
    lastSwitchTime = now;
    
    console.log('Switching to English');
    isEnglish = true;
    
    zhElements.forEach(el => {
      el.style.display = 'none';
      console.log('Hiding ZH element');
    });
    
    enElements.forEach(el => {
      el.style.display = 'block';
      console.log('Showing EN element');
    });
    
    if (zhLabel) zhLabel.classList.remove('active');
    if (enLabel) enLabel.classList.add('active');
    
    // Trigger project animation
    setTimeout(() => {
      if (typeof triggerProjectAnimation === 'function') {
        triggerProjectAnimation();
      }
    }, 50);
  }

  // Mouse events
  section.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    console.log('Mouse down at:', startX);
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    console.log('Mouse move, delta:', deltaX);
    
    if (deltaX > threshold) {
      console.log('Swipe right detected');
      switchToEnglish();
      isDragging = false;
      startX = e.clientX;
    } else if (deltaX < -threshold) {
      console.log('Swipe left detected');
      switchToChinese();
      isDragging = false;
      startX = e.clientX;
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });

  // Touch events
  section.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    console.log('Touch start at:', startX);
  });

  section.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = e.touches[0].clientX - startX;
    console.log('Touch move, delta:', deltaX);
    
    if (deltaX > threshold) {
      console.log('Touch swipe right detected');
      switchToEnglish();
      isDragging = false;
      startX = e.touches[0].clientX;
    } else if (deltaX < -threshold) {
      console.log('Touch swipe left detected');
      switchToChinese();
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
      switchToChinese();
    });
  }
  
  if (enLabel) {
    enLabel.addEventListener('click', function() {
      console.log('EN label clicked');
      switchToEnglish();
    });
  }

  // Initialize with English
  console.log('Initializing with English');
  setTimeout(function() {
    switchToEnglish();
  }, 100);
});