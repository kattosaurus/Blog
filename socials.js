/* Shared social footer, injected into every HTML page during the Pages build. */
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
    <p class="social-footer__title">Find me around the internet</p>
    <nav aria-label="Social links">
      ${LINKS.map((l, i) => `
      <a href="${l.href}" target="_blank" rel="noopener noreferrer" data-social="${l.id}" aria-label="${l.label} (opens in a new tab)" style="--i:${i}">
        <span class="social-icon">${ICONS[l.id]}</span>
        <span class="social-label">${l.label}</span>
      </a>`).join('')}
    </nav>
    <p class="social-footer__copy">© ${new Date().getFullYear()} kattosaurus</p>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .social-footer {
      --social-text: #f3f4f6;
      --social-muted: rgba(243, 244, 246, .55);
      isolation: isolate;
      margin: 4rem auto 0;
      max-width: 1100px;
      padding: 2.75rem 1rem 2rem;
      position: relative;
      text-align: center;
    }
    /* Glowing gradient divider that fades out at the edges */
    .social-footer::before {
      background: linear-gradient(90deg, transparent, #a78bfa 30%, #54e6d2 50%, #ff6b9d 70%, transparent);
      content: "";
      height: 1px;
      left: 8%;
      opacity: .7;
      position: absolute;
      right: 8%;
      top: 0;
    }
    /* Soft ambient glow behind the footer */
    .social-footer::after {
      background:
        radial-gradient(40% 100% at 30% 0%, rgba(167, 139, 250, .16), transparent 70%),
        radial-gradient(40% 100% at 70% 0%, rgba(84, 230, 210, .10), transparent 70%);
      content: "";
      height: 140px;
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;
    }
    .social-footer__title {
      color: var(--social-muted);
      font-size: .78rem;
      font-weight: 600;
      letter-spacing: .18em;
      margin: 0 0 1.4rem;
      text-transform: uppercase;
    }
    .social-footer__copy {
      color: var(--social-muted);
      font-size: .8rem;
      margin: 1.75rem 0 0;
    }
    .social-footer nav {
      display: flex;
      flex-wrap: wrap;
      gap: .7rem;
      justify-content: center;
    }
    .social-footer a {
      --social-accent: #a78bfa;
      --mx: 50%;
      --my: 50%;
      align-items: center;
      -webkit-backdrop-filter: blur(14px) saturate(140%);
      backdrop-filter: blur(14px) saturate(140%);
      background: linear-gradient(145deg, rgba(255, 255, 255, .07), rgba(255, 255, 255, .02));
      border-radius: 16px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, .25), inset 0 1px 0 rgba(255, 255, 255, .06);
      color: var(--social-text);
      display: inline-flex;
      font-size: .92rem;
      font-weight: 550;
      gap: .65rem;
      isolation: isolate;
      min-height: 48px;
      overflow: hidden;
      padding: .45rem 1.05rem .45rem .5rem;
      position: relative;
      text-decoration: none;
      transition: transform .3s cubic-bezier(.2, .8, .2, 1), box-shadow .3s ease;
    }
    /* Gradient border that lights up on hover */
    .social-footer a::before {
      background: linear-gradient(135deg, rgba(255, 255, 255, .16), var(--social-accent) 55%, rgba(255, 255, 255, .06));
      border-radius: inherit;
      content: "";
      inset: 0;
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
      opacity: .35;
      padding: 1px;
      pointer-events: none;
      position: absolute;
      transition: opacity .3s ease;
      z-index: 1;
    }
    /* Spotlight that follows the cursor */
    .social-footer a::after {
      background: radial-gradient(120px circle at var(--mx) var(--my), color-mix(in srgb, var(--social-accent) 30%, transparent), transparent 70%);
      content: "";
      inset: 0;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transition: opacity .3s ease;
      z-index: -1;
    }
    .social-footer a[data-social="x"] { --social-accent: #e5e7eb; }
    .social-footer a[data-social="youtube"] { --social-accent: #ff4d5a; }
    .social-footer a[data-social="tiktok"] { --social-accent: #54e6d2; }
    .social-footer a[data-social="discord"] { --social-accent: #8b9bff; }
    .social-footer a[data-social="roblox"] { --social-accent: #ff6b6b; }
    .social-footer a[data-social="github"] { --social-accent: #c4b5fd; }
    .social-footer .social-icon {
      align-items: center;
      background: linear-gradient(145deg, color-mix(in srgb, var(--social-accent) 28%, transparent), color-mix(in srgb, var(--social-accent) 8%, transparent));
      border-radius: 11px;
      color: var(--social-accent);
      display: inline-flex;
      height: 34px;
      justify-content: center;
      transition: transform .3s cubic-bezier(.2, .8, .2, 1), background-color .3s ease;
      width: 34px;
    }
    .social-footer .social-icon svg {
      fill: currentColor;
      height: 17px;
      width: 17px;
    }
    .social-footer a:hover,
    .social-footer a:focus-visible {
      box-shadow: 0 12px 28px rgba(0, 0, 0, .35), 0 0 24px color-mix(in srgb, var(--social-accent) 22%, transparent), inset 0 1px 0 rgba(255, 255, 255, .1);
      transform: translateY(-4px);
    }
    .social-footer a:hover::before,
    .social-footer a:focus-visible::before { opacity: 1; }
    .social-footer a:hover::after,
    .social-footer a:focus-visible::after { opacity: 1; }
    .social-footer a:hover .social-icon,
    .social-footer a:focus-visible .social-icon { transform: scale(1.1) rotate(-6deg); }
    .social-footer a:active { transform: translateY(-1px) scale(.98); }
    .social-footer a:focus-visible {
      outline: 2px solid var(--social-accent);
      outline-offset: 3px;
    }
    /* Staggered entrance */
    .social-footer.is-ready a {
      opacity: 0;
      transform: translateY(14px);
    }
    .social-footer.is-ready.is-visible a {
      animation: social-rise .6s cubic-bezier(.2, .8, .2, 1) both;
      animation-delay: calc(var(--i) * 70ms);
    }
    @keyframes social-rise {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 520px) {
      .social-footer nav { display: grid; gap: .6rem; grid-template-columns: repeat(2, 1fr); }
      .social-footer a { justify-content: flex-start; }
    }
    @media (prefers-reduced-motion: reduce) {
      .social-footer a, .social-footer .social-icon, .social-footer a::before, .social-footer a::after { transition: none; }
      .social-footer.is-ready a { animation: none !important; opacity: 1; transform: none; }
      .social-footer a:hover, .social-footer a:focus-visible { transform: none; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(footer);

  // Cursor-following spotlight on each link
  footer.querySelectorAll('a').forEach((a) => {
    a.addEventListener('pointermove', (e) => {
      const r = a.getBoundingClientRect();
      a.style.setProperty('--mx', `${e.clientX - r.left}px`);
      a.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // Reveal animation when the footer scrolls into view
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    footer.classList.add('is-ready');
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        footer.classList.add('is-visible');
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(footer);
  }
})();
