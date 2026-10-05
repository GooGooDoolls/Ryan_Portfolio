const nav = document.querySelector('.nav');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('section, .project, .timeline-item, .skill-group').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});