---
layout: default
---

<script>
document.addEventListener('DOMContentLoaded', function() {
  const content = {{ site.data.content | jsonify }};
  
  function renderContent(lang) {
    const data = content[lang];
    if (!data) return;
    
    const container = document.querySelector(`.lang-${lang}`);
    if (!container) return;
    
    let html = `
      <h1>${data.title}</h1>
      <p>${data.description}</p>
      <hr>
      <h2>${data.experience.title}</h2>
    `;
    
    data.experience.jobs.forEach(job => {
      html += `
        <h3>${job.period}</h3>
        <p><strong>${job.title}</strong> | ${job.company}</p>
      `;
      if (job.achievements && job.achievements.length > 0) {
        html += `<ul>`;
        job.achievements.forEach(achievement => {
          html += `<li>${achievement}</li>`;
        });
        html += `</ul>`;
      }
    });
    
    html += `
      <hr>
      <h2>${data.education.title}</h2>
    `;
    
    data.education.degrees.forEach(degree => {
      html += `
        <h3>${degree.period}</h3>
        <p><strong>${degree.degree}</strong> | ${degree.university}</p>
      `;
      if (degree.thesis) {
        html += `<p>${degree.thesis}</p>`;
      }
    });
    
    html += `
      <hr>
      <h2>${data.projects.title}</h2>
      <div class="projects-section">
    `;
    
    data.projects.items.forEach(project => {
      const projectTitle = project.url 
        ? `<h3><a href="${project.url}" target="_blank">${project.name}</a></h3>`
        : `<h3>${project.name}</h3>`;
      
      html += `
        <div class="project-card" data-delay="${project.delay}">
          ${projectTitle}
          <p class="project-tech">${project.tech}</p>
          <p>${project.description}</p>
        </div>
      `;
    });
    
    html += `</div>`;
    
    if (data.Highlights && data.Highlights.items && data.Highlights.items.length > 0) {
      html += `
        <hr>
        <h2>${data.Highlights.title}</h2>
        <div class="highlights-section">
      `;
      
      data.Highlights.items.forEach(highlight => {
        const titleHtml = highlight.url 
          ? `<h4><a href="${highlight.url}" target="_blank">${highlight.title}</a></h4>`
          : `<h4>${highlight.title}</h4>`;
        
        html += `
          <div class="highlight-item">
            <span class="highlight-icon">⭐</span>
            <div class="highlight-content">
              ${titleHtml}
              ${highlight.journal ? `<p class="highlight-meta">${highlight.journal} (${highlight.year})</p>` : ''}
              ${highlight.year && !highlight.journal ? `<p class="highlight-meta">${highlight.year}</p>` : ''}
              ${highlight.description ? `<p class="highlight-desc">${highlight.description}</p>` : ''}
            </div>
          </div>
        `;
      });
      
      html += `</div>`;
    }
    
    container.innerHTML = html;
  }
  
  renderContent('zh');
  renderContent('en');
  
  // Trigger project animation after content is rendered
  setTimeout(() => {
    if (typeof triggerProjectAnimation === 'function') {
      triggerProjectAnimation();
    }
  }, 200);
});
</script>

<div class="lang-zh"></div>
<div class="lang-en"></div>