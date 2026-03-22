document.addEventListener('DOMContentLoaded', function() {
  const toggleInput = document.getElementById('lang-toggle');
  const zhElements = document.querySelectorAll('.lang-zh');
  const enElements = document.querySelectorAll('.lang-en');
  const zhLabel = document.querySelector('.zh-label');
  const enLabel = document.querySelector('.en-label');

  if (!toggleInput) return;

  function switchLanguage(lang) {
    if (lang === 'zh') {
      zhElements.forEach(el => el.style.display = 'block');
      enElements.forEach(el => el.style.display = 'none');
      toggleInput.checked = false;
      if (zhLabel) zhLabel.classList.add('active');
      if (enLabel) enLabel.classList.remove('active');
    } else {
      zhElements.forEach(el => el.style.display = 'none');
      enElements.forEach(el => el.style.display = 'block');
      toggleInput.checked = true;
      if (zhLabel) zhLabel.classList.remove('active');
      if (enLabel) enLabel.classList.add('active');
    }
    
    // Trigger project animation after language switch
    setTimeout(() => {
      if (typeof triggerProjectAnimation === 'function') {
        triggerProjectAnimation();
      }
    }, 50);
  }

  toggleInput.addEventListener('change', (e) => {
    const lang = e.target.checked ? 'en' : 'zh';
    switchLanguage(lang);
  });

  // Initialize with English
  setTimeout(() => {
    switchLanguage('en');
  }, 100);
});