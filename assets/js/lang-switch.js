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
  let startY = 0;
  let isEnglish = true;
  const minSwipeDistance = 30;
  const maxVerticalMovement = 30;
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
    
    setTimeout(() => {
      if (typeof triggerProjectAnimation === 'function') {
        triggerProjectAnimation();
      }
    }, 50);
  }

  function toggleLanguage() {
    if (isEnglish) {
      switchToChinese();
    } else {
      switchToEnglish();
    }
  }

  // Mouse events
  section.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    console.log('Mouse down at:', startX, startY);
  });

  document.addEventListener('mouseup', function(e) {
    if (!isDragging) return;
    
    const endX = e.clientX;
    const endY = e.clientY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    console.log('Mouse up - deltaX:', deltaX, 'deltaY:', deltaY);
    
    if (absDeltaX > minSwipeDistance && absDeltaY < maxVerticalMovement) {
      console.log('Mouse swipe detected');
      toggleLanguage();
    }
    
    isDragging = false;
  });

  // Touch events
  section.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    console.log('Touch start at:', startX, startY);
  }, { passive: true });

  section.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    console.log('Touch end - deltaX:', deltaX, 'deltaY:', deltaY);
    
    if (absDeltaX > minSwipeDistance && absDeltaY < maxVerticalMovement) {
      console.log('Touch swipe detected');
      toggleLanguage();
    }
    
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
