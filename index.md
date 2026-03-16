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
        <ul>
      `;
      job.achievements.forEach(achievement => {
        html += `<li>${achievement}</li>`;
      });
      html += `</ul>`;
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
      html += `
        <div class="project-card" data-delay="${project.delay}">
          <h3><a href="${project.url}">${project.name}</a></h3>
          <p class="project-tech">${project.tech}</p>
          <p>${project.description}</p>
        </div>
      `;
    });
    
    html += `</div>`;
    
    container.innerHTML = html;
  }
  
  renderContent('zh');
  renderContent('en');
});
</script>

<div class="lang-zh"></div>
<div class="lang-en"></div>