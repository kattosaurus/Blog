/* Shared social footer, injected into every HTML page during the Pages build. */
(() => {
  const footer = document.createElement('footer');
  footer.className = 'social-footer';
  footer.setAttribute('aria-label', 'Social links');
  footer.innerHTML = `
    <nav aria-label="Social links">
      <a href="https://x.com/kattosauruz" target="_blank" rel="noopener noreferrer">X</a>
      <a href="https://youtube.com/@kattosaurus" target="_blank" rel="noopener noreferrer">YouTube</a>
      <a href="https://tiktok.com/@kattosaurus" target="_blank" rel="noopener noreferrer">TikTok</a>
      <a href="https://discord.gg/e8GxE4e4Bb" target="_blank" rel="noopener noreferrer">Discord</a>
      <a href="https://www.roblox.com/users/2008729969/profile" target="_blank" rel="noopener noreferrer">Roblox</a>
      <a href="https://github.com/kattosaurus" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .social-footer {
      border-top: 1px solid currentColor;
      margin: 2rem auto 0;
      max-width: 1100px;
      opacity: .8;
      padding: 1.5rem 1rem 2rem;
      text-align: center;
    }
    .social-footer nav {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem 1.25rem;
      justify-content: center;
    }
    .social-footer a {
      align-items: center;
      color: inherit;
      display: inline-flex;
      min-height: 44px;
      padding: .25rem;
      text-decoration: none;
    }
    .social-footer a:hover, .social-footer a:focus-visible {
      opacity: .7;
      text-decoration: underline;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(footer);
})();
