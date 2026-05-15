(async function () {
  if (document.readyState === 'loading') {
    await new Promise(r =>
      document.addEventListener('DOMContentLoaded', r, { once: true })
    );
  }

  const contactPanel = document.getElementById('contact');
  const grid = contactPanel.querySelector('.grid-container');
  if (!grid) return;

  /* ── Inject category tab styles ── */
  const style = document.createElement('style');
  style.textContent = `
    .portfolio-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 1.25rem;
    }
    .portfolio-tab-btn {
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.4px;
      padding: 6px 16px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.05);
      color: #bbb;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
    }
    .portfolio-tab-btn:hover {
      background: rgba(255,255,255,0.12);
      color: #fff;
      transform: translateY(-1px);
    }
    .portfolio-tab-btn.active {
      background: rgba(255,255,255,0.18);
      border-color: rgba(255,255,255,0.45);
      color: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.25);
    }
    .grid-item { transition: opacity 0.25s, transform 0.25s; }
    .grid-item.hidden { display: none; }
  `;
  document.head.appendChild(style);

  /* ── Helpers ── */
  function createMediaItem(entry) {
    return new Promise((resolve) => {
      const { file, category } = entry;
      const lower = file.toLowerCase();
      const item = document.createElement('div');
      item.className = 'grid-item';
      item.dataset.category = category;
      const path = `portfolio/${file}`;

      if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
        const img = new Image();
        img.src = path;
        img.loading = 'lazy';
        resolve({ element: item });
        img.onload = () => {
          const ratio = img.naturalWidth / img.naturalHeight;
          if (ratio > 1.2)      item.classList.add('orientation-landscape');
          else if (ratio < 0.8) item.classList.add('orientation-portrait');
          else                  item.classList.add('orientation-square');
        };
        img.onerror = () => item.remove();
        item.appendChild(img);
      }
      else if (lower.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = path;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          const ratio = video.videoWidth / video.videoHeight || 1.77;
          if (ratio > 1.2)      item.classList.add('orientation-landscape');
          else if (ratio < 0.8) item.classList.add('orientation-portrait');
          else                  item.classList.add('orientation-square');
          resolve({ element: item });
          video.play().catch(() => {});
        };
        video.onerror = () => resolve(null);
        item.appendChild(video);
      }
      else {
        resolve(null);
      }
    });
  }

  /* ── Filter logic ── */
  function applyFilter(activeCategory) {
    const items = grid.querySelectorAll('.grid-item');
    items.forEach(item => {
      const match = activeCategory === 'All' || item.dataset.category === activeCategory;
      item.classList.toggle('hidden', !match);
    });
  }

  /* ── Main loader ── */
  async function loadManifest() {
    try {
      const res = await fetch('portfolio/manifest.json', { cache: 'no-cache' });
      const entries = await res.json();

      /* Build ordered unique category list (preserve first-seen order) */
      const categories = ['All', ...new Set(entries.map(e => e.category).filter(Boolean))];

      /* ── Render tab bar ── */
      const tabBar = document.createElement('div');
      tabBar.className = 'portfolio-tabs';
      tabBar.setAttribute('role', 'tablist');
      tabBar.setAttribute('aria-label', 'Portfolio categories');

      let activeCategory = 'All';

      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'portfolio-tab-btn' + (cat === 'All' ? ' active' : '');
        btn.textContent = cat;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', cat === 'All' ? 'true' : 'false');
        btn.addEventListener('click', () => {
          activeCategory = cat;
          tabBar.querySelectorAll('.portfolio-tab-btn').forEach(b => {
            const isActive = b.textContent === cat;
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          });
          applyFilter(activeCategory);
        });
        tabBar.appendChild(btn);
      });

      /* Insert tab bar just before the grid */
      grid.parentElement.insertBefore(tabBar, grid);

      /* ── Populate grid ── */
      grid.innerHTML = '';
      const chunkSize = 5;
      for (let i = 0; i < entries.length; i += chunkSize) {
        const chunk = entries.slice(i, i + chunkSize);
        const results = await Promise.all(chunk.map(e => createMediaItem(e)));
        results.forEach(result => {
          if (!result) return;
          grid.appendChild(result.element);
        });
      }

      applyFilter('All');

    } catch (err) {
      console.error(err);
      grid.innerHTML = '<p>Could not load portfolio.</p>';
    }
  }

  loadManifest();
})();(async function () {
  if (document.readyState === 'loading') {
    await new Promise(r =>
      document.addEventListener('DOMContentLoaded', r, { once: true })
    );
  }

  const grid = document.querySelector('#contact .grid-container');
  if (!grid) return;

  function createMediaItem(filename) {
    return new Promise((resolve) => {
      const lower = filename.toLowerCase();
      const item = document.createElement('div');
      item.className = 'grid-item';
      const path = `portfolio/${filename}`;

      // ---------- IMAGES ----------
      if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
        const img = new Image();
        img.src = path;
        img.loading = 'lazy';

        // IMPORTANT: resolve immediately
        resolve({ element: item, ratio: 1 });

        img.onload = () => {
          const ratio = img.naturalWidth / img.naturalHeight;

          item.classList.remove(
            'orientation-landscape',
            'orientation-portrait',
            'orientation-square'
          );

          if (ratio > 1.2) item.classList.add('orientation-landscape');
          else if (ratio < 0.8) item.classList.add('orientation-portrait');
          else item.classList.add('orientation-square');
        };

        img.onerror = () => item.remove();
        item.appendChild(img);
      }

      // ---------- VIDEOS ----------
      else if (lower.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = path;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';

        video.onloadedmetadata = () => {
          const ratio = video.videoWidth / video.videoHeight || 1.77;
          resolve({ element: item, ratio });
          video.play().catch(() => {});
        };

        video.onerror = () => resolve(null);
        item.appendChild(video);
      }

      else {
        resolve(null);
      }
    });
  }

  async function loadManifest() {
    try {
      const res = await fetch('portfolio/manifest.json', { cache: 'no-cache' });
      const files = await res.json();

      grid.innerHTML = '';

      const chunkSize = 5;

      for (let i = 0; i < files.length; i += chunkSize) {
        const chunk = files.slice(i, i + chunkSize);

        const results = await Promise.all(
          chunk.map(file => createMediaItem(file))
        );

        results.forEach(item => {
          if (!item) return;

          const { element, ratio } = item;

          // Videos get orientation immediately
          if (ratio > 1.2) element.classList.add('orientation-landscape');
          else if (ratio < 0.8) element.classList.add('orientation-portrait');
          else element.classList.add('orientation-square');

          grid.appendChild(element);
        });
      }

    } catch (err) {
      console.error(err);
      grid.innerHTML = '<p>Could not load portfolio.</p>';
    }
  }

  loadManifest();
})();
