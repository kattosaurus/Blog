/* Shared social footer, injected into every HTML page during the Pages build.
   Styled with the site's own CSS variables (theme toggle + EN/ES toggle aware). */
(() => {
  const ICONS = {
    x: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    discord: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
    roblox: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M5.164 0 .16 18.836 18.836 24 23.84 5.164zm8.27 15.512-4.946-1.31 1.31-4.946 4.946 1.31z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
  };

  const LINKS = [
    { id: 'x', label: 'X', href: 'https://x.com/kattosauruz' },
    { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@kattosaurus' },
    { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@kattosaurus' },
    { id: 'discord', label: 'Discord', href: 'https://discord.gg/e8GxE4e4Bb' },
    { id: 'roblox', label: 'Roblox', href: 'https://www.roblox.com/users/2008729969/profile' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/kattosaurus' }
  ];

  const footer = document.createElement('footer');
  footer.className = 'social-footer';
  footer.setAttribute('aria-label', 'Social links');
  footer.innerHTML = `
    <div class="social-footer__inner">
      <p class="social-footer__title" data-en="Find me around the internet" data-es="Encuéntrame en internet">Find me around the internet</p>
      <nav aria-label="Social links">
        ${LINKS.map((l) => `
        <a href="${l.href}" target="_blank" rel="noopener noreferrer" data-social="${l.id}" aria-label="${l.label} (opens in a new tab)">
          <span class="social-icon">${ICONS[l.id]}</span>
          <span>${l.label}</span>
        </a>`).join('')}
      </nav>
      <p class="social-footer__copy">© ${new Date().getFullYear()} Katto</p>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .social-footer {
      --sf-bg: var(--header-bg, #000000);
      --sf-text: var(--text-main, #ffffff);
      --sf-muted: var(--text-muted, #ffffff9a);
      --sf-btn: var(--btn-bg, #ffffff20);
      --sf-btn-hover: var(--prof-bg, #ffffff36);
      --sf-accent: var(--colored-button, #434ed4);
      background-color: var(--sf-bg);
      color: var(--sf-text);
      font-family: system-ui, -apple-system, sans-serif;
      margin-top: 40px;
      overflow: hidden;
      padding: 40px 20px 28px;
      position: relative;
      text-align: center;
      transition: background-color .3s ease, color .3s ease;
      width: 100%;
    }
    .social-footer *,
    .social-footer *::before,
    .social-footer *::after { box-sizing: border-box; }
    .social-footer__inner {
      margin: 0 auto;
      max-width: 1100px;
      position: relative;
      z-index: 1;
    }
    .social-footer__title {
      color: var(--sf-muted);
      font-size: 1.25rem;
      font-weight: 300;
      line-height: 1.6;
      margin: 0 0 20px;
      transition: color .3s ease;
    }
    .social-footer nav {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }
    .social-footer a {
      -webkit-tap-highlight-color: transparent;
      align-items: center;
      background-color: var(--sf-btn);
      border-radius: 30px;
      color: var(--btn-text, var(--sf-text));
      display: inline-flex;
      font-size: .9375rem;
      font-weight: 500;
      gap: 10px;
      min-height: 44px;
      padding: 8px 18px 8px 12px;
      text-decoration: none;
      transition: background-color .2s, color .2s, transform .2s;
    }
    .social-footer .social-icon {
      align-items: center;
      display: inline-flex;
      height: 20px;
      justify-content: center;
      width: 20px;
    }
    .social-footer .social-icon svg {
      fill: currentColor;
      height: 18px;
      width: 18px;
    }
    .social-footer a:hover,
    .social-footer a:focus-visible {
      background-color: var(--sf-accent);
      color: #ffffff;
      transform: translateY(-2px);
    }
    .social-footer a:active { transform: scale(.96); }
    .social-footer a:focus-visible {
      outline: 2px solid var(--sf-text);
      outline-offset: 3px;
    }
    .social-footer__copy {
      color: var(--sf-muted);
      font-size: .875rem;
      font-weight: 300;
      margin: 24px 0 0;
      transition: color .3s ease;
    }

    /* Twinkling stars, same look as the page header */
    .social-footer__star {
      animation: social-twinkle var(--duration) infinite ease-in-out;
      background-color: var(--star-color, #ffffff);
      border-radius: 50%;
      filter: var(--star-filter, drop-shadow(0 0 2px rgba(255, 255, 255, .9)));
      pointer-events: none;
      position: absolute;
      transition: background-color .3s, filter .3s;
      will-change: transform, opacity;
    }
    @keyframes social-twinkle {
      0%, 100% { opacity: var(--star-opacity-min, .4); transform: translate3d(0, 0, 0) scale(.8); }
      50% { opacity: 1; transform: translate3d(var(--move-x), var(--move-y), 0) scale(1.2); }
    }

    @media (min-width: 768px) {
      .social-footer__title { font-size: 1.5rem; }
    }
    @media (max-width: 480px) {
      .social-footer { padding: 32px 16px 24px; }
      .social-footer nav { display: grid; grid-template-columns: repeat(2, 1fr); }
      .social-footer a { justify-content: flex-start; }
    }
    @media (prefers-reduced-motion: reduce) {
      .social-footer__star { animation: none; opacity: .6; }
      .social-footer a { transition: background-color .2s, color .2s; }
      .social-footer a:hover, .social-footer a:focus-visible { transform: none; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(footer);

  // Stars (added after layout so they sit behind the content)
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 28; i++) {
    const star = document.createElement('div');
    star.className = 'social-footer__star';
    const size = Math.random() * 1.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--move-x', `${Math.random() * 16 - 8}px`);
    star.style.setProperty('--move-y', `${Math.random() * 16 - 8}px`);
    star.style.setProperty('--duration', `${Math.random() * 3 + 4}s`);
    star.style.animationDelay = `${Math.random() * -4}s`;
    fragment.appendChild(star);
  }
  footer.insertBefore(fragment, footer.firstChild);
})();
