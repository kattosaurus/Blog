/* Shared social footer, injected into every HTML page during the Pages build. */
(() => {
  const footer = document.createElement('footer');
  footer.className = 'social-footer';
  footer.setAttribute('aria-label', 'Social links');
  footer.innerHTML = `
    <nav aria-label="Social links">
      <a href="https://x.com/kattosauruz" target="_blank" rel="noopener noreferrer" data-social="x" aria-label="X (opens in a new tab)"><span class="social-icon" aria-hidden="true">𝕏</span><span>X</span></a>
      <a href="https://youtube.com/@kattosaurus" target="_blank" rel="noopener noreferrer" data-social="youtube" aria-label="YouTube (opens in a new tab)"><span class="social-icon" aria-hidden="true">▶</span><span>YouTube</span></a>
      <a href="https://tiktok.com/@kattosaurus" target="_blank" rel="noopener noreferrer" data-social="tiktok" aria-label="TikTok (opens in a new tab)"><span class="social-icon" aria-hidden="true">♪</span><span>TikTok</span></a>
      <a href="https://discord.gg/e8GxE4e4Bb" target="_blank" rel="noopener noreferrer" data-social="discord" aria-label="Discord (opens in a new tab)"><span class="social-icon" aria-hidden="true">D</span><span>Discord</span></a>
      <a href="https://www.roblox.com/users/2008729969/profile" target="_blank" rel="noopener noreferrer" data-social="roblox" aria-label="Roblox (opens in a new tab)"><span class="social-icon" aria-hidden="true">R</span><span>Roblox</span></a>
      <a href="https://github.com/kattosaurus" target="_blank" rel="noopener noreferrer" data-social="github" aria-label="GitHub (opens in a new tab)"><span class="social-icon" aria-hidden="true">GH</span><span>GitHub</span></a>
    </nav>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .social-footer {
      --social-text: #f3f4f6;
      border-top: 1px solid rgba(255, 255, 255, .12);
      margin: 3rem auto 0;
      max-width: 1100px;
      padding: 1.5rem 1rem 2rem;
      text-align: center;
    }
    .social-footer nav {
      display: flex;
      flex-wrap: wrap;
      gap: .75rem;
      justify-content: center;
    }
    .social-footer a {
      --social-accent: #a78bfa;
      align-items: center;
      background: rgba(255, 255, 255, .045);
      border: 1px solid rgba(255, 255, 255, .12);
      border-radius: 999px;
      color: var(--social-text);
      display: inline-flex;
      gap: .6rem;
      min-height: 46px;
      padding: .35rem 1rem .35rem .4rem;
      text-decoration: none;
      transition: background-color .2s ease, border-color .2s ease, transform .2s ease;
    }
    .social-footer a[data-social="x"] { --social-accent: #e5e7eb; }
    .social-footer a[data-social="youtube"] { --social-accent: #ff4d5a; }
    .social-footer a[data-social="tiktok"] { --social-accent: #54e6d2; }
    .social-footer a[data-social="discord"] { --social-accent: #8b9bff; }
    .social-footer a[data-social="roblox"] { --social-accent: #ff6b6b; }
    .social-footer a[data-social="github"] { --social-accent: #c4b5fd; }
    .social-footer .social-icon {
      align-items: center;
      background: color-mix(in srgb, var(--social-accent) 17%, transparent);
      border: 1px solid color-mix(in srgb, var(--social-accent) 38%, transparent);
      border-radius: 50%;
      color: var(--social-accent);
      display: inline-flex;
      font-size: .75rem;
      font-weight: 750;
      height: 30px;
      justify-content: center;
      line-height: 1;
      width: 30px;
    }
    .social-footer a:hover {
      background: color-mix(in srgb, var(--social-accent) 12%, rgba(255, 255, 255, .045));
      border-color: color-mix(in srgb, var(--social-accent) 55%, transparent);
      transform: translateY(-2px);
    }
    .social-footer a:focus-visible {
      outline: 2px solid var(--social-accent);
      outline-offset: 3px;
    }
    @media (prefers-reduced-motion: reduce) {
      .social-footer a { transition: none; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(footer);
})();
