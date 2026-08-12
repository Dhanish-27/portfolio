/**
 * DHANISH G. — DEVELOPER WORKSPACE & PORTFOLIO
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initCommandPalette();
  initModals();
  initGitHubStats();
  initContactForm();
  initSmoothScroll();
  initSectionObserver();
  initScrollChoreography();
  initNetworkBackground();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Active Section Tracker
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

function initScrollChoreography() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  if (!animatedElements.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    animatedElements.forEach((el) => el.classList.add('aos-animate'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      const delay = el.getAttribute('data-aos-delay') || 0;

      if (entry.isIntersecting) {
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(delay, 10));
      } else {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          el.classList.remove('aos-animate');
        }
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   2. Mobile Menu Controller
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menuOverlay = document.getElementById('mobile-menu-overlay');

  if (!toggleBtn || !menuOverlay) return;

  const toggleMenu = () => {
    const isOpen = menuOverlay.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  menuOverlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   3. Global Command Palette (`Ctrl + K` / `Cmd + K`)
   -------------------------------------------------------------------------- */
const COMMAND_ITEMS = [
  { id: 'devlan', title: 'Featured Project: DEVLAN', category: 'Project', action: () => openDevlanCaseStudy() },
  { id: 'work', title: 'Work / Selected Projects', category: 'Section', action: () => scrollToSection('work') },
  { id: 'lab', title: 'Lab / Experimental Notebook', category: 'Section', action: () => scrollToSection('lab') },
  { id: 'notes', title: 'Engineering Notes', category: 'Section', action: () => scrollToSection('notes') },
  { id: 'about', title: 'About Dhanish G.', category: 'Section', action: () => scrollToSection('about') },
  { id: 'contact', title: 'Get In Touch / Contact', category: 'Section', action: () => scrollToSection('contact') },
  { id: 'pdf-pii', title: 'PDF PII Identifier', category: 'Project', action: () => scrollToSection('work') },
  { id: 'campus-guard', title: 'CampusGuard Hostel System', category: 'Project', action: () => scrollToSection('work') },
  { id: 'razor-rental', title: 'Razor Rental Platform', category: 'Project', action: () => scrollToSection('work') },
  { id: 'github', title: 'GitHub Profile (External ↗)', category: 'Link', action: () => window.open('https://github.com/Dhanish-27', '_blank') },
  { id: 'linkedin', title: 'LinkedIn Profile (External ↗)', category: 'Link', action: () => window.open('https://www.linkedin.com/in/dhanish-g-730559376/', '_blank') },
  { id: 'resume', title: 'View Resume PDF (PDF ↗)', category: 'File', action: () => window.open('Resume.pdf', '_blank') }
];

function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const triggerBtns = document.querySelectorAll('.trigger-cmd-palette');
  const input = document.getElementById('cmd-search-input');
  const resultsList = document.getElementById('cmd-results-list');

  if (!modal || !input || !resultsList) return;

  let selectedIndex = 0;
  let filteredItems = [...COMMAND_ITEMS];

  const openPalette = () => {
    modal.classList.add('active');
    input.value = '';
    selectedIndex = 0;
    renderResults(COMMAND_ITEMS);
    setTimeout(() => input.focus(), 50);
  };

  const closePalette = () => {
    modal.classList.remove('active');
  };

  triggerBtns.forEach((btn) => btn.addEventListener('click', openPalette));

  // Keybindings
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('active') ? closePalette() : openPalette();
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePalette();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    filteredItems = COMMAND_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    );
    selectedIndex = 0;
    renderResults(filteredItems);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredItems.length) {
        selectedIndex = (selectedIndex + 1) % filteredItems.length;
        updateSelection();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredItems.length) {
        selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
        updateSelection();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        closePalette();
      }
    }
  });

  function renderResults(items) {
    if (!items.length) {
      resultsList.innerHTML = `<li class="cmd-item" style="color: var(--text-muted); cursor: default;">No matching results found.</li>`;
      return;
    }

    resultsList.innerHTML = items
      .map(
        (item, idx) => `
        <li class="cmd-item ${idx === selectedIndex ? 'selected' : ''}" data-index="${idx}">
          <span>${escapeHtml(item.title)}</span>
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">${escapeHtml(item.category)}</span>
        </li>
      `
      )
      .join('');

    resultsList.querySelectorAll('.cmd-item').forEach((el) => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        if (items[idx]) {
          items[idx].action();
          closePalette();
        }
      });
    });
  }

  function updateSelection() {
    const items = resultsList.querySelectorAll('.cmd-item');
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Modals Controller (DEVLAN Case Study & Engineering Notes)
   -------------------------------------------------------------------------- */
function initModals() {
  const caseStudyModal = document.getElementById('case-study-modal');
  const triggerDevlanBtns = document.querySelectorAll('.trigger-devlan-modal');
  const closeBtns = document.querySelectorAll('.close-modal-btn');

  triggerDevlanBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDevlanCaseStudy();
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  [caseStudyModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });
}

