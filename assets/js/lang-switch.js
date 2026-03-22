window.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('section');
  const zhElements = document.querySelectorAll('.lang-zh');
  const enElements = document.querySelectorAll('.lang-en');
  const zhLabel = document.querySelector('.zh-label');
  const enLabel = document.querySelector('.en-label');

  if (!section) {
    return;
  }

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let isEnglish = true;
  const minSwipeDistance = 30;
  const maxVerticalMovement = 50;

  function switchToChinese() {
    isEnglish = false;
    
    zhElements.forEach(el => {
      el.style.display = 'block';
    });
    
    enElements.forEach(el => {
      el.style.display = 'none';
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
    isEnglish = true;
    
    zhElements.forEach(el => {
      el.style.display = 'none';
    });
    
    enElements.forEach(el => {
      el.style.display = 'block';
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

  section.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener('mouseup', function(e) {
    if (!isDragging) return;
    
    const endX = e.clientX;
    const endY = e.clientY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    if (absDeltaX > minSwipeDistance && absDeltaY < maxVerticalMovement) {
      toggleLanguage();
    }
    
    isDragging = false;
  });

  section.addEventListener('touchstart', function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
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
    
    if (absDeltaX > minSwipeDistance && absDeltaY < maxVerticalMovement) {
      toggleLanguage();
    }
    
    isDragging = false;
  });

  if (zhLabel) {
    zhLabel.addEventListener('click', function() {
      switchToChinese();
    });
  }
  
  if (enLabel) {
    enLabel.addEventListener('click', function() {
      switchToEnglish();
    });
  }

  setTimeout(function() {
    switchToEnglish();
  }, 100);
});