function openDevlanCaseStudy() {
  const caseStudyModal = document.getElementById('case-study-modal');
  if (caseStudyModal) {
    caseStudyModal.classList.add('active');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('active'));
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* --------------------------------------------------------------------------
   5. Real GitHub Stats Fetcher
   -------------------------------------------------------------------------- */
async function initGitHubStats() {
  const repoCountEl = document.getElementById('gh-repo-count');
  const followerCountEl = document.getElementById('gh-follower-count');

  if (!repoCountEl) return;

  try {
    const res = await fetch('https://api.github.com/users/Dhanish-27');
    if (res.ok) {
      const data = await res.json();
      if (data.public_repos !== undefined) {
        repoCountEl.textContent = data.public_repos;
      }
      if (data.followers !== undefined && followerCountEl) {
        followerCountEl.textContent = data.followers;
      }
    }
  } catch (err) {
    console.log('GitHub API offline/rate-limited; using fallback stats.');
  }
}

/* --------------------------------------------------------------------------
   6. Contact Form Simulator
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('workspace-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = `<span class="font-mono">Sending...</span>`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<span class="font-mono">✓ Message Sent!</span>`;
      btn.style.background = 'var(--accent-emerald)';
      btn.style.color = '#000';
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
      }, 3500);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   7. Smooth Scroll Anchor Handling
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

/* --------------------------------------------------------------------------
   8. Premium Interactive Network Particle Visualization System
   -------------------------------------------------------------------------- */
class InteractiveNetworkBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    // Accessibility check
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Simulation Data & Tiers
    this.width = 0;
    this.height = 0;
    this.dpr = 1;
    this.nodes = [];
    this.pulses = [];
    this.cursorTrails = [];

    // Interaction Tracking
    this.mouse = {
      x: null,
      y: null,
      lastX: null,
      lastY: null,
      speed: 0,
      lastMoveTime: 0,
      isHovering: false,
      hoverTimer: null
    };

    // Parallax Scroll Tracking
    this.lastScrollY = window.scrollY;

    // Section Awareness State
    this.currentSection = 'hero';
    this.targetActivity = 1.0;
    this.currentActivity = 1.0;

    // System Event Timers
    this.lastEventTime = performance.now();
    this.nextEventInterval = 4000 + Math.random() * 3000;
    this.lastPulseSpawnTime = 0;

    // Accent Color Palette (#00f090 fallback)
    this.accentRgb = { r: 0, g: 240, b: 144 };

    this.init();
  }

  init() {
    this.updateAccentColor();
    this.handleResize();

    // Event Listeners
    window.addEventListener('resize', () => this.handleResize(), { passive: true });
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    if (!this.reducedMotion) {
      window.addEventListener('pointermove', (e) => this.handlePointerMove(e), { passive: true });
      window.addEventListener('pointerleave', () => this.handlePointerLeave(), { passive: true });
      window.addEventListener('blur', () => this.handlePointerLeave(), { passive: true });

      // Reduced Motion toggle listener
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.addEventListener) {
        motionQuery.addEventListener('change', (e) => {
          this.reducedMotion = e.matches;
          if (this.reducedMotion) {
            this.renderStaticFrame();
          } else {
            this.animate();
          }
        });
      }
    }

    // Auto-pause when tab is backgrounded
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !this.reducedMotion) {
        this.animate();
      }
    });

    // Observe active sections for dynamic activity modulation
    this.initSectionObserver();

    // Start Simulation
    if (this.reducedMotion) {
      this.renderStaticFrame();
    } else {
      this.animate();
    }
  }

  updateAccentColor() {
    const emerald = getComputedStyle(document.documentElement).getPropertyValue('--accent-emerald').trim();
    if (emerald && emerald.startsWith('#')) {
      const hex = emerald.substring(1);
      if (hex.length === 6) {
        this.accentRgb = {
          r: parseInt(hex.substring(0, 2), 16),
          g: parseInt(hex.substring(2, 4), 16),
          b: parseInt(hex.substring(4, 6), 16)
        };
      }
    }
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.createNodes();
  }

  createNodes() {
    // Increased particle counts (+75%) across device tiers
    let targetCount = 96; // Desktop (up from 55)
    if (this.width < 640) {
      targetCount = 35; // Mobile (up from 20)
    } else if (this.width < 1024) {
      targetCount = 60; // Tablet (up from 35)
    }

    this.nodes = [];
    for (let i = 0; i < targetCount; i++) {
      const randLayer = Math.random();
      let layer = 0;
      let radius = 1.2;
      let baseOpacity = 0.14;
      let speedMult = 0.2;
      let maxConn = 2;

      if (randLayer > 0.85) {
        layer = 2; // Foreground layer
        radius = 2.4 + Math.random() * 0.8;
        baseOpacity = 0.44 + Math.random() * 0.26;
        speedMult = 0.5 + Math.random() * 0.3;
        maxConn = 10;
      } else if (randLayer > 0.5) {
        layer = 1; // Middle layer
        radius = 1.6 + Math.random() * 0.5;
        baseOpacity = 0.24 + Math.random() * 0.14;
        speedMult = 0.3 + Math.random() * 0.2;
        maxConn = 8;
      } else {
        // Background layer
        layer = 0;
        radius = 1.2 + Math.random() * 0.3;
        baseOpacity = 0.14 + Math.random() * 0.10;
        speedMult = 0.2 + Math.random() * 0.2;
        maxConn = 5;
      }

      const angle = Math.random() * Math.PI * 2;

      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        layer: layer,
        radius: radius,
        baseRadius: radius,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        targetOpacity: baseOpacity,
        vx: Math.cos(angle) * speedMult,
        vy: Math.sin(angle) * speedMult,
        baseVx: Math.cos(angle) * speedMult,
        baseVy: Math.sin(angle) * speedMult,
        wanderAngle: angle,
        wanderSpeed: 0.01 + Math.random() * 0.02,
        pulseGlow: 0,
        maxConnections: maxConn,
        activeConnectionsCount: 0
      });
    }
  }

  handlePointerMove(e) {
    if (this.width < 640) return; // Disable cursor force field on mobile

    const now = performance.now();
    const currentX = e.clientX;
    const currentY = e.clientY;

    if (this.mouse.lastX !== null && this.mouse.lastY !== null) {
      const dx = currentX - this.mouse.lastX;
      const dy = currentY - this.mouse.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      this.mouse.speed = this.mouse.speed * 0.6 + dist * 0.4;

      // Fast cursor movement -> Trigger temporary data pulse & residue trail
      if (this.mouse.speed > 16 && now - this.lastPulseSpawnTime > 400) {
        this.spawnDataPulseAtCursor(currentX, currentY);
        this.spawnCursorTrail(currentX, currentY);
        this.lastPulseSpawnTime = now;
      }
    }

    this.mouse.x = currentX;
    this.mouse.y = currentY;
    this.mouse.lastX = currentX;
    this.mouse.lastY = currentY;
    this.mouse.lastMoveTime = now;
    this.mouse.isHovering = false;

    clearTimeout(this.mouse.hoverTimer);
    this.mouse.hoverTimer = setTimeout(() => {
      if (this.mouse.x !== null) {
        this.mouse.isHovering = true;
        this.triggerHoverReaction();
      }
    }, 150);
  }

  handlePointerLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
    this.mouse.lastX = null;
    this.mouse.lastY = null;
    this.mouse.speed = 0;
    this.mouse.isHovering = false;
    clearTimeout(this.mouse.hoverTimer);
  }

  handleScroll() {
    const currentScroll = window.scrollY;
    const deltaY = currentScroll - this.lastScrollY;
    this.lastScrollY = currentScroll;

    if (Math.abs(deltaY) < 0.1 || this.reducedMotion) return;

    // Passive vertical parallax shift based on depth layer
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const factor = (node.layer + 1) * 0.04;
      node.y -= deltaY * factor;

      if (node.y < -20) node.y += this.height + 40;
      if (node.y > this.height + 20) node.y -= this.height + 40;
    }
  }

  initSectionObserver() {
    const targets = document.querySelectorAll('section[id], .devlan-featured-card');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id') || 'devlan';
          this.setSectionActivity(id);
        }
      });
    }, { threshold: 0.2 });

    targets.forEach((target) => observer.observe(target));
  }

  setSectionActivity(sectionId) {
    this.currentSection = sectionId;
    switch (sectionId) {
      case 'hero':
        this.targetActivity = 1.0;
        break;
      case 'work':
      case 'projects':
        this.targetActivity = 1.2;
        break;
      case 'lab':
      case 'devlan':
        this.targetActivity = 1.5; // DEVLAN special higher activity
        break;
      case 'notes':
        this.targetActivity = 1.0;
        break;
      case 'about':
        this.targetActivity = 0.8;
        break;
      case 'contact':
        this.targetActivity = 0.6;
        break;
      default:
        this.targetActivity = 1.0;
    }
  }

  spawnDataPulseAtCursor(cx, cy) {
    if (!this.nodes.length) return;
    let closestNodeA = null;
    let closestNodeB = null;
    let minDistance = 200;

    for (let i = 0; i < this.nodes.length; i++) {
      const nA = this.nodes[i];
      const dA = Math.hypot(nA.x - cx, nA.y - cy);
      if (dA < minDistance) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const nB = this.nodes[j];
          const distAB = Math.hypot(nA.x - nB.x, nA.y - nB.y);
          if (distAB < 150) {
            closestNodeA = nA;
            closestNodeB = nB;
            minDistance = dA;
          }
        }
      }
    }

    if (closestNodeA && closestNodeB && this.pulses.length < 3) {
      this.pulses.push({
        nodeA: closestNodeA,
        nodeB: closestNodeB,
        progress: 0,
        speed: 0.02 + Math.random() * 0.02,
        intensity: 0.8
      });
    }
  }

  spawnCursorTrail(cx, cy) {
    if (this.cursorTrails.length > 8) return;
    for (let i = 0; i < 2; i++) {
      this.cursorTrails.push({
        x: cx + (Math.random() - 0.5) * 12,
        y: cy + (Math.random() - 0.5) * 12,
        radius: 1.0 + Math.random() * 0.8,
        opacity: 0.2,
        decay: 0.04 + Math.random() * 0.03
      });
    }
  }

  triggerHoverReaction() {
    if (this.mouse.x === null || this.mouse.y === null) return;
    const mx = this.mouse.x;
    const my = this.mouse.y;

    let count = 0;
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const d = Math.hypot(node.x - mx, node.y - my);
      if (d < 160 && count < 2) {
        node.targetOpacity = Math.min(node.baseOpacity + 0.3, 0.6);
        node.pulseGlow = 1.0;
        count++;
      }
    }
  }

  triggerRandomSystemEvent() {
    if (!this.nodes.length) return;
    const eventType = Math.random();

    if (eventType < 0.45) {
      // Event A: Node pulse
      const randomNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      randomNode.targetOpacity = Math.min(randomNode.baseOpacity + 0.35, 0.6);
      randomNode.pulseGlow = 1.0;
    } else if (eventType < 0.80) {
      // Event B: Connection energy pulse
      const i = Math.floor(Math.random() * this.nodes.length);
      const nA = this.nodes[i];
      for (let j = 0; j < this.nodes.length; j++) {
        if (i === j) continue;
        const nB = this.nodes[j];
        const dist = Math.hypot(nA.x - nB.x, nA.y - nB.y);
        if (dist < 140 && this.pulses.length < 3) {
          this.pulses.push({
            nodeA: nA,
            nodeB: nB,
            progress: 0,
            speed: 0.015 + Math.random() * 0.02,
            intensity: 0.7
          });
          break;
        }
      }
    } else {
      // Event C: Local network cluster activity
      const centerNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      for (let i = 0; i < this.nodes.length; i++) {
        const n = this.nodes[i];
        const dist = Math.hypot(n.x - centerNode.x, n.y - centerNode.y);
        if (dist < 130) {
          n.vx += (Math.random() - 0.5) * 0.3;
          n.vy += (Math.random() - 0.5) * 0.3;
          n.targetOpacity = Math.min(n.baseOpacity + 0.25, 0.5);
        }
      }
    }
  }

  update(now) {
    // Lerp activity multiplier
    this.currentActivity += (this.targetActivity - this.currentActivity) * 0.05;

    // Trigger random system background event
    if (now - this.lastEventTime > this.nextEventInterval) {
      this.triggerRandomSystemEvent();
      this.lastEventTime = now;
      this.nextEventInterval = (3000 + Math.random() * 4000) / this.currentActivity;
    }

    const mouseX = this.mouse.x;
    const mouseY = this.mouse.y;
    const interactionRadius = this.width < 1024 ? 140 : 190;

    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].activeConnectionsCount = 0;
    }

    // Update Node physics
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      // Wander steering
      node.wanderAngle += (Math.random() - 0.5) * node.wanderSpeed;
      const wx = Math.cos(node.wanderAngle) * 0.12;
      const wy = Math.sin(node.wanderAngle) * 0.12;

      const targetVx = node.baseVx + wx;
      const targetVy = node.baseVy + wy;

      node.vx += (targetVx - node.vx) * 0.05;
      node.vy += (targetVy - node.vy) * 0.05;

      // Desktop Force Field Repulsion
      if (mouseX !== null && mouseY !== null && this.width >= 640) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < interactionRadius && dist > 0) {
          const normDist = (1 - dist / interactionRadius);
          const forceStrength = normDist * normDist * (node.layer + 1) * 0.45;
          const nx = dx / dist;
          const ny = dy / dist;

          node.vx += nx * forceStrength;
          node.vy += ny * forceStrength;

          if (dist < 100) {
            node.targetOpacity = Math.max(node.targetOpacity, node.baseOpacity + normDist * 0.2);
          }
        }
      }

      // Damping
      node.vx *= 0.96;
      node.vy *= 0.96;

      node.x += node.vx;
      node.y += node.vy;

      // Wrap-around screen bounds smoothly
      const margin = 30;
      if (node.x < -margin) node.x = this.width + margin;
      if (node.x > this.width + margin) node.x = -margin;
      if (node.y < -margin) node.y = this.height + margin;
      if (node.y > this.height + margin) node.y = -margin;

      // Opacity Lerp & Pulse Decay
      node.opacity += (node.targetOpacity - node.opacity) * 0.05;
      node.targetOpacity += (node.baseOpacity - node.targetOpacity) * 0.02;
      if (node.pulseGlow > 0) {
        node.pulseGlow -= 0.03;
        if (node.pulseGlow < 0) node.pulseGlow = 0;
      }
    }

    // Update Pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const pulse = this.pulses[i];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        this.pulses.splice(i, 1);
      }
    }

    // Update Cursor Trails
    for (let i = this.cursorTrails.length - 1; i >= 0; i--) {
      const trail = this.cursorTrails[i];
      trail.opacity -= trail.decay;
      if (trail.opacity <= 0) {
        this.cursorTrails.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const { r, g, b } = this.accentRgb;
    const maxDist = (this.width < 640 ? 110 : (this.width < 1024 ? 145 : 180)) * Math.sqrt(this.currentActivity);

    // 1. Draw Connections
    for (let i = 0; i < this.nodes.length; i++) {
      const nA = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nB = this.nodes[j];

        if (nA.activeConnectionsCount >= nA.maxConnections || nB.activeConnectionsCount >= nB.maxConnections) {
          continue;
        }

        const dx = nB.x - nA.x;
        const dy = nB.y - nA.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          nA.activeConnectionsCount++;
          nB.activeConnectionsCount++;

          const factor = 1 - dist / maxDist;
          let lineOpacity = factor * 0.40 * this.currentActivity; // Substantially brighter base lines

          if (this.mouse.x !== null && this.mouse.y !== null) {
            const midX = (nA.x + nB.x) / 2;
            const midY = (nA.y + nB.y) / 2;
            const mouseDist = Math.hypot(midX - this.mouse.x, midY - this.mouse.y);
            if (mouseDist < 150) {
              lineOpacity += (1 - mouseDist / 150) * 0.25;
            }
          }

          this.ctx.beginPath();
          this.ctx.moveTo(nA.x, nA.y);
          this.ctx.lineTo(nB.x, nB.y);
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineOpacity.toFixed(3)})`;
          this.ctx.lineWidth = nA.layer === 2 || nB.layer === 2 ? 1.4 : 1.0;
          this.ctx.stroke();
        }
      }
    }

    // 2. Draw Pulses
    for (let i = 0; i < this.pulses.length; i++) {
      const p = this.pulses[i];
      const px = p.nodeA.x + (p.nodeB.x - p.nodeA.x) * p.progress;
      const py = p.nodeA.y + (p.nodeB.y - p.nodeA.y) * p.progress;

      this.ctx.beginPath();
      this.ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.intensity})`;
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(px, py, 6.0, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(p.intensity * 0.35).toFixed(2)})`;
      this.ctx.fill();
    }

    // 3. Draw Cursor Trails
    for (let i = 0; i < this.cursorTrails.length; i++) {
      const trail = this.cursorTrails[i];
      this.ctx.beginPath();
      this.ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trail.opacity.toFixed(2)})`;
      this.ctx.fill();
    }

    // 4. Draw Nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];

      if (n.pulseGlow > 0 || n.layer >= 1) {
        const glowRadius = n.radius + (n.pulseGlow > 0 ? n.pulseGlow * 4.5 : (n.layer === 2 ? 3.0 : 1.8));
        const glowOpacity = Math.min((n.opacity * 0.45 + n.pulseGlow * 0.4), 0.95).toFixed(2);
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${glowOpacity})`;
        this.ctx.fill();
      }

      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${n.opacity.toFixed(2)})`;
      this.ctx.fill();
    }
  }

  renderStaticFrame() {
    this.update(performance.now());
    this.draw();
  }

  animate() {
    if (this.reducedMotion || document.hidden) return;

    const now = performance.now();
    this.update(now);
    this.draw();

    requestAnimationFrame(() => this.animate());
  }
}

function initNetworkBackground() {
  new InteractiveNetworkBackground('network-bg-canvas');
}
